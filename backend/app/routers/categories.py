from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas
from ..database import get_db

router = APIRouter(
    prefix="/categories",
    tags=["categories"]
)

@router.get("/{category}/articles", response_model=List[schemas.ArticleResponse])
def read_category_articles(category: str, limit: int = 10, db: Session = Depends(get_db)):
    articles = crud.get_articles_by_category(db, category=category, limit=limit)
    return articles
