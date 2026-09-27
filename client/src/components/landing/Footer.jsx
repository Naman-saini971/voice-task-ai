import { Shield, Cpu, Mic } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0B0F19] border-t border-white/5 py-10 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-white tracking-wider text-lg">
              Voice<span className="text-violet-400">Desk</span>
            </span>
            <p className="text-[10px] text-gray-500 tracking-widest uppercase">Voice-First Task Manager</p>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20">
            <Shield className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs text-violet-300">JWT Secured</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs text-purple-300">v1.0.0</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <span className="text-xs text-indigo-300">🎤 Web Speech API</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-500 text-center md:text-right">
          <p>© {new Date().getFullYear()} VoiceDesk. Built for Senpiper Assignment.</p>
          <p className="text-gray-600 mt-0.5">Naman Saini — Full Stack Developer</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
