import { useState, useEffect } from "react";
import { ListTodo, Mic } from "lucide-react";
import Button from "../common/Button";
import TaskCard from "./TaskCard";

const VOICE_EXAMPLES = [
  "Create task submit the report by tomorrow, high priority",
  "Remind me to call the client on Friday",
  "Add task review the presentation by next Monday",
  "Create urgent task fix the bug before 5pm today",
  "Remind me to send the invoice by end of week",
];

function EmptyTasksState() {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let timeout;

    const current = VOICE_EXAMPLES[exampleIndex];
    let charIndex = 0;

    const type = () => {
      setTypedText(current.slice(0, charIndex));
      charIndex++;

      if (charIndex <= current.length) {
        timeout = setTimeout(type, 45);
      } else {
        timeout = setTimeout(() => {
          setExampleIndex((prev) => (prev + 1) % VOICE_EXAMPLES.length);
        }, 1800);
      }
    };

    timeout = setTimeout(type, 150);

    return () => clearTimeout(timeout);
  }, [exampleIndex]);

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/5 p-10 text-center bg-white dark:bg-[#141A29] transition-colors duration-200">
      <div className="mb-4 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/10">
          <Mic className="h-7 w-7 text-violet-500" />
        </div>
      </div>

      <p className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
        No tasks yet
      </p>

      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Try saying something like:
      </p>

      <div className="mx-auto max-w-md rounded-xl border border-violet-500/20 bg-violet-500/5 px-5 py-3 min-h-[72px] flex items-center justify-center">
        <p className="text-sm italic text-violet-600 dark:text-violet-400 text-center leading-relaxed">
          "{typedText}"
          <span className="animate-pulse text-violet-500">|</span>
        </p>
      </div>
    </div>
  );
}

export default function DashboardTasks({
  title,
  description,
  tasks,
  isLoadingTasks,
  onAddTask,
  onComplete,
  onEdit,
  onDelete,
  showAddButton = false,
  showCompletedSection = false,
  gridClassName = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
}) {
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  const showHeader = Boolean(title || description || showAddButton);

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="flex items-start justify-between gap-4">          <div>
          {title && (
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">{description}</p>
          )}
        </div>

          {showAddButton && (
           <Button
  variant="primary"
  size="md"
  onClick={onAddTask}
  className="mt-1 whitespace-nowrap px-5 py-3 font-semibold self-start"
>
  + Add Task
</Button>
          )}
        </div>
      )}

      <div className="space-y-4">
        {/* Active Queue Header */}
        <div className="flex items-center justify-between rounded-2xl border border-violet-400/30 bg-gradient-to-r from-violet-500/20 to-purple-500/10 dark:from-violet-500/15 dark:to-purple-500/10 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500 shadow-md shadow-violet-500/30">
              <ListTodo className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Active Queue</h3>
              <p className="text-[10px] text-violet-600 dark:text-violet-300 font-medium">Your pending tasks</p>
            </div>
            {pendingTasks.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-[10px] font-bold text-white">
                {pendingTasks.length}
              </span>
            )}
          </div>
          <span className="text-xs font-bold text-violet-600 dark:text-violet-300 bg-violet-100 dark:bg-violet-500/20 px-2.5 py-1 rounded-full border border-violet-300 dark:border-violet-500/30">
            {pendingTasks.length} Pending
          </span>
        </div>

        {isLoadingTasks ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-200 dark:border-white/5 bg-white dark:bg-white dark:bg-[#141A29] border-gray-200 dark:border-gray-200 dark:border-white/5 p-5 space-y-3 animate-pulse">
                <div className="h-4 w-3/4 rounded bg-white/10" />
                <div className="h-3 w-1/2 rounded bg-white/5" />
                <div className="h-3 w-1/3 rounded bg-white/5" />
              </div>
            ))}
          </div>
        ) : pendingTasks.length > 0 ? (
          <div className={`grid gap-6 ${gridClassName}`}>
            {pendingTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onComplete={onComplete}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        ) : (
          <EmptyTasksState />
        )}
      </div>

      {showCompletedSection && completedTasks.length > 0 && (
        <div className="space-y-4 pt-4">
          <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-600">
            Completed Tasks ({completedTasks.length})
          </p>

          <div className={`grid gap-6 opacity-60 ${gridClassName}`}>
            {completedTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onComplete={onComplete}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



