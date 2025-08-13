'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VideoPage() {
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes in seconds
  const router = useRouter()

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/chat')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const skipToChat = () => {
    router.push('/chat')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            PSLE Oral Examination - Video Stimulus
          </h1>
          <p className="text-gray-600">
            Watch the video carefully. You have {formatTime(timeLeft)} remaining.
          </p>
        </div>

        {/* Video Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/CFdcR4_rYs4?mute=1&controls=1&modestbranding=1"
              title="PSLE Oral Video Stimulus"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                📹 <strong>Instructions:</strong> Watch the video and observe the details carefully. 
                You will be asked questions about what you saw. The video is muted - focus on the visual content.
              </p>
            </div>
          </div>
        </div>

        {/* Timer and Skip Button */}
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold text-gray-700">
            ⏱️ Time remaining: {formatTime(timeLeft)}
          </div>
          <button
            onClick={skipToChat}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Ready for Questions →
          </button>
        </div>
      </div>
    </div>
  )
}
