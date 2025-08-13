# 🚀 SpeakSEA Backend API

A FastAPI-powered backend for voice-enabled PSLE Oral Examination practice, featuring speech-to-text transcription and AI-powered conversation with SEA-LION.

## 🌍 **Production Deployment**

**Live API**: https://speaksea-backend-419410473094.asia-southeast1.run.app

- **Platform**: Google Cloud Run
- **Region**: Asia Southeast 1 (Singapore) 
- **Status**: ✅ **LIVE & HEALTHY**
- **Health Check**: https://speaksea-backend-419410473094.asia-southeast1.run.app/health
- **API Documentation**: https://speaksea-backend-419410473094.asia-southeast1.run.app/docs

---

## 🏗️ **Architecture**

### **Core Components**
- **FastAPI**: Modern web framework with automatic OpenAPI documentation
- **OpenAI Whisper**: Speech-to-text transcription
- **SEA-LION AI**: Conversational AI for educational feedback
- **Pydantic**: Data validation and serialization
- **Docker**: Containerized deployment

### **API Endpoints**
```
GET  /                           # API status and info
GET  /health                     # Health check endpoint
POST /api/chat/conversation      # Main conversation pipeline
POST /api/voice/transcribe       # Speech transcription only
```

---

## 🛠️ **Local Development Setup**

### **Prerequisites**
- Python 3.12+ (Note: Python 3.13 not supported due to Pydantic compatibility)
- API Keys: OpenAI, SEA-LION

### **Installation**
```bash
# 1. Clone and navigate
cd backend/

# 2. Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up environment variables
cp env_example.txt .env
# Edit .env with your actual API keys
```

### **Environment Variables** (.env)
```bash
# Required API Keys
OPENAI_API_KEY=your_openai_api_key_here
SEALION_API_KEY=your_sealion_api_key_here  
SEALION_BASE_URL=https://api.aisingapore.org/v1

# Optional: Production CORS origins
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### **Run Locally**
```bash
# Development server
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production-like server
python main.py
```

**Local API**: http://localhost:8000
**Local Docs**: http://localhost:8000/docs

---

## 🌐 **Production Deployment**

### **Google Cloud Run Configuration**
- **Runtime**: Python 3.12 (Docker-based)
- **Architecture**: Linux x86_64 (automatically handled by Cloud Build)
- **Region**: asia-southeast1 (Singapore)
- **Environment Variables**: Securely managed in Cloud Run
- **CORS**: Configured for both development and production origins

### **Deployment Commands**
```bash
# Deploy to Cloud Run
gcloud run deploy speaksea-backend \
    --source . \
    --region=asia-southeast1 \
    --allow-unauthenticated \
    --port=8080

# Update environment variables
gcloud run services update speaksea-backend \
    --region=asia-southeast1 \
    --set-env-vars="OPENAI_API_KEY=...,SEALION_API_KEY=...,SEALION_BASE_URL=..."
```

---

## 📋 **Project Structure**
```
backend/
├── main.py                 # FastAPI application entry point
├── requirements.txt        # Python dependencies
├── Dockerfile             # Simplified Docker configuration
├── .dockerignore          # Docker build exclusions
├── env_example.txt        # Environment variables template
├── .env                   # Your local environment variables (ignored by git)
│
├── models/                # Data models and schemas
│   ├── __init__.py
│   └── schemas.py         # Pydantic models for API requests/responses
│
├── routers/               # API route handlers
│   ├── __init__.py
│   ├── chat.py           # Chat and conversation endpoints
│   └── voice.py          # Voice processing endpoints
│
└── services/             # Business logic and external API integration
    ├── __init__.py
    ├── chat_service.py   # SEA-LION AI integration
    └── speech_service.py # OpenAI Whisper integration
```

---

## 🔧 **Key Features**

### **Speech Processing**
- **OpenAI Whisper API**: High-accuracy speech-to-text transcription
- **Audio Format Support**: Base64 encoded audio from frontend
- **Error Handling**: Comprehensive error handling and validation

### **AI Conversation**
- **SEA-LION Integration**: Singapore-developed AI model for educational contexts
- **Conversation History**: Maintains context across multiple interactions  
- **Educational Focus**: Tailored for PSLE oral examination practice

### **Production Ready**
- **Health Checks**: Built-in health monitoring
- **CORS Configuration**: Secure cross-origin resource sharing
- **Environment Management**: Separate dev/prod configurations
- **Logging**: Comprehensive request/response logging

---

## 🚨 **Recent Fixes & Known Issues**

### **✅ Fixed Issues**
1. **M1 MacBook Compatibility**: Initially suspected architecture issue, resolved by using Cloud Build
2. **Python 3.13 Compatibility**: Switched to Python 3.12 due to Pydantic incompatibility
3. **Environment Variables**: Fixed 500 errors by properly setting API keys in Cloud Run
4. **CORS Configuration**: Updated for both development and production usage

### **🔍 Monitoring**
```bash
# Check deployment logs
gcloud run services logs read speaksea-backend --region=asia-southeast1 --limit=20

# Monitor service health
curl https://speaksea-backend-419410473094.asia-southeast1.run.app/health
```

---

## 🤝 **API Integration**

### **Frontend Integration**
The API is designed to work seamlessly with the Next.js frontend:
- **Development**: `http://localhost:8000` 
- **Production**: `https://speaksea-backend-419410473094.asia-southeast1.run.app`

### **CORS Policy**
```python
# Allowed origins
allowed_origins = [
    "http://localhost:3000",   # Next.js dev server
    "https://localhost:3000",  # Next.js dev server with HTTPS
    # Production origins added via ALLOWED_ORIGINS env var
]
```

---

## 📚 **Additional Resources**

- **OpenAPI Documentation**: Available at `/docs` endpoint
- **Health Monitoring**: Available at `/health` endpoint  
- **Google Cloud Console**: Monitor deployment metrics and logs
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **Cloud Run Docs**: https://cloud.google.com/run/docs

---

**Status**: ✅ **Production Ready** | **Region**: 🇸🇬 Singapore | **Updated**: January 2025