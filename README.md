# 🗣️ SpeakSEA - AI-Powered PSLE Oral Practice Platform

An intelligent voice-enabled web application designed to help students practice for Singapore's PSLE Oral Examinations through interactive AI conversations.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Backend](https://img.shields.io/badge/Backend-Live%20on%20GCP-blue)
![Frontend](https://img.shields.io/badge/Frontend-Development%20Ready-orange)

---

## 🎯 **Project Overview**

SpeakSEA combines modern web technologies with AI to create an immersive language learning experience:

- **🎙️ Voice Recognition**: Real-time speech-to-text using OpenAI Whisper
- **🤖 AI Conversations**: Educational feedback powered by SEA-LION AI
- **🌏 Singapore-Focused**: Tailored for local PSLE examination requirements
- **☁️ Cloud-Native**: Deployed on Google Cloud Platform for reliability

### **Educational Goals**
- Practice oral communication skills in a low-pressure environment
- Receive instant AI-powered feedback on pronunciation and content
- Build confidence through repeated practice sessions
- Prepare effectively for PSLE oral examinations

---

## 🏗️ **System Architecture**

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────────────┐
│                 │◄──────────────────► │                         │
│  Next.js        │                     │  FastAPI Backend        │
│  Frontend       │                     │  (Google Cloud Run)     │
│                 │                     │                         │
│  • Voice UI     │                     │  • Speech-to-Text       │
│  • Recording    │                     │  • AI Processing        │
│  • Chat UI      │                     │  • API Integration      │
└─────────────────┘                     └─────────────────────────┘
                                                    │
                                                    ▼
                                        ┌─────────────────────────┐
                                        │   External AI APIs      │
                                        │                         │
                                        │  • OpenAI Whisper      │
                                        │  • SEA-LION AI         │
                                        └─────────────────────────┘
```

### **Technology Stack**

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Next.js 15.4.6 + TypeScript | Modern React-based UI |
| **Backend** | FastAPI + Python 3.12 | High-performance API server |
| **Deployment** | Google Cloud Run (Singapore) | Scalable serverless hosting |
| **Speech Processing** | OpenAI Whisper API | Speech-to-text transcription |
| **AI Conversation** | SEA-LION AI | Educational conversation AI |
| **Audio Handling** | Web MediaRecorder API | Browser-based audio capture |

---

## 🚀 **Quick Start Guide**

### **Prerequisites**
- **Node.js** 18+ (for frontend)
- **Python** 3.12+ (for local backend development)
- **API Keys**: OpenAI and SEA-LION access
- **Modern Browser**: Chrome/Safari/Firefox with microphone support

### **Option 1: Use Production Backend (Recommended)**
```bash
# 1. Clone the repository
git clone <repository-url>
cd SpeakSEA

# 2. Setup frontend only
cd speaksea/
npm install
npm run dev

# ✅ Frontend will automatically connect to production backend
# 🌐 Access: http://localhost:3001
```

### **Option 2: Full Local Development**
```bash
# 1. Setup backend
cd backend/
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 2. Configure environment
cp env_example.txt .env
# Edit .env with your API keys

# 3. Run backend
uvicorn main:app --reload --port 8000

# 4. Setup frontend (new terminal)
cd ../speaksea/
npm install

# 5. Configure for local backend
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# 6. Run frontend  
npm run dev
```

---

## 🌍 **Deployment Status**

### **Production Environment**

| Service | Status | URL | Region |
|---------|--------|-----|---------|
| **Backend API** | ✅ **LIVE** | https://speaksea-backend-419410473094.asia-southeast1.run.app | Singapore |
| **Frontend** | ✅ **LIVE** | https://speaksea.vercel.app | Vercel |
| **Health Check** | ✅ **Healthy** | [/health](https://speaksea-backend-419410473094.asia-southeast1.run.app/health) | - |
| **API Docs** | ✅ **Available** | [/docs](https://speaksea-backend-419410473094.asia-southeast1.run.app/docs) | - |

### **Infrastructure**
- **Hosting**: Google Cloud Run (Serverless)
- **Region**: Asia-Southeast1 (Singapore) - optimized for local users
- **Scaling**: Automatic based on demand
- **Security**: HTTPS enforced, environment variables secured
- **Monitoring**: Built-in Google Cloud monitoring and logging

---

## 📁 **Project Structure**

```
SpeakSEA/
├── README.md                   # This overview document
├── .gitignore                 # Git ignore rules (includes .env files)
│
├── backend/                   # FastAPI Backend Service
│   ├── README.md             # Backend-specific documentation
│   ├── main.py               # FastAPI application entry point
│   ├── requirements.txt      # Python dependencies
│   ├── Dockerfile            # Container configuration
│   ├── .env                  # Environment variables (local only)
│   ├── env_example.txt       # Environment template
│   │
│   ├── models/               # Data models and validation
│   │   ├── __init__.py
│   │   └── schemas.py        # Pydantic models
│   │
│   ├── routers/              # API endpoint definitions
│   │   ├── __init__.py
│   │   ├── chat.py          # Conversation endpoints
│   │   └── voice.py         # Voice processing endpoints
│   │
│   └── services/             # Business logic
│       ├── __init__.py
│       ├── chat_service.py   # AI conversation handling
│       └── speech_service.py # Speech processing
│
└── speaksea/                  # Next.js Frontend Application
    ├── README.md             # Frontend-specific documentation
    ├── package.json          # Node.js dependencies
    ├── next.config.ts        # Next.js configuration
    ├── tsconfig.json         # TypeScript configuration
    │
    ├── src/
    │   └── app/              # Next.js App Router
    │       ├── layout.tsx    # Root layout
    │       ├── page.tsx      # Home page
    │       ├── chat/         # Voice chat interface
    │       └── video/        # Video practice (future)
    │
    └── public/               # Static assets
        ├── *.svg             # Icons and graphics
        └── favicon.ico       # App icon
```

---

## 🎯 **Key Features**

### **🎙️ Voice Processing**
- **Real-time Recording**: Browser-based audio capture
- **High-Quality Transcription**: OpenAI Whisper API integration
- **Format Flexibility**: Handles various audio formats via base64 encoding
- **Error Recovery**: Robust handling of audio processing failures

### **🤖 AI Conversation**
- **Educational AI**: SEA-LION model optimized for Singapore context
- **Conversation Memory**: Maintains context across multiple interactions
- **PSLE-Focused**: Tailored feedback for oral examination practice
- **Instant Feedback**: Real-time responses to student input

### **💻 Modern Web Experience**
- **Responsive Design**: Works on desktop and mobile devices
- **Progressive Enhancement**: Graceful degradation for older browsers
- **Type Safety**: Full TypeScript coverage for reliability
- **Performance**: Optimized with Next.js 15 and Turbopack

### **☁️ Production Infrastructure**
- **Scalable Deployment**: Google Cloud Run auto-scaling
- **Global CDN**: Fast content delivery worldwide
- **Security**: HTTPS, secure environment variables, CORS protection
- **Monitoring**: Comprehensive logging and health checks

---

## 🚧 **Development Journey & Learning**

### **Key Challenges Solved**
1. **🍎 M1 MacBook Compatibility**: Initially suspected Docker architecture issues, solved using Google Cloud Build
2. **🐍 Python Version Compatibility**: Discovered Pydantic 2.5.0 incompatibility with Python 3.13, fixed by using Python 3.12
3. **🔐 Environment Variables**: Resolved 500 errors by properly configuring API keys in Cloud Run
4. **🌐 CORS Configuration**: Set up cross-origin requests for both development and production
5. **🚫 Production CORS Issues**: Fixed CORS errors when frontend deployed on speaksea.vercel.app by adding production URL to allowed origins

### **Technical Learning Outcomes**
- **Cloud Deployment**: Hands-on experience with Google Cloud Run
- **API Development**: Building production-ready REST APIs with FastAPI
- **Frontend Integration**: Connecting React/Next.js with backend services
- **Error Debugging**: Systematic approach to diagnosing deployment issues
- **Environment Management**: Proper handling of sensitive configuration data

### **Best Practices Implemented**
- **Separation of Concerns**: Clear backend/frontend boundaries
- **Environment Configuration**: Proper dev/staging/production setup
- **Error Handling**: Comprehensive error handling throughout the stack
- **Documentation**: Thorough documentation for maintainability
- **Security**: Proper secrets management and CORS policies

---

## 🛣️ **Future Roadmap**

### **Phase 1: Core Enhancements**
- [ ] **Frontend Deployment**: Deploy frontend to Vercel or Google Cloud
- [ ] **User Authentication**: Add user accounts and progress tracking
- [ ] **Session Management**: Save and resume practice sessions
- [ ] **Mobile App**: React Native version for mobile platforms

### **Phase 2: Advanced Features**
- [ ] **Video Practice**: Add video recording for complete oral practice
- [ ] **Performance Analytics**: Detailed feedback on speaking patterns
- [ ] **Curriculum Integration**: Align with specific PSLE topics
- [ ] **Multi-language**: Support for additional languages

### **Phase 3: Platform Scaling**
- [ ] **Teacher Dashboard**: Tools for educators to monitor student progress
- [ ] **Classroom Integration**: Support for class-wide practice sessions
- [ ] **Advanced AI**: More sophisticated conversation scenarios
- [ ] **Assessment Tools**: Automated scoring and grading features

---

## 📊 **Monitoring & Maintenance**

### **Health Checks**
```bash
# Backend Health
curl https://speaksea-backend-419410473094.asia-southeast1.run.app/health

# API Status
curl https://speaksea-backend-419410473094.asia-southeast1.run.app/

# Check Logs
gcloud run services logs read speaksea-backend --region=asia-southeast1 --limit=20
```

### **Performance Monitoring**
- **Google Cloud Console**: Monitor backend metrics and scaling
- **Next.js Analytics**: Frontend performance tracking
- **API Response Times**: Monitor speech processing latency
- **Error Rates**: Track and alert on application errors

### **Troubleshooting CORS Issues**
If you encounter CORS errors when deploying to a new domain:

1. **Add the domain to allowed origins in `backend/main.py`**:
   ```python
   allowed_origins = [
       "http://localhost:3000",
       "https://localhost:3000", 
       "https://speaksea.vercel.app",
       "https://your-new-domain.com",  # Add new domains here
   ]
   ```

2. **Alternatively, use environment variables**:
   ```bash
   # Set in your deployment environment
   ALLOWED_ORIGINS=https://speaksea.vercel.app,https://your-new-domain.com
   ```

3. **Redeploy the backend** to Google Cloud Run after making changes

---

## 🤝 **Contributing**

### **Development Workflow**
1. **Fork** the repository
2. **Create** a feature branch
3. **Test** changes locally
4. **Deploy** to staging environment
5. **Submit** pull request with detailed description

### **Code Standards**
- **Backend**: Python PEP 8, type hints, comprehensive docstrings
- **Frontend**: TypeScript strict mode, ESLint compliance
- **Documentation**: Update README files for any architectural changes
- **Testing**: Add tests for new features (future implementation)

---

## 📞 **Support & Resources**

### **Documentation**
- **Backend API**: [/docs endpoint](https://speaksea-backend-419410473094.asia-southeast1.run.app/docs)
- **Frontend Guide**: [speaksea/README.md](./speaksea/README.md)
- **Backend Guide**: [backend/README.md](./backend/README.md)

### **External APIs**
- **OpenAI Documentation**: https://platform.openai.com/docs
- **SEA-LION AI**: https://aisingapore.org/sea-lion/
- **Google Cloud Run**: https://cloud.google.com/run/docs

---

**Version**: 1.0.0 | **Status**: ✅ **Production Ready** | **Last Updated**: January 2025

*Built with ❤️ for Singapore's educational community*
