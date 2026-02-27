from sqlalchemy.orm import Session
from . import models, schemas

def get_articles(db: Session, limit: int = 10):
    return db.query(models.Article).order_by(models.Article.published_date.desc()).limit(limit).all()

def get_article_by_slug(db: Session, slug: str):
    return db.query(models.Article).filter(models.Article.slug == slug).first()

def get_articles_by_category(db: Session, category: str, limit: int = 10):
    return db.query(models.Article).filter(models.Article.category == category).order_by(models.Article.published_date.desc()).limit(limit).all()

def get_related_articles(db: Session, category: str, exclude_slug: str, limit: int = 3):
    return db.query(models.Article).filter(
        models.Article.category == category,
        models.Article.slug != exclude_slug
    ).order_by(models.Article.published_date.desc()).limit(limit).all()

def get_article_by_source_url(db: Session, source_url: str):
    return db.query(models.Article).filter(models.Article.source_url == source_url).first()

def create_article(db: Session, article: schemas.ArticleCreate):
    db_article = models.Article(
        slug=article.slug,
        title=article.title,
        summary=article.summary,
        content=article.content,
        category=article.category,
        image_url=article.image_url,
        published_date=article.published_date,
        source_url=article.source_url,
        author=article.author
    )
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

def create_contact_message(db: Session, message: schemas.ContactMessageCreate):
    db_message = models.ContactMessage(
        name=message.name,
        email=message.email,
        message=message.message
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def create_subscriber(db: Session, subscriber: schemas.SubscriberCreate):
    # Check if exists
    existing = db.query(models.Subscriber).filter(models.Subscriber.email == subscriber.email).first()
    if existing:
        return existing
        
    db_subscriber = models.Subscriber(email=subscriber.email)
    db.add(db_subscriber)
    db.commit()
    db.refresh(db_subscriber)
    return db_subscriber
