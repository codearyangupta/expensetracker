from sqlalchemy.orm import Session
from models import Expense
from schemas import ExpenseCreate

def create_expense(db:Session , expense:ExpenseCreate):
    db_expense = Expense(
        title = expense.title,
        amount = expense.amount,
        category = expense.category
    )

    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

def get_expenses(db:Session):
    return db.query(Expense).all()

def delete_expense(db: Session, expense_id: int):

    expense = (
        db.query(Expense)
        .filter(Expense.id == expense_id)
        .first()
    )

    if not expense:
        return {"error": "Expense not found"}

    db.delete(expense)

    db.commit()

    return {"message": "Expense deleted"}

def update_expense(
        db : Session,
        expense_id : int,
        updated_expense : ExpenseCreate
):
    expense = (
        db.query(Expense)
        .filter(Expense.id == expense_id)
        .first()
    )
    if not expense:
        return {"error" : "expense not found"}
    expense.title = updated_expense.title
    expense.amount = updated_expense.amount
    expense.category = updated_expense.category

    db.commit()
    db.refresh(expense)

    return expense

