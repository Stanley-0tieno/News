from sqlalchemy import Column, Integer, String, Text, DateTime
from .database import Base
from datetime import datetime, timezone

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

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class Subscriber(Base):
    __tablename__ = "subscribers"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    subscribed_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
