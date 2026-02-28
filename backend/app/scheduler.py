from apscheduler.schedulers.asyncio import AsyncIOScheduler
from .services.email_service import send_daily_digest
from .database import SessionLocal
import asyncio

scheduler = AsyncIOScheduler()

async def scheduled_daily_digest():
    db = SessionLocal()
    try:
        await send_daily_digest(db)
    except Exception as e:
        print(f"Daily digest scheduler error: {e}")
    finally:
        db.close()

def start_scheduler():
    # Schedule to run every 24 hours (e.g., daily at 8:00 AM)
    scheduler.add_job(scheduled_daily_digest, 'cron', hour=8, minute=0)
    scheduler.start()
