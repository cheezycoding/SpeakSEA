from fastapi import APIRouter, HTTPException
from models.schemas import (
    ConversationRequest,
    ConversationResponse,
    ChatResponse,
    TextRequest
)
from services.chat_service import ChatService
from services.speech_service import SpeechService
import base64

router = APIRouter()
chat_service = ChatService()
speech_service = SpeechService()

@router.post("/conversation", response_model=ConversationResponse)
async def full_conversation_pipeline(request: ConversationRequest):
    """
    Full voice conversation pipeline:
    Audio → STT → SEA-LION → TTS → Audio Response
    """
    try:
        # Step 1: Speech-to-Text
        audio_bytes = base64.b64decode(request.audio_data)
        stt_result = await speech_service.transcribe_audio(audio_bytes)
        transcribed_text = stt_result["text"]
        
        # Step 2: Get AI response from SEA-LION
        ai_response = await chat_service.get_ai_response(
            user_input=transcribed_text,
            conversation_history=request.conversation_history,
            conversation_step=request.conversation_step
        )
        
        # Step 3: Text-to-Speech
        audio_response = await speech_service.synthesize_speech(ai_response["response"])
        
        # Step 4: Determine if conversation is complete
        is_complete = request.conversation_step >= 3
        
        return ConversationResponse(
            transcribed_text=transcribed_text,
            ai_response=ai_response["response"],
            audio_response=audio_response,
            conversation_step=ai_response["conversation_step"],
            is_complete=is_complete
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversation pipeline failed: {str(e)}")

@router.post("/text-only", response_model=ChatResponse)
async def text_only_chat(request: TextRequest):
    """
    Text-only chat endpoint for testing SEA-LION responses
    """
    try:
        ai_response = await chat_service.get_ai_response(
            user_input=request.text,
            conversation_history=[],
            conversation_step=0
        )
        
        return ChatResponse(
            response=ai_response["response"],
            conversation_step=ai_response["conversation_step"],
            follow_up_questions=ai_response.get("follow_up_questions")
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Text chat failed: {str(e)}")

@router.get("/prompts/test")
async def test_prompts():
    """Test endpoint to verify prompt engineering"""
    return {
        "greeting": chat_service.get_greeting_prompt(),
        "first_question": chat_service.get_first_question_prompt(),
        "second_question": chat_service.get_second_question_prompt("sample response"),
        "feedback": chat_service.get_feedback_prompt(["response1", "response2"])
    }
