export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Navigation */}
      <nav className="px-6 py-4 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">NextStarter</h1>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-neutral-300 hover:text-white transition-colors">Features</a>
            <a href="#about" className="text-neutral-300 hover:text-white transition-colors">About</a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Build Amazing Apps with
            <span className="text-blue-400 block">Next.js 16</span>
          </h1>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Start with a modern, TypeScript-powered foundation. Fast, scalable, and ready for production.
            Built with Next.js 16, Tailwind CSS 4, and best practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Start Building
            </button>
            <button className="border border-neutral-600 hover:border-neutral-500 text-neutral-300 hover:text-white px-8 py-4 rounded-lg text-lg transition-colors">
              View Docs
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-neutral-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need</h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
              A complete starter template with modern tools and best practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Next.js 16</h3>
              <p className="text-neutral-300">Latest App Router with server components, streaming, and edge runtime support.</p>
            </div>

            <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">TypeScript</h3>
              <p className="text-neutral-300">Full type safety with strict mode enabled for better developer experience.</p>
            </div>

            <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Tailwind CSS 4</h3>
              <p className="text-neutral-300">Utility-first CSS framework with modern design system and dark theme.</p>
            </div>

            <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Bun Package Manager</h3>
              <p className="text-neutral-300">Lightning-fast package manager for faster installs and script execution.</p>
            </div>

            <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">ESLint</h3>
              <p className="text-neutral-300">Code quality enforcement with modern linting rules and auto-fixing.</p>
            </div>

            <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI-Ready</h3>
              <p className="text-neutral-300">Built for AI-assisted development with context-aware recipes and documentation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-neutral-300 mb-8">
            Get started in seconds. This template is designed to grow with your project.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
            Launch Your Project
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-neutral-700 bg-neutral-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-neutral-400">
            Built with ❤️ using Next.js 16, TypeScript, and Tailwind CSS 4
          </p>
        </div>
      </footer>
    </main>
  );
}
