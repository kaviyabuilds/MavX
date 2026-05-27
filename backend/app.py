""" 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from models import Base
from routers.upload import router
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Trainee

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(router)

@app.get("/")
def home():
    return {"message": "MaxX Backend Running"}

@app.get("/dashboard")
def dashboard():
    db: Session = SessionLocal()

    trainees = db.query(Trainee).all()

    total = len(trainees)
    avg_score = round(sum([t.spark_score or 0 for t in trainees]) / total, 2) if total else 0
    high_risk = len([t for t in trainees if t.risk_level == "High"])

    return {
        "total_trainees": total,
        "average_score": avg_score,
        "high_risk": high_risk
    }

@app.get("/trainees")
def get_trainees():
    db: Session = SessionLocal()
    trainees = db.query(Trainee).all()

    return [
        {
            "name": t.name,
            "stream": t.stream,
            "score": t.spark_score,
            "risk": t.risk_level,
            "readiness": t.readiness
        }
        for t in trainees
    ] 
 """

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from models import Base

# Routers
from routers.upload import router as upload_router
from routers.register import router as register_router
from routers.auth import router as auth_router
from routers.dashboard import router as dashboard_router
from routers.trainees import router as trainee_router
""" from routers.auth_routes import router as auth_router
 """
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(upload_router)
app.include_router(register_router)
app.include_router(dashboard_router)
app.include_router(trainee_router)
app.include_router(auth_router)

@app.get("/")
def home():
    return {"message": "MaxX Backend Running"}