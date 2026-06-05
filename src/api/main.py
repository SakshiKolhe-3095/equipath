import json
import joblib
from pathlib import Path
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from tensorflow.keras.models import load_model


# =====================================================================
# INITIALIZE FASTAPI PLATFORM WITH CORS ROUTING
# =====================================================================
app = FastAPI(
    title="EquiPath Responsible AI - Fairness & Compliance Engine",
    description="Enterprise-grade inference service handling automated bias-remediation policies.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================================
# RESOLVE DEPLOYMENT-SAFE PROJECT PATHS
# =====================================================================
BASE_DIR = Path(__file__).resolve().parent.parent.parent

MODEL_PATH = BASE_DIR / "src" / "models" / "ann_model_6features.keras"
SCALER_PATH = BASE_DIR / "src" / "models" / "scaler_6.pkl"
POLICY_PATH = BASE_DIR / "src" / "config" / "policy.json"

# =====================================================================
# VALIDATE & LOAD PRODUCTION ASSETS
# =====================================================================
if not MODEL_PATH.exists():
    raise RuntimeError(f"Missing Keras model asset at: {MODEL_PATH}")
if not SCALER_PATH.exists():
    raise RuntimeError(f"Missing scaler asset at: {SCALER_PATH}")
if not POLICY_PATH.exists():
    raise RuntimeError(f"Missing policy config at: {POLICY_PATH}")
print(f"Loading model from: {MODEL_PATH}")
model = load_model(
    str(MODEL_PATH),
    compile=False
)
print("Model loaded successfully.")

scaler = joblib.load(SCALER_PATH)
print("Scaler loaded successfully.")

with open(POLICY_PATH, "r") as policy_file:
    policy_config = json.load(policy_file)
    print("Policy configuration loaded successfully.")

# =====================================================================
# SYNCHRONIZED INPUT PAYLOAD SCHEMA
# =====================================================================
class ApplicantPayload(BaseModel):
    age: int = Field(..., ge=18, le=100)
    hours_per_week: int = Field(..., ge=1, le=168)
    education_num: int = Field(..., ge=1, le=16)
    sex: int = Field(..., ge=0, le=1)
    # Safe defaults avoid front-end payload form failures
    capital_gain: int = Field(0, ge=0)
    capital_loss: int = Field(0, ge=0)
    fairness_mode: str = Field("demographic_parity")

# =====================================================================
# INFRASTRUCTURE OBSERVABILITY HEALTH CHECK (TASK S2-01)
# =====================================================================
@app.get("/health", tags=["Infrastructure Monitoring"])
def health_check():
    """
    Automated health check mapping. Used by cloud hosting platforms (like Render)
    and the React frontend to verify container and model asset availability parameters.
    """
    return {
        "status": "online",
        "backend": "FastAPI",
        "model_loaded": model is not None,
        "policy_loaded": policy_config is not None,
        "version": "1.0.0"
    }

# =====================================================================
# FAIRNESS-AWARE INFERENCE ENDPOINT
# =====================================================================
@app.post("/api/v1/inference")
def process_fair_inference(payload: ApplicantPayload):
    try:
        raw_features = np.array([[
            payload.age,
            payload.hours_per_week,
            payload.capital_gain,
            payload.capital_loss,
            payload.education_num,
            payload.sex
        ]])

        scaled_features = scaler.transform(raw_features)

        # Execute neural network forward propagation pass via true Keras file
        raw_prob = float(model.predict(scaled_features, verbose=0)[0][0])

        thresholds = policy_config["operational_thresholds"]
        th_male = thresholds.get("Male", 0.5)
        th_female = thresholds.get("Female", 0.5)

        # SYNCHRONIZED DEPLOYMENT INTERCEPT: Dynamic processing based on frontend mode choices
        if payload.fairness_mode == "raw":
            adjustment = 0.0
        else:
            adjustment = (0.5 - th_female) if payload.sex == 0 else (0.5 - th_male)
            
        fair_prob = np.clip(raw_prob + adjustment, 0.0, 1.0)

        raw_decision = "Approved" if raw_prob >= 0.5 else "Rejected"
        fair_decision = "Approved" if fair_prob >= 0.5 else "Rejected"

        return {
            "status": "SUCCESS",
            "compliance_metadata": {
                "policy_version": policy_config["metadata"]["policy_version"],
                "fairness_applied": payload.fairness_mode != "raw"
            },
            "metrics": {
                "unmitigated_base_probability": round(raw_prob, 4),
                "fairness_adjusted_probability": round(float(fair_prob), 4)
            },
            "decisions": {
                "raw_model_outcome": raw_decision,
                "optimized_fair_outcome": fair_decision,
                "outcome_overridden": raw_decision != fair_decision
            }
        }

    except Exception as error_trace:
        raise HTTPException(
            status_code=500,
            detail=f"Inference Engine Process Interrupted: {str(error_trace)}"
        )