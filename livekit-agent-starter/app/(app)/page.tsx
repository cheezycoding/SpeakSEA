import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2a2a2a', fontFamily: 'Courier New, monospace' }}>
      {/* Header */}
      <header className="shadow-lg" style={{ backgroundColor: '#1a1a1a', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: '#FFD700' }}
              >
                🎤
              </div>
              <h1 
                className="text-3xl font-bold"
                style={{ color: 'white' }}
              >
                SpeakSEA
              </h1>
            </div>
            <div 
              className="px-4 py-2 rounded-lg text-sm font-bold"
              style={{ 
                backgroundColor: '#4169E1', 
                color: 'white',
                borderRadius: '10px'
              }}
            >
              Powered by SEA-LION v3 🦁
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-20">
          <h2 
            className="text-6xl font-bold mb-8"
            style={{ color: 'white', fontSize: '48px' }}
          >
            AI-Powered PSLE Oral Examination
          </h2>
          <p 
            className="text-xl mb-12 max-w-4xl mx-auto leading-relaxed"
            style={{ color: '#e0e0e0', fontSize: '18px' }}
          >
            Practice your PSLE oral examination with our intelligent AI examiner. 
            Get real-time feedback on your speaking skills with voice-to-voice conversation 
            powered by cutting-edge SEA-LION technology.
          </p>
          
          {/* CTA Button */}
          <Link href="/video">
            <button 
              className="px-12 py-6 text-xl font-bold transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: '#4ade80',
                color: '#1a1a1a',
                borderRadius: '12px',
                border: '2px dashed #22c55e',
                cursor: 'pointer'
              }}
            >
              🎯 Start Practice Exam
            </button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div 
            className="p-8 rounded-xl transition-all duration-300 transform hover:-translate-y-2"
            style={{ 
              backgroundColor: '#1a1a1a', 
              borderRadius: '12px',
              border: '2px solid #333'
            }}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto"
              style={{ backgroundColor: '#f97316' }}
            >
              🎙️
            </div>
            <h3 
              className="text-2xl font-bold mb-4 text-center"
              style={{ color: 'white' }}
            >
              Voice Recognition
            </h3>
            <p 
              className="text-center leading-relaxed"
              style={{ color: '#e0e0e0', fontSize: '14px' }}
            >
              Advanced speech-to-text powered by OpenAI Whisper, 
              optimized for Southeast Asian accents and pronunciation.
            </p>
          </div>
          
          <div 
            className="p-8 rounded-xl transition-all duration-300 transform hover:-translate-y-2"
            style={{ 
              backgroundColor: '#1a1a1a', 
              borderRadius: '12px',
              border: '2px solid #333'
            }}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto"
              style={{ backgroundColor: '#6366f1' }}
            >
              🤖
            </div>
            <h3 
              className="text-2xl font-bold mb-4 text-center"
              style={{ color: 'white' }}
            >
              AI Examiner
            </h3>
            <p 
              className="text-center leading-relaxed"
              style={{ color: '#e0e0e0', fontSize: '14px' }}
            >
              Intelligent conversation flow with SEA-LION v3, 
              asking contextual questions and providing personalized feedback.
            </p>
          </div>
          
          <div 
            className="p-8 rounded-xl transition-all duration-300 transform hover:-translate-y-2"
            style={{ 
              backgroundColor: '#1a1a1a', 
              borderRadius: '12px',
              border: '2px solid #333'
            }}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto"
              style={{ backgroundColor: '#10b981' }}
            >
              🌱
            </div>
            <h3 
              className="text-2xl font-bold mb-4 text-center"
              style={{ color: 'white' }}
            >
              Environmental Focus
            </h3>
            <p 
              className="text-center leading-relaxed"
              style={{ color: '#e0e0e0', fontSize: '14px' }}
            >
              Practice with real PSLE topics like the 3 R's (Reduce, Reuse, Recycle) 
              to build both language and environmental awareness.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div 
          className="p-10 rounded-xl"
          style={{ 
            backgroundColor: '#1a1a1a', 
            borderRadius: '12px',
            border: '2px solid #333'
          }}
        >
          <h3 
            className="text-3xl font-bold text-center mb-12"
            style={{ color: 'white' }}
          >
            How It Works
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: '#6366f1' }}
              >
                <span className="text-3xl">📹</span>
              </div>
              <h4 
                className="font-bold mb-3"
                style={{ color: 'white', fontSize: '16px' }}
              >
                1. Watch Video
              </h4>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: '#e0e0e0', fontSize: '12px' }}
              >
                Watch a stimulus video about environmental topics
              </p>
            </div>
            
            <div className="text-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: '#10b981' }}
              >
                <span className="text-3xl">🎤</span>
              </div>
              <h4 
                className="font-bold mb-3"
                style={{ color: 'white', fontSize: '16px' }}
              >
                2. Speak Naturally
              </h4>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: '#e0e0e0', fontSize: '12px' }}
              >
                Introduce yourself and answer questions using your voice
              </p>
            </div>
            
            <div className="text-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: '#FFD700' }}
              >
                <span className="text-3xl">🧠</span>
              </div>
              <h4 
                className="font-bold mb-3"
                style={{ color: 'white', fontSize: '16px' }}
              >
                3. AI Responds
              </h4>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: '#e0e0e0', fontSize: '12px' }}
              >
                Get intelligent follow-up questions from the AI examiner
              </p>
            </div>
            
            <div className="text-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: '#f97316' }}
              >
                <span className="text-3xl">📊</span>
              </div>
              <h4 
                className="font-bold mb-3"
                style={{ color: 'white', fontSize: '16px' }}
              >
                4. Get Feedback
              </h4>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: '#e0e0e0', fontSize: '12px' }}
              >
                Receive detailed feedback on your communication skills
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer 
        className="py-12"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p 
            className="mb-4 text-lg font-bold"
            style={{ color: 'white' }}
          >
            Built for the <strong style={{ color: '#FFD700' }}>Pan-SEA AI Developer Challenge 2025</strong>
          </p>
          <p 
            className="text-sm"
            style={{ color: '#ccc', fontSize: '12px' }}
          >
            Empowering PSLE students across Southeast Asia with AI-powered oral examination practice
          </p>
        </div>
      </footer>
    </div>
  );
}