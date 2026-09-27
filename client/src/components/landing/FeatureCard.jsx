import { motion } from 'framer-motion';

const ACCENT_COLORS = [
  { border: "hover:border-violet-500/40", bg: "from-violet-500/10", icon: "text-violet-400", glow: "bg-violet-500/10" },
  { border: "hover:border-purple-500/40", bg: "from-purple-500/10", icon: "text-purple-400", glow: "bg-purple-500/10" },
  { border: "hover:border-indigo-500/40", bg: "from-indigo-500/10", icon: "text-indigo-400", glow: "bg-indigo-500/10" },
  { border: "hover:border-fuchsia-500/40", bg: "from-fuchsia-500/10", icon: "text-fuchsia-400", glow: "bg-fuchsia-500/10" },
  { border: "hover:border-pink-500/40", bg: "from-pink-500/10", icon: "text-pink-400", glow: "bg-pink-500/10" },
  { border: "hover:border-blue-500/40", bg: "from-blue-500/10", icon: "text-blue-400", glow: "bg-blue-500/10" },
];

const FeatureCard = ({ icon: Icon, title, description, delay = 0, index = 0 }) => {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`relative flex flex-col p-7 rounded-2xl bg-[#141A29]/60 backdrop-blur-xl border border-white/5 ${accent.border} transition-all duration-500 group overflow-hidden`}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accent.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Glow blob */}
      <div className={`absolute -top-12 -right-12 w-28 h-28 ${accent.glow} rounded-full blur-2xl group-hover:scale-150 transition-all duration-700`} />

      {/* Icon */}
      <div className={`relative mb-5 p-3.5 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${accent.icon} group-hover:scale-110 transition-transform duration-300`}>
        {Icon && <Icon className="w-5 h-5" />}
      </div>

      {/* Content */}
      <h3 className={`text-lg font-bold text-white mb-2 tracking-tight group-hover:${accent.icon} transition-colors duration-300`}>
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
