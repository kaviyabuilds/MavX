from fastapi import APIRouter
from database import SessionLocal
from models import Trainee

router = APIRouter()

@router.get("/dashboard")
def dashboard():

    db = SessionLocal()

    trainees = db.query(Trainee).all()

    total = len(trainees)

    avg_score = round(
        sum([t.spark_score for t in trainees]) / total,
        2
    ) if total else 0

    high_risk = len(
        [t for t in trainees if t.risk_level == "High"]
    )

    avg_readiness = round(
        sum([t.readiness for t in trainees]) / total,
        2
    ) if total else 0

    return {
        "total_trainees": total,
        "average_score": avg_score,
        "high_risk": high_risk,
        "avg_readiness": avg_readiness
    }