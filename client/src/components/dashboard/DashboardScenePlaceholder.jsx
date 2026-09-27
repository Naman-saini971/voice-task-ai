import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Node positions for the neural network (percentage-based)
const NODES = [
  { id: 0, x: 50, y: 50, size: 10, label: "VoiceDesk" },   // center
  { id: 1, x: 20, y: 25, size: 6, label: "Voice" },
  { id: 2, x: 75, y: 20, size: 6, label: "Tasks" },
  { id: 3, x: 15, y: 65, size: 6, label: "NLP" },
  { id: 4, x: 80, y: 70, size: 6, label: "AI" },
  { id: 5, x: 48, y: 15, size: 5, label: "STT" },
  { id: 6, x: 85, y: 45, size: 5, label: "API" },
  { id: 7, x: 12, y: 45, size: 5, label: "Auth" },
  { id: 8, x: 55, y: 82, size: 5, label: "DB" },
  { id: 9, x: 35, y: 78, size: 4, label: "JWT" },
];

// Connections between nodes
const EDGES = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [0, 5], [0, 6], [0, 7], [0, 8],
  [1, 5], [1, 7], [2, 5], [2, 6],
  [3, 7], [3, 9], [4, 6], [4, 8],
  [8, 9], [1, 3],
];

// Animated pulse travelling along an edge
function PulseParticle({ x1, y1, x2, y2, delay }) {
  return (
    <motion.circle
      r={2.5}
      fill="#8B5CF6"
      filter="url(#glow)"
      initial={{ offsetDistance: "0%" }}
      animate={{ offsetDistance: "100%" }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
      style={{
        offsetPath: `path('M ${x1} ${y1} L ${x2} ${y2}')`,
        opacity: 0.9,
      }}
    />
  );
}

export default function DashboardScenePlaceholder() {
  const svgRef = useRef(null);

  // Mouse parallax effect on SVG
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleMouseMove = (e) => {
      const rect = svg.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width * 8;
      const dy = (e.clientY - cy) / rect.height * 8;
      svg.style.transform = `perspective(600px) rotateY(${dx}deg) rotateX(${-dy}deg)`;
    };

    const handleMouseLeave = () => {
      svg.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg)";
    };

    const parent = svg.parentElement;
    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-bold text-gray-900 dark:text-white">AI Cognitive Map</h4>
        <span className="text-[10px] font-mono uppercase tracking-widest text-violet-400 border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 rounded-full">
          Live Neural Graph
        </span>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#141A29] border-gray-200 dark:border-white/5 shadow-xl"
        style={{ height: "340px" }}
      >
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)] pointer-events-none" />
        {/* Dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(139,92,246,0.15)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Corner accents */}
        <div className="pointer-events-none absolute left-0 top-0 h-8 w-8 rounded-tl-3xl border-l-2 border-t-2 border-violet-400/60" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 rounded-br-3xl border-b-2 border-r-2 border-purple-400/60" />

        {/* SVG Neural Network */}
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full"
          style={{ transition: "transform 0.1s ease-out" }}
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Edges */}
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke="rgba(139,92,246,0.2)"
              strokeWidth="0.3"
            />
          ))}

          {/* Pulse particles on edges */}
          {EDGES.map(([a, b], i) => (
            <PulseParticle
              key={`p-${i}`}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              delay={i * 0.4}
            />
          ))}

          {/* Nodes */}
          {NODES.map((node) => (
            <g key={node.id}>
              {/* Outer glow ring */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size + 3}
                fill="none"
                stroke={node.id === 0 ? "rgba(139,92,246,0.4)" : "rgba(139,92,246,0.15)"}
                strokeWidth="0.4"
                animate={{ r: [node.size + 2, node.size + 5, node.size + 2] }}
                transition={{ duration: 3, repeat: Infinity, delay: node.id * 0.3 }}
              />
              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size}
                fill={node.id === 0 ? "rgba(139,92,246,0.9)" : "rgba(99,60,180,0.7)"}
                filter="url(#nodeGlow)"
              />
              {/* Node label */}
              <text
                x={node.x}
                y={node.y + 0.4}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={node.id === 0 ? "3.5" : "2.5"}
                fontWeight="bold"
                fill="white"
                fontFamily="monospace"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Bottom info bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-3 bg-gradient-to-t from-[#0D1021] to-transparent">
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-violet-400"
            />
            <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest">Neural activity: Live</span>
          </div>
          <span className="text-[10px] font-mono text-gray-600">{NODES.length} nodes · {EDGES.length} connections</span>
        </div>
      </div>
    </div>
  );
}

