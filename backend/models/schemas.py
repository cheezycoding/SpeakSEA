from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class AudioRequest(BaseModel):
    """Request model for audio processing"""
    audio_data: str  # Base64 encoded audio
    format: str = "wav"  # Audio format

class TextRequest(BaseModel):
    """Request model for text processing"""
    text: str
    language: str = "en"

class ChatMessage(BaseModel):
    """Chat message model"""
    role: str  # "ai" or "student" 
    content: str
    timestamp: str  # Changed from datetime to string for frontend compatibility

class ConversationRequest(BaseModel):
    """Full conversation pipeline request"""
    audio_data: str
    conversation_history: List[ChatMessage] = []
    conversation_step: int = 0  # 0: greeting, 1: q1, 2: q2, 3: feedback

class ConversationResponse(BaseModel):
    """Full conversation pipeline response"""
    transcribed_text: str
    ai_response: str
    audio_response: str  # Base64 encoded audio
    conversation_step: int
    is_complete: bool = False

class SpeechToTextResponse(BaseModel):
    """Response from speech-to-text service"""
    transcribed_text: str
    confidence: Optional[float] = None
    language: Optional[str] = None

class TextToSpeechResponse(BaseModel):
    """Response from text-to-speech service"""
    audio_data: str  # Base64 encoded audio
    format: str = "mp3"
    duration: Optional[float] = None

class ChatResponse(BaseModel):
    """Response from chat/LLM service"""
    response: str
    conversation_step: int
    follow_up_questions: Optional[List[str]] = None
