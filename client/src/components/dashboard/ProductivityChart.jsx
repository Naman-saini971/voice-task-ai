import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const getWeeklyData = (tasks) => {
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const completedCount = tasks.filter((task) => {
      if (!task.completed || !task.updatedAt) {
        return false;
      }

      const completedDate = new Date(task.updatedAt);
      return (
        completedDate.getFullYear() === date.getFullYear() &&
        completedDate.getMonth() === date.getMonth() &&
        completedDate.getDate() === date.getDate()
      );
    }).length;

    days.push({
      day: dayLabels[date.getDay()],
      value: completedCount,
    });
  }

  return days;
};

export default function ProductivityChart({ tasks = [] }) {
  const weeklyData = getWeeklyData(tasks);
  return (
    <div className="space-y-6 rounded-3xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#141A29] border-gray-200 dark:border-white/5 p-6 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-gray-900 dark:text-white">
            Weekly Productivity Graph
          </h4>
          <p className="text-xs text-gray-400 dark:text-gray-600">
            Output trends and task completion indices.
          </p>
        </div>
        <TrendingUp className="h-5 w-5 text-violet-400" />
      </div>

      <div className="relative flex h-48 w-full flex-col justify-between rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#0B0F19] p-4">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-4 py-6 opacity-20">
          <div className="h-px bg-white" />
          <div className="h-px bg-white" />
          <div className="h-px bg-white" />
          <div className="h-px bg-white" />
        </div>

        <div className="relative z-10 flex h-full w-full items-end justify-between px-4 pb-2 pt-4">
          {weeklyData.map((data, index) => (
            <div
              key={data.day}
              className="group flex cursor-pointer flex-col items-center gap-2"
            >
              <span className="font-mono text-[10px] text-violet-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {data.value} {data.value === 1 ? "task" : "tasks"}
              </span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${Math.min(data.value * 20, 160)}px` }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="w-8 rounded-t-lg bg-gradient-to-t from-purple-500/20 to-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.15)] transition-all duration-300 group-hover:to-violet-300 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              />
              <span className="font-mono text-[10px] font-bold uppercase text-gray-400 dark:text-gray-600">
                {data.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

