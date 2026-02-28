from fastapi import FastAPI, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager

from . import models, rss_fetcher
from .database import engine, get_db
from .routers import articles, categories, contacts, subscriptions

# Create the database tables
models.Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Setup initial RSS fetch on startup using a throwaway session
    from .database import SessionLocal
    db = SessionLocal()
    try:
        # Fetch synchronously on startup or send to background task 
        # (Be careful with long startup times, but for demo we just run it directly)
        rss_fetcher.fetch_and_store_rss_feeds(db)
        rss_fetcher.fetch_and_store_newsapi(db)
    finally:
        db.close()
        
    # Start APScheduler
    from .scheduler import start_scheduler
    start_scheduler()
    
    yield
    # Shutdown logic if any

app = FastAPI(title="GloTech API", lifespan=lifespan)

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(articles.router)
app.include_router(categories.router)
app.include_router(contacts.router)
app.include_router(subscriptions.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to GloTech API"}

@app.post("/refresh-rss")
def refresh_rss(background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """Endpoint to trigger an ad-hoc RSS refresh"""
    background_tasks.add_task(rss_fetcher.fetch_and_store_rss_feeds, db)
    return {"message": "RSS fetch triggered in background."}
