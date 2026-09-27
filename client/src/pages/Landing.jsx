import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Cpu, 
  Layers, 
  Sparkles, 
  TrendingUp, 
  Volume2, 
  ChevronRight, 
  Lock,
  Menu,
  X
} from 'lucide-react';
import HeroSection from "../components/landing/HeroSection";
import FeatureCard from "../components/landing/FeatureCard";
import Button from "../components/common/Button";
import Footer from "../components/landing/Footer";

/**
 * Landing Page component.
 * Integrates HeroSection, Feature Grids, Interactive Previews, and Navigation Header.
 */
const Landing = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Features list
  const features = [
    {
      icon: Mic,
      title: "Natural Voice Processing",
      description: "Simply speak to add, complete, or edit tasks. Our AI handles accents, phrasing variations, and speed automatically.",
      delay: 0.1
    },
    {
      icon: Cpu,
      title: "AI Action Summaries",
      description: "No more long logs. The engine summarizes voice recordings into clear, actionable bullet points and titles.",
      delay: 0.2
    },
    {
      icon: Layers,
      title: "Auto-Categorization",
      description: "The AI parsing engine automatically sets priorities, tags projects, and marks deadlines based on your speech context.",
      delay: 0.3
    },
    {
      icon: Sparkles,
      title: "Futuristic Glassmorphic UI",
      description: "Designed with modern dark aesthetics, soft neon glows, responsive layouts, and responsive, interactive card grids.",
      delay: 0.4
    },
    {
      icon: TrendingUp,
      title: "Deep Activity Analytics",
      description: "Track your voice commands, AI productivity indicators, weekly workload velocity, and task completion metrics.",
      delay: 0.5
    },
    {
      icon: Volume2,
      title: "Smart Audio Cues",
      description: "Get immersive, futuristic auditory feedback for assistant triggers, command confirmations, and alert states.",
      delay: 0.6
    }
  ];

  return (
    <div className="w-full bg-[#0B0F19] text-white overflow-hidden min-h-screen flex flex-col font-sans">
      
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0B0F19]/60 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo — clicking scrolls to top */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white">
              <Mic className="w-4.5 h-4.5" />
            </div>
            <span className="font-extrabold text-white tracking-wider text-lg hover:text-violet-300 transition-colors duration-300">
              Voice<span className="text-violet-400">Desk</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
            <a href="#features" className="relative px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-violet-500/10 hover:border-violet-500/20 border border-transparent transition-all duration-300 group">
              <span className="relative z-10">Features</span>
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
            </a>
            <a href="#how-it-works" className="relative px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-violet-500/10 hover:border-violet-500/20 border border-transparent transition-all duration-300 group">
              <span className="relative z-10">How it Works</span>
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
            </a>
            <a href="#preview" className="relative px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-violet-500/10 hover:border-violet-500/20 border border-transparent transition-all duration-300 group">
              <span className="relative z-10">Interface Preview</span>
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
            </a>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-violet-300 border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 hover:border-violet-400/50 hover:text-white transition-all duration-300"
              >
                Login
              </motion.button>
            </Link>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-purple-300 border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-400/50 hover:text-white transition-all duration-300"
              >
                Register
              </motion.button>
            </Link>
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
              >
                Dashboard
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full bg-[#0B0F19] border-b border-white/10 px-6 py-8 flex flex-col gap-6"
          >
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-violet-300 text-lg font-medium"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-violet-300 text-lg font-medium"
            >
              How it Works
            </a>
            <a 
              href="#preview" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-violet-300 text-lg font-medium"
            >
              Interface Preview
            </a>

            <div className="h-px bg-white/5 w-full my-2" />

            <div className="flex flex-col gap-4">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button variant="ghost" className="w-full">Login</Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button variant="outline" className="w-full">Register</Button>
              </Link>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button variant="primary" className="w-full">Dashboard</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Grid Section */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto w-full relative">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-violet-400 font-bold">
            Features Matrix
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white">
            Designed for Futuristic Productivity
          </h3>
          <p className="text-gray-400 text-md">
            Leverage bleeding-edge acoustic AI modules built to speed up your everyday workflows instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard 
              key={idx}
              index={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-[#141A29]/30 border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="space-y-8 max-w-xl">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">
                Operational Framework
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                From Speech to Organized Execution in Seconds
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Our vocal processing models translate simple voice command statements into fully categorized task profiles on your board. Speak, review, and confirm.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { step: "01", title: "Record Voice Prompt", desc: "Press the microphone trigger on the navigation bar or voice panel and speak your task naturally." },
                { step: "02", title: "Instant AI Synthesis", desc: "Acoustic models filter background noise, transcribe speech, and summarize notes into tags and titles." },
                { step: "03", title: "Execution Confirmation", desc: "Review details, modify priorities, and hit confirm to publish to your active task board." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#141A29] border border-purple-500/20 text-purple-400 font-mono text-sm flex items-center justify-center shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interface Preview */}
      <section id="preview" className="py-24 bg-[#0B0F19] px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs uppercase tracking-widest text-violet-400 font-bold">Live Demo</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">See It In Action</h2>
            <p className="text-gray-400 max-w-xl mx-auto">This is exactly what happens when you speak a command — AI extracts every detail automatically.</p>
          </div>

          <div className="max-w-3xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-violet-500/10 rounded-3xl blur-2xl pointer-events-none" />
            <div className="relative rounded-3xl border border-white/5 bg-[#141A29]/80 backdrop-blur-xl p-8 shadow-2xl flex flex-col gap-6">

              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-3 h-3 rounded-full bg-violet-400" />
                  <span className="text-xs font-mono tracking-widest text-violet-400 uppercase">AI Transcript Engine</span>
                </div>
                <div className="text-[10px] font-mono text-purple-400">STATUS: INTERPRETING</div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Voice Input</p>
                <div className="bg-[#0B0F19] rounded-xl p-4 border border-violet-500/10 text-violet-300 font-mono text-sm">
                  "Create task to draft project layout deck with priority high and deadline this friday afternoon"
                </div>
              </div>

              <div className="space-y-3 bg-[#0B0F19]/40 border border-white/5 rounded-xl p-5">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Extracted Parameters</p>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-gray-500">TASK TITLE</span>
                    <p className="text-white font-sans font-bold">Draft project layout deck</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500">PRIORITY</span>
                    <p className="text-red-400 font-bold uppercase">▲ High</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500">DUE DATE</span>
                    <p className="text-purple-400 font-bold">Friday 17:00</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500">AI AUTO-TAG</span>
                    <p className="text-violet-400 font-bold">#presentation</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-2.5 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
                <button className="flex-1 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/20">✓ Confirm Task</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Security Block */}
      <section className="py-24 px-6 relative max-w-5xl mx-auto text-center space-y-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Ready to Upgrade Your Workspace?
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Start recording tasks with the power of artificial intelligence. Secure, fast, and completely responsive.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/register">
            <Button variant="primary" size="lg" icon={ChevronRight} iconPosition="right">
              Get Started Now
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg">
              Login to Console
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-6">
          <Lock className="w-4 h-4 text-purple-400" />
          <span>No credit card required. Clean, secure workspace protocols.</span>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Landing;
