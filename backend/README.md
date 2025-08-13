# SpeakSEA Backend API 🎤🦁

A FastAPI-powered voice-enabled PSLE Oral Examination API powered by SEA-LION AI, providing speech-to-text and text-to-speech capabilities for educational applications.

## ✨ Features

- **Speech-to-Text**: Convert audio recordings to text using OpenAI Whisper
- **Text-to-Speech**: Generate natural-sounding speech from text using OpenAI TTS
- **SEA-LION AI Integration**: Powered by Southeast Asia's advanced language model
- **CORS Support**: Ready for frontend integration with Next.js
- **FastAPI**: Modern, fast Python web framework with automatic API docs
- **Cloud Run Ready**: Optimized for Google Cloud Run deployment
- **Environment Configuration**: Secure API key management

## 🚀 Quick Start

### Prerequisites

- **Python 3.9+** (Check with: `python --version`)
- **pip** (Python package manager)
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))
- **SEA-LION API Key** ([Get one here](https://api.sea-lion.ai))

### 1. Clone and Setup

```bash
# If you just cloned the repository, navigate to backend
cd SpeakSEA/backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

```bash
# Copy the environment template
cp env_example.txt .env

# Edit .env file with your API keys
nano .env  # or use your preferred editor
```

**Required Environment Variables:**
```env
# OpenAI API Key (for Whisper STT and TTS)
OPENAI_API_KEY=your_openai_api_key_here

# SEA-LION API Configuration
SEALION_API_KEY=your_sealion_api_key_here
SEALION_BASE_URL=https://api.sea-lion.ai/v1

# Application Configuration
ENVIRONMENT=development
LOG_LEVEL=INFO
```

### 4. Run the Application

```bash
# Development server (auto-reload enabled)
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production server
python main.py
```

🎉 **Your API is now running at:** `http://localhost:8000`

- **API Documentation**: `http://localhost:8000/docs`
- **Alternative Docs**: `http://localhost:8000/redoc`
- **Health Check**: `http://localhost:8000/health`

## 📚 API Endpoints

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Welcome message and API info |
| `GET` | `/health` | Health check endpoint |
| `GET` | `/docs` | Interactive API documentation |

### Voice Processing

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/voice/speech-to-text` | Convert audio to text using Whisper |
| `POST` | `/api/voice/text-to-speech` | Convert text to audio using OpenAI TTS |

### Chat & Conversation

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat/message` | Send chat messages to SEA-LION AI |

## 🏗️ Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── requirements.txt        # Python dependencies
├── env_example.txt        # Environment variables template
├── .env                   # Your environment variables (create this)
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
    └── speech_service.py # OpenAI Whisper & TTS integration
```

## 🧪 Testing the API

### Using the Interactive Docs

1. Go to `http://localhost:8000/docs`
2. Click "Try it out" on any endpoint
3. Fill in the required parameters
4. Click "Execute" to test

### Using curl

```bash
# Health check
curl http://localhost:8000/health

# Example speech-to-text (base64 encoded audio)
curl -X POST "http://localhost:8000/api/voice/speech-to-text" \
     -H "Content-Type: application/json" \
     -d '{
       "audio_data": "base64_encoded_audio_here",
       "language": "en"
     }'
```

## ☁️ Cloud Run Deployment

The backend is optimized for Google Cloud Run deployment. After testing locally, you can create a clean Dockerfile and deploy to GCP Cloud Run.

## 🛠️ Development

### Adding New Dependencies

```bash
# Install new package
pip install package-name

# Update requirements.txt
pip freeze > requirements.txt
```

### Code Structure Guidelines

- **Models**: Define Pydantic schemas in `models/schemas.py`
- **Routes**: Add new endpoints in appropriate router files
- **Services**: Implement business logic in service files
- **Environment**: Add new config variables to `env_example.txt`

### Common Issues & Solutions

**🔧 Port already in use:**
```bash
# Change port in main.py or use:
uvicorn main:app --port 8001
```

**🔧 Module not found errors:**
```bash
# Make sure you're in the backend directory and venv is activated
pwd  # Should show: .../SpeakSEA/backend
source venv/bin/activate
```

**🔧 API key errors:**
```bash
# Check your .env file and ensure API keys are correctly set
cat .env  # Verify your environment variables
```

## 🔗 Integration with Frontend

The API is configured to work with the Next.js frontend. CORS supports both local development (`http://localhost:3000`) and production origins via the `ALLOWED_ORIGINS` environment variable.

For production deployment, set the `ALLOWED_ORIGINS` environment variable:
```bash
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://another-domain.com
```

## 📄 License

This project is part of the SpeakSEA educational platform.

## 🤝 Contributing

1. Create feature branches from `main`
2. Follow existing code structure and naming conventions
3. Test your changes thoroughly
4. Update documentation as needed

---

### 🆘 Need Help?

- **API Documentation**: `http://localhost:8000/docs`
- **Check Issues**: Look at the repository issues for common problems
- **Environment Issues**: Ensure all required environment variables are set

**Happy coding! 🚀**
