import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import DashboardTasks from "./DashboardTasks";
import VoicePromptsCard from "./VoicePromptsCard";
import RecentCommands from "./RecentCommands";
import ProductivityChart from "./ProductivityChart";
import DashboardScenePlaceholder from "./DashboardScenePlaceholder";

export default function DashboardOverview({
  userName,
  tasks,
  isLoadingTasks,
  recentCommands,
  onOpenVoice,
  onOpenTaskModal,
  onTaskComplete,
  onTaskEdit,
  onTaskDelete,
}) {
  return (
    <div className="space-y-8">
      <DashboardHeader
        userName={userName}
        onOpenVoice={onOpenVoice}
        onOpenTaskModal={onOpenTaskModal}
      />

      <DashboardStats tasks={tasks} />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <DashboardTasks
            tasks={tasks}
            isLoadingTasks={isLoadingTasks}
            onAddTask={onOpenTaskModal}
            onComplete={onTaskComplete}
            onEdit={onTaskEdit}
            onDelete={onTaskDelete}
            showCompletedSection
            gridClassName="grid-cols-1 sm:grid-cols-2"
          />
        </div>

        <div className="space-y-8 lg:col-span-4">
          <VoicePromptsCard onOpenVoice={onOpenVoice} />
          <RecentCommands commands={recentCommands} />
        </div>
      </div>

      <ProductivityChart tasks={tasks} />
      <DashboardScenePlaceholder />
    </div>
  );
}
