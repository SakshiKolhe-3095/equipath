# =====================================================================
# PRODUCTION DEPLOYMENT BLUEPRINT: ENTERPRISE CONTAINERIZATION LAYER
# =====================================================================
# Use an optimized, secure Python runtime footprint image
FROM python:3.12-slim

# Establish the active system operational directory layer inside the container
WORKDIR /app

# Install native system dependencies required for compilation updates
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy only the package dependencies file first to leverage Docker's caching engine
COPY requirements.txt .

# Install enterprise modeling packages and ASGI server layers securely
RUN pip install --no-cache-dir -r requirements.txt

# Copy the remaining application source files into the container memory space
COPY src/ /app/src/
COPY policy.json /app/
COPY ann_model_6features.pkl /app/
COPY scaler_6.pkl /app/

# Expose port 8000 for network communication
EXPOSE 8000

# Set production environment flags for smooth data parsing
ENV PYTHONUNBUFFERED=1

# Boot the microservice using Uvicorn's production process worker manager
CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
