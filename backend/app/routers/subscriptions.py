from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..database import get_db

router = APIRouter(
    prefix="/subscriptions",
    tags=["subscriptions"]
)

@router.post("/", response_model=schemas.SubscriberCreate)
def submit_subscription(subscription: schemas.SubscriberCreate, db: Session = Depends(get_db)):
    return crud.create_subscriber(db, subscription)
