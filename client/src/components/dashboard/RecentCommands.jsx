import { Activity } from "lucide-react";

export default function RecentCommands({ commands }) {
  return (
    <div className="space-y-4 rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#141A29] border-gray-200 dark:border-white/5 p-5 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white">Recent Voice Activity</h4>
        <Activity className="h-4 w-4 text-purple-500" />
      </div>

      <div className="space-y-3.5">
        {commands.map((command, index) => (
          <div
            key={`${command.text}-${index}`}
            className="flex flex-col gap-1 rounded-xl border border-gray-200 dark:border-white/5 p-3 bg-gray-50 dark:bg-[#0B0F19]"
          >
            <p className="break-all font-mono text-xs leading-normal text-gray-500 dark:text-gray-400">
              "{command.text}"
            </p>
            <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-gray-400 dark:text-gray-600">
              <span>{command.time}</span>
              <span className={command.success ? "text-violet-500" : "text-red-500"}>
                {command.success ? "SUCCESS" : "FAILED"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

