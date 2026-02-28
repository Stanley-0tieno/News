from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

class ArticleBase(BaseModel):
    title: str
    summary: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    published_date: Optional[datetime] = None
    source_url: Optional[str] = None
    author: Optional[str] = None
    is_breaking: Optional[bool] = False

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

class SubscriptionRequest(BaseModel):
    email: EmailStr

class SubscriptionResponse(BaseModel):
    id: str
    email: EmailStr
    topics: Optional[List[str]] = None
    email_enabled: bool
    push_enabled: bool
    device_token: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
