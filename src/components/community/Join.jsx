import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Check, ChevronRight, Sparkles, Flame, CheckCircle2,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

const INVOLVEMENT = [
  {
    id: "disciple",
    emoji: "🌱",
    title: "Join as a Disciple",
    desc: "I want to grow in faith, join a discipleship track, and be part of the community.",
    gradient: "linear-gradient(145deg, #2a4a2a, #3a6a3a)",
    accent: "#6a9868",
    pathway: ["Enrol in a discipleship track", "Get matched with an accountability partner", "Join our prayer and community spaces"],
  },
  {
    id: "volunteer",
    emoji: "🙌",
    title: "Volunteer With Us",
    desc: "I want to serve with my time, skills, and gifts to advance the Bold and Rooted mission.",
    gradient: "linear-gradient(145deg, #5a3020, #8b5a3a)",
    accent: "#c8927a",
    pathway: ["Tell us your skills and availability", "Get matched with a serving role", "Attend orientation and start serving"],
  },
  {
    id: "partner",
    emoji: "🤝",
    title: "Become a Ministry Partner",
    desc: "I want to financially support Bold and Rooted and partner in the work of the gospel.",
    gradient: "linear-gradient(145deg, #3d2214, #6b3a1a)",
    accent: "#d4a882",
    pathway: ["Choose your giving tier", "Receive partner updates and impact reports", "Join our partner prayer calls"],
  },
  {
    id: "leader",
    emoji: "🦅",
    title: "Lead With Us",
    desc: "I feel called to serve in leadership — discipleship, missions, worship, or ministry coordination.",
    gradient: "linear-gradient(145deg, #1a2a5a, #2a3a7a)",
    accent: "#88aadd",
    pathway: ["Submit your leadership interest form", "Connect with Gontse or the team", "Begin a leadership formation journey"],
  },
];

const STEPS = [
  { num: "01", title: "Tell Us Who You Are", desc: "Fill in the form below with your name, contact details, and how you want to be involved." },
  { num: "02", title: "We Reach Out", desc: "Gontse or a team member will contact you within 48 hours to welcome you and discuss next steps." },
  { num: "03", title: "Get Matched", desc: "We connect you with the right programme, community, or serving role based on your heart and gifts." },
  { num: "04", title: "Begin Your Journey", desc: "Step into the Bold and Rooted family — rooted in the Word, connected in community, sent out for impact." },
];

const Ornament = ({ className = "" }) => (
  <svg viewBox="0 0 80 20" fill="none" className={className}>
    <line x1="0" y1="10" x2="28" y2="10" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="40" cy="10" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="33" cy="10" r="1" fill="currentColor" opacity="0.3" />
    <circle cx="47" cy="10" r="1" fill="currentColor" opacity="0.3" />
    <line x1="52" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="0.75" />
  </svg>
);

const inputStyle = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "0.75rem",
  border: "1px solid rgba(200,146,122,0.22)",
  background: "rgba(253,246,240,0.9)",
  color: "#3d2214",
  fontSize: "0.875rem",
  fontFamily: "'Jost', system-ui, sans-serif",
  fontWeight: 300,
  outline: "none",
  transition: "border-color 0.2s",
};

const Join = () => {
  const [selectedPath, setSelectedPath] = useState("disciple");
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    country: "", age: "", how: "", about: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const selected = INVOLVEMENT.find(i => i.id === selectedPath);

  const handleSubmit = () => {
    if (!form.firstName || !form.email) return;
    setSubmitted(true);
  };

  const focusBorder = e => e.currentTarget.style.borderColor = "rgba(200,146,122,0.55)";
  const blurBorder  = e => e.currentTarget.style.borderColor = "rgba(200,146,122,0.22)";

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", backgroundColor: "#fdf6f0" }}>

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
        .gold-line { background: linear-gradient(90deg, transparent, #c8927a, #e8c4a0, #c8927a, transparent); }
      `}</style>

      {/* ── Hero — parchment light, matches Programs/Contact ── */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(160deg, #f5e8da 0%, #ecddc8 60%, #f0e0ce 100%)" }}
      >
        <div className="absolute inset-0 paper-texture opacity-60" />
        <div className="absolute top-0 left-0 right-0 h-0.5 gold-line" />

        {/* watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.06)", whiteSpace: "nowrap" }}>
            VENI
          </span>
        </div>

        {/* warm glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(200,146,122,0.14) 0%, transparent 70%)" }} />

        {/* root SVG */}
        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.08]" viewBox="0 0 1400 180" fill="none" preserveAspectRatio="none">
          <path d="M700 0 L660 38 L600 68 L520 100 L420 128 L300 150 L160 165 L0 180" stroke="#c8927a" strokeWidth="1.5" fill="none"/>
          <path d="M700 0 L740 38 L800 68 L880 100 L980 128 L1100 150 L1240 165 L1400 180" stroke="#c8927a" strokeWidth="1.5" fill="none"/>
          <path d="M700 0 L692 50 L670 95 L640 132 L600 160 L555 175 L505 180" stroke="#e8c4a0" strokeWidth="0.8" fill="none"/>
          <path d="M700 0 L708 50 L730 95 L760 132 L800 160 L845 175 L895 180" stroke="#e8c4a0" strokeWidth="0.8" fill="none"/>
        </svg>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-28 pb-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

            {/* badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-9"
              style={{ background: "rgba(200,146,122,0.10)", border: "1px solid rgba(200,146,122,0.28)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#c8927a" }} />
              <span className="text-[10px] font-medium uppercase tracking-[0.22em]"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
                A Movement Is Rising · Join Us
              </span>
            </div>

            <div className="flex items-center justify-center gap-4 mb-5">
              <Ornament className="text-[#c8927a]/40 w-28" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
                Be Part of Something
              </span>
              <Ornament className="text-[#c8927a]/40 w-28" />
            </div>

            <h1 className="leading-none tracking-tight mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              <span className="block" style={{ fontSize: "clamp(3.5rem,8vw,6.5rem)", color: "#3d2214" }}>Join the</span>
              <span className="block" style={{ fontSize: "clamp(3.5rem,8vw,6.5rem)", color: "#c8927a" }}>Movement</span>
            </h1>

            <p className="text-lg max-w-2xl mx-auto leading-relaxed mb-10"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.6)" }}>
              You were not made to walk this faith journey alone. Step into a global community of young believers who are rooted in Scripture, alive in the Spirit, and sent to change the world.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#join-form"
                className="flex items-center gap-2.5 px-9 py-4 rounded-full text-white font-medium text-sm transition-all hover:scale-[1.03]"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  background: "linear-gradient(145deg, #c8927a, #d4a882)",
                  boxShadow: "0 8px 28px rgba(200,146,122,0.32)",
                }}
              >
                <Sparkles size={15} /> I'm Ready — Let's Go
              </a>
              <Link
                to="/about"
                className="flex items-center gap-2 px-9 py-4 rounded-full font-medium text-sm transition"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  border: "1px solid rgba(200,146,122,0.35)",
                  color: "rgba(90,58,40,0.6)",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8927a"; e.currentTarget.style.color = "#3d2214"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.35)"; e.currentTarget.style.color = "rgba(90,58,40,0.6)"; }}
              >
                Learn More First <ChevronRight size={15} />
              </Link>
            </div>
          </motion.div>

          {/* verse footer */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="mt-20 pt-8"
            style={{ borderTop: "1px solid rgba(200,146,122,0.18)" }}
          >
            <p className="text-sm italic" style={{ color: "rgba(90,58,40,0.5)", fontFamily: "'EB Garamond', Georgia, serif" }}>
              "He shall be like a tree planted by the rivers of water…"
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] mt-2"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
              Psalm 1:3
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 4 steps — mahogany dark ── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #3d2214 0%, #5a3020 55%, #3d2214 100%)" }}>
        <div className="absolute inset-0 paper-texture opacity-40" />

        {/* watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.04)", whiteSpace: "nowrap" }}>
            ITER
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-5">
              <Ornament className="text-[#c8927a]/40 w-28" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#e0b090" }}>
                It's Simple
              </span>
              <Ornament className="text-[#c8927a]/40 w-28" />
            </div>
            <h2 className="text-4xl sm:text-5xl text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              How Joining Works
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="relative rounded-2xl p-6 transition-all"
                style={{
                  background: "rgba(253,246,240,0.05)",
                  border: "1px solid rgba(200,146,122,0.15)",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(253,246,240,0.08)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(253,246,240,0.05)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.15)"; }}
              >
                {/* connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-3 w-6 h-px z-10"
                    style={{ background: "rgba(200,146,122,0.25)" }} />
                )}
                <p className="text-3xl font-semibold mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#e8c4a0" }}>
                  {s.num}
                </p>
                <h3 className="font-semibold text-base mb-2 text-white"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                  {s.title}
                </h3>
                <p className="text-xs leading-relaxed"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.42)" }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Choose your path — parchment ── */}
      <section className="py-24 parchment-bg">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <Ornament className="text-[#c8927a]/50 w-24" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
                Choose Your Path
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#3d2214" }}>
              How Do You Want<br />to Be Involved?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {INVOLVEMENT.map((path, i) => {
              const isSelected = selectedPath === path.id;
              return (
                <motion.button
                  key={path.id}
                  {...fadeUp(i * 0.08)}
                  onClick={() => setSelectedPath(path.id)}
                  className="text-left rounded-3xl overflow-hidden transition-all duration-300"
                  style={{
                    border: isSelected ? "1px solid rgba(200,146,122,0.5)" : "1px solid rgba(200,146,122,0.18)",
                    boxShadow: isSelected ? "0 8px 40px rgba(90,48,32,0.12)" : "0 2px 12px rgba(90,48,32,0.04)",
                    transform: isSelected ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  {/* gradient top */}
                  <div className="p-6 relative overflow-hidden" style={{ background: path.gradient }}>
                    <div className="absolute inset-0 opacity-[0.08]"
                      style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 0%, transparent 50%)" }} />
                    <div className="absolute top-0 left-0 right-0 h-0.5 gold-line" />
                    <div className="relative z-10">
                      <span className="text-3xl block mb-3">{path.emoji}</span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)" }}
                        >
                          <Check size={11} className="text-white" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* card body — parchment */}
                  <div className="p-5" style={{ background: "rgba(255,252,248,0.92)" }}>
                    <h3 className="font-semibold text-sm leading-snug mb-2"
                      style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#3d2214" }}>
                      {path.title}
                    </h3>
                    <p className="text-xs leading-relaxed"
                      style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.55)" }}>
                      {path.desc}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* selected path next steps */}
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,252,248,0.88)",
                  border: "1px solid rgba(200,146,122,0.22)",
                }}
              >
                <div className="h-0.5 gold-line -mx-6 -mt-6 mb-6 rounded-t-2xl" />
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] mb-5"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.4)" }}>
                  Your Next Steps
                </p>
                <div className="flex flex-wrap gap-5">
                  {selected.pathway.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-medium shrink-0"
                        style={{ background: selected.gradient, fontFamily: "'Jost', system-ui, sans-serif" }}>
                        {i + 1}
                      </div>
                      <span className="text-sm"
                        style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(61,34,20,0.78)" }}>
                        {step}
                      </span>
                      {i < selected.pathway.length - 1 && (
                        <ArrowRight size={13} className="hidden sm:block" style={{ color: "rgba(200,146,122,0.4)" }} />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Join form ── */}
      <section id="join-form" className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #f0e4d4 0%, #e8d8c0 60%, #ecddc8 100%)" }}>
        <div className="absolute inset-0 paper-texture opacity-60" />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp(0)} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Ornament className="text-[#c8927a]/50 w-24" />
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
                Almost There
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#3d2214" }}>
              Fill In Your Details
            </h2>
            <p className="text-base"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.6)" }}>
              We'll be in touch within 48 hours to welcome you personally.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <AnimatePresence mode="wait">

              {/* ── Success ── */}
              {submitted ? (
                <motion.div
                  key="done"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="rounded-3xl p-14 text-center"
                  style={{
                    background: "rgba(255,252,248,0.92)",
                    border: "1px solid rgba(140,180,140,0.28)",
                    boxShadow: "0 4px 30px rgba(140,180,140,0.08)",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", damping: 14 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-7"
                    style={{ background: "rgba(140,180,140,0.12)", border: "2px solid rgba(140,180,140,0.3)" }}
                  >
                    <Check size={32} style={{ color: "#6a9868" }} />
                  </motion.div>
                  <h3 className="text-3xl font-semibold mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#3d2214" }}>
                    Welcome to the Movement!
                  </h3>
                  <p className="text-base max-w-sm mx-auto leading-relaxed mb-8"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.6)" }}>
                    {form.firstName}, we're so glad you're here. Gontse or a team member will reach out to you at{" "}
                    <strong style={{ fontWeight: 500 }}>{form.email}</strong> very soon.
                  </p>
                  <div className="rounded-2xl px-8 py-6 mx-auto max-w-sm"
                    style={{ background: "linear-gradient(145deg, #3d2214, #5a3020)" }}>
                    <div className="h-0.5 gold-line -mx-8 -mt-6 mb-5 rounded-t-2xl" />
                    <p className="italic text-sm leading-relaxed"
                      style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "rgba(232,196,160,0.85)" }}>
                      "He shall be like a tree planted by rivers of water… and whatsoever he doeth shall prosper."
                    </p>
                    <p className="text-[10px] font-medium uppercase tracking-widest mt-3"
                      style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(200,146,122,0.55)" }}>
                      Psalm 1:3
                    </p>
                  </div>
                </motion.div>

              ) : (

                /* ── Form ── */
                <motion.div
                  key="form"
                  className="rounded-3xl overflow-hidden"
                  style={{
                    background: "rgba(255,252,248,0.92)",
                    border: "1px solid rgba(200,146,122,0.18)",
                    boxShadow: "0 4px 30px rgba(90,48,32,0.07)",
                  }}
                >
                  {/* form header — mahogany */}
                  <div className="relative overflow-hidden px-8 py-6"
                    style={{ background: "linear-gradient(145deg, #3d2214, #5a3020)" }}>
                    <div className="absolute inset-0 paper-texture opacity-60" />
                    <div className="absolute top-0 left-0 right-0 h-0.5 gold-line" />
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <Ornament className="text-[#c8927a]/40 w-16" />
                          <p className="text-[9px] font-medium uppercase tracking-[0.28em]"
                            style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#e0b090" }}>
                            Join
                          </p>
                        </div>
                        <h3 className="text-white text-xl font-semibold"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                          Your Information
                        </h3>
                        <p className="text-xs mt-1"
                          style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.42)" }}>
                          Joining as:{" "}
                          <span style={{ color: "#e8c4a0", fontWeight: 400 }}>{selected?.title}</span>
                        </p>
                      </div>
                      <span className="text-3xl">{selected?.emoji}</span>
                    </div>
                  </div>

                  <div className="p-8 space-y-5">

                    {/* Name row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { field: "firstName", label: "First Name *", placeholder: "First name" },
                        { field: "lastName",  label: "Last Name",    placeholder: "Last name" },
                      ].map(({ field, label, placeholder }) => (
                        <div key={field}>
                          <label className="text-[10px] font-medium uppercase tracking-[0.2em] block mb-1.5"
                            style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.45)" }}>
                            {label}
                          </label>
                          <input
                            value={form[field]}
                            onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                            placeholder={placeholder}
                            style={inputStyle}
                            onFocus={focusBorder} onBlur={blurBorder}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Email + Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { field: "email", label: "Email Address *", placeholder: "your@email.com", type: "email" },
                        { field: "phone", label: "Phone Number",     placeholder: "+1 (000) 000-0000", type: "tel" },
                      ].map(({ field, label, placeholder, type }) => (
                        <div key={field}>
                          <label className="text-[10px] font-medium uppercase tracking-[0.2em] block mb-1.5"
                            style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.45)" }}>
                            {label}
                          </label>
                          <input
                            type={type}
                            value={form[field]}
                            onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                            placeholder={placeholder}
                            style={inputStyle}
                            onFocus={focusBorder} onBlur={blurBorder}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Country + Age */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { field: "country", label: "Country",  placeholder: "Where are you based?", type: "text" },
                        { field: "age",     label: "Age",      placeholder: "Your age",              type: "number" },
                      ].map(({ field, label, placeholder, type }) => (
                        <div key={field}>
                          <label className="text-[10px] font-medium uppercase tracking-[0.2em] block mb-1.5"
                            style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.45)" }}>
                            {label}
                          </label>
                          <input
                            type={type}
                            value={form[field]}
                            onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                            placeholder={placeholder}
                            style={inputStyle}
                            onFocus={focusBorder} onBlur={blurBorder}
                          />
                        </div>
                      ))}
                    </div>

                    {/* How did you hear */}
                    <div>
                      <label className="text-[10px] font-medium uppercase tracking-[0.2em] block mb-1.5"
                        style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.45)" }}>
                        How Did You Hear About Us?
                      </label>
                      <input
                        value={form.how}
                        onChange={e => setForm(f => ({ ...f, how: e.target.value }))}
                        placeholder="Social media, a friend, an event…"
                        style={inputStyle}
                        onFocus={focusBorder} onBlur={blurBorder}
                      />
                    </div>

                    {/* About */}
                    <div>
                      <label className="text-[10px] font-medium uppercase tracking-[0.2em] block mb-1.5"
                        style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.45)" }}>
                        A Little About You (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={form.about}
                        onChange={e => setForm(f => ({ ...f, about: e.target.value }))}
                        placeholder="Share a bit about where you are in your faith journey, what you're looking for, or anything else…"
                        style={{ ...inputStyle, resize: "none", lineHeight: "1.85", fontFamily: "'EB Garamond', Georgia, serif" }}
                        onFocus={focusBorder} onBlur={blurBorder}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={!form.firstName || !form.email}
                      className="w-full py-5 rounded-2xl font-medium text-white text-sm flex items-center justify-center gap-2.5 transition-all"
                      style={{
                        fontFamily: "'Jost', system-ui, sans-serif",
                        background: (form.firstName && form.email)
                          ? "linear-gradient(145deg, #3d2214, #5a3020)"
                          : "rgba(90,48,32,0.22)",
                        boxShadow: (form.firstName && form.email)
                          ? "0 8px 28px rgba(61,34,20,0.22)"
                          : "none",
                        cursor: (!form.firstName || !form.email) ? "not-allowed" : "pointer",
                      }}
                      onMouseEnter={e => { if (form.firstName && form.email) e.currentTarget.style.transform = "scale(1.02)"; }}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    >
                      <Flame size={16} className="fill-current" />
                      Join the Movement
                    </motion.button>

                    <p className="text-[10px] text-center"
                      style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.38)" }}>
                      * Required fields · Your information is kept private
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Stats strip — terracotta gradient, matches Programs/Give CTA ── */}
      <section className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #c8927a 0%, #d4a882 45%, #c0927a 100%)" }}>
        <div className="absolute inset-0 paper-texture opacity-40" />
        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.12]" viewBox="0 0 1400 80" fill="none" preserveAspectRatio="none">
          <path d="M0 80 L350 50 L700 0 L1050 50 L1400 80" stroke="white" strokeWidth="1.5" fill="none"/>
        </svg>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { val: "12K+", label: "Young Believers" },
              { val: "40+",  label: "Nations" },
              { val: "300+", label: "Prayer Warriors" },
              { val: "6",    label: "Active Programmes" },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)}>
                <p className="text-4xl font-semibold text-white"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {s.val}
                </p>
                <p className="text-xs font-medium uppercase tracking-widest mt-1"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(255,255,255,0.6)" }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Join;