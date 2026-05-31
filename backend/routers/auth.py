""" from fastapi import APIRouter
from pydantic import BaseModel
from database import SessionLocal
from models import User
import re

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    name: str
    email: str
    phone: str
    password: str


def validate_password(password):

    pattern = (
        r"^(?=.*[a-z])"
        r"(?=.*[A-Z])"
        r"(?=.*\d)"
        r"(?=.*[@$!%*?&])"
        r"[A-Za-z\d@$!%*?&]{12,}$"
    )

    return re.match(pattern, password)


@router.post("/register")
def register(data: RegisterRequest):

    if not validate_password(data.password):

        return {
            "error":
            "Password must contain minimum 12 characters, uppercase, lowercase, number and special character"
        }

    db = SessionLocal()

    existing = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing:

        return {
            "error": "Email already exists"
        }

    user = User(
        name=data.name,
        email=data.email,
        phone=data.phone,
        password=data.password
    )

    db.add(user)

    db.commit()

    return {
        "message": "User registered successfully"
    }


@router.post("/login")
def login(data: LoginRequest):

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == data.email,
        User.password == data.password
    ).first()

    if not user:

        return {
            "error": "Invalid credentials"
        }

    return {
        "message": "Login successful",
        "user": {
            "name": user.name,
            "email": user.email
        }
    } """

from fastapi import APIRouter

from database import SessionLocal

from models import User

router = APIRouter()

@router.post("/login")
def login(data: dict):

    db = SessionLocal()

    user = db.query(User).filter(
        User.email == data["email"]
    ).first()

    if not user:

        return {
            "success": False,
            "message": "User not found"
        }

    if user.password != data["password"]:

        return {
            "success": False,
            "message": "Invalid password"
        }

    return {
        "success": True,
        "name": user.name,
        "email": user.email,
        "role": user.role
    }