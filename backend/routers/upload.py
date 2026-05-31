""" 
from fastapi import APIRouter, UploadFile, File

import pandas as pd
import io

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
async def upload_excel(
    file: UploadFile = File(...)
):

    try:

        # =====================================
        # READ EXCEL FILE
        # =====================================

        contents = await file.read()

        df = pd.read_excel(
            io.BytesIO(contents),
            engine="openpyxl"
        )

        print("\n========== EXCEL COLUMNS ==========")
        print(df.columns.tolist())
        print("===================================\n")

        db = SessionLocal()

        inserted_count = 0

        for index, row in df.iterrows():

            try:

                # =====================================
                # BASIC DETAILS
                # =====================================

                emp_id = str(
                    row.get("Employee ID")
                    or f"EMP{1000 + index}"
                )

                name = str(
                    row.get("Name")
                    or ""
                )

                batch = str(
                    row.get("Spark Batch")
                    or ""
                )

                stream = str(
                    row.get("Stream")
                    or ""
                )

                training_stage = str(
                    row.get("Training Stage")
                    or "Training"
                )

                attendance = float(
                    row.get("Attendance")
                    or 85
                )

                attempts = int(
                    row.get("Attempts")
                    or 1
                )

                # =====================================
                # MODULE SCORES
                # =====================================

                sql_score = float(
                    row.get("SQL")
                    or 0
                )

                java_score = float(
                    row.get("Java")
                    or 0
                )

                fm1_score = float(
                    row.get("FM1")
                    or 0
                )

                fm2_score = float(
                    row.get("FM2")
                    or 0
                )

                project_score = float(
                    row.get("Project")
                    or 0
                )

                module_scores = {

                    "SQL": sql_score,

                    "Java": java_score,

                    "FM1": fm1_score,

                    "FM2": fm2_score,

                    "Project": project_score
                }

                # =====================================
                # CALCULATIONS
                # =====================================

                avg_score = round(

                    sum(module_scores.values())
                    /
                    len(module_scores),

                    2
                )

                failed_modules = (
                    count_failed_modules(
                        module_scores
                    )
                )

                weak_modules = (
                    identify_weak_modules(
                        module_scores
                    )
                )

                risk = calculate_risk(

                    avg_score,

                    failed_modules,

                    attempts
                )

                readiness = (
                    calculate_readiness(

                        assessment_score=
                        avg_score,

                        project_score=
                        project_score,

                        attendance_score=
                        attendance,

                        consistency_score=
                        80
                    )
                )

                recommendation = (
                    generate_recommendation(
                        risk,
                        weak_modules
                    )
                )

                insight = (
                    generate_ai_insight(

                        name,

                        risk,

                        readiness,

                        weak_modules
                    )
                )

                # =====================================
                # DUPLICATE CHECK
                # =====================================

                existing = (
                    db.query(Trainee)
                    .filter(
                        Trainee.emp_id
                        == emp_id
                    )
                    .first()
                )

                if existing:

                    print(
                        f"Skipping duplicate: {emp_id}"
                    )

                    continue

                # =====================================
                # CREATE TRAINEE
                # =====================================

                trainee = Trainee(

                    id=id,

                    name=name,

                    batch=batch,

                    stream=stream,

                    training_stage=
                    training_stage,

                    attendance=
                    attendance,

                    attempts=
                    attempts,

                    spark_score=
                    avg_score,

                    project_score=
                    project_score,

                    risk_level=
                    risk,

                    readiness=
                    readiness,

                    recommendation=
                    recommendation,

                    insight=
                    insight
                )

                db.add(trainee)

                db.commit()

                db.refresh(trainee)

                # =====================================
                # ASSESSMENTS
                # =====================================

                for module, score in (
                    module_scores.items()
                ):

                    assessment = Assessment(

                        trainee_id=
                        trainee.id,

                        module=
                        module,

                        score=
                        score,

                        attempts=
                        attempts
                    )

                    db.add(
                        assessment
                    )

                # =====================================
                # AI INSIGHTS
                # =====================================

                ai_record = AIInsight(

                    trainee_id=
                    trainee.id,

                    insight=
                    insight,

                    recommendation=
                    recommendation
                )

                db.add(ai_record)

                db.commit()

                inserted_count += 1

            except Exception as row_error:

                print(
                    f"\nROW {index} ERROR:"
                )

                print(row_error)

                db.rollback()

        db.close()

        return {

            "success": True,

            "rows_inserted":
            inserted_count,

            "message":
            f"{inserted_count} records uploaded successfully"
        }

    except Exception as e:

        print(
            "\nUPLOAD ERROR:"
        )

        print(e)

        return {

            "success": False,

            "error": str(e)
        } """


from fastapi import APIRouter, UploadFile, File

import pandas as pd
import io

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
async def upload_excel(
    file: UploadFile = File(...)
):

    try:

        contents = await file.read()

        df = pd.read_excel(
            io.BytesIO(contents),
            engine="openpyxl"
        )

        print("\n========== EXCEL COLUMNS ==========")
        print(df.columns.tolist())
        print("===================================\n")

        db = SessionLocal()

        inserted_count = 0

        for index, row in df.iterrows():

            try:

                # =========================
                # BASIC DETAILS
                # =========================

                name = str(
                    row.get("Name")
                    or ""
                )

                batch = str(
                    row.get("Spark Batch")
                    or ""
                )

                stream = str(
                    row.get("Stream")
                    or ""
                )

                # =========================
                # MODULE SCORES
                # =========================

                sql_score = float(
                    row.get("SQL")
                    or 0
                )

                java_score = float(
                    row.get("Java")
                    or 0
                )

                fm1_score = float(
                    row.get("FM1")
                    or 0
                )

                fm2_score = float(
                    row.get("FM2")
                    or 0
                )

                project_score = float(
                    row.get("Project Score")
                    or 0
                )

                module_scores = {

                    "SQL": sql_score,

                    "Java": java_score,

                    "FM1": fm1_score,

                    "FM2": fm2_score,

                    "Project": project_score
                }

                attempts = int(
                    row.get("Attempts")
                    or 1
                )

                attendance = float(
                    row.get("Attendance %")
                    or 85
                )

                # =========================
                # CALCULATIONS
                # =========================

                avg_score = round(
                    sum(module_scores.values())
                    / len(module_scores),
                    2
                )

                failed_modules = (
                    count_failed_modules(
                        module_scores
                    )
                )

                weak_modules = (
                    identify_weak_modules(
                        module_scores
                    )
                )

                risk = calculate_risk(
                    avg_score,
                    failed_modules,
                    attempts
                )

                readiness = calculate_readiness(
                    assessment_score=avg_score,
                    project_score=project_score,
                    attendance_score=attendance,
                    consistency_score=80
                )

                recommendation = (
                    generate_recommendation(
                        risk,
                        weak_modules
                    )
                )

                insight = (
                    generate_ai_insight(
                        name,
                        risk,
                        readiness,
                        weak_modules
                    )
                )

                # =========================
                # DUPLICATE CHECK
                # =========================

                existing = db.query(
                    Trainee
                ).filter(
                    Trainee.name == name,
                    Trainee.batch == batch
                ).first()

                if existing:

                    print(
                        f"Skipping duplicate: {name}"
                    )

                    continue

                # =========================
                # CREATE TRAINEE
                # =========================

                trainee = Trainee(

                    name=name,

                    batch=batch,

                    stream=stream,

                    spark_score=avg_score,

                    project_score=project_score,

                    risk_level=risk,

                    readiness=readiness,

                    recommendation=recommendation,

                    insight=insight
                )

                db.add(trainee)

                db.commit()

                db.refresh(trainee)

                # =========================
                # ASSESSMENTS
                # =========================

                for module, score in (
                    module_scores.items()
                ):

                    assessment = Assessment(

                        trainee_id=
                        trainee.id,

                        module=
                        module,

                        score=
                        score,

                        attempts=
                        attempts
                    )

                    db.add(
                        assessment
                    )

                # =========================
                # AI INSIGHTS
                # =========================

                ai_record = AIInsight(

                    trainee_id=
                    trainee.id,

                    insight=
                    insight,

                    recommendation=
                    recommendation
                )

                db.add(ai_record)

                db.commit()

                inserted_count += 1

            except Exception as row_error:

                print(
                    f"\nROW {index} ERROR:"
                )

                print(row_error)

                db.rollback()

        db.close()

        return {

            "success": True,

            "rows_inserted":
            inserted_count,

            "message":
            f"{inserted_count} records uploaded successfully"
        }

    except Exception as e:

        print(
            "\nUPLOAD ERROR:"
        )

        print(e)

        return {

            "success": False,

            "error": str(e)
        }