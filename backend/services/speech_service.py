import openai
import base64
import io
import os
from typing import Dict, Any
import httpx

class SpeechService:
    """Service for handling speech-to-text and text-to-speech operations"""
    
    def __init__(self):
        self.openai_client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    async def transcribe_audio(self, audio_bytes: bytes, audio_format: str = "wav") -> Dict[str, Any]:
        """
        Transcribe audio using OpenAI Whisper API
        
        Args:
            audio_bytes: Raw audio data
            audio_format: Audio format (wav, mp3, etc.)
            
        Returns:
            Dictionary with transcribed text and metadata
        """
        try:
            # Create a file-like object from bytes
            audio_file = io.BytesIO(audio_bytes)
            audio_file.name = f"audio.{audio_format}"
            
            # Call Whisper API
            transcript = self.openai_client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file,
                language="en"  # Force English for PSLE
            )
            
            return {
                "text": transcript.text,
                "language": "en",
                "confidence": 1.0  # Whisper doesn't return confidence scores
            }
            
        except Exception as e:
            raise Exception(f"Whisper transcription failed: {str(e)}")
    
    async def synthesize_speech(self, text: str, language: str = "en") -> str:
        """
        Convert text to speech using OpenAI TTS API
        
        Args:
            text: Text to convert to speech
            language: Language code (not used in OpenAI TTS but kept for compatibility)
            
        Returns:
            Base64 encoded audio data
        """
        try:
            # Call OpenAI TTS API
            response = self.openai_client.audio.speech.create(
                model="tts-1",  # or "tts-1-hd" for higher quality
                voice="nova",   # Female voice, good for teacher role
                input=text,
                response_format="mp3"
            )
            
            # Convert to base64
            audio_bytes = response.content
            audio_base64 = base64.b64encode(audio_bytes).decode('utf-8')
            
            return audio_base64
            
        except Exception as e:
            raise Exception(f"TTS synthesis failed: {str(e)}")
    
    async def get_available_voices(self) -> Dict[str, Any]:
        """
        Get available TTS voices
        Note: OpenAI TTS has fixed voices, but this method provides info
        """
        return {
            "voices": [
                {"id": "alloy", "name": "Alloy", "gender": "neutral"},
                {"id": "echo", "name": "Echo", "gender": "male"},
                {"id": "fable", "name": "Fable", "gender": "neutral"},
                {"id": "onyx", "name": "Onyx", "gender": "male"},
                {"id": "nova", "name": "Nova", "gender": "female"},
                {"id": "shimmer", "name": "Shimmer", "gender": "female"}
            ],
            "recommended": "nova",  # Good for teacher/examiner role
            "note": "OpenAI TTS voices are optimized for English"
        }
