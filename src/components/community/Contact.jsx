import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Globe, Send, Check, MessageSquare, Users, BookOpen, Heart, ChevronDown } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

const REASONS = [
  { icon: Users,         label: "Join the Movement",     desc: "I want to get involved with Bold and Rooted" },
  { icon: BookOpen,      label: "Discipleship Inquiry",  desc: "Questions about programmes or tracks" },
  { icon: Heart,         label: "Partnership & Giving",  desc: "Supporting the mission financially" },
  { icon: Globe,         label: "Missions",              desc: "Short-term mission trips and outreach" },
  { icon: MessageSquare, label: "Speaking Invitation",   desc: "Inviting Gontse or the team to speak" },
  { icon: Send,          label: "General Inquiry",       desc: "Anything else on your heart" },
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

const inputBase = {
  fontFamily: "'Jost', system-ui, sans-serif",
  fontWeight: 300,
  background: "rgba(253,246,240,0.9)",
  border: "1px solid rgba(200,146,122,0.22)",
  color: "#3d2214",
  borderRadius: "0.75rem",
  width: "100%",
  padding: "0.75rem 1rem",
  outline: "none",
  fontSize: "0.875rem",
  transition: "border-color 0.2s",
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", reason: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reasonOpen, setReasonOpen] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  const selectedReason = REASONS.find(r => r.label === form.reason);

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
      `}</style>

      {/* ── Hero — parchment light, matches Programs hero ── */}
      <section
        className="relative min-h-[58vh] flex items-end overflow-hidden pb-20"
        style={{ background: "linear-gradient(160deg, #f5e8da 0%, #ecddc8 60%, #f0e0ce 100%)" }}
      >
        <div className="absolute inset-0 paper-texture opacity-60" />
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, #c8927a, transparent)" }} />

        {/* watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.06)", whiteSpace: "nowrap" }}>
            VERBUM
          </span>
        </div>

        {/* warm glow */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(200,146,122,0.12) 0%, transparent 70%)" }} />

        {/* root SVG */}
        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.08]" viewBox="0 0 1400 120" fill="none" preserveAspectRatio="none">
          <path d="M700 0 L650 30 L580 58 L490 85 L380 105 L250 116 L100 120 L0 120" stroke="#c8927a" strokeWidth="1.5" fill="none"/>
          <path d="M700 0 L750 30 L820 58 L910 85 L1020 105 L1150 116 L1300 120 L1400 120" stroke="#c8927a" strokeWidth="1.5" fill="none"/>
          <path d="M700 0 L695 40 L678 80 L654 108 L628 120" stroke="#e8c4a0" strokeWidth="0.8" fill="none"/>
          <path d="M700 0 L705 40 L722 80 L746 108 L772 120" stroke="#e8c4a0" strokeWidth="0.8" fill="none"/>
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 w-full">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="flex items-center gap-4 mb-6">
              <Ornament className="text-[#c8927a]/50 w-28" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
                We'd Love to Hear From You
              </span>
            </div>
            <h1 className="leading-none tracking-tight mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: "#3d2214" }}>
              <span className="block" style={{ fontSize: "clamp(3rem,7vw,5.5rem)" }}>Get in</span>
              <span className="block" style={{ fontSize: "clamp(3rem,7vw,5.5rem)", color: "#c8927a" }}>Touch</span>
            </h1>
            <p className="text-base max-w-lg leading-relaxed"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.6)" }}>
              Whether you're looking to join, give, ask a question, or just say hello — Gontse and the team are here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-20 parchment-bg">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-14">

          {/* Left — contact info */}
          <div className="lg:col-span-2 space-y-6">

            {/* Founder card — mahogany dark */}
            <motion.div {...fadeUp(0)}>
              <div className="rounded-3xl overflow-hidden"
                style={{ background: "linear-gradient(145deg, #3d2214, #5a3020)" }}>
                <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, transparent)" }} />
                <div className="p-8">
                  <p className="text-[9px] font-medium uppercase tracking-[0.3em] mb-6"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(200,146,122,0.55)" }}>
                    Founder & Executive Director
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl shrink-0"
                      style={{
                        background: "rgba(200,146,122,0.15)",
                        border: "1px solid rgba(200,146,122,0.25)",
                        color: "#e8c4a0",
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                      }}>
                      G
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-xl"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                        Gontse T.
                      </h3>
                      <p className="text-xs mt-0.5"
                        style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(200,146,122,0.55)" }}>
                        Bold & Rooted
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a href="mailto:gontse@boldnrooted.org"
                      className="flex items-center gap-3 text-sm transition group"
                      style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}
                      onMouseEnter={e => e.currentTarget.style.color = "#e8c4a0"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
                    >
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center transition"
                        style={{ background: "rgba(200,146,122,0.10)" }}>
                        <Mail size={13} style={{ color: "#c8927a" }} />
                      </div>
                      gontse@boldnrooted.org
                    </a>
                    <div className="flex items-center gap-3 text-sm"
                      style={{ color: "rgba(255,255,255,0.42)", fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(200,146,122,0.10)" }}>
                        <Globe size={13} style={{ color: "#c8927a" }} />
                      </div>
                      Global Ministry · Online & In-Person
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* We can help with */}
            <motion.div {...fadeUp(0.1)}>
              <div className="rounded-3xl p-7"
                style={{
                  background: "rgba(255,252,248,0.88)",
                  border: "1px solid rgba(200,146,122,0.18)",
                  boxShadow: "0 2px 16px rgba(90,48,32,0.05)",
                }}>
                <p className="text-[9px] font-medium uppercase tracking-[0.25em] mb-5"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.4)" }}>
                  We Can Help With
                </p>
                <div className="space-y-4">
                  {REASONS.slice(0, 4).map((r, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "rgba(200,146,122,0.10)" }}>
                        <r.icon size={13} style={{ color: "#c8927a" }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold leading-none mb-0.5"
                          style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#3d2214" }}>
                          {r.label}
                        </p>
                        <p className="text-[11px]"
                          style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.5)" }}>
                          {r.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Response time */}
            <motion.div {...fadeUp(0.15)}>
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl"
                style={{ background: "rgba(140,180,140,0.10)", border: "1px solid rgba(140,180,140,0.28)" }}>
                <div className="w-2 h-2 rounded-full bg-[#6a9868] animate-pulse shrink-0" />
                <p className="text-xs font-medium" style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#6a9868" }}>
                  We typically respond within 24–48 hours
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <motion.div {...fadeUp(0.1)}>
              <AnimatePresence mode="wait">

                {/* ── Success state ── */}
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center text-center py-20 rounded-3xl"
                    style={{
                      background: "rgba(255,252,248,0.9)",
                      border: "1px solid rgba(140,180,140,0.28)",
                      boxShadow: "0 4px 30px rgba(140,180,140,0.08)",
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", damping: 14 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-7"
                      style={{ background: "rgba(140,180,140,0.12)", border: "2px solid rgba(140,180,140,0.3)" }}
                    >
                      <Check size={32} style={{ color: "#6a9868" }} />
                    </motion.div>
                    <h3 className="text-2xl font-semibold mb-3" style={{ color: "#3d2214" }}>
                      Message Received!
                    </h3>
                    <p className="text-sm max-w-xs leading-relaxed"
                      style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.6)" }}>
                      Thank you for reaching out. Gontse or a member of the team will be in touch with you soon.
                    </p>

                    {/* verse block */}
                    <div className="mt-8 rounded-2xl px-6 py-5"
                      style={{ background: "rgba(200,146,122,0.08)", border: "1px solid rgba(200,146,122,0.18)" }}>
                      <p className="italic text-sm leading-relaxed"
                        style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "#7a4a32" }}>
                        "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you."
                      </p>
                      <p className="text-[10px] font-medium uppercase tracking-widest mt-3"
                        style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
                        — Matthew 7:7
                      </p>
                    </div>
                  </motion.div>

                ) : (

                  /* ── Form ── */
                  <motion.div
                    key="form"
                    className="rounded-3xl overflow-hidden"
                    style={{
                      background: "rgba(255,252,248,0.88)",
                      border: "1px solid rgba(200,146,122,0.18)",
                      boxShadow: "0 4px 30px rgba(90,48,32,0.07)",
                    }}
                  >
                    {/* form header — mahogany */}
                    <div className="relative overflow-hidden px-8 py-6"
                      style={{ background: "linear-gradient(145deg, #3d2214, #5a3020)" }}>
                      <div className="absolute inset-0 paper-texture opacity-60" />
                      <div className="absolute top-0 left-0 right-0 h-0.5"
                        style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, transparent)" }} />
                      <div className="relative z-10 flex items-center gap-3 mb-1">
                        <Ornament className="text-[#c8927a]/40 w-16" />
                        <p className="text-[9px] font-medium uppercase tracking-[0.28em]"
                          style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#e0b090" }}>
                          Contact
                        </p>
                      </div>
                      <h2 className="text-white text-xl font-semibold relative z-10"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                        Send a Message
                      </h2>
                      <p className="text-xs mt-1 relative z-10"
                        style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.42)" }}>
                        Fill in the form below and we'll get back to you
                      </p>
                    </div>

                    <div className="p-8 space-y-5">

                      {/* Name + Email */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          { field: "name", label: "Full Name *", placeholder: "Your full name", type: "text" },
                          { field: "email", label: "Email Address *", placeholder: "your@email.com", type: "email" },
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
                              style={inputBase}
                              onFocus={e => e.currentTarget.style.borderColor = "rgba(200,146,122,0.55)"}
                              onBlur={e => e.currentTarget.style.borderColor = "rgba(200,146,122,0.22)"}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="text-[10px] font-medium uppercase tracking-[0.2em] block mb-1.5"
                          style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.45)" }}>
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          placeholder="+1 (000) 000-0000"
                          style={inputBase}
                          onFocus={e => e.currentTarget.style.borderColor = "rgba(200,146,122,0.55)"}
                          onBlur={e => e.currentTarget.style.borderColor = "rgba(200,146,122,0.22)"}
                        />
                      </div>

                      {/* Reason dropdown */}
                      <div>
                        <label className="text-[10px] font-medium uppercase tracking-[0.2em] block mb-1.5"
                          style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.45)" }}>
                          What's This About?
                        </label>
                        <div className="relative">
                          <button
                            onClick={() => setReasonOpen(!reasonOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm text-left transition"
                            style={{
                              fontFamily: "'Jost', system-ui, sans-serif",
                              fontWeight: 300,
                              background: "rgba(253,246,240,0.9)",
                              border: reasonOpen ? "1px solid rgba(200,146,122,0.55)" : "1px solid rgba(200,146,122,0.22)",
                              color: form.reason ? "#3d2214" : "rgba(90,58,40,0.38)",
                            }}
                          >
                            <span style={{ fontWeight: form.reason ? 400 : 300 }}>
                              {form.reason || "Select a reason…"}
                            </span>
                            <motion.div animate={{ rotate: reasonOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                              <ChevronDown size={15} style={{ color: "rgba(200,146,122,0.6)" }} />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {reasonOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                                transition={{ duration: 0.18 }}
                                className="absolute left-0 right-0 top-full mt-2 rounded-2xl overflow-hidden z-20"
                                style={{
                                  background: "#fdf6f0",
                                  border: "1px solid rgba(200,146,122,0.22)",
                                  boxShadow: "0 8px 32px rgba(90,48,32,0.12)",
                                }}
                              >
                                <div className="h-0.5" style={{ background: "linear-gradient(90deg, #c8927a, #e8c4a0, #c8927a)" }} />
                                {REASONS.map(r => (
                                  <button key={r.label}
                                    onClick={() => { setForm(f => ({ ...f, reason: r.label })); setReasonOpen(false); }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition"
                                    style={{ fontFamily: "'Jost', system-ui, sans-serif" }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(200,146,122,0.08)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                  >
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                      style={{ background: "rgba(200,146,122,0.10)" }}>
                                      <r.icon size={13} style={{ color: "#c8927a" }} />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium" style={{ color: "#3d2214" }}>{r.label}</p>
                                      <p className="text-[11px]" style={{ fontWeight: 300, color: "rgba(90,58,40,0.5)" }}>{r.desc}</p>
                                    </div>
                                    {form.reason === r.label && (
                                      <Check size={13} style={{ color: "#c8927a", flexShrink: 0 }} />
                                    )}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="text-[10px] font-medium uppercase tracking-[0.2em] block mb-1.5"
                          style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.45)" }}>
                          Your Message *
                        </label>
                        <textarea
                          rows={5}
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          placeholder="Tell us what's on your heart…"
                          style={{ ...inputBase, resize: "none", fontFamily: "'EB Garamond', Georgia, serif", lineHeight: "1.85" }}
                          onFocus={e => e.currentTarget.style.borderColor = "rgba(200,146,122,0.55)"}
                          onBlur={e => e.currentTarget.style.borderColor = "rgba(200,146,122,0.22)"}
                        />
                      </div>

                      {/* Submit button */}
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={!form.name || !form.email || !form.message || loading}
                        className="w-full py-4 rounded-2xl font-medium text-white text-sm flex items-center justify-center gap-2 transition-all"
                        style={{
                          fontFamily: "'Jost', system-ui, sans-serif",
                          background: (form.name && form.email && form.message && !loading)
                            ? "linear-gradient(145deg, #3d2214, #5a3020)"
                            : "rgba(90,48,32,0.22)",
                          boxShadow: (form.name && form.email && form.message)
                            ? "0 8px 24px rgba(61,34,20,0.22)"
                            : "none",
                          cursor: (!form.name || !form.email || !form.message || loading) ? "not-allowed" : "pointer",
                        }}
                        onMouseEnter={e => { if (form.name && form.email && form.message && !loading) e.currentTarget.style.transform = "scale(1.02)"; }}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                      >
                        {loading ? (
                          <div className="w-4 h-4 rounded-full border-2 border-t-white animate-spin"
                            style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />
                        ) : (
                          <><Send size={14} /> Send Message</>
                        )}
                      </motion.button>

                      <p className="text-[10px] text-center"
                        style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.38)" }}>
                        * Required fields · We'll never share your information
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Verse strip — terracotta gradient, matches Home CTA sections ── */}
      <section className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #c8927a 0%, #d4a882 45%, #c0927a 100%)" }}>
        <div className="absolute inset-0 paper-texture opacity-40" />
        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.12]" viewBox="0 0 1400 80" fill="none" preserveAspectRatio="none">
          <path d="M0 80 L350 50 L700 0 L1050 50 L1400 80" stroke="white" strokeWidth="1.5" fill="none"/>
        </svg>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <Ornament className="text-white/30 w-40 mx-auto mb-6" />
            <p className="italic text-xl sm:text-2xl leading-relaxed text-white mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}>
              "Draw nigh to God, and he will draw nigh to you."
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(255,255,255,0.55)" }}>
              — James 4:8
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Contact;