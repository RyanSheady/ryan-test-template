import Chat from '../components/Chat';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-600 mb-2">
            Viral Content Creator
          </h1>
          <p className="text-gray-600 text-lg">
            Your bestie for 🔥 TikTok ideas & podcast tea ✨
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-h-[700px]">
          <Chat />
        </div>
      </div>
    </main>
  );
} 