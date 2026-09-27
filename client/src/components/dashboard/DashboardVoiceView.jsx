import { motion } from "framer-motion";
import { Activity, Mic, Sparkles, Zap, MessageSquare, CheckCircle, Clock } from "lucide-react";
import Button from "../common/Button";
import RecentCommands from "./RecentCommands";

const EXAMPLE_COMMANDS = [
  { icon: "🎤", text: "Create task submit the report by Friday high priority" },
  { icon: "✅", text: "Complete grocery run" },
  { icon: "🗑️", text: "Delete dentist appointment" },
  { icon: "⏰", text: "Delay project meeting to next Monday" },
  { icon: "📌", text: "Remind me to call the client tomorrow" },
];

export default function DashboardVoiceView({
  isListening,
  transcript,
  aiResponse,
  recentCommands,
  onOpenVoice,
}) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Voice Assistant</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
            Speak naturally — the AI extracts task details automatically
          </p>
        </div>
        <Button variant="primary" size="md" icon={Mic} onClick={onOpenVoice}>
          {isListening ? "Stop Recording" : "Start Recording"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

        {/* Left Column */}
        <div className="space-y-6 lg:col-span-7">

          {/* Live Status Card */}
          <div className="rounded-3xl border border-gray-200 dark:border-gray-200 dark:border-white/5 bg-white dark:bg-white dark:bg-[#141A29] border-gray-200 dark:border-gray-200 dark:border-white/5 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-violet-400" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Live Voice Feed</h3>
              </div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${
                isListening
                  ? "border-red-500/30 bg-red-500/10 text-red-400"
                  : "border-gray-200 dark:border-gray-200 dark:border-white/5 bg-white/5 text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-600"
              }`}>
                <motion.span
                  animate={isListening ? { opacity: [1, 0, 1] } : { opacity: 1 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className={`h-1.5 w-1.5 rounded-full ${isListening ? "bg-red-400" : "bg-gray-600"}`}
                />
                {isListening ? "Recording" : "Standby"}
              </div>
            </div>

            {/* Transcript */}
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-600 font-mono">
                Speech Transcript
              </p>
              <div className={`min-h-[80px] rounded-2xl border px-4 py-3 text-sm transition-all duration-300 ${
                transcript
                  ? "border-violet-500/20 bg-violet-500/5 text-gray-900 dark:text-white"
                  : "border-gray-200 dark:border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-gray-50 dark:bg-[#0B0F19] text-gray-600"
              }`}>
                {transcript ? (
                  <p className="leading-relaxed">"{transcript}"</p>
                ) : (
                  <p className="italic">Waiting for voice input... Click "Start Recording" to begin.</p>
                )}
              </div>
            </div>

            {/* AI Output */}
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-600 font-mono">
                AI Extraction Output
              </p>
              <div className={`min-h-[80px] rounded-2xl border px-4 py-3 text-sm transition-all duration-300 ${
                aiResponse
                  ? "border-purple-500/20 bg-purple-500/5 text-gray-900 dark:text-white"
                  : "border-gray-200 dark:border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-gray-50 dark:bg-[#0B0F19] text-gray-600"
              }`}>
                {aiResponse ? (
                  <p className="leading-relaxed">{aiResponse}</p>
                ) : (
                  <p className="italic">Structured task details will appear here after speech analysis.</p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          {recentCommands?.length > 0 ? (
            <RecentCommands commands={recentCommands} />
          ) : (
            <div className="rounded-3xl border border-gray-200 dark:border-gray-200 dark:border-white/5 bg-white dark:bg-white dark:bg-[#141A29] border-gray-200 dark:border-gray-200 dark:border-white/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Recent Voice Activity</h4>
                <Activity className="h-4 w-4 text-purple-400" />
              </div>
              <div className="text-center py-6">
                <p className="text-4xl mb-2">🎙️</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">No commands yet</p>
                <p className="text-xs text-gray-600 mt-1">Your voice history will appear here</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6 lg:col-span-5">

          {/* How It Works */}
          <div className="rounded-3xl border border-gray-200 dark:border-gray-200 dark:border-white/5 bg-white dark:bg-white dark:bg-[#141A29] border-gray-200 dark:border-gray-200 dark:border-white/5 p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-violet-400" />
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">How It Works</h4>
            </div>
            <div className="space-y-4">
              {[
                { icon: Mic, label: "Speak naturally", desc: "No exact phrases needed — talk like you normally would", color: "text-violet-400" },
                { icon: Sparkles, label: "AI extracts details", desc: "Title, priority, and due date are parsed automatically", color: "text-purple-400" },
                { icon: CheckCircle, label: "Confirm the task", desc: "Review the extracted data and confirm or cancel", color: "text-emerald-400" },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 shrink-0 ${step.color}`}>
                    <step.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{step.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-600 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Example Commands */}
          <div className="rounded-3xl border border-gray-200 dark:border-gray-200 dark:border-white/5 bg-white dark:bg-white dark:bg-[#141A29] border-gray-200 dark:border-gray-200 dark:border-white/5 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-violet-400" />
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Try These Commands</h4>
            </div>
            <div className="space-y-2">
              {EXAMPLE_COMMANDS.map((cmd, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 rounded-2xl border border-gray-200 dark:border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-gray-50 dark:bg-[#0B0F19] px-3 py-2.5 cursor-default hover:border-violet-500/20 hover:bg-violet-500/5 transition-all duration-200"
                >
                  <span className="text-sm shrink-0">{cmd.icon}</span>
                  <p className="text-xs text-gray-300 leading-relaxed">"{cmd.text}"</p>
                </motion.div>
              ))}
            </div>

            {/* Supported actions */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-200 dark:border-white/5">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-600 mb-2">Supported Actions</p>
              <div className="flex flex-wrap gap-1.5">
                {["create", "complete", "delete", "delay", "remind"].map((action) => (
                  <span key={action} className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-400">
                    {action}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Supported date formats */}
          <div className="rounded-3xl border border-gray-200 dark:border-gray-200 dark:border-white/5 bg-white dark:bg-white dark:bg-[#141A29] border-gray-200 dark:border-gray-200 dark:border-white/5 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-violet-400" />
              <h4 className="text-xs font-bold text-gray-900 dark:text-gray-900 dark:text-white uppercase tracking-wider">Recognized Date Phrases</h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["today", "tomorrow", "next week", "monday", "friday", "next monday", "this friday"].map((d) => (
                <span key={d} className="text-[10px] font-mono px-2 py-0.5 rounded-lg border border-gray-200 dark:border-gray-200 dark:border-white/5 bg-white/5 text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  {d}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}



