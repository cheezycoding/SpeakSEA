'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'

interface ChatMessage {
  id: number
  role: 'ai' | 'student'
  content: string
  timestamp: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'ai',
      content: "Good morning! Welcome to this PSLE Oral Examination. You may start by introducing yourself, and then I will ask you the first question about the video you just watched.",
      timestamp: "Ready"
    }
  ])

  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [conversationStep, setConversationStep] = useState(0)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  // Convert blob to base64
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        // Remove data:audio/wav;base64, prefix
        const base64Data = base64.split(',')[1]
        resolve(base64Data)
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  // Add message to chat
  const addMessage = (role: 'ai' | 'student', content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now() + Math.random(), // Ensure unique ID
      role,
      content,
      timestamp: new Date().toLocaleTimeString()
    }
    setMessages(prev => [...prev, newMessage])
    return newMessage
  }

  // Play audio response
  const playAudio = (base64Audio: string) => {
    try {
      const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`)
      audio.play()
    } catch (error) {
      console.error('Error playing audio:', error)
    }
  }

  // Send audio to backend
  const sendAudioToBackend = async (audioBlob: Blob) => {
    setIsProcessing(true)
    
    try {
      // Convert to base64
      const base64Audio = await blobToBase64(audioBlob)
      
      // Prepare conversation history for API
      const conversationHistory = messages.slice(1).map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp
      }))

      // Call the full conversation pipeline
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/chat/conversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audio_data: base64Audio,
          conversation_history: conversationHistory,
          conversation_step: conversationStep
        })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      // Add student message (transcribed)
      addMessage('student', data.transcribed_text)
      
      // Add AI response
      addMessage('ai', data.ai_response)
      
      // Play AI audio response
      if (data.audio_response) {
        playAudio(data.audio_response)
      }
      
      // Update conversation step
      setConversationStep(data.conversation_step)

    } catch (error) {
      console.error('Error processing audio:', error)
      addMessage('ai', "I'm sorry, I'm having trouble processing your response. Could you try again?")
    } finally {
      setIsProcessing(false)
    }
  }

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      
      audioChunksRef.current = []
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        sendAudioToBackend(audioBlob)
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop())
      }
      
      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsRecording(true)
      
    } catch (error) {
      console.error('Error starting recording:', error)
      alert('Microphone access denied. Please allow microphone access and try again.')
    }
  }

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  // Handle mic button click
  const handleMicClick = () => {
    if (isRecording) {
      stopRecording()
    } else if (!isProcessing) {
      startRecording()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              🧑‍🏫 PSLE Oral Examination
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Click the microphone to speak your responses
            </p>
          </div>
          <Link href="/">
            <button
              className="text-sm bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-md transition-colors"
              aria-label="End Exam and return to home"
            >
              End Exam
            </button>
          </Link>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4 pb-24">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'student' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.role === 'ai'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {/* Message Header */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium">
                    {message.role === 'ai' ? '🧑‍🏫 AI Examiner' : '🎤 You'}
                  </span>
                  <span className={`text-xs ${
                    message.role === 'ai' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp}
                  </span>
                </div>
                
                {/* Message Content */}
                <div className="text-sm leading-relaxed">
                  {message.content}
                </div>
              </div>
            </div>
          ))}

          {/* Sample student response for visual reference */}
          <div className="flex justify-end opacity-50">
            <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-gray-200 text-gray-800 border-2 border-dashed border-gray-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">🎤 You</span>
                <span className="text-xs text-gray-500">
                  --:--:--
                </span>
              </div>
              <div className="text-sm leading-relaxed italic">
                Your spoken response will appear here...
              </div>
            </div>
          </div>

          {/* Sample AI follow-up for visual reference */}
          <div className="flex justify-start opacity-50">
            <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-blue-500 text-white border-2 border-dashed border-blue-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">🧑‍🏫 AI Examiner</span>
                <span className="text-xs text-blue-100">
                  --:--:--
                </span>
              </div>
              <div className="text-sm leading-relaxed italic">
                AI response will appear here...
              </div>
            </div>
          </div>
        </div>

        {/* Completion Message */}
        {conversationStep >= 3 && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  🎉 <strong>Congratulations!</strong> You have completed your PSLE Oral Examination practice. 
                  Great job discussing the 3 R's and showing your environmental awareness!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Microphone Button - Hide when conversation is complete */}
      {conversationStep < 3 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleMicClick}
            disabled={isProcessing}
            className={`w-16 h-16 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center text-2xl ${
              isProcessing
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : isRecording
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse scale-110'
                : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105'
            }`}
          >
            {isProcessing ? '⏳' : isRecording ? '⏹️' : '🎤'}
          </button>
        
        {/* Status indicator */}
        {(isRecording || isProcessing) && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
              isProcessing ? 'bg-blue-500' : 'bg-red-500'
            }`}>
              {isProcessing ? 'Processing...' : 'Recording...'}
            </div>
          </div>
        )}
        
        {/* Instruction text */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-xs text-gray-600 whitespace-nowrap">
            {isProcessing 
              ? 'AI is thinking...' 
              : isRecording 
              ? 'Click to stop recording' 
              : 'Click to start speaking'
            }
          </p>
        </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="bg-white border-t p-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              conversationStep >= 3 ? 'bg-green-500' : 'bg-blue-500'
            }`}></div>
            <span>
              {conversationStep >= 3 
                ? 'Examination Complete' 
                : isProcessing 
                ? 'AI is thinking...' 
                : isRecording 
                ? 'Recording...' 
                : 'Ready for conversation'
              }
            </span>
          </div>
          <div className="text-xs">
            {conversationStep >= 3 
              ? 'PSLE Oral Practice Complete ✅' 
              : `Question ${conversationStep === 0 ? 1 : conversationStep} of 2 • PSLE Oral Practice`
            }
          </div>
        </div>
      </div>
    </div>
  )
}
