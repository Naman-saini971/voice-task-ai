import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/useTheme";

const ToggleSwitch = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${checked ? "bg-violet-500" : "bg-gray-300 dark:bg-white/10"
      }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${checked ? "translate-x-6" : "translate-x-1"
        }`}
    />
  </button>
);

export default function DashboardSettingsView({
  icon: Icon,
  title,
  description,
  speechRate = 1,
  onSpeechRateChange,
}) {
  const { isDark, toggleTheme } = useTheme();
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [defaultPriority, setDefaultPriority] = useState("medium");
  const [notifications, setNotifications] = useState(true);

  const sectionClass =
    "space-y-4 rounded-3xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#141A29] p-6 transition-all duration-300 hover:border-violet-300 dark:hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/10";
  const labelClass =
    "text-[15px] font-semibold text-gray-900 dark:text-white";
  const sublabelClass =
    "mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400";
  const headerClass =
    "text-xs font-bold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400"; const rowClass = "flex items-center justify-between border-t border-gray-200 dark:border-white/5 pt-4";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="space-y-1 text-center">
        {Icon && <Icon className="mx-auto h-10 w-10 text-violet-400" />}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className={`text-sm ${sublabelClass}`}>{description}</p>
      </div>

      {/* Voice Preferences */}
      <div className={sectionClass}>
        <h4 className={`${headerClass} mb-1`}>
          Voice Preferences
        </h4>
        <div className={rowClass}>
          <div>
            <p className={labelClass}>Voice Enabled</p>
            <p className={sublabelClass}>Allow microphone-based commands</p>
          </div>
          <ToggleSwitch checked={voiceEnabled} onChange={setVoiceEnabled} />
        </div>

        <div className={rowClass}>
          <div>
            <p className={labelClass}>Speech Rate</p>
            <p className={sublabelClass}>How fast the assistant speaks back</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speechRate}
              onChange={(e) => onSpeechRateChange?.(Number(e.target.value))}
              className="w-32 accent-violet-500"
            />
            <span className="w-10 text-right font-mono text-xs text-violet-500">
              {speechRate.toFixed(1)}x
            </span>
          </div>
        </div>
      </div>

      {/* Task Defaults */}
      <div className={sectionClass}>
        <h4 className={headerClass}>Task Defaults</h4>

        <div className={rowClass}>
          <div>
            <p className={labelClass}>Default Priority</p>
            <p className={sublabelClass}>Used when a command doesn't specify one</p>
          </div>
          <select
            value={defaultPriority}
            onChange={(e) => setDefaultPriority(e.target.value)}
            className="rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#0B0F19] text-gray-900 dark:text-white px-3 py-1.5 text-xs font-bold uppercase focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            style={{
              backgroundColor: "var(--bg-input)",
              color: "var(--text-primary)",
              borderColor: "var(--border)",
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Appearance */}
      <div className={sectionClass}>
        <h4 className={headerClass}>Appearance &amp; Notifications</h4>

        {/* Dark Mode Toggle — wired to ThemeContext */}
        <div className={rowClass}>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20">
              {isDark ? (
                <Moon className="h-4 w-4 text-violet-400" />
              ) : (
                <Sun className="h-4 w-4 text-yellow-500" />
              )}
            </div>
            <div>
              <p className={labelClass}>
                {isDark ? "Dark Mode" : "Light Mode"}
              </p>
              <p className={sublabelClass}>
                {isDark ? "Switch to light theme" : "Switch to dark theme"}
              </p>
            </div>
          </div>
          <ToggleSwitch checked={isDark} onChange={toggleTheme} />
        </div>

        <div className={rowClass}>
          <div>
            <p className={labelClass}>Notifications</p>
            <p className={sublabelClass}>Get notified about upcoming due dates</p>
          </div>
          <ToggleSwitch checked={notifications} onChange={setNotifications} />
        </div>
      </div>
    </div>
  );
}

