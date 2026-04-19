import QuizClient from "@/components/QuizClient";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <nav className="px-6 py-4 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Couples Quiz</h1>
        </div>
      </nav>

      <QuizClient />

      <footer className="px-6 py-8 border-t border-neutral-700 bg-neutral-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-neutral-400">
            For educational purposes only. Not a medical diagnosis.
          </p>
        </div>
      </footer>
    </main>
  );
}