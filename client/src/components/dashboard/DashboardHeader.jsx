import { motion } from "framer-motion";
import { Mic, Plus } from "lucide-react";

import Button from "../common/Button";

const getGreetingName = (userName) => {

  if (!userName) {
    return "Alex";
  }

  return userName.split(" ")[0];
};
const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

const getCurrentDate = () => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};

export default function DashboardHeader({
  userName,
  onOpenVoice,
  onOpenTaskModal,
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
      <div>
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-900 dark:text-white md:text-3xl"
        >
          {getGreeting()}, {getGreetingName(userName)}
        </motion.h2>
        <div className="mt-2 space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
            {getCurrentDate()}
          </p>
          <div className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-500">
            ⚡ Voice Assistant Ready
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          size="md"
          icon={Plus}
          onClick={onOpenTaskModal}
        >
          Add Task
        </Button>
        <Button
          variant="primary"
          size="md"
          icon={Mic}
          onClick={onOpenVoice}
          className="shadow-[0_0_15px_rgba(139,92,246,0.25)]"
        >
          Start Recording
        </Button>
      </div>
    </div>
  );
}


