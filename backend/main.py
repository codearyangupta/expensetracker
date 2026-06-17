from fastapi import FastAPI , Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from models import Base

from database import SessionLocal
from schemas import ExpenseCreate
from crud import create_expense, get_expenses, delete_expense, update_expense

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()



@app.post("/expenses")
def add_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db)
):
    return create_expense(db, expense)

@app.get("/expenses")
def read_expenses(
    db: Session = Depends(get_db)
):
    return get_expenses(db)

@app.delete("/expenses/{expense_id}")
def remove_expense(
    expense_id : int,
    db : Session = Depends(get_db)
):
    return delete_expense(db , expense_id)


@app.put("/expenses/{expense_id}")
def edit_expense(
    expense_id : int,
    updated_expense : ExpenseCreate,
    db : Session = Depends(get_db)
):
    return update_expense(
        db,
        expense_id,
        updated_expense
    )

@app.get("/")
def home():
    connection = engine.connect()
    connection.close()
    return{
        
        "message" : "server backend running"
    }


