# 🗣️ SpeakSEA - AI-Powered PSLE Oral Practice Platform

An intelligent voice-enabled web application designed to help students practice for Singapore's PSLE Oral Examinations through interactive AI conversations powered by LiveKit Agents.

![Status](https://img.shields.io/badge/Status-Active%20Development-brightgreen)
![Architecture](https://img.shields.io/badge/Architecture-LiveKit%20Agents-blue)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Next.js-orange)

---

## 🎯 **Project Overview**

SpeakSEA combines modern web technologies with LiveKit Agents to create an immersive real-time voice learning experience:

- **🎙️ Real-time Voice**: LiveKit-powered voice interaction with AI agents
- **🤖 AI Conversations**: Educational feedback powered by SEA-LION AI
- **🌏 Singapore-Focused**: Tailored for local PSLE examination requirements
- **⚡ Low Latency**: Real-time communication for natural conversation flow

### **Educational Goals**

- Practice oral communication skills in a low-pressure environment
- Receive instant AI-powered feedback on pronunciation and content
- Build confidence through repeated practice sessions
- Prepare effectively for PSLE oral examinations

---

## 🏗️ **System Architecture**

```
┌─────────────────┐    LiveKit WebRTC    ┌─────────────────────────┐
│                 │◄──────────────────► │                         │
│  React Frontend │                     │  LiveKit Agent          │
│  (Next.js)      │                     │  (Python)               │
│                 │                     │                         │
│  • Voice UI     │                     │  • Real-time Voice      │
│  • Video Chat   │                     │  • AI Processing        │
│  • Chat UI      │                     │  • SEA-LION Integration │
└─────────────────┘                     └─────────────────────────┘
                                                    │
                                                    ▼
                                        ┌─────────────────────────┐
                                        │   External AI APIs      │
                                        │                         │
                                        │  • OpenAI Whisper      │
                                        │  • SEA-LION AI         │
                                        │  • Cartesia TTS        │
                                        └─────────────────────────┘
```

### **Technology Stack**

| Component                   | Technology                  | Purpose                                        |
| --------------------------- | --------------------------- | ---------------------------------------------- |
| **Frontend**          | Next.js 15.5.2 + TypeScript | Modern React-based UI with LiveKit integration |
| **Voice Agent**       | LiveKit Agents (Python)     | Real-time voice AI processing                  |
| **Communication**     | LiveKit WebRTC              | Low-latency real-time communication            |
| **Speech Processing** | OpenAI Whisper + Deepgram   | Speech-to-text transcription                   |
| **Text-to-Speech**    | Cartesia                    | High-quality voice synthesis                   |
| **AI Conversation**   | SEA-LION AI                 | Educational conversation AI                    |
| **Deployment**        | LiveKit Cloud               | Scalable real-time infrastructure              |

---

## 🚀 **Live Demo**

### **Try SpeakSEA Now**

🌐 **[speaksea-starter.vercel.app](https://speaksea-starter.vercel.app)**

Experience real-time voice interaction with AI-powered PSLE oral practice directly in your browser. No setup required - just click and start practicing!

---

## 🎯 **Key Features**

### **🎙️ Real-time Voice Interaction**

- **LiveKit WebRTC**: Ultra-low latency voice communication
- **High-Quality Audio**: Professional-grade audio processing
- **Noise Cancellation**: LiveKit Cloud enhanced noise cancellation
- **Turn Detection**: Contextually-aware speaker detection

### **🤖 AI-Powered Learning**

- **SEA-LION Integration**: Singapore-optimized AI for educational contexts
- **Real-time Transcription**: Deepgram-powered speech-to-text
- **Natural TTS**: Cartesia-powered text-to-speech synthesis
- **Conversation Memory**: Maintains context across interactions

### **💻 Modern Web Experience**

- **LiveKit Components**: Pre-built React components for voice/video
- **Responsive Design**: Works on desktop and mobile devices
- **Type Safety**: Full TypeScript coverage for reliability
- **Real-time UI**: Live updates for voice activity and transcription

### **⚡ LiveKit Infrastructure**

- **WebRTC Communication**: Direct peer-to-peer voice/video streaming
- **Scalable Platform**: LiveKit Cloud handles scaling automatically
- **Global Edge**: Low-latency communication worldwide
- **Security**: End-to-end encryption and secure token authentication
