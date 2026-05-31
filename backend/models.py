""" 

from sqlalchemy import Column, Integer, String, Float, ForeignKey
from database import Base

class Trainee(Base):
    __tablename__ = "trainees"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)
    batch = Column(String)
    stream = Column(String)

    spark_score = Column(Float)

    risk_level = Column(String)

    readiness = Column(Float)

    recommendation = Column(String)

    insight = Column(String) """

from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


# =========================
# TRAINEE TABLE
# =========================

class Trainee(Base):

    __tablename__ = "trainees"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)
    batch = Column(String)
    stream = Column(String)

    spark_score = Column(Float)

    project_score = Column(Float)
    
    risk_level = Column(String)

    readiness = Column(Float)

    recommendation = Column(String)

    insight = Column(String)

    # relationships

    assessments = relationship(
        "Assessment",
        back_populates="trainee"
    )

    ai_insights = relationship(
        "AIInsight",
        back_populates="trainee"
    )


# =========================
# ASSESSMENTS TABLE
# =========================

class Assessment(Base):

    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)

    trainee_id = Column(
        Integer,
        ForeignKey("trainees.id")
    )

    module = Column(String)

    score = Column(Float)

    attempts = Column(Integer)

    trainee = relationship(
        "Trainee",
        back_populates="assessments"
    )


# =========================
# AI INSIGHTS TABLE
# =========================

class AIInsight(Base):

    __tablename__ = "ai_insights"

    id = Column(Integer, primary_key=True, index=True)

    trainee_id = Column(
        Integer,
        ForeignKey("trainees.id")
    )

    insight = Column(String)

    recommendation = Column(String)

    trainee = relationship(
        "Trainee",
        back_populates="ai_insights"
    )


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    email = Column(String, unique=True)

    phone = Column(String)

    password = Column(String)
    role = Column(String, default="trainer")