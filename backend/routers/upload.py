

""" from fastapi import APIRouter, UploadFile, File
import pandas as pd

from database import SessionLocal
from models import Trainee

from ai_engine import (
    calculate_risk,
    generate_recommendation,
    generate_ai_insight,
    calculate_readiness
)

router = APIRouter()

@router.post("/upload")
async def upload_excel(file: UploadFile = File(...)):

    try:

        df = pd.read_excel(file.file)

        print(df.columns)

        db = SessionLocal()

        for _, row in df.iterrows():

            name = str(row.get("Name") or "")

            stream = str(row.get("Stream") or "")

            batch = str(row.get("Spark Batch") or "")

            score = float(row.get("Spark Score") or 0)

            risk = calculate_risk(score)

            recommendation = generate_recommendation(score)

            insight = generate_ai_insight(
                name,
                score
            )

            readiness = calculate_readiness(score)

            trainee = Trainee(
                name=name,
                batch=batch,
                stream=stream,
                spark_score=score,
                risk_level=risk,
                readiness=readiness,
                recommendation=recommendation,
                insight=insight
            )

            db.add(trainee)

        db.commit()
        db.close()

        return {
            "message": "Excel uploaded successfully"
        }

    except Exception as e:

        print("UPLOAD ERROR:", e)

        return {
            "error": str(e)
        } """

from fastapi import APIRouter, UploadFile, File
import pandas as pd

from database import SessionLocal
from models import (
    Trainee,
    Assessment,
    AIInsight
)

from ai_engine import (
    calculate_risk,
    identify_weak_modules,
    calculate_readiness,
    generate_recommendation,
    generate_ai_insight,
    count_failed_modules
)

router = APIRouter()


@router.post("/upload")
async def upload_excel(file: UploadFile = File(...)):

    try:

        # Read Excel
        df = pd.read_excel(file.file)

        db = SessionLocal()

        for _, row in df.iterrows():

            # =========================
            # BASIC INFO
            # =========================

            name = str(row.get("Name") or "")

            batch = str(row.get("Spark Batch") or "")

            stream = str(row.get("Stream") or "")

            # =========================
            # MODULE SCORES
            # =========================

            
            module_scores = {

                "SQL": float(row.get("SQL") or 0),

                "Java": float(
                    row.get("Java") or 0
                ),

                "FM1": float(
                    row.get("FM1") or 0
                ),

                "FM2": float(
                    row.get("FM2") or 0
                ),

                "Project": float(
                    row.get("Project") or 0
                )

            }

            # =========================
            # ATTEMPTS
            # =========================

            attempts = int(
                row.get("SQL - 1") or 1
            )

            # =========================
            # ANALYTICS
            # =========================

            avg_score = round(

                sum(module_scores.values())
                / len(module_scores),

                2
            )

            failed_modules = count_failed_modules(
                module_scores
            )

            weak_modules = identify_weak_modules(
                module_scores
            )

            # =========================
            # RISK ENGINE
            # =========================

            risk = calculate_risk(

                avg_score,
                failed_modules,
                attempts

            )

            # =========================
            # READINESS ENGINE
            # =========================

            readiness = calculate_readiness(

                assessment_score=avg_score,

                project_score=module_scores[
                    "Project"
                ],

                attendance_score=85,

                consistency_score=80

            )

            # =========================
            # RECOMMENDATION ENGINE
            # =========================

            recommendation = (
                generate_recommendation(
                    risk,
                    weak_modules
                )
            )

            # =========================
            # AI INSIGHT ENGINE
            # =========================

            insight = generate_ai_insight(

                name,
                risk,
                readiness,
                weak_modules

            )

            # =========================
            # SAVE TRAINEE
            # =========================

            trainee = Trainee(
                

                name=name,

                batch=batch,

                stream=stream,

                spark_score=avg_score,

                risk_level=risk,

                readiness=readiness,

                recommendation=recommendation,

                insight=insight

            )

            db.add(trainee)

            db.commit()

            db.refresh(trainee)

            # =========================
            # SAVE ASSESSMENTS
            # =========================

            for module, score in (
                module_scores.items()
            ):

                assessment = Assessment(

                    trainee_id=trainee.id,

                    module=module,

                    score=score,

                    attempts=attempts

                )

                db.add(assessment)

            # =========================
            # SAVE AI INSIGHTS
            # =========================

            ai_record = AIInsight(

                trainee_id=trainee.id,

                insight=insight,

                recommendation=recommendation

            )

            db.add(ai_record)

        db.commit()

        db.close()

        return {

            "message":
            "Excel uploaded successfully"

        }

    except Exception as e:

        print("UPLOAD ERROR:", e)

        return {

            "error": str(e)

        }