import httpx
import os
from typing import Dict, Any, List
from models.schemas import ChatMessage

class ChatService:
    """Service for handling chat interactions with SEA-LION LLM"""
    
    def __init__(self):
        self.sealion_api_key = os.getenv("SEALION_API_KEY")
        self.sealion_base_url = os.getenv("SEALION_BASE_URL", "https://api.sea-lion.ai/v1")
        self.sealion_model = "aisingapore/Llama-SEA-LION-v3-70B-IT"
        
    async def get_ai_response(
        self, 
        user_input: str, 
        conversation_history: List[ChatMessage], 
        conversation_step: int
    ) -> Dict[str, Any]:
        """
        Get AI response from SEA-LION based on conversation context
        
        Args:
            user_input: Student's transcribed speech
            conversation_history: Previous messages in conversation
            conversation_step: Current step (0: greeting, 1: q1, 2: q2, 3: feedback)
            
        Returns:
            Dictionary with AI response and next conversation step
        """
        try:
            # Determine prompt based on conversation step
            if conversation_step == 0:
                prompt = self.get_first_question_prompt()
                next_step = 1
            elif conversation_step == 1:
                prompt = self.get_second_question_prompt(user_input)
                next_step = 2
            elif conversation_step == 2:
                # Get all student responses for feedback
                student_responses = [msg.content for msg in conversation_history if msg.role == "student"]
                student_responses.append(user_input)  # Add current response
                prompt = self.get_feedback_prompt(student_responses)
                next_step = 3
            else:
                prompt = "Thank you for completing the oral examination!"
                next_step = 3
            
            # Call SEA-LION API
            response = await self._call_sealion_api(prompt, user_input, conversation_history)
            
            return {
                "response": response,
                "conversation_step": next_step,
                "follow_up_questions": []
            }
            
        except Exception as e:
            # Fallback response if API fails
            return {
                "response": "I'm sorry, I'm having trouble processing your response. Could you please try again?",
                "conversation_step": conversation_step,
                "follow_up_questions": []
            }
    
    async def _call_sealion_api(
        self, 
        system_prompt: str, 
        user_input: str, 
        conversation_history: List[ChatMessage]
    ) -> str:
        """
        Make API call to SEA-LION using OpenAI-compatible format
        """
        try:
            # Build conversation messages for SEA-LION
            messages = [
                {"role": "system", "content": system_prompt}
            ]
            
            # Add conversation history
            for msg in conversation_history:
                role = "assistant" if msg.role == "ai" else "user"
                messages.append({"role": role, "content": msg.content})
            
            # Add current user input
            if user_input:
                messages.append({"role": "user", "content": user_input})
            
            # Make API call to SEA-LION
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.sealion_base_url}/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.sealion_api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": self.sealion_model,
                        "messages": messages,
                        "max_completion_tokens": 150,  # Reasonable length for PSLE responses
                        "temperature": 0.7  # Some creativity but not too much
                    },
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    result = response.json()
                    return result["choices"][0]["message"]["content"].strip()
                else:
                    print(f"SEA-LION API Error: {response.status_code} - {response.text}")
                    # Fallback to mock response
                    return self._get_fallback_response(system_prompt)
                    
        except Exception as e:
            print(f"SEA-LION API Exception: {str(e)}")
            # Fallback to mock response
            return self._get_fallback_response(system_prompt)
    
    def _get_fallback_response(self, system_prompt: str) -> str:
        """Fallback responses if API fails"""
        if "first question" in system_prompt.lower():
            return "Thank you for your introduction, Wazir! Now, can you tell me about what the girl in the video was learning? What did you see her doing with recycling, reusing, or reducing waste?"
        elif "follow-up question" in system_prompt.lower():
            return "That's a great observation about the 3 R's! Can you tell me why you think recycling, reusing, and reducing waste is important for our environment?"
        elif "feedback" in system_prompt.lower():
            return "Excellent work! You showed good understanding of the environmental message in the video and expressed yourself clearly in English. I can see you understand the importance of the 3 R's - recycling, reusing, and reducing waste. For improvement, try to include even more specific details about what you observed. Keep up the great work in caring for our environment!"
        else:
            return "Thank you for your response. Let's continue with our conversation about what you learned."
    
    def get_greeting_prompt(self) -> str:
        """Get the initial greeting prompt"""
        return """You are a friendly and encouraging PSLE oral examiner. 
        Greet the student warmly and ask them to introduce themselves before starting questions about the video."""
    
    def get_first_question_prompt(self) -> str:
        """Get prompt for the first question about the video"""
        return """You are a PSLE oral examiner. The student just introduced themselves and watched a video about a girl learning about recycling, reuse, and reduce (the 3 R's).
        
        IMPORTANT: You are the EXAMINER, not the student. Do not repeat the student's name as if it were your own.
        
        Respond professionally by:
        1. Acknowledging their introduction politely
        2. Asking ONE clear question about what they observed in the video
        
        Focus your question on:
        - What the girl was doing or learning about
        - The recycling, reuse, or reduce activities shown
        - Any objects or materials they saw being used
        
        Keep it conversational, encouraging, and at PSLE level (Primary 6, age 12)."""
    
    def get_second_question_prompt(self, first_response: str) -> str:
        """Get prompt for the second question based on first response"""
        return f"""You are a PSLE oral examiner. The video was about a student girl learning about recycling, reuse, and reduce (the 3 R's). The student's first response was: "{first_response}"
        
        Based on their observation, ask a thoughtful follow-up question that:
        - Builds on what they mentioned about the 3 R's or environmental activities
        - Encourages them to think about why these activities are important
        - Connects to their own experience with recycling, reusing, or reducing waste
        - Remains age-appropriate for Primary 6 students
        - Shows you were listening to their first answer
        
        Keep it conversational and encouraging, focusing on environmental awareness."""
    
    def get_feedback_prompt(self, student_responses: List[str]) -> str:
        """Get prompt for final feedback based on all responses"""
        responses_text = "\n".join([f"Response {i+1}: {resp}" for i, resp in enumerate(student_responses)])
        
        return f"""INSTRUCTION: You are a PSLE oral examiner giving FINAL FEEDBACK. The examination is COMPLETE. DO NOT ask any questions. DO NOT continue the conversation. Only provide assessment feedback.

STUDENT'S RESPONSES:
{responses_text}

TASK: Write a comprehensive final assessment (4-5 sentences) focusing on ORAL COMMUNICATION SKILLS:

PRIMARY ASSESSMENT AREAS:
1. LANGUAGE & EXPRESSION: Comment on vocabulary range, sentence structure, clarity of ideas
2. FLUENCY & CONFIDENCE: How well they expressed themselves, speaking pace, hesitations
3. CONTENT RELEVANCE: Whether they stayed on topic and provided appropriate examples
4. COMMUNICATION EFFECTIVENESS: How clearly they conveyed their thoughts and ideas

FEEDBACK STRUCTURE:
- Start with overall positive assessment of their speaking performance
- Highlight 2-3 specific strengths in their oral communication
- Give 1-2 constructive suggestions for improving their speaking skills
- End with encouragement about their communication abilities

FORMAT: Start with "Well done, [student name]!" and focus on their speaking performance. This is the END of the examination."""
