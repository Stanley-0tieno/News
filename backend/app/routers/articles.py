from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import crud, schemas
from ..database import get_db

router = APIRouter(
    prefix="/articles",
    tags=["articles"]
)

@router.get("/", response_model=List[schemas.ArticleResponse])
def read_articles(limit: int = 10, db: Session = Depends(get_db)):
    articles = crud.get_articles(db, limit=limit)
    return articles

@router.get("/{slug}", response_model=schemas.ArticleResponse)
def read_article(slug: str, db: Session = Depends(get_db)):
    article = crud.get_article_by_slug(db, slug=slug)
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

@router.get("/{slug}/related", response_model=List[schemas.ArticleResponse])
def read_related_articles(slug: str, db: Session = Depends(get_db)):
    article = crud.get_article_by_slug(db, slug=slug)
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    
    category = article.category
    if not category:
        return []
        
    related = crud.get_related_articles(db, category=category, exclude_slug=slug, limit=3)
    return related
