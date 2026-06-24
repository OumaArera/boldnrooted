import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BookOpen, Users, Compass, Star, ChevronRight,
  Lock, CheckCircle2, Circle, PlayCircle, FileText, Mic, MessageSquare
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

const API_BASE = "https://goalkeepers-backend-2.onrender.com/bold-n-rooted/api/v1";

const parseTrack = (t) => ({
  id:       t.slug || t.id,
  title:    t.title,
  subtitle: t.subtitle,
  level:    t.level,
  weeks:    t.weeks,
  gradient: t.gradient || "linear-gradient(145deg, #c8927a, #b8775a)",
  accent:   t.accent   || "#c8927a",
  icon:     t.icon     || "📖",
  description: t.description,
  verse:    t.verse,
  verseRef: t.verse_reference,
  modules: (t.modules ?? [])
    .filter(m => m.is_active)
    .sort((a, b) => a.order - b.order)
    .map(m => ({
      title:     m.title,
      type:      m.module_type,
      duration:  m.duration,
      completed: m.completed,
      locked:    m.locked,
    })),
});

const ACCOUNTABILITY_FEATURES = [
  { icon: Users, title: "Partner Matching", desc: "Each disciple is matched with an accountability partner at a similar stage of their journey." },
  { icon: MessageSquare, title: "Weekly Check-ins", desc: "Structured bi-weekly reflection prompts guide meaningful, honest conversations between partners." },
  { icon: Compass, title: "Spiritual Formation Plans", desc: "Every participant builds a personal plan with goals, disciplines, and quarterly milestones." },
  { icon: Star, title: "Mentor Access", desc: "Advanced track participants receive access to seasoned mentors for guided spiritual direction." },
];

const MODULE_ICONS = { teaching: PlayCircle, reading: FileText, practice: Mic, special: Star };
const MODULE_LABELS = { teaching: "Teaching", reading: "Reading", practice: "Practice", special: "Special" };

const Ornament = ({ className = "" }) => (
  <svg viewBox="0 0 80 20" fill="none" className={className}>
    <line x1="0" y1="10" x2="28" y2="10" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="40" cy="10" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="33" cy="10" r="1" fill="currentColor" opacity="0.3" />
    <circle cx="47" cy="10" r="1" fill="currentColor" opacity="0.3" />
    <line x1="52" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="0.75" />
  </svg>
);

/* ── Track Card ── */
const TrackCard = ({ track, index }) => {
  const [open, setOpen] = useState(false);
  const completed = track.modules.filter(m => m.completed).length;
  const progress = Math.round((completed / track.modules.length) * 100);

  return (
    <motion.div {...fadeUp(index * 0.1)} className="group">
      <div
        className="rounded-3xl overflow-hidden transition-all duration-400"
        style={{
          background: "rgba(255,255,255,0.88)",
          border: open
            ? "1px solid rgba(200,146,122,0.45)"
            : "1px solid rgba(200,146,122,0.20)",
          boxShadow: open
            ? "0 12px 48px rgba(180,120,90,0.14)"
            : "0 2px 16px rgba(180,120,90,0.06)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="h-0.5"
          style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, transparent)" }} />

        <button className="w-full text-left" onClick={() => setOpen(!open)}>
          <div className="p-7">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md"
                style={{ background: track.gradient }}>
                {track.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[9px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `${track.accent}28`,
                      color: track.accent,
                      fontFamily: "'Jost', system-ui, sans-serif",
                    }}>
                    {track.level}
                  </span>
                  {/* was rgba(90,58,40,0.4) → now 0.68 */}
                  <span className="text-[9px] font-medium"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.68)" }}>
                    {track.weeks} Weeks · {track.modules.length} Modules
                  </span>
                </div>
                <h3 className="text-xl text-[#3d2214] leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                  {track.title}
                </h3>
                {/* was rgba(90,58,40,0.5), weight 300 → now 0.72, weight 400 */}
                <p className="text-sm mt-0.5"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 400, color: "rgba(90,58,40,0.72)" }}>
                  {track.subtitle}
                </p>
              </div>

              {/* expand chevron — was rgba(200,146,122,0.6) → now 0.85 */}
              <motion.div
                animate={{ rotate: open ? 90 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-1 transition"
                style={{
                  border: "1px solid rgba(200,146,122,0.35)",
                  color: "rgba(200,146,122,0.85)",
                }}
              >
                <ChevronRight size={15} />
              </motion.div>
            </div>

            {/* progress bar */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                {/* was rgba(90,58,40,0.4) → now 0.65 */}
                <span className="text-[10px] font-medium"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.65)" }}>
                  {completed}/{track.modules.length} completed
                </span>
                <span className="text-[10px] font-semibold"
                  style={{ color: track.accent, fontFamily: "'Jost', system-ui, sans-serif" }}>
                  {progress}%
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(200,146,122,0.14)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${track.accent}, ${track.accent}88)` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </div>
        </button>

        {/* expanded content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-7 pb-7 pt-1 space-y-6"
                style={{ borderTop: "1px solid rgba(200,146,122,0.15)" }}>

                {/* was rgba(90,58,40,0.75) → now 0.88 */}
                <p className="text-sm leading-[1.85] pt-4"
                  style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "rgba(90,58,40,0.88)" }}>
                  {track.description}
                </p>

                {/* modules list */}
                <div>
                  {/* was rgba(90,58,40,0.4) → now 0.65 */}
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] mb-4"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.65)" }}>
                    Course Modules
                  </p>
                  <div className="space-y-2">
                    {track.modules.map((mod, i) => {
                      const ModIcon = MODULE_ICONS[mod.type] || FileText;
                      return (
                        <div key={i}
                          className="flex items-center gap-4 p-3.5 rounded-xl transition"
                          style={{
                            opacity: mod.locked ? 0.50 : 1,
                            cursor: mod.locked ? "not-allowed" : mod.completed ? "default" : "pointer",
                            background: mod.completed
                              ? "rgba(140,180,140,0.12)"
                              : mod.locked
                              ? "rgba(200,146,122,0.04)"
                              : "rgba(200,146,122,0.07)",
                            border: mod.completed
                              ? "1px solid rgba(140,180,140,0.28)"
                              : "1px solid transparent",
                          }}
                        >
                          <div className="shrink-0">
                            {mod.locked ? (
                              /* was rgba(90,58,40,0.3) → now 0.50 */
                              <Lock size={14} style={{ color: "rgba(90,58,40,0.50)" }} />
                            ) : mod.completed ? (
                              <CheckCircle2 size={14} style={{ color: "#5a8848" }} />
                            ) : (
                              <Circle size={14} style={{ color: "rgba(200,146,122,0.65)" }} />
                            )}
                          </div>
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              background: mod.completed
                                ? "rgba(140,180,140,0.15)"
                                : "rgba(255,255,255,0.9)",
                              border: `1px solid ${mod.completed ? "rgba(140,180,140,0.35)" : "rgba(200,146,122,0.25)"}`,
                            }}>
                            <ModIcon size={12} style={{ color: mod.completed ? "#5a8848" : "rgba(200,146,122,0.80)" }} />
                          </div>
                          <span className="flex-1 text-sm"
                            style={{
                              fontFamily: "'Jost', system-ui, sans-serif",
                              fontWeight: mod.completed ? 300 : 400,
                              color: mod.completed ? "rgba(90,136,80,0.85)" : "#3d2214",
                              textDecoration: mod.completed ? "line-through" : "none",
                              textDecorationColor: "rgba(90,136,80,0.4)",
                            }}>
                            {String(i + 1).padStart(2, "0")}. {mod.title}
                          </span>
                          <div className="flex items-center gap-2 shrink-0">
                            {/* was rgba(90,58,40,0.35) → now 0.58 */}
                            <span className="text-[9px] font-medium uppercase hidden sm:block"
                              style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.58)" }}>
                              {MODULE_LABELS[mod.type]}
                            </span>
                            {/* was rgba(90,58,40,0.4) → now 0.62 */}
                            <span className="text-[10px]"
                              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 400, color: "rgba(90,58,40,0.62)" }}>
                              {mod.duration}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* verse in dark card */}
                <div className="rounded-2xl p-5"
                  style={{ background: "linear-gradient(145deg, #3d2214, #5a3020)" }}>
                  {/* was rgba(232,196,160,0.85) → now 0.95 */}
                  <p className="italic text-sm leading-relaxed mb-2"
                    style={{ color: "rgba(232,196,160,0.95)", fontFamily: "'EB Garamond', Georgia, serif" }}>
                    "{track.verse}"
                  </p>
                  {/* was rgba(200,146,122,0.55) → now 0.85 */}
                  <p className="text-[10px] font-medium uppercase tracking-widest"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(200,146,122,0.85)" }}>
                    — {track.verseRef}
                  </p>
                </div>

                <Link to={`/discipleship/${track.id}/enroll`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white transition hover:opacity-90 hover:scale-[1.03]"
                  style={{
                    background: track.gradient,
                    fontFamily: "'Jost', system-ui, sans-serif",
                    boxShadow: `0 6px 20px ${track.accent}40`,
                  }}>
                  Enrol in This Track <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ── Main ── */
const Discipleship = () => {
  const [tracks, setTracks]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await fetch(`${API_BASE}/discipleship/`);
        if (!res.ok) throw new Error("Network error");
        const json = await res.json();
        const active = (json.data?.results ?? [])
          .filter(t => t.is_active)
          .map(parseTrack);
        setTracks(active);
      } catch (err) {
        console.error("Discipleship fetch error:", err);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fdf6f0" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&family=EB+Garamond:ital,wght@0,400;1,400&display=swap');

        .parchment-bg {
          background-color: #fdf6f0;
          background-image:
            radial-gradient(ellipse at 20% 50%, rgba(212,168,140,0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(200,146,122,0.06) 0%, transparent 50%);
        }
        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative min-h-[62vh] flex items-end overflow-hidden pb-20"
        style={{ background: "linear-gradient(160deg, #f5e8da 0%, #ecddc8 60%, #f0e0ce 100%)" }}>

        <div className="absolute inset-0 paper-texture opacity-60" />
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, #c8927a, transparent)" }} />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.06)", whiteSpace: "nowrap" }}>
            DISCIPULI
          </span>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(200,146,122,0.15) 0%, transparent 70%)" }} />

        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, #c8927a 0, #c8927a 1px, transparent 1px, transparent 40px)" }} />

        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.08]" viewBox="0 0 1400 170" fill="none" preserveAspectRatio="none">
          <path d="M700 0 L680 28 L645 52 L598 80 L540 108 L470 132 L388 150 L290 163 L180 170 L0 170" stroke="#c8927a" strokeWidth="1.5" fill="none"/>
          <path d="M700 0 L720 28 L755 52 L802 80 L860 108 L930 132 L1012 150 L1110 163 L1220 170 L1400 170" stroke="#c8927a" strokeWidth="1.5" fill="none"/>
          <path d="M700 0 L695 38 L678 75 L652 108 L618 135 L578 155 L532 168 L480 170" stroke="#e8c4a0" strokeWidth="0.8" fill="none"/>
          <path d="M700 0 L705 38 L722 75 L748 108 L782 135 L822 155 L868 168 L920 170" stroke="#e8c4a0" strokeWidth="0.8" fill="none"/>
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 w-full">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="flex items-center gap-4 mb-6">
              <Ornament className="text-[#c8927a]/50 w-28" />
              {/* was #b8845a → now #9a6a3a */}
              <span className="text-[#9a6a3a] text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                Iron Sharpens Iron
              </span>
            </div>
            <h1 className="leading-none tracking-tight text-[#3d2214] mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              <span className="block text-[clamp(3rem,7vw,5.5rem)]">Discipleship</span>
              <span className="block text-[clamp(3rem,7vw,5.5rem)]" style={{ color: "#c8927a" }}>Pathways</span>
            </h1>
            {/* was /60, weight 300 → now /85, weight 400 */}
            <p className="text-[#5a3a28]/85 text-base max-w-xl leading-relaxed"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 400 }}>
              Structured, Scripture-based tracks that take you from first steps of faith to seasoned disciple-maker — with a community walking beside you every step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── How it works (dark section) ── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #3d2214 0%, #5a3020 55%, #3d2214 100%)" }}>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[16vw] font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.04)", whiteSpace: "nowrap" }}>
            CRESCIT
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-5">
              <Ornament className="text-[#c8927a]/40 w-28" />
              {/* was #e0b090 → now #f0c8a0 */}
              <span className="text-[#f0c8a0] text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                How It Works
              </span>
              <Ornament className="text-[#c8927a]/40 w-28" />
            </div>
            <h2 className="text-4xl text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              From Seed to Tree
            </h2>
            {/* was white/42, weight 300 → now white/70, weight 400 */}
            <p className="text-white/70 mt-4 max-w-lg mx-auto text-sm"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 400 }}>
              Our three-track system mirrors the growth of a tree — rooted, growing, and bearing fruit. Start where you are. Go where God calls you.
            </p>
          </motion.div>

          {/* 3-step track overview */}
          <div className="grid sm:grid-cols-3 gap-5 mb-12">
            {[
              { step: "01", emoji: "🌱", label: "Foundations", desc: "First steps, core beliefs, personal devotion.", color: "#c4a882" },
              { step: "02", emoji: "🌿", label: "Going Deeper", desc: "Doctrine, disciplines, spiritual maturity.", color: "#c8927a" },
              { step: "03", emoji: "🦅", label: "Kingdom Calling", desc: "Mission, leadership, sending others.", color: "#a89ab4" },
            ].map((t, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="text-center rounded-2xl p-7 transition-all"
                style={{
                  background: "rgba(253,246,240,0.07)",
                  border: "1px solid rgba(200,146,122,0.18)",
                }}>
                <span className="text-4xl block mb-4">{t.emoji}</span>
                <p className="text-[9px] font-medium uppercase tracking-widest mb-2"
                  style={{ color: t.color, fontFamily: "'Jost', system-ui, sans-serif" }}>
                  Track {t.step}
                </p>
                <h3 className="text-white text-lg mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                  {t.label}
                </h3>
                {/* was rgba(255,255,255,0.42), weight 300 → now 0.68, weight 400 */}
                <p className="text-xs"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 400, color: "rgba(255,255,255,0.68)" }}>
                  {t.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* accountability features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACCOUNTABILITY_FEATURES.map((f, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)}
                className="rounded-2xl p-5 transition-all"
                style={{
                  background: "rgba(253,246,240,0.07)",
                  border: "1px solid rgba(200,146,122,0.18)",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(253,246,240,0.10)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.38)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(253,246,240,0.07)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.18)"; }}
              >
                {/* icon stays #e8c4a0 — already readable */}
                <f.icon size={18} className="mb-3" style={{ color: "#e8c4a0" }} />
                <h3 className="text-white text-sm mb-1.5"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                  {f.title}
                </h3>
                {/* was rgba(255,255,255,0.4), weight 300 → now 0.68, weight 400 */}
                <p className="text-xs leading-relaxed"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 400, color: "rgba(255,255,255,0.68)" }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tracks (light section) ── */}
      <section className="py-24 parchment-bg">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="mb-12">
            <div className="flex items-center gap-4 mb-5">
              <Ornament className="text-[#c8927a]/50 w-28" />
              {/* was #b8845a → now #9a6a3a */}
              <span className="text-[#9a6a3a] text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                Choose Your Path
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-[#3d2214] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              The Three<br />
              <em className="not-italic" style={{ color: "#c8927a" }}>Discipleship Tracks</em>
            </h2>
            {/* was rgba(90,58,40,0.65), weight 300 → now 0.82, weight 400 */}
            <p className="mt-4 max-w-lg text-base"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 400, color: "rgba(90,58,40,0.82)" }}>
              Each track builds on the last. Click any track to explore the modules, unlock the curriculum, and enrol.
            </p>
          </motion.div>

          <div className="space-y-5">
            {loading && (
              <p className="text-center text-[#9a6a3a]/60 text-sm py-16"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                Loading discipleship tracks…
              </p>
            )}
            {fetchError && !loading && (
              <p className="text-center text-[#c8927a]/70 text-sm py-16"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                Could not load tracks at this time.
              </p>
            )}
            {!loading && !fetchError && tracks.length === 0 && (
              <p className="text-center text-[#9a6a3a]/60 text-sm py-16"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                No discipleship tracks available yet.
              </p>
            )}
            {tracks.map((track, i) => (
              <TrackCard key={track.id} track={track} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (terracotta) ── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #c8927a 0%, #d4a882 45%, #c0927a 100%)" }}>

        <div className="absolute inset-0 paper-texture opacity-40" />

        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.12]" viewBox="0 0 1400 110" fill="none" preserveAspectRatio="none">
          <path d="M0 110 L350 70 L700 0 L1050 70 L1400 110" stroke="white" strokeWidth="1.5" fill="none"/>
          <path d="M0 110 L250 85 L700 0 L1150 85 L1400 110" stroke="white" strokeWidth="0.7" fill="none"/>
        </svg>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <Ornament className="text-white/35 w-40 mx-auto mb-8" />

            {/* was white/60 → now white/88 */}
            <p className="text-white/88 text-[10px] font-medium uppercase tracking-[0.3em] mb-8"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              The Heart of Discipleship
            </p>
            <p className="text-3xl sm:text-4xl text-white leading-[1.6] mb-8"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, fontStyle: "italic" }}>
              "The same commit thou to faithful men, who shall be able to{" "}
              <span className="not-italic font-semibold" style={{ color: "rgba(255,255,255,0.98)" }}>
                teach others also.
              </span>"
            </p>
            <Ornament className="text-white/30 w-36 mx-auto mb-5" />
            {/* was white/50 → now white/80 */}
            <p className="text-white/80 text-xs font-medium uppercase tracking-[0.25em]"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              2 Timothy 2:2
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* was #7a4a32 → now #5a3018 */}
              <Link to="/discipleship/foundations/enroll"
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-white font-medium text-sm hover:bg-[#fdf6f0] hover:scale-[1.03] transition-all shadow-xl"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  color: "#5a3018",
                  boxShadow: "0 12px 40px rgba(90,48,32,0.2)",
                }}>
                Begin Your Journey <ArrowRight size={15} />
              </Link>
              {/* was border-white/30 → now border-white/55 */}
              <Link to="/programs"
                className="flex items-center gap-2 px-8 py-4 rounded-full font-medium text-sm border-2 border-white/55 text-white hover:border-white/80 transition"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                Explore All Programs <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Discipleship;