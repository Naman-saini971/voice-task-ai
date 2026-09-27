import { useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, Edit3, Trash2, Volume2 } from "lucide-react";

const priorityStyles = {
  high: {
    bg: "bg-red-500/10 border-red-500/30 text-red-400",
    dot: "bg-red-400",
    label: "High Priority",
  },
  medium: {
    bg: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    dot: "bg-purple-400",
    label: "Medium Priority",
  },
  low: {
    bg: "bg-violet-500/10 border-violet-500/30 text-violet-400",
    dot: "bg-violet-400",
    label: "Low Priority",
  },
};
const delayedStyle = {
  bg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  dot: "bg-amber-400",
  label: "Delayed",
};

const formatDueDate = (value) => {
  if (!value) return "No deadline";
  const rawValue = String(value);
  const parsedDate = new Date(rawValue);
  if (Number.isNaN(parsedDate.getTime())) return rawValue;
  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: parsedDate.getFullYear() === new Date().getFullYear() ? undefined : "numeric",
  });
};

export default function TaskCard({ task, onComplete, onEdit, onDelete }) {
  const cardRef = useRef(null);

  const {
    title,
    description,
    priority,
    dueDate,
    completed,
    voiceCommand,
    status,
    delayedUntil,
  } = task;

  const currentPriority = priorityStyles[priority?.toLowerCase()] ?? priorityStyles.low;
  const displayDescription = description || "No description provided yet.";

  // 3D tilt on mouse move
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.boxShadow = `0 20px 40px rgba(139,92,246,0.12), 0 0 20px rgba(139,92,246,0.06)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    card.style.boxShadow = "none";
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      onMouseMove={completed ? undefined : handleMouseMove}
      onMouseLeave={completed ? undefined : handleMouseLeave}
      className={`relative rounded-2xl border bg-white dark:bg-[#141A29] border-gray-200 dark:border-white/5 p-4 sm:p-5 transition-all duration-200 transition-colors duration-200 ${
        completed ? "opacity-60" : "hover:border-violet-500/30"
      }`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {/* Subtle inner glow on hover */}
      {!completed && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}

      <div className="mb-4 flex items-center justify-between gap-3">
        <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${currentPriority.bg}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${currentPriority.dot}`} />
          {currentPriority.label}
        </div>

        {voiceCommand && (
          <div className="inline-flex items-center gap-1 rounded-md border border-violet-500/20 bg-[#0B0F19] px-2 py-1 font-mono text-[10px] text-violet-400">
            <Volume2 className="h-3.5 w-3.5" />
            <span>Voice</span>
          </div>
        )}

        {status === "delayed" && (
          <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${delayedStyle.bg}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${delayedStyle.dot}`} />
            {delayedStyle.label}
            {delayedUntil ? ` · ${formatDueDate(delayedUntil)}` : ""}
          </div>
        )}
      </div>

      <div className="mb-4">
        <h3 className={`mb-1.5 text-base font-bold tracking-tight text-gray-900 dark:text-white ${completed ? "line-through text-gray-400 dark:text-gray-600" : ""}`}>
          {title}
        </h3>
        <p className={`text-sm leading-relaxed text-gray-500 dark:text-gray-400 ${completed ? "line-through" : ""}`}>
          {displayDescription}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-gray-500" />
          <span className="font-mono text-gray-400">{formatDueDate(dueDate)}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onComplete?.(task)}
            className={`rounded-lg p-1.5 transition-colors duration-300 hover:bg-white/5 ${
              completed ? "text-violet-400" : "text-gray-500 hover:text-violet-400"
            }`}
            title={completed ? "Mark Incomplete" : "Mark Complete"}
          >
            <CheckCircle className="h-4.5 w-4.5" />
          </button>

          <button
            onClick={() => onEdit?.(task)}
            className="rounded-lg p-1.5 text-gray-500 transition-colors duration-300 hover:bg-white/5 hover:text-purple-400"
            title="Edit Task"
          >
            <Edit3 className="h-4.5 w-4.5" />
          </button>

          <button
            onClick={() => onDelete?.(task)}
            className="rounded-lg p-1.5 text-gray-500 transition-colors duration-300 hover:bg-white/5 hover:text-red-400"
            title="Delete Task"
          >
            <Trash2 className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

