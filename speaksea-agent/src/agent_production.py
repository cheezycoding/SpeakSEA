#!/usr/bin/env python3
"""
Production SEA-LION Agent with Deepgram STT/TTS
"""
import logging
import os

from dotenv import load_dotenv
from livekit.agents import (
    NOT_GIVEN,
    Agent,
    AgentFalseInterruptionEvent,
    AgentSession,
    JobContext,
    JobProcess,
    MetricsCollectedEvent,
    RoomInputOptions,
    RunContext,
    WorkerOptions,
    cli,
    metrics,
)
from livekit.agents.llm import function_tool
from livekit.plugins import openai, silero, deepgram
from livekit.plugins.turn_detector.multilingual import MultilingualModel

logger = logging.getLogger("agent")

load_dotenv(".env.local")
# Use SEA-LION API key as OPENAI_API_KEY for compatibility
sealion_key = os.getenv("SEALION_API_KEY")
if sealion_key:
    os.environ["OPENAI_API_KEY"] = sealion_key

class SEA_LION_Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="""You are a PSLE oral examiner conducting a structured examination.

EXAMINATION STRUCTURE:
1. GREETING: "Good morning. Please introduce yourself and tell me your name."
2. FIRST QUESTION: "Now, I'd like you to tell me what you observed in the video about recycling, reusing, and reducing waste. What did you see the girl doing?"
3. SECOND QUESTION: Based on their response, ask: "Can you explain why you think recycling, reusing, and reducing waste is important for our environment?"
4. FINAL FEEDBACK: Provide comprehensive assessment of their oral communication skills

EXAMINER BEHAVIOR:
- Be professional and structured
- Ask ONE clear question at a time
- Wait for complete responses before moving on
- Give specific feedback on oral communication skills
- Be encouraging but maintain examination standards

IMPORTANT RULES:
- Do NOT ask multiple questions in one response
- Do NOT move to new topics randomly
- Focus on ORAL COMMUNICATION assessment
- Follow the structured 4-step examination process
- Give specific feedback on speaking performance

Start by greeting the student and asking them to introduce themselves.""",
        )
        
        # Track examination state
        self.examination_step = 0  # 0: greeting, 1: first question, 2: second question, 3: feedback
        self.student_responses = []

    # No function tools - direct conversation only

def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()

async def entrypoint(ctx: JobContext):
    # Check for required environment variables
    sealion_key = os.getenv("SEALION_API_KEY")
    deepgram_key = os.getenv("DEEPGRAM_API_KEY")
    
    if not sealion_key:
        logger.error("❌ SEALION_API_KEY environment variable is required")
        return
        
    if not deepgram_key:
        logger.error("❌ DEEPGRAM_API_KEY environment variable is required")
        return

    logger.info("🔑 SEA-LION API Key available: True")
    logger.info("🔑 Deepgram API Key available: True")
    logger.info("🚀 SEA-LION Agent starting for room: %s", ctx.room.name)

    # Logging setup
    ctx.log_context_fields = {
        "room": ctx.room.name,
    }

    # Set up a voice AI pipeline using SEA-LION LLM with Deepgram STT/TTS
    session = AgentSession(
        # A Large Language Model (LLM) is your agent's brain, processing user input and generating a response
        # Using SEA-LION for Singapore-specific responses
        llm=openai.LLM(
            model="aisingapore/Llama-SEA-LION-v3-70B-IT",
            base_url="https://api.sea-lion.ai/v1",
            api_key=os.getenv("OPENAI_API_KEY")  # This is actually the SEA-LION key
        ),
        # Speech-to-text (STT) is your agent's ears, turning the user's speech into text that the LLM can understand
        # Using Deepgram for high-quality transcription
        stt=deepgram.STT(model="nova-3", language="multi"),
        # Text-to-speech (TTS) is your agent's voice, turning the LLM's text into speech that the user can hear
        # Using Deepgram TTS for natural voice
        tts=deepgram.TTS(),
        # VAD and turn detection are used to determine when the user is speaking and when the agent should respond
        # See more at https://docs.livekit.io/agents/build/turns
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        # allow the LLM to generate a response while waiting for the end of turn
        # See more at https://docs.livekit.io/agents/build/audio/#preemptive-generation
        preemptive_generation=True,
    )

    # sometimes background noise could interrupt the agent session, these are considered false positive interruptions
    # when it's detected, you may resume the agent's speech
    @session.on("agent_false_interruption")
    def _on_agent_false_interruption(ev: AgentFalseInterruptionEvent):
        logger.info("false positive interruption, resuming")
        session.generate_reply(instructions=ev.extra_instructions or NOT_GIVEN)

    # Metrics collection, to measure pipeline performance
    # For more information, see https://docs.livekit.io/agents/build/metrics/
    usage_collector = metrics.UsageCollector()

    @session.on("metrics_collected")
    def _on_metrics_collected(ev: MetricsCollectedEvent):
        metrics.log_metrics(ev.metrics)
        usage_collector.collect(ev.metrics)

    async def log_usage():
        summary = usage_collector.get_summary()
        logger.info(f"Usage: {summary}")

    ctx.add_shutdown_callback(log_usage)

    # Start the session, which initializes the voice pipeline and warms up the models
    await session.start(
        agent=SEA_LION_Assistant(),
        room=ctx.room,
        room_input_options=RoomInputOptions(),
    )

    # Join the room and connect to the user
    await ctx.connect()


if __name__ == "__main__":
    cli.run_app(WorkerOptions(
        entrypoint_fnc=entrypoint, 
        prewarm_fnc=prewarm,
        agent_name="CA_i4JKDTZVkS2A"
    ))
