""" from fastapi import APIRouter
from database import SessionLocal
from models import Trainee

router = APIRouter()

@router.get("/trainees")
def get_trainees():

    db = SessionLocal()

    trainees = db.query(Trainee).all()

    return [
        {
            "id": t.id,
            "name": t.name,
            "stream": t.stream,
            "spark_score": t.spark_score,
            "risk_level": t.risk_level,
            "readiness": t.readiness,
            "recommendation": t.recommendation,
            "insight": t.insight
        }
        for t in trainees
    ]


@router.get("/trainee/{id}")
def trainee_details(id: int):

    db = SessionLocal()

    trainee = db.query(Trainee).filter(
        Trainee.id == id
    ).first()

    return trainee """



from fastapi import APIRouter
from database import SessionLocal
from models import Trainee

router = APIRouter()


@router.get("/trainees")
def get_trainees():

    db = SessionLocal()

    trainees = db.query(
        Trainee
    ).all()

    return [

        {

            "id": t.id,

            "name": t.name,

            "batch": t.batch,

            "stream": t.stream,

            

            

            "spark_score":
                t.spark_score,

            "project_score":
                t.project_score,

            "risk_level":
                t.risk_level,

            "readiness":
                t.readiness,

            "recommendation":
                t.recommendation,

            "insight":
                t.insight

        }

        for t in trainees

    ]


@router.get("/trainee/{id}")
def trainee_details(id: int):

    db = SessionLocal()

    trainee = db.query(
        Trainee
    ).filter(
        Trainee.id == id
    ).first()

    return trainee