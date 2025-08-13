from fastapi import APIRouter, HTTPException, UploadFile, File
from models.schemas import (
    AudioRequest, 
    TextRequest,
    SpeechToTextResponse, 
    TextToSpeechResponse
)
from services.speech_service import SpeechService
import base64

router = APIRouter()
speech_service = SpeechService()

@router.post("/speech-to-text", response_model=SpeechToTextResponse)
async def speech_to_text(request: AudioRequest):
    """Convert speech audio to text using Whisper API"""
    try:
        # Decode base64 audio
        audio_bytes = base64.b64decode(request.audio_data)
        
        # Call Whisper API
        result = await speech_service.transcribe_audio(audio_bytes, request.format)
        
        return SpeechToTextResponse(
            transcribed_text=result["text"],
            confidence=result.get("confidence"),
            language=result.get("language", "en")
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Speech-to-text failed: {str(e)}")

@router.post("/text-to-speech", response_model=TextToSpeechResponse)
async def text_to_speech(request: TextRequest):
    """Convert text to speech audio using TTS API"""
    try:
        # Call TTS API
        audio_data = await speech_service.synthesize_speech(request.text, request.language)
        
        return TextToSpeechResponse(
            audio_data=audio_data,
            format="mp3"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Text-to-speech failed: {str(e)}")

@router.post("/upload-audio")
async def upload_audio_file(file: UploadFile = File(...)):
    """Alternative endpoint for direct audio file upload"""
    try:
        # Read audio file
        audio_bytes = await file.read()
        
        # Extract file extension from filename
        filename = file.filename or "audio.mp3"
        file_extension = filename.split(".")[-1].lower()
        
        # Map common extensions
        if file_extension in ["mp3", "mpeg", "mpga"]:
            file_extension = "mp3"
        elif file_extension in ["wav", "wave"]:
            file_extension = "wav"
        elif file_extension in ["m4a", "mp4"]:
            file_extension = "m4a"
        elif file_extension in ["ogg", "oga"]:
            file_extension = "ogg"
        elif file_extension == "webm":
            file_extension = "webm"
        elif file_extension == "flac":
            file_extension = "flac"
        else:
            file_extension = "mp3"  # Default fallback
        
        # Transcribe
        result = await speech_service.transcribe_audio(audio_bytes, file_extension)
        
        return SpeechToTextResponse(
            transcribed_text=result["text"],
            confidence=result.get("confidence"),
            language=result.get("language", "en")
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Audio upload failed: {str(e)}")
