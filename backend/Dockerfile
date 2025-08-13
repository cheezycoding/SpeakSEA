# 1. Base Image: Start with an official Python image.
FROM python:3.11-slim-buster

# 2. Set Working Directory: Define the working directory inside the container.
WORKDIR /app

# 3. Copy Requirements: Copy the requirements file first.
COPY requirements.txt .

# 4. Install Dependencies: Install Python packages specified in requirements.txt.
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy Application Code: Copy the rest of the backend application code into the container.
COPY . .

# 6. Expose Port: Cloud Run will use PORT env var (default 8080)
EXPOSE 8080

# 7. Command: Use PORT environment variable dynamically
CMD ["python", "-c", "import os; os.system(f'uvicorn main:app --host 0.0.0.0 --port {os.getenv(\"PORT\", 8080)}')"]