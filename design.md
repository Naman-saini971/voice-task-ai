# Design System — VoxAI (Voice-Task-AI)

Extracted from existing component code. This is a documentation pass, not a new design — the point is consistency: any new component should match these patterns rather than introducing new ones.

## Theme
Dark mode only, high-contrast, "AI console" aesthetic — mono fonts for labels/metadata, sans for content.

## Color Palette

| Purpose | Class(es) |
|---|---|
| Page background | `bg-[#0B0F19]` |
| Card/panel background | `bg-[#141A29]` |
| Nested/inset background (e.g. transcript box) | `bg-[#0B0F19]` inside a card |
| Default border | `border-white/5` |
| Hover border (interactive cards) | `hover:border-teal-500/30` |
| Primary accent | teal (`teal-400`, `teal-500`) |
| Secondary accent | purple (`purple-400`, `purple-500`) |
| Voice-tag accent | cyan (`cyan-400`, `cyan-500`) |
| High priority | red (`red-400`, `red-500`) |
| Medium priority | purple (`purple-400`, `purple-500`) |
| Low priority | teal (`teal-400`, `teal-500`) |
| Delayed status | amber (`amber-400`, `amber-500`) — added Phase 1 |
| Danger/overdue | red (`red-400`) |
| Success accent | emerald (`emerald-*`) — used in AnalyticsCard |
| Body text | `text-white` (headings), `text-gray-300`/`text-gray-400` (body), `text-gray-500`/`text-gray-600` (muted/placeholder) |

## Typography
- Headings: bold/extrabold, `text-white`, tight tracking on large headings
- Labels/metadata (e.g. "SPEECH TRANSCRIPT FEED"): `text-[10px]` or `text-[9px]`, `font-mono`, `uppercase`, `tracking-wider` or `tracking-widest`, `text-gray-500`
- Body copy: `text-sm`, `text-gray-400`, `leading-relaxed`

## Shape & Spacing
- Cards: `rounded-2xl` (task cards) or `rounded-3xl` (larger panels), `border border-white/5`
- Badges/pills: `rounded-full`, small padding (`px-2.5 py-1`), `text-[10px] font-bold uppercase tracking-wider`
- Buttons/inputs inside dark panels: `rounded-xl` or `rounded-lg`

## Badge Pattern (priority, delayed, voice-tag)
Every status badge follows the same anatomy:
```jsx
<div className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider {bg/border/text color}">
  <span className="h-1.5 w-1.5 rounded-full {dot color}" />
  {label}
</div>
```
New status types (e.g. future "Cancelled") should follow this exact pattern with a new color pairing, not a different shape.

## Motion
- Library: Framer Motion (`motion.div`, `AnimatePresence`)
- Card hover: `whileHover={{ y: -4 }}`
- Modal enter/exit: `initial={{ opacity: 0, scale: 0.95, y: 20 }}` → `animate={{ opacity: 1, scale: 1, y: 0 }}`, `type: "spring"`
- Listening-state pulse (mic button): concentric blurred circles animating `scale: [1, 1.4, 1]` / `[1, 1.8, 1]` on infinite loop, staggered delay
- Waveform bars: animate `height` on infinite loop with staggered duration per bar

## Icons
`lucide-react` exclusively. Common icons in use: `Mic`, `MicOff`, `Volume2`, `Sparkles`, `Check`, `X`, `Calendar`, `CheckCircle`, `Edit3`, `Trash2`, `Settings`, `ShieldAlert`.

## Component Conventions
- Presentational components (e.g. `VoiceAssistantPanel`, `DashboardVoiceView`) take all data as props — no internal state, no API calls. All state/logic lives in `pages/Dashboard.jsx`.
- Optional props default sensibly (e.g. `isListening = false`, `transcript = ""`) so components render safely even with partial data.
- Feedback: `react-hot-toast` for all success/error messages; `SpeechSynthesisUtterance` for spoken confirmation on voice actions.

## Explicit Non-Goals (per user direction)
No particle backgrounds, no 3D effects, no large visual redesigns. Additions should extend the existing console/dark aesthetic, not introduce new visual language.
