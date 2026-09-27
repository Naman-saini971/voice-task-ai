import {
  CheckCircle,
  Mic,
  AlertTriangle,
} from "lucide-react";

import AnalyticsCard from "./AnalyticsCard";

export default function DashboardStats({ tasks }) {
  const completedCount = tasks.filter((task) => task.completed).length;

  const voiceTaskCount = tasks.filter((task) => task.voiceCommand).length;

  const manualTaskCount = tasks.length - voiceTaskCount;

  const highPriorityCount = tasks.filter(
    (task) => task.priority === "high"
  ).length;

  const dueTodayCount = tasks.filter((task) => {
    if (!task.dueDate) return false;

    const today = new Date();

    const due = new Date(task.dueDate);

    return (
      due.getDate() === today.getDate() &&
      due.getMonth() === today.getMonth() &&
      due.getFullYear() === today.getFullYear()
    );
  }).length;

  const completionRate =
    tasks.length > 0
      ? Math.round((completedCount / tasks.length) * 100)
      : 0;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
      <AnalyticsCard
        title="Completed Tasks"
        value={completedCount.toString()}
        subtext="Action items completed"
        accent="emerald"
        icon={CheckCircle}
      />

      <AnalyticsCard
        title="Voice Tasks"
        value={voiceTaskCount.toString()}
        subtext={`${manualTaskCount} manual tasks`}
        accent="purple"
        icon={Mic}
      />

      <AnalyticsCard
        title="Today's Progress"
        value={`${completionRate}%`}
        subtext="Overall completion rate"
        accent="violet"
        progress={completionRate}
      />

      <AnalyticsCard
        title="High Priority"
        value={highPriorityCount.toString()}
        subtext={`${dueTodayCount} due today`}
        accent="amber"
        icon={AlertTriangle}
        trend={{
          value:
            highPriorityCount > 0
              ? "Needs attention"
              : "All caught up",
          isPositive: highPriorityCount === 0,
        }}
      />
    </div>
  );
}

