import os
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from sqlalchemy.orm import Session
from .. import crud

conf = ConnectionConfig(
    MAIL_USERNAME = os.getenv("EMAIL_USERNAME", "dummy@example.com"),
    MAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "dummy_pass"),
    MAIL_FROM = os.getenv("EMAIL_FROM", "digest@glotech.com"),
    MAIL_PORT = int(os.getenv("EMAIL_PORT", 587)),
    MAIL_SERVER = os.getenv("EMAIL_HOST", "smtp.example.com"),
    MAIL_STARTTLS = False,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)

async def send_daily_digest(db: Session):
    subs = crud.get_active_email_subscriptions(db)
    if not subs:
        return
        
    articles = crud.get_recent_articles(db, hours=24)
    if not articles:
        return

    fastmail = FastMail(conf)

    template_path = os.path.join(os.path.dirname(__file__), '..', 'templates', 'daily_digest.html')
    try:
        with open(template_path, 'r') as f:
            template = f.read()
    except Exception:
        template = "<h2>GloTech Daily Digest</h2>{{articles_html}}<br><a href='{{unsubscribe_link}}'>Unsubscribe</a>"

    for sub in subs:
        if sub.topics:
            user_articles = [a for a in articles if a.category in sub.topics]
        else:
            user_articles = articles
            
        if not user_articles:
            continue
            
        articles_html = ""
        for a in user_articles:
            image_tag = f'<img src="{a.image_url}" alt="Article Image" style="max-width: 100%; height: auto; border-radius: 8px;">' if a.image_url else ""
            articles_html += f"""
            <div style="margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px;">
                {image_tag}
                <h3 style="margin-top: 15px;"><a href="{a.source_url or '#'}" style="color: #2563eb; text-decoration: none;">{a.title}</a></h3>
                <p style="color: #6b7280; font-size: 14px;"><strong>Category:</strong> {a.category or 'General'}</p>
                <p style="color: #374151;">{a.summary or ''}</p>
            </div>
            """
            
        html_content = template.replace("{{articles_html}}", articles_html)
        html_content = html_content.replace("{{unsubscribe_link}}", f"http://localhost:3000/unsubscribe?email={sub.email}")
        
        message = MessageSchema(
            subject="Your Daily GloTech Digest 🚀",
            recipients=[sub.email],
            body=html_content,
            subtype=MessageType.html
        )
        
        try:
            await fastmail.send_message(message)
        except Exception as e:
            print(f"Failed to send email to {sub.email}: {e}")
