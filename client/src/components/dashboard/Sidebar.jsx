// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { LayoutDashboard, CheckSquare, Mic, BarChart2, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, onTabChange, onLogout, onOpenVoice }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* ── Desktop Sidebar ─────────────────────────── */}
      <motion.aside
        animate={{ width: isCollapsed ? '72px' : '260px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden md:flex flex-col h-screen bg-white dark:bg-[#141A29] border-gray-200 dark:border-white/5 relative z-30 shrink-0 transition-colors duration-200"
      >
        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-gray-200 dark:border-white/5">
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white">
                <Mic className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-gray-900 dark:text-white tracking-wider text-base">
                Voice<span className="text-violet-500">Desk</span>
              </span>
            </motion.div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 mx-auto rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white">
              <Mic className="w-4 h-4" />
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white dark:bg-[#141A29] border-gray-200 dark:border-white/5 border border-gray-200 dark:border-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white transition-colors shadow-md focus:outline-none"
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center rounded-xl p-3 text-sm font-semibold transition-all duration-200 group focus:outline-none relative ${isActive
                  ? 'bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-300'
                  : 'text-gray-500 dark:text-gray-400 border border-transparent hover:bg-gray-100 dark:bg-white/5 hover:text-gray-900 dark:text-white'
                  }`}
              >
                {isActive && (
                  <motion.div layoutId="activeIndicator"
                    className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-violet-500"
                  />
                )}
                <div className={`${isCollapsed ? 'mx-auto' : 'mr-3'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {!isCollapsed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="truncate">
                    {item.label}
                  </motion.span>
                )}
              </button>
            );
          })}

          {/* Voice button in desktop sidebar */}
          <button
            onClick={onOpenVoice}
            className="w-full flex items-center rounded-xl p-3 text-sm font-semibold transition-all duration-200 focus:outline-none bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-300 hover:from-violet-500/20 hover:to-purple-500/20 mt-2"
          >
            <div className={`${isCollapsed ? 'mx-auto' : 'mr-3'}`}>
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            {!isCollapsed && <span>Voice Assistant</span>}
          </button>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-200 dark:border-white/5">
          <button
            onClick={onLogout}
            className="w-full flex items-center rounded-xl p-3 text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-all duration-200 focus:outline-none"
          >
            <div className={isCollapsed ? 'mx-auto' : 'mr-3'}>
              <LogOut className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
                Logout
              </motion.span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* ── Mobile Bottom Navigation ─────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 pt-1 z-50 bg-white/95 dark:bg-[#141A29]/95">
        <div className="relative flex justify-center">
          <motion.button
            onClick={onOpenVoice}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="relative -top-4 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-xl shadow-violet-500/40 border-4 border-white dark:border-[#0B0F19]"
          >
            <Mic className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Bottom Nav Items */}
        <nav
          className="flex items-center justify-around px-2 pt-1 pb-1"
          style={{ marginTop: "-18px" }}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="flex flex-col items-center justify-center gap-1 flex-1 py-1.5 focus:outline-none relative"              >
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveIndicator"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-violet-500"
                  />
                )}
                <div className={`p-1.5 rounded-xl transition-all duration-200 ${isActive ? 'bg-violet-500/15 text-violet-600' : 'text-gray-400 dark:text-gray-600'
                  }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-semibold ${isActive ? 'text-violet-600' : 'text-gray-400 dark:text-gray-600'
                  }`}>
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex flex-col items-center justify-center gap-1 flex-1 py-2 focus:outline-none"
          >
            <div className="p-1.5 rounded-xl text-red-500">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold text-red-500">Logout</span>
          </button>
        </nav>
      </div>

      {/* Spacer for mobile bottom nav */}
      <div className="md:hidden h-24" />
    </>
  );
};

export default Sidebar;

