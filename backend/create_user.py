from database import SessionLocal

from models import User

db = SessionLocal()

user = User(
    name="Swathi",
    email="swathi@mavx.com",
    phone="9876543210",
    password="Swathi@123456"
)

db.add(user)

db.commit()

print("User created") 