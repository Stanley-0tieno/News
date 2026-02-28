from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ARRAY
from .database import Base
from datetime import datetime, timezone
import uuid
from sqlalchemy.dialects.postgresql import UUID, ARRAY as PG_ARRAY

class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    summary = Column(Text, nullable=True)
    content = Column(Text, nullable=True)
    category = Column(String, nullable=True, index=True)
    image_url = Column(String, nullable=True)
    published_date = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    source_url = Column(String, nullable=True)
    author = Column(String, nullable=True)
    is_breaking = Column(Boolean, default=False)

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    topics = Column(ARRAY(String), nullable=True)
    email_enabled = Column(Boolean, default=True)
    push_enabled = Column(Boolean, default=False)
    device_token = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
