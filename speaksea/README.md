# 🎨 SpeakSEA Frontend

A modern Next.js web application for interactive PSLE Oral Examination practice, featuring real-time voice recording and AI-powered conversation feedback.

## 🌐 **Current Status**

**Development Server**: http://localhost:3001 (auto-assigned due to port conflict)
**Backend Integration**: ✅ **Connected to Production API**  
**Production Backend**: https://speaksea-backend-419410473094.asia-southeast1.run.app

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ (recommended: latest LTS)
- npm or yarn package manager

### **Installation & Setup**
```bash
# 1. Navigate to frontend directory
cd speaksea/

# 2. Install dependencies  
npm install

# 3. Run development server
npm run dev
```

**Note**: The development server automatically detects available ports. If port 3000 is in use, it will use the next available port (e.g., 3001).

### **Access the Application**
- **Home Page**: http://localhost:3001
- **Voice Chat**: http://localhost:3001/chat  
- **Video Practice**: http://localhost:3001/video

---

## 🏗️ **Architecture**

### **Framework & Technologies**
- **Next.js 15.4.6**: React framework with Turbopack
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling (assumed)
- **Web APIs**: MediaRecorder for audio capture

### **Key Features**
- **Real-time Voice Recording**: Browser-based audio capture
- **Audio Processing**: Client-side audio encoding to base64
- **AI Conversation**: Integration with production backend API
- **Responsive Design**: Mobile and desktop optimized
- **TypeScript**: Full type safety throughout the application

---

## 📂 **Project Structure**
```
speaksea/
├── src/
│   └── app/                    # Next.js 13+ App Router
│       ├── layout.tsx          # Root layout component
│       ├── page.tsx           # Home page
│       ├── globals.css        # Global styles
│       ├── favicon.ico        # App icon
│       │
│       ├── chat/              # Voice chat functionality
│       │   └── page.tsx       # Main voice chat interface
│       │
│       └── video/             # Video practice (future feature)
│           └── page.tsx       # Video practice interface
│
├── public/                    # Static assets
│   ├── next.svg              # Next.js logo
│   ├── vercel.svg            # Vercel logo  
│   ├── file.svg              # File icon
│   ├── globe.svg             # Globe icon
│   └── window.svg            # Window icon
│
├── package.json              # Dependencies and scripts
├── package-lock.json         # Lock file
├── tsconfig.json            # TypeScript configuration
├── next.config.ts           # Next.js configuration
├── postcss.config.mjs       # PostCSS configuration
├── eslint.config.mjs        # ESLint configuration  
└── README.md               # This file
```

---

## 🔌 **API Integration**

### **Backend Configuration**
The frontend is configured to work with both development and production backends:

```typescript
// Current configuration in chat/page.tsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 
               'https://speaksea-backend-419410473094.asia-southeast1.run.app'
```

### **Environment Variables** (Optional)
Create `.env.local` to override the default production API:
```bash
# For local backend development
NEXT_PUBLIC_API_URL=http://localhost:8000

# For production backend (current default)
NEXT_PUBLIC_API_URL=https://speaksea-backend-419410473094.asia-southeast1.run.app
```

### **API Endpoints Used**
- `POST /api/chat/conversation` - Main conversation pipeline with voice input

---

## 🎙️ **Voice Chat Features**

### **Audio Recording**
- **Browser API**: Uses native `MediaRecorder` for audio capture
- **Format**: Captures in browser-supported format, converts to base64
- **Real-time UI**: Visual feedback during recording
- **Error Handling**: Microphone permission and recording error management

### **Conversation Flow**
1. **Record Audio**: Click record button and speak
2. **Processing**: Audio sent to backend for transcription  
3. **AI Response**: Backend processes with SEA-LION AI
4. **Display Results**: Transcription and AI feedback displayed
5. **History**: Conversation history maintained throughout session

### **User Interface**
- **Record Button**: Visual recording state indicator
- **Conversation History**: Scrollable chat-like interface
- **Status Messages**: Real-time feedback on processing state
- **Error Handling**: User-friendly error messages

---

## ⚙️ **Development**

### **Available Scripts**
```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start  

# Type checking
npm run type-check

# Linting
npm run lint
```

### **Development Notes**
- **Hot Reload**: Changes automatically reflected in browser
- **TypeScript**: Strict type checking enabled
- **Error Boundaries**: Comprehensive error handling
- **Performance**: Optimized with Next.js 15 features

---

## 🌐 **Deployment Ready**

### **Production Considerations**
- **API Integration**: Currently points to production backend
- **Environment Variables**: Configure via `.env.local` or deployment platform
- **Build Optimization**: Next.js automatically optimizes for production
- **Static Assets**: Properly configured in `public/` directory

### **Deployment Options**
- **Vercel**: Native Next.js deployment platform
- **Netlify**: Static site deployment
- **Docker**: Can be containerized for any platform
- **Google Cloud Run**: Can be deployed alongside backend

---

## 🔧 **Recent Updates**

### **✅ Completed**
1. **API Integration**: Updated to use production backend URL as default
2. **Port Management**: Automatic port detection (3001 when 3000 is busy)
3. **Error Handling**: Improved error messaging for API failures
4. **CORS Compatibility**: Works seamlessly with production backend

### **🚧 In Progress**
- Video practice functionality (placeholder implemented)
- Enhanced UI/UX improvements
- Mobile responsiveness optimization

---

## 🐛 **Troubleshooting**

### **Common Issues**

**Audio Recording Not Working**
```bash
# Check microphone permissions in browser
# Ensure HTTPS in production (required for microphone access)
```

**API Connection Errors**
```bash
# Check if backend is running
curl https://speaksea-backend-419410473094.asia-southeast1.run.app/health

# Check browser console for CORS errors
# Verify API URL configuration
```

**Port Conflicts**
```bash
# If port 3000 is busy, Next.js will auto-assign next available port
# Check terminal output for actual port number
```

---

## 📚 **Additional Resources**

- **Next.js Documentation**: https://nextjs.org/docs
- **TypeScript Guide**: https://nextjs.org/docs/basic-features/typescript  
- **MediaRecorder API**: https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
- **Web Audio API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

---

**Framework**: Next.js 15.4.6 | **Status**: ✅ **Active Development** | **Updated**: January 2025