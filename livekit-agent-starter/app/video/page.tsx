'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VideoPage() {
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes in seconds
  const [showLanguagePopup, setShowLanguagePopup] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const router = useRouter()

  useEffect(() => {
    // Only start countdown timer if language has been selected
    if (!showLanguagePopup) {
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
    }
  }, [router, showLanguagePopup])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const skipToChat = () => {
    router.push('/chat')
  }

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language)
    setShowLanguagePopup(false)
  }

  const languages = [
    { name: 'English', nativeName: 'English', available: true },
    { name: 'Mandarin', nativeName: '中文', available: false },
    { name: 'Malay', nativeName: 'Bahasa Melayu', available: false },
    { name: 'Indonesian', nativeName: 'Bahasa Indonesia', available: false },
    { name: 'Vietnamese', nativeName: 'Tiếng Việt', available: false },
    { name: 'Thai', nativeName: 'ไทย', available: false },
    { name: 'Tamil', nativeName: 'தமிழ்', available: false },
    { name: 'Burmese', nativeName: 'မြန်မာ', available: false }
  ]

  return (
    <div 
      className="min-h-screen p-6"
      style={{ backgroundColor: '#2a2a2a', fontFamily: 'Courier New, monospace' }}
    >
      {/* Language Selection Popup */}
      {showLanguagePopup && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        >
          <div 
            className="p-8 rounded-xl max-w-md w-full mx-4"
            style={{ 
              backgroundColor: '#1a1a1a',
              border: '2px solid #333',
              borderRadius: '12px'
            }}
          >
            <h2 
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: 'white' }}
            >
              Select Language
            </h2>
            
            <div 
              className="space-y-3 max-h-80 overflow-y-auto pr-2 language-scroll"
              style={{ 
                scrollbarWidth: 'thin',
                scrollbarColor: '#555 #333'
              }}
            >
              {languages.map((lang) => (
                <button
                  key={lang.name}
                  onClick={() => lang.available && handleLanguageSelect(lang.name)}
                  disabled={!lang.available}
                  className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                    lang.available 
                      ? 'hover:bg-gray-700 cursor-pointer' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  style={{
                    backgroundColor: lang.available ? '#333' : '#222',
                    border: '1px solid #555',
                    color: 'white'
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-medium">{lang.name}</span>
                      <span 
                        className="text-sm"
                        style={{ color: '#ccc' }}
                      >
                        {lang.nativeName}
                      </span>
                    </div>
                    {!lang.available && (
                      <span 
                        className="text-xs px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: '#f97316',
                          color: '#1a1a1a',
                          fontSize: '10px'
                        }}
                      >
                        Coming Soon
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div 
              className="mt-6 text-center text-sm"
              style={{ color: '#ccc' }}
            >
              Choose your preferred language for the oral examination
            </div>
          </div>
        </div>
      )}
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: 'white' }}
          >
            PSLE Oral Examination - Video Stimulus
          </h1>
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl"
            style={{ 
              backgroundColor: '#FFD700',
              color: '#2a2a2a',
              boxShadow: '0 4px 8px rgba(255, 215, 0, 0.3)'
            }}
          >
            <span className="text-2xl">⏱️</span>
            <span className="text-lg font-bold">
              Time remaining: {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Video Container */}
        <div 
          className="p-8 rounded-xl mb-8"
          style={{ 
            backgroundColor: '#1a1a1a', 
            borderRadius: '12px',
            border: '2px solid #333'
          }}
        >
          <div 
            className="aspect-video rounded-lg overflow-hidden"
            style={{ backgroundColor: '#000' }}
          >
            {!showLanguagePopup ? (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/CFdcR4_rYs4?mute=1&controls=0&modestbranding=1&theme=dark&color=white&disablekb=1&fs=0&iv_load_policy=3&rel=0&showinfo=0&cc_load_policy=0&autoplay=1&loop=1&playlist=CFdcR4_rYs4&enablejsapi=0"
                title="PSLE Oral Video Stimulus"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={false}
                className="w-full h-full"
                style={{
                  filter: 'contrast(1.1) brightness(0.9)',
                  border: 'none',
                  outline: 'none',
                  pointerEvents: 'none'
                }}
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: '#000' }}
              >
                <div className="text-center">
                  <div 
                    className="text-6xl mb-4"
                    style={{ color: '#4ade80' }}
                  >
                    🎬
                  </div>
                  <p 
                    className="text-xl font-bold"
                    style={{ color: 'white' }}
                  >
                    Select a language to start
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div 
          className="p-6 rounded-xl mb-8"
          style={{ 
            backgroundColor: '#6366f1',
            color: 'white',
            borderRadius: '12px',
            border: '2px dashed rgba(255, 255, 255, 0.3)'
          }}
        >
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              📹
            </div>
            <div>
              <h3 
                className="text-xl font-bold mb-2"
                style={{ color: 'white' }}
              >
                Instructions
              </h3>
              <p 
                className="leading-relaxed"
                style={{ color: 'white', fontSize: '14px' }}
              >
                Watch the video and observe the details carefully. 
                You will be asked questions about what you saw. The video is muted - focus on the visual content.
              </p>
            </div>
          </div>
        </div>

        {/* Timer and Skip Button */}
        <div className="flex justify-between items-center">
          <div 
            className="px-6 py-4 rounded-xl"
            style={{ 
              backgroundColor: '#1a1a1a',
              border: '2px solid #333',
              borderRadius: '12px'
            }}
          >
            <div 
              className="text-2xl font-bold"
              style={{ color: 'white' }}
            >
              ⏱️ {formatTime(timeLeft)}
            </div>
            <div 
              className="text-sm"
              style={{ color: '#e0e0e0', fontSize: '12px' }}
            >
              remaining
            </div>
          </div>
          
          <button
            onClick={skipToChat}
            className="px-8 py-4 text-lg font-bold transition-all duration-300 transform hover:scale-105"
            style={{
              backgroundColor: '#4ade80',
              color: '#1a1a1a',
              borderRadius: '12px',
              border: '2px dashed #22c55e',
              cursor: 'pointer'
            }}
          >
            Ready for Questions →
          </button>
        </div>
      </div>
    </div>
  )
}
