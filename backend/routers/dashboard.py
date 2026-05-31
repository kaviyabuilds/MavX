""" from fastapi import APIRouter
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
    } """



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
        sum(t.spark_score for t in trainees) / total,
        2
    ) if total else 0

    avg_readiness = round(
        sum(t.readiness for t in trainees) / total,
        2
    ) if total else 0

    high_risk = len([
        t for t in trainees
        if t.risk_level == "High"
    ])

    medium_risk = len([
        t for t in trainees
        if t.risk_level == "Medium"
    ])

    low_risk = len([
        t for t in trainees
        if t.risk_level == "Low"
    ])

    top_performer = None

    if trainees:

        topper = max(
            trainees,
            key=lambda x: x.spark_score
        )

        top_performer = {
            "name": topper.name,
            "stream": topper.stream,
            "score": topper.spark_score
        }

    low_performer = None

    if trainees:

        bottom = min(
            trainees,
            key=lambda x: x.spark_score
        )

        low_performer = {
            "name": bottom.name,
            "stream": bottom.stream,
            "score": bottom.spark_score
        }

    top_5 = sorted(
        trainees,
        key=lambda x: x.spark_score,
        reverse=True
    )[:5]

    bottom_5 = sorted(
        trainees,
        key=lambda x: x.spark_score
    )[:5]

    stream_distribution = {}

    for trainee in trainees:

        stream_distribution[
            trainee.stream
        ] = (
            stream_distribution.get(
                trainee.stream,
                0
            ) + 1
        )

    return {

        "total_trainees": total,

        "average_score": avg_score,

        "avg_readiness": avg_readiness,

        "high_risk": high_risk,

        "medium_risk": medium_risk,

        "low_risk": low_risk,

        "top_performer": top_performer,

        "low_performer": low_performer,

        "top_5": [
            {
                "name": t.name,
                "score": t.spark_score
            }
            for t in top_5
        ],

        "bottom_5": [
            {
                "name": t.name,
                "score": t.spark_score
            }
            for t in bottom_5
        ],

        "stream_distribution":
            stream_distribution
    }