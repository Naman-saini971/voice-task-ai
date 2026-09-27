import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Settings } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import CreateTaskModal from "../components/dashboard/CreateTaskModal";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import VoiceAssistantPanel from "../components/dashboard/VoiceAssistantPanel";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import DashboardTasks from "../components/dashboard/DashboardTasks";
import DashboardAnalyticsView from "../components/dashboard/DashboardAnalyticsView";
import DashboardVoiceView from "../components/dashboard/DashboardVoiceView";
import DashboardSettingsView from "../components/dashboard/DashboardSettingsView";
import api from "../services/api";
import { useAuth } from "../context/useAuth";

const showTaskAddedToast = () => {
  toast.success("Added to Active Queue", {
    duration: 1800,
    icon: "✨",
    style: {
      background: "#141A29",
      color: "#fff",
      border: "1px solid rgba(139,92,246,0.18)",
      borderRadius: "12px",
      padding: "8px 12px",
      fontSize: "13px",
      fontWeight: "600",
      minHeight: "44px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.22)",
    },
  });
};

const normalizeTask = (task) => ({
  _id: task._id ?? task.id ?? crypto.randomUUID(),
  title: task.title ?? "Untitled task",
  description: task.description ?? "No description provided yet.",
  priority: task.priority ?? "medium",
  dueDate: task.dueDate ?? null,
  completed: Boolean(task.completed),
  status: task.status ?? "active",
  delayedUntil: task.delayedUntil ?? null,
  updatedAt: task.updatedAt ?? null,
  voiceCommand: Boolean(task.voiceCommand),
});

const buildTaskPayload = (task, completed = task.completed) => ({
  title: task.title,
  description: task.description ?? "",
  priority: task.priority ?? "medium",
  dueDate: task.dueDate ?? null,
  completed,
});

const speak = (message, rate = 1) => {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(message);
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
};

const parseVoiceCommand = (text) => {
  const original = text.trim();
  const lower = original.toLowerCase();

  // -----------------------------
  // Detect action
  // -----------------------------
  let action = "create";

  if (
    lower.startsWith("complete") ||
    lower.startsWith("mark")
  ) {
    action = "complete";
  } else if (
    lower.startsWith("delete") ||
    lower.startsWith("remove")
  ) {
    action = "delete";
  } else if (
    lower.startsWith("delay") ||
    lower.startsWith("postpone")
  ) {
    action = "delay";
  }

  // -----------------------------
  // Priority
  // -----------------------------
  let priority = "medium";

  if (lower.includes("high priority") || lower.includes("urgent")) {
    priority = "high";
  } else if (lower.includes("low priority")) {
    priority = "low";
  }

  // -----------------------------
  // Due Date
  // -----------------------------
  let dueDate = null;
  let dueLabel = "None";

  const now = new Date();

  const weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  // Today
  if (lower.includes("today")) {
    dueDate = new Date(now).toISOString();
    dueLabel = "Today";
  }

  // Tomorrow
  else if (lower.includes("tomorrow")) {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    dueDate = tomorrow.toISOString();
    dueLabel = "Tomorrow";
  }

  // Next Week
  else if (lower.includes("next week")) {
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);

    dueDate = nextWeek.toISOString();
    dueLabel = "Next Week";
  }

  // Weekdays
  else {
    for (let i = 0; i < weekdays.length; i++) {
      const day = weekdays[i];

      if (lower.includes(`next ${day}`) || lower.includes(day)) {
        const target = new Date(now);

        let diff = i - target.getDay();

        if (diff <= 0) diff += 7;

        if (lower.includes(`next ${day}`)) {
          diff += 7;
        }

        target.setDate(target.getDate() + diff);

        dueDate = target.toISOString();
        dueLabel =
          lower.includes(`next ${day}`)
            ? `Next ${day.charAt(0).toUpperCase()}${day.slice(1)}`
            : day.charAt(0).toUpperCase() + day.slice(1);

        break;
      }
    }
  }

  // -----------------------------
  // Clean Title
  // -----------------------------
  let title = lower;

  const removeWords = [
    "create task",
    "create",
    "task",
    "complete",
    "mark",
    "delete",
    "remove",
    "delay",
    "postpone",
    "until",
    "to",
    "remind me to",
    "i need to",
    "please",
    "can you",
    "today",
    "tomorrow",
    "high priority",
    "medium priority",
    "low priority",
    "urgent"
  ];
  removeWords.forEach(word => {
    title = title.replace(word, "");
  });

  title = title.replace(/\s+/g, " ").trim();

  // Capitalize nicely
  title = title
    .split(" ")
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  return {
    action,
    title,
    priority,
    dueDate,
    preview: `🎯 Action: ${action.toUpperCase()}

📌 Title: ${title || "-"}

🔥 Priority: ${priority.toUpperCase()}

📅 Due: ${dueLabel}`,
  };
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [voicePanelOpen, setVoicePanelOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isTaskSubmitting, setIsTaskSubmitting] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [parsedCommand, setParsedCommand] = useState(null);
  const [speechRate, setSpeechRate] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredTasks = tasks.filter((task) => {
    const query = searchQuery.toLowerCase();

    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.priority.toLowerCase().includes(query)
    );
  });
  const [voiceHistory, setVoiceHistory] = useState([]);

  useEffect(() => {
    if (!user) return;

    let isCurrent = true;
    const fetchTasks = async () => {
      try {
        setIsLoadingTasks(true);
        const res = await api.get("/tasks");
        if (!isCurrent) return;

        if (res.data.success) {
          setTasks((res.data.tasks ?? []).map(normalizeTask));
        } else {
          setTasks([]);
          toast.error("Could not load tasks.");
        }
      } catch (err) {
        if (!isCurrent) return;
        console.error("Failed to fetch tasks:", err);
        setTasks([]);
        toast.error("Failed to fetch tasks.");
      } finally {
        if (isCurrent) setIsLoadingTasks(false);
      }
    };

    fetchTasks();

    return () => {
      isCurrent = false;
    };
  }, [user]); // Refetch tasks when user changes

  const createTask = async ({
    title,
    description,
    priority = "medium",
    dueDate = null,
    voiceCommand = false,
  }) => {
    try {
      const res = await api.post("/tasks", {
        title,
        description,
        priority,
        dueDate,
      });

      if (res.data.success) {
        const createdTask = normalizeTask({
          ...res.data.task,
          description,
          voiceCommand,
        });

        setTasks((currentTasks) => [createdTask, ...currentTasks]);
        return true;
      }
    } catch (err) {
      console.error("Failed to create task:", err);
      toast.error(
        err.response?.data?.message || "Failed to create task."
      );
    }

    return false;
  };

  const handleTaskModalClose = () => {
    if (isTaskSubmitting) {
      return;
    }

    setTaskModalOpen(false);
  };

  const handleManualTaskAdd = () => {
    setEditingTask(null);
    setTaskModalOpen(true);
  };

  const handleTaskCreate = async (taskData) => {
    if (!taskData.title) {
      toast.error("Task title is required.");
      return;
    }

    setIsTaskSubmitting(true);

    let success = false;

    if (editingTask) {
      try {
        const res = await api.put(`/tasks/${editingTask._id}`, {
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority,
          dueDate: taskData.dueDate,
          completed: editingTask.completed,
        });

        if (res.data.success) {
          setTasks((currentTasks) =>
            currentTasks.map((task) =>
              task._id === editingTask._id
                ? normalizeTask({
                  ...task,
                  ...res.data.task,
                  voiceCommand: task.voiceCommand,
                })
                : task
            )
          );

          toast.success("Task updated successfully.");
          success = true;
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to update task.");
      }
    } else {
      success = await createTask({
        ...taskData,
        voiceCommand: false,
      });

      if (success) {
        showTaskAddedToast();
      }
    }

    if (success) {
      setEditingTask(null);
      setTaskModalOpen(false);
    }

    setIsTaskSubmitting(false);
  };

  const handleTaskComplete = async (taskToToggle) => {
    const nextCompleted = !taskToToggle.completed;

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task._id === taskToToggle._id
          ? { ...task, completed: nextCompleted }
          : task
      )
    );

    try {
      const res = await api.put(
        `/tasks/${taskToToggle._id}`,
        buildTaskPayload(taskToToggle, nextCompleted)
      );

      if (res.data.success) {
        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task._id === taskToToggle._id
              ? normalizeTask({
                ...task,
                ...res.data.task,
                voiceCommand: task.voiceCommand,
              })
              : task
          )
        );
      }
    } catch (err) {
      console.error("Failed to update task:", err);
      toast.error("Failed to update task.");

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === taskToToggle._id
            ? { ...task, completed: taskToToggle.completed }
            : task
        )
      );
    }
  };

  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  const handleTaskDelete = async (taskToDelete) => {
    const previousTasks = tasks;

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task._id !== taskToDelete._id)
    );

    try {
      await api.delete(`/tasks/${taskToDelete._id}`);
      toast.success("Task deleted successfully.");
    } catch (err) {
      console.error("Failed to delete task:", err);
      setTasks(previousTasks);
      toast.error("Failed to delete task.");
    }
  };

  const handleMicToggle = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    setTranscript("");
    setAiResponse("");
    setIsListening(true);

    let finalTranscript = "";

    recognition.onresult = (event) => {
      let speech = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        speech += event.results[i][0].transcript;
      }

      finalTranscript = speech;

      setTranscript(speech);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Voice recognition failed.");
    };

    recognition.onend = () => {
      setIsListening(false);

      if (!finalTranscript.trim()) return;

      const parsed = parseVoiceCommand(finalTranscript);

      setTranscript(finalTranscript);
      setAiResponse(parsed.preview);
      setParsedCommand(parsed);
    };

    recognition.start();
  };

  // Fuzzy task matcher — finds best match by word overlap score
  const findBestMatchingTask = (spokenTitle) => {
    const stopWords = new Set(["a", "an", "the", "my", "to", "from", "for", "and", "or", "of", "in", "on", "at", "by", "is", "it", "be", "as"]);
    const spokenWords = spokenTitle
      .toLowerCase()
      .split(" ")
      .filter((w) => w.length > 2 && !stopWords.has(w));

    let bestTask = null;
    let bestScore = 0;

    tasks.filter((t) => !t.completed).forEach((t) => {
      const titleWords = t.title
        .toLowerCase()
        .split(" ")
        .filter((w) => w.length > 2 && !stopWords.has(w));

      const matchCount = spokenWords.filter((sw) =>
        titleWords.some((tw) => tw.includes(sw) || sw.includes(tw))
      ).length;

      const score = spokenWords.length > 0 ? matchCount / spokenWords.length : 0;

      if (score > bestScore) {
        bestScore = score;
        bestTask = t;
      }
    });

    // Require at least 30% word match
    return bestScore >= 0.3 ? bestTask : null;
  };

  const handleConfirmTask = async () => {
    if (!transcript.trim()) {
      toast.error("Please speak a command first.");
      return;
    }

    const parsed = parseVoiceCommand(transcript);

    // Voice Complete
    if (parsed.action === "complete") {
      const task = findBestMatchingTask(parsed.title);

      if (!task) {
        toast.error(`Couldn't find a task matching "${parsed.title}".`);
        speak(`I couldn't find a task called ${parsed.title}.`);
        return;
      }

      await handleTaskComplete(task);

      setVoiceHistory((prev) => [
        {
          text: transcript,
          time: "Just now",
          success: true,
        },
        ...prev,
      ]);

      toast.success("Task completed successfully!");
      speak(`${task.title} marked as completed.`);
      handleCancelVoice();
      return;
    }

    // Voice Delete
    if (parsed.action === "delete") {
      const task = findBestMatchingTask(parsed.title);

      if (!task) {
        toast.error(`Couldn't find a task matching "${parsed.title}".`);
        speak(`I couldn't find a task called ${parsed.title}.`);
        return;
      }

      await handleTaskDelete(task);

      setVoiceHistory((prev) => [
        {
          text: transcript,
          time: "Just now",
          success: true,
        },
        ...prev,
      ]);

      toast.success("Task deleted successfully!");
      speak(`${task.title} deleted successfully.`);
      handleCancelVoice();
      return;
    }
    // Voice Delay
    if (parsed.action === "delay") {
      const task = findBestMatchingTask(parsed.title);

      if (!task) {
        toast.error(`Couldn't find a task matching "${parsed.title}".`);
        speak(`I couldn't find a task called ${parsed.title}.`);
        return;
      }

      try {
        const res = await api.put(`/tasks/${task._id}`, {
          ...buildTaskPayload(task),
          status: "delayed",
          delayedUntil: parsed.dueDate,
        });

        if (res.data.success) {
          setTasks((currentTasks) =>
            currentTasks.map((t) =>
              t._id === task._id
                ? normalizeTask({
                  ...t,
                  ...res.data.task,
                  voiceCommand: t.voiceCommand,
                })
                : t
            )
          );
        }
      } catch (err) {
        console.error("Failed to delay task:", err);
        toast.error("Failed to delay task.");
        return;
      }

      setVoiceHistory((prev) => [
        {
          text: transcript,
          time: "Just now",
          success: true,
        },
        ...prev,
      ]);

      toast.success("Task delayed successfully!");
      speak(`${task.title} has been delayed.`);
      handleCancelVoice();
      return;
    }
    // Existing Create Task
    const created = await createTask({
      title: parsed.title,
      description: "Created using Voice Assistant",
      priority: parsed.priority,
      dueDate: parsed.dueDate,
      voiceCommand: true,
    });

    if (created) {
      setVoiceHistory((prev) => [
        {
          text: transcript,
          time: "Just now",
          success: true,
        },
        ...prev,
      ]);

showTaskAddedToast();
      speak(`${parsed.title} created successfully.`);
      handleCancelVoice();
    }
  };
  const handleCancelVoice = () => {
    setIsListening(false);
    setTranscript("");
    setAiResponse("");
    setParsedCommand(null);
    setVoicePanelOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const renderContentView = () => {
    switch (activeTab) {
      case "tasks":
        return (
          <DashboardTasks
            title="Active Tasks Board"
            description="Review, prioritize, and structure your workspace tasks."
            tasks={filteredTasks}
            onAddTask={handleManualTaskAdd}
            onComplete={handleTaskComplete}
            onEdit={handleTaskEdit}
            onDelete={handleTaskDelete}
            showAddButton
            showCompletedSection
            gridClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          />
        );

      case "settings":
        return (
          <DashboardSettingsView
            icon={Settings}
            title="Settings"
            description="Configure voice preferences, task defaults, and notifications."
            speechRate={speechRate}
            onSpeechRateChange={setSpeechRate}
          />
        );

      case "analytics":
        return <DashboardAnalyticsView tasks={tasks} />;

      case "voice":
        return (
          <DashboardVoiceView
            isListening={isListening}
            transcript={transcript}
            aiResponse={aiResponse}
            recentCommands={voiceHistory}
            onOpenVoice={() => setVoicePanelOpen(true)}
          />
        );

      case "dashboard":
      default:
        return (
          <DashboardOverview
            userName={user?.name}
            tasks={searchQuery ? tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase())) : tasks}
            isLoadingTasks={isLoadingTasks}
            recentCommands={voiceHistory}
            onOpenVoice={() => setVoicePanelOpen(true)}
            onOpenTaskModal={handleManualTaskAdd}
            onTaskComplete={handleTaskComplete}
            onTaskEdit={handleTaskEdit}
            onTaskDelete={handleTaskDelete}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-gray-100 dark:bg-[#0B0F19] font-sans text-gray-900 dark:text-white">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        onOpenVoice={() => setVoicePanelOpen(true)}
      />

      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <Navbar
          onMicClick={() => setVoicePanelOpen(true)}
          onLogout={handleLogout}
          userName={user?.name}
          userEmail={user?.email}
          tasks={tasks}
          onSearch={(q) => setSearchQuery(q)}
          onNavigate={setActiveTab}
        />

        <main className="relative flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 md:pb-8">
          <div className="mx-auto w-full max-w-7xl">{renderContentView()}</div>

          <AnimatePresence>
            {taskModalOpen && (
              <CreateTaskModal
                key={editingTask?._id ?? "new-task"}
                onClose={handleTaskModalClose}
                onSubmit={handleTaskCreate}
                task={editingTask}
                isSubmitting={isTaskSubmitting}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {voicePanelOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCancelVoice}
                className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F19]/80 p-4 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  onClick={(event) => event.stopPropagation()}
                  className="h-[480px] w-full max-w-lg"
                >
                  <VoiceAssistantPanel
                    isListening={isListening}
                    onMicToggle={handleMicToggle}
                    transcript={transcript}
                    aiResponse={aiResponse}
                    parsedCommand={parsedCommand}
                    onConfirm={handleConfirmTask}
                    onCancel={handleCancelVoice}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
