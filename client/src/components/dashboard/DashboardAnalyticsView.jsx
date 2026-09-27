import { motion } from "framer-motion";
import AnalyticsCard from "./AnalyticsCard";
import ProductivityChart from "./ProductivityChart";

const getOnTimeCount = (tasks) =>
  tasks.filter((task) => {
    if (!task.completed || !task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    const completedAt = new Date(task.updatedAt ?? task.dueDate);
    return !Number.isNaN(dueDate.getTime()) && completedAt <= dueDate;
  }).length;

const getDelayedCount = (tasks) =>
  tasks.filter((task) => task.status === "delayed").length;

// Mini bar chart for priority breakdown
function PriorityBreakdown({ tasks }) {
  const high = tasks.filter((t) => t.priority === "high").length;
  const medium = tasks.filter((t) => t.priority === "medium").length;
  const low = tasks.filter((t) => t.priority === "low").length;
  const total = tasks.length || 1;

  const bars = [
    { label: "High", count: high, color: "bg-red-400", pct: Math.round((high / total) * 100) },
    { label: "Medium", count: medium, color: "bg-purple-400", pct: Math.round((medium / total) * 100) },
    { label: "Low", count: low, color: "bg-violet-400", pct: Math.round((low / total) * 100) },
  ];

  return (
    <div className="rounded-3xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#141A29] p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-gray-900 dark:text-white">Priority Breakdown</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Distribution across all tasks</p>
        </div>
        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 px-2 py-1 rounded-lg">
          {tasks.length} total
        </span>
      </div>

      <div className="space-y-4">
        {bars.map((bar) => (
          <div key={bar.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400 font-medium">{bar.label}</span>
              <span className="font-mono text-gray-500 dark:text-gray-400">{bar.count} tasks · {bar.pct}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${bar.pct}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${bar.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Task status donut chart using SVG
function StatusDonut({ tasks }) {
  const completed = tasks.filter((t) => t.completed).length;
  const delayed = tasks.filter((t) => t.status === "delayed").length;
  const pending = tasks.filter((t) => !t.completed && t.status !== "delayed").length;
  const total = tasks.length || 1;

  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  const segments = [
    { label: "Completed", count: completed, color: "#10B981", stroke: "#10B981" },
    { label: "Delayed", count: delayed, color: "#F59E0B", stroke: "#F59E0B" },
    { label: "Pending", count: pending, color: "#8B5CF6", stroke: "#8B5CF6" },
  ];

  let offset = 0;

  return (
    <div className="rounded-3xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#141A29] p-6 space-y-5">
      <div>
        <h4 className="text-base font-bold text-gray-900 dark:text-white">Task Status Overview</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Visual breakdown by status</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Donut — larger */}
        <div className="relative shrink-0">
          <svg width="120" height="120" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="#e5e7eb" className="dark:stroke-[#1E293B]" strokeWidth="10" />
            {segments.map((seg, i) => {
              const pct = seg.count / total;
              const dash = pct * circumference;
              const gap = circumference - dash;
              const currentOffset = circumference * (1 - offset) - circumference * 0.25;
              offset += pct;
              return (
                <motion.circle
                  key={seg.label}
                  cx="50" cy="50" r={radius}
                  fill="none"
                  stroke={seg.stroke}
                  strokeWidth="10"
                  strokeDasharray={`${dash} ${gap}`}
                  strokeDashoffset={currentOffset}
                  strokeLinecap="round"
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray: `${dash} ${gap}` }}
                  transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
                />
              );
            })}
            <text x="50" y="47" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#111827" className="dark:fill-white" fontFamily="monospace">
              {Math.round((completed / total) * 100)}%
            </text>
            <text x="50" y="59" textAnchor="middle" fontSize="7" fill="#6B7280" fontFamily="monospace">
              DONE
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-3 flex-1">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ background: seg.color }} />
                <span className="text-sm text-gray-600 dark:text-gray-400">{seg.label}</span>
              </div>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{seg.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardAnalyticsView({ tasks }) {
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  const onTimeCount = getOnTimeCount(tasks);
  const delayedCount = getDelayedCount(tasks);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Advanced Insights</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">Real-time analytics computed from your task data</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          title="Completion Ratio"
          value={`${completionRate}%`}
          subtext={`${completedCount} of ${tasks.length} tasks finished`}
          accent="emerald"
          progress={completionRate}
        />
        <AnalyticsCard
          title="Completed On Time"
          value={onTimeCount.toString()}
          subtext="Tasks finished before their due date"
          accent="purple"
        />
        <AnalyticsCard
          title="Pending Tasks"
          value={pendingCount.toString()}
          subtext="Tasks still in progress"
          accent="violet"
        />
        <AnalyticsCard
          title="Delayed Tasks"
          value={delayedCount.toString()}
          subtext="Tasks postponed from their original date"
          accent="danger"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StatusDonut tasks={tasks} />
        <PriorityBreakdown tasks={tasks} />
      </div>

      {/* Productivity Chart */}
      <ProductivityChart tasks={tasks} />
    </div>
  );
}



