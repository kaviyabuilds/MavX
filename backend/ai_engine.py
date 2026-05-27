""" def calculate_risk(score):

    # RULE BASED
    if score < 40:
        return "High"

    elif score < 70:
        return "Medium"

    return "Low"


def generate_recommendation(score):

    # RULE BASED
    if score < 40:
        return "Assign mentor + extra practice"

    elif score < 70:
        return "Provide revision modules"

    return "Deployment ready"


def generate_ai_insight(name, score):

    # AI STYLE EXPLANATION
    if score < 40:
        return f"{name} shows consistent low performance and requires immediate intervention."

    elif score < 70:
        return f"{name} has moderate performance with improvement potential."

    return f"{name} is performing consistently and is deployment ready."


def calculate_readiness(score):

    readiness = (
        (score * 0.4)
        + 20
        + 15
        + 10
    )

    return round(min(readiness, 100), 2) """

# =========================
# RISK PREDICTION ENGINE
# =========================

def calculate_risk(avg_score, failed_modules, attempts):

    # HIGH RISK

    if (
        avg_score < 50
        or failed_modules >= 3
        or attempts >= 3
    ):
        return "High"

    # MEDIUM RISK

    elif (
        avg_score < 70
        or failed_modules >= 1
    ):
        return "Medium"

    # LOW RISK

    return "Low"


# =========================
# WEAK MODULE ANALYZER
# =========================

def identify_weak_modules(module_scores):

    weak_modules = []

    for module, score in module_scores.items():

        if score < 60:
            weak_modules.append(module)

    return weak_modules


# =========================
# READINESS ENGINE
# =========================

def calculate_readiness(
    assessment_score,
    project_score,
    attendance_score,
    consistency_score
):

    readiness = (
        (assessment_score * 0.4)
        + (project_score * 0.3)
        + (attendance_score * 0.2)
        + (consistency_score * 0.1)
    )

    return round(min(readiness, 100), 2)


# =========================
# RECOMMENDATION ENGINE
# =========================

def generate_recommendation(
    risk,
    weak_modules
):

    # HIGH RISK

    if risk == "High":

        return (
            "Assign mentor support, "
            "mandatory practice sessions, "
            "and reassessment."
        )

    # MEDIUM RISK

    elif risk == "Medium":

        return (
            "Provide revision modules "
            "and additional coding exercises."
        )

    # LOW RISK

    return (
        "Deployment ready with "
        "consistent performance."
    )


# =========================
# AI INSIGHT ENGINE
# =========================

def generate_ai_insight(
    name,
    risk,
    readiness,
    weak_modules
):

    weak_text = ", ".join(weak_modules)

    # HIGH RISK

    if risk == "High":

        return (
            f"{name} is identified as high risk "
            f"due to weak performance in "
            f"{weak_text}. "
            f"Deployment readiness is "
            f"{readiness}%."
        )

    # MEDIUM RISK

    elif risk == "Medium":

        return (
            f"{name} shows moderate performance "
            f"with improvement potential in "
            f"{weak_text}. "
            f"Readiness currently stands at "
            f"{readiness}%."
        )

    # LOW RISK

    return (
        f"{name} is performing consistently "
        f"with strong readiness of "
        f"{readiness}%."
    )


# =========================
# FAILED MODULE COUNT
# =========================

def count_failed_modules(module_scores):

    failed = 0

    for score in module_scores.values():

        if score < 50:
            failed += 1

    return failed