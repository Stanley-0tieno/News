from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..database import get_db

router = APIRouter(
    prefix="/subscriptions",
    tags=["subscriptions"]
)

@router.post("/subscribe")
def subscribe(subscription: schemas.SubscriptionRequest, db: Session = Depends(get_db)):
    crud.create_or_update_subscription(db, subscription)
    return {"message": "Successfully subscribed"}

@router.post("/unsubscribe")
def unsubscribe(subscription: schemas.SubscriptionRequest, db: Session = Depends(get_db)):
    crud.unsubscribe_user(db, subscription.email)
    return {"message": "Successfully unsubscribed"}
