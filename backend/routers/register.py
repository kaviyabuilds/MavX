from fastapi import APIRouter
from database import SessionLocal
from models import User
import re

router = APIRouter()

@router.post("/register")
def register(data: dict):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == data["email"]
    ).first()

    if existing_user:

        return {
            "success": False,
            "message": "Email already exists"
        }

    password = data["password"]

    # STRONG PASSWORD VALIDATION
   

    password_regex = (
        r"^(?=.*[a-z])"
        r"(?=.*[A-Z])"
        r"(?=.*\d)"
        r"(?=.*[@$!%*?&])"
        r".{12,}$"
    )

    if not re.match(password_regex, password):

        return {
            "success": False,
            "message": (
                "Password must contain "
                "12 chars, uppercase, lowercase, "
                "number and special character"
            )
        }

    new_user = User(

        name=data["name"],

        email=data["email"],

        phone=data["phone"],

        password=password,
        role=data.get(
            "role",
            "trainer"
        )
    )

    db.add(new_user)

    db.commit()

    db.close()

    return {
        "success": True,
        "message": "User created successfully"
    }