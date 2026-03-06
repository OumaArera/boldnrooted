import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, Globe, BookOpen, Users, Check, ChevronDown } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

const TIERS = [
  {
    id: "seed",
    label: "Seed Giver",
    amount: 10,
    emoji: "🌱",
    gradient: "linear-gradient(145deg, #2a4a2a, #3a6a3a)",
    accent: "#6a9868",
    impact: "Provides one week of daily devotional resources for a young believer.",
    perks: ["Monthly prayer letter", "Digital devotional access"],
  },
  {
    id: "root",
    label: "Root Partner",
    amount: 50,
    emoji: "🌿",
    gradient: "linear-gradient(145deg, #5a3020, #8b5a3a)",
    accent: "#c8927a",
    impact: "Sponsors one module in the Eagles Rising discipleship track.",
    perks: ["Monthly prayer letter", "Digital devotional access", "Quarterly impact report", "Partner newsletter"],
    popular: true,
  },
  {
    id: "eagle",
    label: "Eagle Supporter",
    amount: 100,
    emoji: "🦅",
    gradient: "linear-gradient(145deg, #3d2214, #6b3a1a)",
    accent: "#d4a882",
    impact: "Sends one young adult on a short-term mission trip preparation week.",
    perks: ["All Root Partner perks", "Named in annual report", "Invitation to Partner Calls", "Personal thank-you from Gontse"],
  },
  {
    id: "covenant",
    label: "Covenant Giver",
    amount: 250,
    emoji: "🔥",
    gradient: "linear-gradient(145deg, #1a2a5a, #2a3a7a)",
    accent: "#88aadd",
    impact: "Fully sponsors one young adult through the complete Eagles Rising programme.",
    perks: ["All Eagle Supporter perks", "Video impact update", "Monthly 1:1 prayer call with team", "Legacy wall recognition"],
  },
];

const IMPACT_AREAS = [
  { icon: BookOpen, title: "Scripture Resources", desc: "Bible study guides, devotionals, and theological training materials for young believers globally.", stat: "3,000+", statLabel: "resources distributed" },
  { icon: Users, title: "Discipleship Programmes", desc: "Full sponsorship of Eagles Rising tracks, Women of Valor cohorts, and Men of Covenant groups.", stat: "200+", statLabel: "disciples trained" },
  { icon: Globe, title: "Global Missions", desc: "Deploying young missionaries into unreached communities across Africa, Europe, and beyond.", stat: "12+", statLabel: "nations reached" },
  { icon: Heart, title: "Community Events", desc: "Prayer nights, youth conferences, and retreats that become life-changing encounters with God.", stat: "40+", statLabel: "events hosted" },
];

const FAQ = [
  { q: "Is my gift tax-deductible?", a: "Bold and Rooted is a registered faith-based non-profit organisation. Depending on your country of residence, your gift may be eligible for a tax deduction. Please consult your local tax advisor for details." },
  { q: "How is my donation used?", a: "85% of every gift goes directly into ministry programmes — discipleship, missions, events, and resources. 15% covers operational costs to keep the ministry running effectively." },
  { q: "Can I give a one-time gift?", a: "Absolutely. You can choose any amount and give as a one-time offering. Monthly giving helps us plan ahead and sustain consistent impact, but all gifts are welcome." },
  { q: "Can I sponsor a specific programme or person?", a: "Yes! Reach out to us directly at gontse@boldnrooted.org and we can arrange designated giving toward a specific programme, mission team, or individual in discipleship." },
  { q: "Do you accept international donations?", a: "Yes. We accept donations from supporters around the world. Currency options and payment methods vary by region — contact us if you need assistance." },
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

const Give = () => {
  const [selected, setSelected] = useState("root");
  const [frequency, setFrequency] = useState("monthly");
  const [customAmount, setCustomAmount] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const selectedTier = TIERS.find(t => t.id === selected);

  const handleGive = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

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
                        Partner With the Mission
                      </span>
                    </div>
                    <h1 className="leading-none tracking-tight mb-5"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: "#3d2214" }}>
                      <span className="block" style={{ fontSize: "clamp(3rem,7vw,5.5rem)" }}>Plant a Seed,</span>
                      <span className="block" style={{ fontSize: "clamp(3rem,7vw,5.5rem)", color: "#c8927a" }}>Change a Life.</span>
                    </h1>
                    <p className="text-base max-w-lg leading-relaxed"
                      style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.6)" }}>
                      Every gift is an act of faith. Your generosity makes discipleship tracks, missions, and life-changing encounters with God possible for young believers around the world.
                    </p>
                  </motion.div>
                </div>
              </section>
      
      {/* ── Giving form ── */}
      <section className="py-20 parchment-bg">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* Left — form */}
            <div className="lg:col-span-3">
              <motion.div {...fadeUp(0)}>

                <div className="flex items-center gap-3 mb-2">
                  <Ornament className="text-[#c8927a]/50 w-20" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.28em] whitespace-nowrap"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
                    Your Gift
                  </span>
                </div>
                <h2 className="text-3xl font-semibold mb-8" style={{ color: "#3d2214" }}>
                  Choose Your Gift
                </h2>

                {/* Frequency toggle */}
                <div className="flex gap-1.5 mb-8 p-1 rounded-2xl w-fit"
                  style={{ background: "rgba(200,146,122,0.10)", border: "1px solid rgba(200,146,122,0.18)" }}>
                  {["monthly", "one-time"].map(f => (
                    <button key={f} onClick={() => setFrequency(f)}
                      className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={{
                        fontFamily: "'Jost', system-ui, sans-serif",
                        background: frequency === f ? "linear-gradient(145deg, #3d2214, #5a3020)" : "transparent",
                        color: frequency === f ? "#e8c4a0" : "rgba(90,58,40,0.55)",
                        boxShadow: frequency === f ? "0 4px 14px rgba(61,34,20,0.2)" : "none",
                      }}>
                      {f === "monthly" ? "Monthly" : "One-Time"}
                    </button>
                  ))}
                </div>

                {/* Tier cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {TIERS.map(tier => {
                    const isSelected = selected === tier.id;
                    return (
                      <button key={tier.id} onClick={() => { setSelected(tier.id); setCustomAmount(""); }}
                        className="relative text-left rounded-2xl p-5 transition-all"
                        style={{
                          background: isSelected ? "rgba(255,252,248,0.95)" : "rgba(255,252,248,0.65)",
                          border: isSelected ? "1px solid rgba(200,146,122,0.5)" : "1px solid rgba(200,146,122,0.18)",
                          boxShadow: isSelected ? "0 4px 24px rgba(90,48,32,0.10)" : "none",
                        }}
                      >
                        {tier.popular && (
                          <div className="absolute -top-2.5 left-4 text-white text-[9px] font-medium uppercase tracking-widest px-2.5 py-1 rounded-full"
                            style={{ fontFamily: "'Jost', system-ui, sans-serif", background: "linear-gradient(135deg, #c8927a, #b8775a)" }}>
                            Most Popular
                          </div>
                        )}
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3"
                          style={{ background: tier.gradient }}>
                          {tier.emoji}
                        </div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.18em] mb-0.5"
                          style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.5)" }}>
                          {tier.label}
                        </p>
                        <p className="text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#3d2214" }}>
                          ${tier.amount}
                          <span className="text-sm font-normal" style={{ color: "rgba(90,58,40,0.4)" }}>
                            /{frequency === "monthly" ? "mo" : "once"}
                          </span>
                        </p>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: "#c8927a" }}
                          >
                            <Check size={10} className="text-white" />
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Custom amount */}
                <div className="mb-8">
                  <label className="text-[10px] font-medium uppercase tracking-widest block mb-2"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.45)" }}>
                    Or enter a custom amount (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold"
                      style={{ color: "rgba(90,58,40,0.45)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={e => { setCustomAmount(e.target.value); setSelected(null); }}
                      className="w-full pl-8 pr-4 py-3.5 rounded-2xl text-lg font-semibold outline-none transition"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        background: "rgba(255,252,248,0.9)",
                        border: "1px solid rgba(200,146,122,0.22)",
                        color: "#3d2214",
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = "rgba(200,146,122,0.55)"}
                      onBlur={e => e.currentTarget.style.borderColor = "rgba(200,146,122,0.22)"}
                    />
                  </div>
                </div>

                {/* Give button */}
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 justify-center py-5 rounded-2xl"
                      style={{ background: "rgba(140,180,140,0.12)", border: "1px solid rgba(140,180,140,0.3)" }}
                    >
                      <Check size={20} style={{ color: "#6a9868" }} />
                      <span className="font-medium text-sm" style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#6a9868" }}>
                        Thank you! Redirecting to payment…
                      </span>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGive}
                      className="w-full py-5 rounded-2xl font-medium text-white text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                      style={{
                        fontFamily: "'Jost', system-ui, sans-serif",
                        background: "linear-gradient(135deg, #c8927a 0%, #b8775a 50%, #3d2214 100%)",
                        boxShadow: "0 8px 32px rgba(200,146,122,0.28)",
                      }}
                    >
                      <Heart size={17} className="fill-current" />
                      Give ${customAmount || selectedTier?.amount || "—"} {frequency === "monthly" ? "/ Month" : "Today"}
                    </motion.button>
                  )}
                </AnimatePresence>

                <p className="text-[10px] text-center mt-3"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.38)" }}>
                  🔒 Secure payment · SSL encrypted · Cancel anytime
                </p>
              </motion.div>
            </div>

            {/* Right — impact sidebar */}
            <motion.div {...fadeUp(0.15)} className="lg:col-span-2 space-y-5">

              <AnimatePresence mode="wait">
                {selectedTier && (
                  <motion.div
                    key={selectedTier.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="rounded-3xl overflow-hidden"
                    style={{ border: "1px solid rgba(200,146,122,0.18)" }}
                  >
                    {/* top accent */}
                    <div className="h-0.5 gold-line" />

                    {/* impact header */}
                    <div className="relative overflow-hidden p-7"
                      style={{ background: selectedTier.gradient }}>
                      <div className="absolute inset-0 paper-texture opacity-60" />
                      <div className="absolute inset-0 opacity-[0.07]"
                        style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 0%, transparent 50%)" }} />
                      <p className="text-[9px] font-medium uppercase tracking-[0.25em] mb-3 relative z-10"
                        style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(232,196,160,0.65)" }}>
                        Your Impact
                      </p>
                      <p className="text-white text-base font-medium leading-relaxed relative z-10"
                        style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                        {selectedTier.impact}
                      </p>
                    </div>

                    {/* perks */}
                    <div className="p-6" style={{ background: "rgba(255,252,248,0.9)" }}>
                      <p className="text-[9px] font-medium uppercase tracking-[0.25em] mb-4"
                        style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.4)" }}>
                        {selectedTier.label} Perks
                      </p>
                      <div className="space-y-2.5">
                        {selectedTier.perks.map((p, i) => (
                          <div key={i} className="flex items-center gap-2.5">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                              style={{ background: `${selectedTier.accent}22` }}>
                              <Check size={9} style={{ color: selectedTier.accent }} />
                            </div>
                            <span className="text-xs" style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.72)" }}>
                              {p}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* contact for larger gifts */}
              <div className="rounded-3xl p-6"
                style={{ background: "rgba(200,146,122,0.08)", border: "1px solid rgba(200,146,122,0.18)" }}>
                <p className="text-sm font-semibold mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#3d2214" }}>
                  Planning a larger gift?
                </p>
                <p className="text-xs leading-relaxed mb-3"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.62)" }}>
                  Reach out to Gontse directly to discuss legacy giving, designated funds, or partnership.
                </p>
                <a href="mailto:gontse@boldnrooted.org"
                  className="text-xs font-medium transition"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#c8927a" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#3d2214"}
                  onMouseLeave={e => e.currentTarget.style.color = "#c8927a"}>
                  gontse@boldnrooted.org →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Impact areas ── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #3d2214 0%, #5a3020 55%, #3d2214 100%)" }}>

        <div className="absolute inset-0 paper-texture opacity-40" />

        {/* watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.04)", whiteSpace: "nowrap" }}>
            FRUCTUS
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-5">
              <Ornament className="text-[#c8927a]/40 w-28" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#e0b090" }}>
                Where Your Gift Goes
              </span>
              <Ornament className="text-[#c8927a]/40 w-28" />
            </div>
            <h2 className="text-4xl sm:text-5xl text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              Rooted in Real Impact
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {IMPACT_AREAS.map((area, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)}
                className="rounded-2xl p-6 transition-all"
                style={{
                  background: "rgba(253,246,240,0.05)",
                  border: "1px solid rgba(200,146,122,0.15)",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(253,246,240,0.08)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.38)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(253,246,240,0.05)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.15)"; }}
              >
                <area.icon size={20} className="mb-4" style={{ color: "#e8c4a0" }} />
                <h3 className="font-semibold text-base mb-2 text-white"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {area.title}
                </h3>
                <p className="text-xs leading-relaxed mb-5"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.42)" }}>
                  {area.desc}
                </p>
                <div className="pt-4" style={{ borderTop: "1px solid rgba(200,146,122,0.15)" }}>
                  <p className="text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#e8c4a0" }}>
                    {area.stat}
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-widest mt-0.5"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(255,255,255,0.35)" }}>
                    {area.statLabel}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 parchment-bg">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Ornament className="text-[#c8927a]/50 w-24" />
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
                Your Questions
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold" style={{ color: "#3d2214" }}>
              Giving Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.06)}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 rounded-2xl text-left transition-all"
                  style={{
                    background: "rgba(255,252,248,0.88)",
                    border: openFaq === i ? "1px solid rgba(200,146,122,0.38)" : "1px solid rgba(200,146,122,0.18)",
                    borderRadius: openFaq === i ? "1rem 1rem 0 0" : "1rem",
                    boxShadow: openFaq === i ? "0 4px 20px rgba(90,48,32,0.07)" : "none",
                  }}
                >
                  <span className="font-semibold text-sm" style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#3d2214" }}>
                    {item.q}
                  </span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={17} style={{ color: "rgba(200,146,122,0.6)", flexShrink: 0 }} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 -mt-px"
                        style={{
                          background: "rgba(255,252,248,0.88)",
                          border: "1px solid rgba(200,146,122,0.38)",
                          borderTop: "none",
                          borderRadius: "0 0 1rem 1rem",
                        }}>
                        <div className="h-px mb-4" style={{ background: "rgba(200,146,122,0.12)" }} />
                        <p className="text-sm leading-relaxed"
                          style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "rgba(90,58,40,0.72)" }}>
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #c8927a 0%, #d4a882 45%, #c0927a 100%)" }}>
        <div className="absolute inset-0 paper-texture opacity-40" />
        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.12]" viewBox="0 0 1400 110" fill="none" preserveAspectRatio="none">
          <path d="M0 110 L350 70 L700 0 L1050 70 L1400 110" stroke="white" strokeWidth="1.5" fill="none"/>
        </svg>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <Ornament className="text-white/30 w-40 mx-auto mb-8" />
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] mb-6 text-white/60"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              Every gift matters
            </p>
            <h2 className="text-4xl sm:text-5xl text-white leading-tight mb-4"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              Ready to Partner<br />
              <em className="italic font-normal">with the Mission?</em>
            </h2>
            <p className="text-white/60 text-base max-w-lg mx-auto mb-10 leading-relaxed"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
              Join a community of faithful givers planting seeds of faith in the next generation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleGive}
                className="flex items-center gap-2.5 px-9 py-4 rounded-full font-medium text-sm tracking-wide hover:scale-[1.03] transition-all shadow-2xl"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  background: "#fff",
                  color: "#7a4a32",
                  boxShadow: "0 12px 40px rgba(90,48,32,0.22)",
                }}
              >
                <Heart size={14} className="fill-current" /> Give Now
              </button>
              <Link to="/programs"
                className="flex items-center gap-2.5 px-9 py-4 rounded-full font-medium text-sm tracking-wide border-2 text-white transition hover:border-white/60"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", borderColor: "rgba(255,255,255,0.3)" }}>
                See Our Programmes <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Give;