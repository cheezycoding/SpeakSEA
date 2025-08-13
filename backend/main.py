import os
from dotenv import load_dotenv

# Load environment variables FIRST before any other imports
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import voice, chat

app = FastAPI(
    title="SpeakSEA API",
    description="Voice-enabled PSLE Oral Examination API powered by SEA-LION",
    version="1.0.0"
)

# CORS middleware for frontend connection
# Support both development and production origins
allowed_origins = [
    "http://localhost:3000",  # Next.js dev server
    "https://localhost:3000",  # Next.js dev server with HTTPS
]

# Add production origins from environment variable if available
production_origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
if production_origins and production_origins[0]:  # Check if not empty string
    allowed_origins.extend([origin.strip() for origin in production_origins])

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(voice.router, prefix="/api/voice", tags=["voice"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])

@app.get("/")
async def root():
    return {
        "message": "SpeakSEA API is running!",
        "docs": "/docs",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "SpeakSEA API"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))  # Use PORT env var from Cloud Run, default to 8000
    uvicorn.run(app, host="0.0.0.0", port=port)
