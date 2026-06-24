import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Users, BookOpen, Globe, Crown, Sword, ChevronDown, CheckCircle2, Calendar } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

/* ─── API ─── */
const API_BASE = "https://goalkeepers-backend-2.onrender.com/bold-n-rooted/api/v1";
const TODAY = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

// Visual defaults cycled by index when the API doesn't provide them
const VISUAL_DEFAULTS = [
  { emoji: "🦅", gradient: "linear-gradient(145deg, #c8927a, #b8775a)", accentColor: "#c8927a" },
  { emoji: "👑", gradient: "linear-gradient(145deg, #c4a0b8, #a88098)", accentColor: "#c4a0b8" },
  { emoji: "📖", gradient: "linear-gradient(145deg, #c4a882, #b09070)", accentColor: "#c4a882" },
  { emoji: "🌍", gradient: "linear-gradient(145deg, #9ab0c8, #7890a8)", accentColor: "#9ab0c8" },
  { emoji: "🙏", gradient: "linear-gradient(145deg, #a89ab4, #8878a0)", accentColor: "#a89ab4" },
  { emoji: "⚔️", gradient: "linear-gradient(145deg, #d4b882, #c0a06a)", accentColor: "#d4b882" },
];

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

const parseProgram = (prog, index) => {
  const vis = VISUAL_DEFAULTS[index % VISUAL_DEFAULTS.length];
  const durationDays = Math.round(
    (new Date(prog.end_date) - new Date(prog.start_date)) / (1000 * 60 * 60 * 24)
  );
  const duration = durationDays === 0 ? "1 Day" : `${durationDays + 1} Day${durationDays > 0 ? "s" : ""}`;

  return {
    id: prog.id,
    emoji: vis.emoji,
    icon: BookOpen,
    title: prog.title,
    badge: prog.organizer,
    duration,
    audience: "All young adults",
    format: prog.location,
    gradient: vis.gradient,
    accentColor: vis.accentColor,
    shortDesc: prog.description,
    fullDesc: prog.description,
    outcomes: [],                         // not provided by API
    verse: "He shall be like a tree planted by rivers of water.",
    verseRef: "Psalm 1:3",
    nextCohort: `${formatDate(prog.start_date)} → ${formatDate(prog.end_date)}`,
  };
};

const Ornament = ({ className = "" }) => (
  <svg viewBox="0 0 80 20" fill="none" className={className}>
    <line x1="0" y1="10" x2="28" y2="10" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="40" cy="10" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="33" cy="10" r="1" fill="currentColor" opacity="0.3" />
    <circle cx="47" cy="10" r="1" fill="currentColor" opacity="0.3" />
    <line x1="52" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="0.75" />
  </svg>
);

const ProgramCard = ({ program, index, onExpand, isExpanded }) => (
  <motion.article {...fadeUp(index * 0.07)} className="group">
    <div
      className="rounded-3xl overflow-hidden transition-all duration-400"
      style={{
        background: "rgba(255,255,255,0.88)",
        border: isExpanded
          ? "1px solid rgba(200,146,122,0.45)"
          : "1px solid rgba(200,146,122,0.20)",
        boxShadow: isExpanded
          ? "0 12px 48px rgba(180,120,90,0.14)"
          : "0 2px 16px rgba(180,120,90,0.06)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, transparent)" }} />

      <div className="p-7">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md"
            style={{ background: program.gradient }}>
            {program.emoji}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[9px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: `${program.accentColor}28`,
                  color: program.accentColor,
                  fontFamily: "'Jost', system-ui, sans-serif",
                }}>
                {program.badge}
              </span>
              {/* was rgba(90,58,40,0.4) → now 0.70 */}
              <span className="text-[9px] font-medium uppercase tracking-widest"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.70)" }}>
                {program.duration}
              </span>
            </div>
            <h3 className="text-xl text-[#3d2214] leading-snug"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              {program.title}
            </h3>
          </div>

          {/* expand button — was rgba(200,146,122,0.6) → now 0.85 */}
          <button
            onClick={() => onExpand(program.id)}
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition"
            style={{
              border: "1px solid rgba(200,146,122,0.35)",
              color: "rgba(200,146,122,0.85)",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8927a"; e.currentTarget.style.color = "#c8927a"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.35)"; e.currentTarget.style.color = "rgba(200,146,122,0.85)"; }}
          >
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={15} />
            </motion.div>
          </button>
        </div>

        {/* meta row — was rgba(90,58,40,0.5) → now 0.72 */}
        <div className="flex flex-wrap gap-4 mt-4 mb-4">
          {[
            { icon: Users, val: program.audience },
            { icon: Calendar, val: program.format },
            { icon: Clock, val: `Next: ${program.nextCohort}` },
          ].map(({ icon: Icon, val }, i) => (
            <span key={i} className="flex items-center gap-1.5 text-xs"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 400, color: "rgba(90,58,40,0.72)" }}>
              <Icon size={11} style={{ color: "rgba(200,146,122,0.75)" }} />
              {val}
            </span>
          ))}
        </div>

        {/* was rgba(90,58,40,0.68), weight 300 → now 0.82, weight 400 */}
        <p className="text-sm leading-relaxed"
          style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 400, color: "rgba(90,58,40,0.82)" }}>
          {program.shortDesc}
        </p>

        {/* expanded section */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 space-y-6"
                style={{ borderTop: "1px solid rgba(200,146,122,0.15)" }}>

                {/* was rgba(90,58,40,0.75) → now 0.88 */}
                <p className="text-sm leading-[1.85]"
                  style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "rgba(90,58,40,0.88)" }}>
                  {program.fullDesc}
                </p>

                {/* outcomes */}
                <div>
                  {/* was rgba(90,58,40,0.4) → now 0.68 */}
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] mb-3"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.68)" }}>
                    What You'll Gain
                  </p>
                  <div className="space-y-2.5">
                    {program.outcomes.map((o, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={13} className="shrink-0 mt-0.5" style={{ color: program.accentColor }} />
                        {/* was rgba(61,34,20,0.75), weight 300 → now 0.88, weight 400 */}
                        <p className="text-sm" style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 400, color: "rgba(61,34,20,0.88)" }}>
                          {o}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* verse in dark card */}
                <div className="rounded-2xl p-5"
                  style={{ background: "linear-gradient(145deg, #3d2214, #5a3020)" }}>
                  {/* was rgba(232,196,160,0.85) → now 0.95 */}
                  <p className="italic text-sm leading-relaxed mb-2"
                    style={{ color: "rgba(232,196,160,0.95)", fontFamily: "'EB Garamond', Georgia, serif" }}>
                    "{program.verse}"
                  </p>
                  {/* was rgba(200,146,122,0.55) → now 0.85 */}
                  <p className="text-[10px] font-medium uppercase tracking-widest"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(200,146,122,0.85)" }}>
                    — {program.verseRef}
                  </p>
                </div>

                <Link to={`/programs/${program.id}/apply`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white transition hover:opacity-90 hover:scale-[1.03]"
                  style={{
                    background: program.gradient,
                    fontFamily: "'Jost', system-ui, sans-serif",
                    boxShadow: `0 6px 20px ${program.accentColor}40`,
                  }}>
                  Apply for This Programme <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  </motion.article>
);

const Programs = () => {
  const [expanded, setExpanded] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch(`${API_BASE}/programs/`);
        if (!res.ok) throw new Error("Network response not ok");
        const json = await res.json();
        const active = (json.data?.results ?? [])
          .filter(p => p.is_active && p.end_date >= TODAY)   // exclude past programs
          .map(parseProgram);
        setPrograms(active);
      } catch (err) {
        console.error("Programs fetch error:", err);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const filtered = programs; 

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
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pb-20"
        style={{ background: "linear-gradient(160deg, #f5e8da 0%, #ecddc8 60%, #f0e0ce 100%)" }}>

        <div className="absolute inset-0 paper-texture opacity-60" />
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, #c8927a, transparent)" }} />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.06)", whiteSpace: "nowrap" }}>
            CURRICULA
          </span>
        </div>

        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(200,146,122,0.12) 0%, transparent 70%)" }} />

        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.08]" viewBox="0 0 1400 140" fill="none" preserveAspectRatio="none">
          <path d="M700 0 L650 35 L580 65 L490 95 L380 118 L250 132 L100 140 L0 140" stroke="#c8927a" strokeWidth="1.5" fill="none"/>
          <path d="M700 0 L750 35 L820 65 L910 95 L1020 118 L1150 132 L1300 140 L1400 140" stroke="#c8927a" strokeWidth="1.5" fill="none"/>
          <path d="M700 0 L695 42 L678 88 L654 120 L628 136 L605 140" stroke="#e8c4a0" strokeWidth="0.8" fill="none"/>
          <path d="M700 0 L705 42 L722 88 L746 120 L772 136 L795 140" stroke="#e8c4a0" strokeWidth="0.8" fill="none"/>
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 w-full">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="flex items-center gap-4 mb-6">
              <Ornament className="text-[#c8927a]/50 w-28" />
              {/* was #b8845a → now #9a6a3a */}
              <span className="text-[#9a6a3a] text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                Grow With Us
              </span>
            </div>
            <h1 className="leading-none tracking-tight text-[#3d2214] mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              <span className="block text-[clamp(3rem,7vw,5.5rem)]">Our</span>
              <span className="block text-[clamp(3rem,7vw,5.5rem)]" style={{ color: "#c8927a" }}>Programs</span>
            </h1>
            {/* was /60, weight 300 → now /85, weight 400 */}
            <p className="text-[#5a3a28]/85 text-base max-w-xl leading-relaxed"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 400 }}>
              Structured pathways for spiritual growth, community, and Kingdom impact — designed for every season of your faith journey.
            </p>
          </motion.div>
        </div>
      </section>

     

      {/* ── Programs grid ── */}
      <section className="py-16 parchment-bg">
        <div className="max-w-6xl mx-auto px-6">
          {loading && (
            <p className="text-center text-[#9a6a3a]/60 text-sm py-16"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              Loading programmes…
            </p>
          )}
          {fetchError && !loading && (
            <p className="text-center text-[#c8927a]/70 text-sm py-16"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              Could not load programmes at this time.
            </p>
          )}
          {!loading && !fetchError && filtered.length === 0 && (
            <p className="text-center text-[#9a6a3a]/60 text-sm py-16"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              No upcoming programmes at this time. Check back soon.
            </p>
          )}
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((program, i) => (
              <ProgramCard
                key={program.id}
                program={program}
                index={i}
                isExpanded={expanded === program.id}
                onExpand={(id) => setExpanded(expanded === id ? null : id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #c8927a 0%, #d4a882 45%, #c0927a 100%)" }}>

        <div className="absolute inset-0 paper-texture opacity-40" />

        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.12]" viewBox="0 0 1400 100" fill="none" preserveAspectRatio="none">
          <path d="M700 0 L650 30 L570 55 L460 75 L320 90 L160 98 L0 100" stroke="white" strokeWidth="1.5" fill="none"/>
          <path d="M700 0 L750 30 L830 55 L940 75 L1080 90 L1240 98 L1400 100" stroke="white" strokeWidth="1.5" fill="none"/>
        </svg>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <Ornament className="text-white/40 w-40 mx-auto mb-7" />
            <h2 className="text-4xl text-white mb-4 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              Not Sure Which Programme<br />
              <em className="italic font-normal">Is Right for You?</em>
            </h2>
            {/* was white/65, weight 300 → now white/88, weight 400 */}
            <p className="text-white/88 max-w-lg mx-auto text-base mb-8"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 400 }}>
              Reach out to our team — we'll help you find the best fit for where you are in your faith journey.
            </p>
            {/* was #7a4a32 → now #5a3018 */}
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-sm transition-all hover:scale-[1.03] shadow-xl"
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                background: "white",
                color: "#5a3018",
                boxShadow: "0 12px 40px rgba(90,48,32,0.25)",
              }}>
              Talk to Us <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Programs;