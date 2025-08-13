import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎤</div>
              <h1 className="text-2xl font-bold text-gray-800">SpeakSEA</h1>
            </div>
            <div className="text-sm text-gray-700">
              Powered by SEA-LION v3 🦁
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered PSLE Oral Examination
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Practice your PSLE oral examination with our intelligent AI examiner. 
            Get real-time feedback on your speaking skills with voice-to-voice conversation 
            powered by cutting-edge SEA-LION technology.
          </p>
          
          {/* CTA Button */}
          <Link href="/video">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              🎯 Start Practice Exam
            </button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🎙️</div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">Voice Recognition</h3>
            <p className="text-gray-900">
              Advanced speech-to-text powered by OpenAI Whisper, 
              optimized for Southeast Asian accents and pronunciation.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Examiner</h3>
            <p className="text-gray-900">
              Intelligent conversation flow with SEA-LION v3, 
              asking contextual questions and providing personalized feedback.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Environmental Focus</h3>
            <p className="text-gray-900">
              Practice with real PSLE topics like the 3 R's (Reduce, Reuse, Recycle) 
              to build both language and environmental awareness.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg p-8 shadow-md">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📹</span>
              </div>
              <h4 className="font-semibold mb-2 text-gray-900">1. Watch Video</h4>
              <p className="text-sm text-gray-900">Watch a stimulus video about environmental topics</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎤</span>
              </div>
              <h4 className="font-semibold mb-2 text-gray-900">2. Speak Naturally</h4>
              <p className="text-sm text-gray-900">Introduce yourself and answer questions using your voice</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h4 className="font-semibold mb-2 text-gray-900">3. AI Responds</h4>
              <p className="text-sm text-gray-900">Get intelligent follow-up questions from the AI examiner</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-semibold mb-2 text-gray-900">4. Get Feedback</h4>
              <p className="text-sm text-gray-900">Receive detailed feedback on your communication skills</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-4">
            Built for the <strong>Pan-SEA AI Developer Challenge 2025</strong>
          </p>
          <p className="text-gray-400 text-sm">
            Empowering PSLE students across Southeast Asia with AI-powered oral examination practice
          </p>
        </div>
      </footer>
    </div>
  );
}
