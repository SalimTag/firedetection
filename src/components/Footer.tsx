import { Github, Mail, BookOpen } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-700 bg-slate-900/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">FireWatch AI</h3>
            <p className="text-slate-300">
              Advanced fire detection powered by artificial intelligence.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/yourusername/firewatcher-ai"
                  className="text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="/docs"
                  className="text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <a
              href="mailto:contact@firewatchai.com"
              className="text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
            >
              <Mail className="h-4 w-4" />
              contact@firewatchai.com
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-700 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} FireWatch AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};