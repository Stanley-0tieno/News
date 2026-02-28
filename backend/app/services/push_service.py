import firebase_admin
from firebase_admin import credentials, messaging
import os
from sqlalchemy.orm import Session
from .. import models

if not firebase_admin._apps:
    try:
        cred_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
        if cred_path and os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
        else:
            firebase_admin.initialize_app()
    except Exception as e:
        print(f"Firebase initialization error: {e}")

def send_breaking_news_push(db: Session, article: models.Article):
    if not firebase_admin._apps:
        print("Firebase not initialized. Cannot send push.")
        return
        
    from ..crud import get_active_push_subscriptions
    subs = get_active_push_subscriptions(db)
    if not subs:
        return
        
    tokens = []
    for sub in subs:
        if not sub.device_token:
            continue
        if sub.topics and article.category not in sub.topics:
            continue
        tokens.append(sub.device_token)
        
    if not tokens:
        return
        
    message = messaging.MulticastMessage(
        notification=messaging.Notification(
            title=f"Breaking: {article.title}",
            body=article.summary or "Read the latest breaking news.",
        ),
        data={
            "url": article.source_url or "",
            "category": article.category or "General"
        },
        tokens=tokens,
    )
    
    try:
        response = messaging.send_each_for_multicast(message)
        print(f"Successfully sent {response.success_count} messages. Failed {response.failure_count}")
    except Exception as e:
        print(f"Failed to send push notification: {e}")
