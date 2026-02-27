from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..database import get_db

router = APIRouter(
    prefix="/contact",
    tags=["contact"]
)

@router.post("/", response_model=schemas.ContactMessageCreate)
def submit_contact(message: schemas.ContactMessageCreate, db: Session = Depends(get_db)):
    # Returns the created message object with details (the ID would be in response if we wanted, but we requested ContactMessageCreate as response model or similar)
    return crud.create_contact_message(db, message)
