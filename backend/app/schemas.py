from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class ArticleBase(BaseModel):
    title: str
    summary: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    published_date: Optional[datetime] = None
    source_url: Optional[str] = None
    author: Optional[str] = None

class ArticleCreate(ArticleBase):
    slug: str

class ArticleResponse(ArticleBase):
    id: int
    slug: str

    class Config:
        from_attributes = True

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

class SubscriberCreate(BaseModel):
    email: EmailStr
