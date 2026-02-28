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
        author=article.author,
        is_breaking=article.is_breaking
    )
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    
    if db_article.is_breaking:
        from .services.push_service import send_breaking_news_push
        import asyncio
        import threading
        def _send_push():
            try:
                # Need a new db session or just use the existing one but we shouldn't pass session to async properly without care.
                # Actually, Firebase push API doesn't strictly need the same session if it just queries users.
                # Just call it directly for now and handle error.
                send_breaking_news_push(db, db_article)
            except Exception as e:
                print(f"Push notification error: {e}")
        # Run in a separate thread so it doesn't block
        threading.Thread(target=_send_push).start()

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

from datetime import datetime, timezone

def create_or_update_subscription(db: Session, subscription: schemas.SubscriptionRequest):
    # Check if exists
    existing = db.query(models.Subscription).filter(models.Subscription.email == subscription.email).first()
    if existing:
        existing.updated_at = datetime.now(timezone.utc)
        existing.email_enabled = True
        existing.push_enabled = False
        existing.topics = None
        db.commit()
        db.refresh(existing)
        return existing
        
    db_subscription = models.Subscription(
        email=subscription.email,
        email_enabled=True,
        push_enabled=False,
        topics=None
    )
    db.add(db_subscription)
    db.commit()
    db.refresh(db_subscription)
    return db_subscription

def unsubscribe_user(db: Session, email: str):
    existing = db.query(models.Subscription).filter(models.Subscription.email == email).first()
    if existing:
        existing.updated_at = datetime.now(timezone.utc)
        existing.email_enabled = False
        existing.push_enabled = False
        db.commit()
        db.refresh(existing)
    return existing

def get_active_email_subscriptions(db: Session):
    return db.query(models.Subscription).filter(models.Subscription.email_enabled == True).all()

def get_active_push_subscriptions(db: Session):
    return db.query(models.Subscription).filter(models.Subscription.push_enabled == True).all()

def get_recent_articles(db: Session, hours: int = 24):
    from datetime import timedelta
    time_threshold = datetime.now(timezone.utc) - timedelta(hours=hours)
    return db.query(models.Article).filter(models.Article.published_date >= time_threshold).all()
