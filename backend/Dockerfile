# Simple Python runtime
FROM python:3.12-slim

# Work directory  
WORKDIR /app

# Copy everything (including .env since you don't mind)
COPY . .

# Install dependencies
RUN pip install -r requirements.txt

# Run the app on Cloud Run's PORT
CMD uvicorn main:app --host 0.0.0.0 --port $PORT
