import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Clock } from 'lucide-react';

const WORDS = ["Create", "Complete", "Delay", "Delete"];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = React.useState(0);

  const demoText =
    'Remind me to submit the quarterly report by next Friday, high priority';

  const [typedText, setTypedText] = React.useState("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  React.useEffect(() => {
    let index = 0;

    const type = () => {
      if (index <= demoText.length) {
        setTypedText(demoText.slice(0, index));
        index++;
        setTimeout(type, 38);
      } else {
        setTimeout(() => {
          setTypedText("");
          index = 0;
          type();
        }, 2500);
      }
    };

    type();
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-16 overflow-hidden bg-[#0B0F19]">

      {/* Rich background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl w-full relative z-10 flex flex-col items-center text-center space-y-8">

        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold uppercase tracking-wider"
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-violet-400"
          />
          Voice-First AI Task Manager — Built for Speed
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-2"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
            Just Speak.
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400">
              AI Does the Rest.
            </span>
          </h1>
        </motion.div>

        {/* Animated word switcher */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 text-lg sm:text-2xl font-semibold text-gray-300"
        >
          <span>Say it to</span>

          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
className="inline-block min-w-[80px] text-center font-bold text-violet-400"          >
            {WORDS[wordIndex]}
          </motion.span>

          <span>tasks instantly</span>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex w-full justify-center mt-1"
          >
            <div className="h-px w-56 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
          </motion.div>

        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl"
        >
          VoiceDesk turns your natural speech into structured tasks with title, priority, and due date —
          all extracted automatically. No typing, no forms, just your voice.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-gray-300 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              Sign In
            </motion.button>
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500"
        >
          {[
            { icon: CheckCircle, text: "Free to use" },
            { icon: Zap, text: "No setup required" },
            { icon: Clock, text: "Works in seconds" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <item.icon className="w-3.5 h-3.5 text-violet-400" />
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Hero Visual — Voice command demo card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-3xl mt-4"
        >
          {/* Outer glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent pointer-events-none rounded-3xl" />

          <div className="relative rounded-3xl border border-violet-500/20 bg-[#141A29]/80 backdrop-blur-xl shadow-2xl shadow-violet-500/10 overflow-hidden">

            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0D1021]/60">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs font-mono text-gray-500 ml-2">VoiceDesk — Live Demo</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-violet-400"
                />
                <span className="text-xs font-mono text-violet-400 uppercase">Listening</span>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Voice input */}
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">🎤 You said</p>
                <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 px-4 py-3 text-sm text-violet-200 font-mono leading-relaxed">
                  <>
                    <span>{typedText}</span>

                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block ml-0.5 text-violet-300"
                    >
                      |
                    </motion.span>
                  </>
                </div>

                {/* Waveform animation */}
                <div className="flex items-end justify-center gap-1.5 h-14 w-full mt-4">                {[3, 5, 8, 6, 10, 7, 4, 9, 5, 7, 3, 6, 8, 5, 4, 7, 9, 6, 3, 5].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${h * 2}px`, `${h * 4}px`, `${h * 2}px`] }}
                    transition={{ duration: 0.8 + i * 0.05, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1 rounded-full bg-gradient-to-t from-violet-600 to-purple-400"
                  />
                ))}
                </div>
              </div>

              {/* Extracted task */}
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">✨ AI Extracted</p>
                <div className="rounded-2xl border border-white/5 bg-[#0B0F19]/60 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Title</span>
                    <span className="text-xs font-bold text-white">Submit quarterly report</span>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Priority</span>
                    <span className="text-xs font-bold text-red-400">▲ High</span>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Due Date</span>
                    <span className="text-xs font-bold text-purple-400">Next Friday</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-xl text-xs font-semibold border border-white/10 text-gray-400 hover:text-white transition-colors">
                    Cancel
                  </button>
                  <button className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg shadow-violet-500/20">
                    ✓ Confirm Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 gap-8 pt-4 border-t border-white/5 w-full max-w-md"
        >
          {[
            { value: "5 sec", label: "Avg task creation", color: "text-violet-400" },
            { value: "5+", label: "Voice commands", color: "text-purple-400" },
            { value: "100%", label: "Free to use", color: "text-indigo-400" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section >
  );
};

export default HeroSection;
