from fastapi import APIRouter
from fastapi.responses import FileResponse

from database import SessionLocal
from models import Trainee

import pandas as pd

router = APIRouter()


@router.get("/export")
def export_excel():

    db = SessionLocal()

    trainees = db.query(
        Trainee
    ).all()

    data = []

    for t in trainees:

        data.append({

            "Name": t.name,

            "Batch": t.batch,

            "Stream": t.stream,

            "Attendance": t.attendance,

            "Spark Score": t.spark_score,

            "Project Score": t.project_score,

            "Risk Level": t.risk_level,

            "Readiness": t.readiness

        })

    df = pd.DataFrame(data)

    file_name = "MavX_Report.xlsx"

    df.to_excel(
        file_name,
        index=False
    )

    return FileResponse(
        file_name,
        media_type=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename=file_name
    )