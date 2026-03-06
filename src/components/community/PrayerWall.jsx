import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Flame, Shield, Clock, Check, ChevronDown, HandHeart, Users, X } from "lucide-react";

const CATEGORIES = ["Healing", "Provision", "Family", "Direction", "Salvation", "Breakthrough", "Praise", "Protection"];

const PRAYER_REQUESTS = [
  { id: 1, name: "Ama K.", location: "Accra, Ghana", category: "Healing", time: "2 hours ago", text: "Please pray for my mother's complete recovery from her surgery. The doctors say she needs a miracle. I believe God is able.", prayed: 47, anonymous: false, answered: false },
  { id: 2, name: "Anonymous", location: "Atlanta, USA", category: "Direction", time: "5 hours ago", text: "I am at a crossroads in my life — between two cities, two careers. I need God to speak clearly. Please stand with me.", prayed: 31, anonymous: true, answered: false },
  { id: 3, name: "Emmanuel A.", location: "Lagos, Nigeria", category: "Salvation", time: "8 hours ago", text: "My brother has been away from the faith for 4 years. I am believing for a prodigal son moment. Please intercede.", prayed: 89, anonymous: false, answered: false },
  { id: 4, name: "Miriam O.", location: "Nairobi, Kenya", category: "Praise", time: "Yesterday", text: "ANSWERED PRAYER! God came through on my visa application after months of waiting. He is faithful! Sharing for His glory.", prayed: 124, anonymous: false, answered: true },
  { id: 5, name: "Anonymous", location: "London, UK", category: "Breakthrough", time: "Yesterday", text: "Facing a financial mountain — bills, loans, and no job for 7 months. I'm trusting God but I need the body of Christ to stand with me.", prayed: 56, anonymous: true, answered: false },
  { id: 6, name: "Joshua M.", location: "Kumasi, Ghana", category: "Family", time: "2 days ago", text: "Our family is going through a painful season of conflict. Pray for restoration, forgiveness, and the peace of God to reign.", prayed: 73, anonymous: false, answered: false },
  { id: 7, name: "Grace W.", location: "Accra, Ghana", category: "Protection", time: "3 days ago", text: "Traveling for mission work in a difficult region. Please cover our team in prayer — safety, favour, and open doors.", prayed: 112, anonymous: false, answered: false },
  { id: 8, name: "Daniel P.", location: "Toronto, Canada", category: "Provision", time: "3 days ago", text: "Grad school fees are due and I have nothing. I believe in Jehovah Jireh. Please agree with me in faith.", prayed: 44, anonymous: false, answered: false },
];

// Aligned with Discipleship's warm mahogany/terracotta palette
const CATEGORY_COLORS = {
  Healing:     { bg: "rgba(200,146,122,0.10)", text: "#c8927a",  dot: "#c8927a" },
  Provision:   { bg: "rgba(196,168,130,0.12)", text: "#b09070",  dot: "#c4a882" },
  Family:      { bg: "rgba(212,168,140,0.12)", text: "#c4885a",  dot: "#d4a882" },
  Direction:   { bg: "rgba(168,154,180,0.12)", text: "#8878a0",  dot: "#a89ab4" },
  Salvation:   { bg: "rgba(140,106,168,0.10)", text: "#7a5a90",  dot: "#a07ab4" },
  Breakthrough:{ bg: "rgba(200,146,122,0.08)", text: "#b07848",  dot: "#c8927a" },
  Praise:      { bg: "rgba(140,180,140,0.12)", text: "#6a9868",  dot: "#8ab888" },
  Protection:  { bg: "rgba(90,58,40,0.08)",    text: "#7a5a40",  dot: "#9a7a60" },
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

const PrayerCard = ({ req, onPray }) => {
  const [prayed, setPrayed] = useState(false);
  const col = CATEGORY_COLORS[req.category] || CATEGORY_COLORS.Breakthrough;

  const handlePray = () => {
    if (prayed) return;
    setPrayed(true);
    onPray(req.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden transition-all"
      style={{
        background: "rgba(255,252,248,0.88)",
        borderRadius: "1.5rem",
        border: req.answered
          ? "1px solid rgba(140,180,140,0.35)"
          : "1px solid rgba(200,146,122,0.18)",
        boxShadow: req.answered
          ? "0 2px 20px rgba(140,180,140,0.10)"
          : "0 2px 16px rgba(90,48,32,0.06)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* top accent line */}
      <div className="h-0.5" style={{
        background: req.answered
          ? "linear-gradient(90deg, transparent, #8ab888, transparent)"
          : "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, transparent)"
      }} />

      <div className="p-6">
        {/* header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{
                background: req.answered
                  ? "linear-gradient(145deg, #6a9868, #8ab888)"
                  : "linear-gradient(145deg, #5a3020, #8b5a3a)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {req.anonymous ? "?" : req.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#3d2214", fontFamily: "'Jost', system-ui, sans-serif" }}>
                {req.name}
              </p>
              <p className="text-[10px]" style={{ color: "rgba(90,58,40,0.42)", fontFamily: "'Jost', system-ui, sans-serif" }}>
                {req.location} · {req.time}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            {req.answered && (
              <span
                className="text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  background: "rgba(140,180,140,0.15)",
                  color: "#6a9868",
                  border: "1px solid rgba(140,180,140,0.3)",
                }}
              >
                Answered ✓
              </span>
            )}
            <span
              className="text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                background: col.bg,
                color: col.text,
                border: `1px solid ${col.dot}30`,
              }}
            >
              {req.category}
            </span>
          </div>
        </div>

        {/* prayer text */}
        <p
          className="text-sm leading-[1.85] mb-5"
          style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "rgba(90,58,40,0.78)" }}
        >
          {req.text}
        </p>

        {/* footer */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(90,58,40,0.38)", fontFamily: "'Jost', system-ui, sans-serif" }}>
            <Flame size={12} style={{ color: "#c8927a" }} />
            {req.prayed + (prayed ? 1 : 0)} praying
          </span>

          <button
            onClick={handlePray}
            disabled={prayed}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all"
            style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              ...(prayed
                ? {
                    background: "rgba(140,180,140,0.12)",
                    color: "#6a9868",
                    border: "1px solid rgba(140,180,140,0.3)",
                  }
                : {
                    background: "rgba(200,146,122,0.10)",
                    color: "#8b5a3a",
                    border: "1px solid rgba(200,146,122,0.28)",
                  }),
            }}
            onMouseEnter={e => { if (!prayed) { e.currentTarget.style.background = "#c8927a"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.border = "1px solid #c8927a"; } }}
            onMouseLeave={e => { if (!prayed) { e.currentTarget.style.background = "rgba(200,146,122,0.10)"; e.currentTarget.style.color = "#8b5a3a"; e.currentTarget.style.border = "1px solid rgba(200,146,122,0.28)"; } }}
          >
            {prayed ? <><Check size={12} /> Prayed</> : <><HandHeart size={12} /> Pray</>}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const PrayerWall = () => {
  const [requests, setRequests] = useState(PRAYER_REQUESTS);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", location: "", category: "Healing", text: "", anonymous: false });

  const filtered = filter === "All"
    ? requests
    : filter === "Answered"
    ? requests.filter(r => r.answered)
    : requests.filter(r => r.category === filter);

  const handlePray = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, prayed: r.prayed + 1 } : r));
  };

  const handleSubmit = () => {
    if (!form.text.trim()) return;
    const newReq = {
      id: Date.now(),
      name: form.anonymous ? "Anonymous" : (form.name || "Anonymous"),
      location: form.location || "Global",
      category: form.category,
      time: "Just now",
      text: form.text,
      prayed: 0,
      anonymous: form.anonymous,
      answered: false,
    };
    setRequests(prev => [newReq, ...prev]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setForm({ name: "", location: "", category: "Healing", text: "", anonymous: false });
    }, 2500);
  };

  const allFilters = ["All", "Answered", ...CATEGORIES];
  const totalPraying = requests.reduce((acc, r) => acc + r.prayed, 0);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&family=EB+Garamond:ital,wght@0,400;1,400&display=swap');
        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
        }
        .parchment-bg {
          background-color: #fdf6f0;
          background-image:
            radial-gradient(ellipse at 20% 50%, rgba(212,168,140,0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(200,146,122,0.06) 0%, transparent 50%);
        }
      `}</style>

      {/* ── Hero — deep mahogany, matches Discipleship dark section ── */}
      <section
  className="relative min-h-[62vh] flex items-end overflow-hidden pb-20"
  style={{ background: "linear-gradient(160deg, #f5e8da 0%, #ecddc8 60%, #f0e0ce 100%)" }}
>
  <div className="absolute inset-0 paper-texture opacity-60" />

  {/* top accent line */}
  <div className="absolute top-0 left-0 right-0 h-0.5"
    style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, #c8927a, transparent)" }} />

  {/* watermark */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
    <span className="text-[16vw] font-bold leading-none"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.06)", whiteSpace: "nowrap" }}>
      ORATIO
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

      {/* ornament + label */}
      <div className="flex items-center gap-4 mb-6">
        <Ornament className="text-[#c8927a]/50 w-28" />
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
          style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
          The Body of Christ
        </span>
      </div>

      <h1 className="leading-none tracking-tight mb-5"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: "#3d2214" }}>
        <span className="block" style={{ fontSize: "clamp(3rem,7vw,5.5rem)" }}>The</span>
        <span className="block" style={{ fontSize: "clamp(3rem,7vw,5.5rem)", color: "#c8927a" }}>Prayer Wall</span>
      </h1>

      <p className="text-base leading-relaxed max-w-xl mb-10"
        style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.6)" }}>
        Bring your burdens. Carry one another's. This is the place where the body of Christ stands together in faith, believing that God hears every prayer.
      </p>

      {/* live badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
        style={{ background: "rgba(200,146,122,0.10)", border: "1px solid rgba(200,146,122,0.28)" }}>
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#c8927a" }} />
        <span className="text-[10px] font-medium uppercase tracking-[0.22em]"
          style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
          Live · {requests.length} Requests · {totalPraying.toLocaleString()} Prayers Offered
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-3">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-7 py-4 rounded-full text-white font-medium text-sm transition-all hover:scale-[1.03]"
          style={{
            fontFamily: "'Jost', system-ui, sans-serif",
            background: "linear-gradient(145deg, #c8927a, #d4a882)",
            boxShadow: "0 8px 28px rgba(200,146,122,0.32)",
          }}
        >
          <Send size={14} /> Submit a Prayer Request
        </button>
          <a
          href="#wall"
          className="flex items-center gap-2 px-7 py-4 rounded-full font-medium text-sm transition"
          style={{
            fontFamily: "'Jost', system-ui, sans-serif",
            border: "1px solid rgba(200,146,122,0.35)",
            color: "rgba(90,58,40,0.6)",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8927a"; e.currentTarget.style.color = "#3d2214"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.35)"; e.currentTarget.style.color = "rgba(90,58,40,0.6)"; }}
        >
          <Shield size={14} /> Join in Prayer
        </a>
      </div>
    </motion.div>

    {/* verse footer */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="mt-16 pt-8"
      style={{ borderTop: "1px solid rgba(200,146,122,0.18)" }}
    >
      <p className="text-sm italic" style={{ color: "rgba(90,58,40,0.55)", fontFamily: "'EB Garamond', Georgia, serif" }}>
        "The effectual fervent prayer of a righteous man availeth much."
      </p>
      <p className="text-[10px] font-medium uppercase tracking-[0.25em] mt-2"
        style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
        — James 5:16
      </p>
    </motion.div>
  </div>
</section>

      {/* ── Wall section — parchment, matches Discipleship tracks section ── */}
      <section id="wall" className="parchment-bg py-16">
        <div className="max-w-6xl mx-auto px-6">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="flex items-center gap-4 mb-4">
              <Ornament className="text-[#c8927a]/50 w-24" />
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
                Interceding Together
              </span>
            </div>
          </motion.div>

          {/* Filter bar */}
          <div className="flex items-center gap-2.5 mb-10 overflow-x-auto pb-2">
            <span className="text-[10px] font-medium uppercase tracking-widest shrink-0"
              style={{ color: "rgba(90,58,40,0.4)", fontFamily: "'Jost', system-ui, sans-serif" }}>
              Filter:
            </span>
            {allFilters.map(f => {
              const col = CATEGORY_COLORS[f];
              const active = filter === f;
              return (
                <button key={f} onClick={() => setFilter(f)}
                  className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-medium uppercase tracking-widest transition-all"
                  style={{
                    fontFamily: "'Jost', system-ui, sans-serif",
                    background: active ? "linear-gradient(145deg, #5a3020, #8b5a3a)" : "rgba(255,252,248,0.88)",
                    color: active ? "#fff" : "rgba(90,58,40,0.65)",
                    border: active ? "1px solid #5a3020" : "1px solid rgba(200,146,122,0.22)",
                    boxShadow: active ? "0 4px 14px rgba(90,48,32,0.18)" : "none",
                  }}
                >
                  {col && (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: active ? "rgba(255,255,255,0.6)" : col.dot }} />
                  )}
                  {f}
                </button>
              );
            })}
          </div>

          {/* Prayer grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {filtered.map(req => (
                <PrayerCard key={req.id} req={req} onPray={handlePray} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Submit form modal ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(20,8,4,0.80)", backdropFilter: "blur(6px)" }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.93, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 20 }}
              transition={{ type: "spring", damping: 24, stiffness: 200 }}
              className="w-full max-w-lg overflow-hidden"
              style={{
                background: "#fdf6f0",
                borderRadius: "1.5rem",
                border: "1px solid rgba(200,146,122,0.22)",
                boxShadow: "0 24px 80px rgba(60,16,4,0.28)",
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* modal header — mahogany, matches Discipleship dark sections */}
              <div className="relative overflow-hidden p-7"
                style={{ background: "linear-gradient(160deg, #3d2214 0%, #5a3020 100%)" }}>
                <div className="absolute inset-0 opacity-[0.07]"
                  style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #d4a574 0%, transparent 50%)" }} />
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, transparent)" }} />
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Ornament className="text-[#c8927a]/50 w-16" />
                      <p className="text-[9px] font-medium uppercase tracking-[0.3em]"
                        style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#e0b090" }}>
                        The Prayer Wall
                      </p>
                    </div>
                    <h3 className="text-white text-2xl font-semibold"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                      Share Your Prayer Request
                    </h3>
                    <p className="text-xs mt-1"
                      style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.42)" }}>
                      The community will stand with you in prayer.
                    </p>
                  </div>
                  <button onClick={() => setShowForm(false)}
                    className="transition mt-1"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-7 space-y-5">
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center py-10 text-center"
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                      style={{ background: "rgba(140,180,140,0.12)", border: "2px solid rgba(140,180,140,0.3)" }}>
                      <Check size={28} style={{ color: "#6a9868" }} />
                    </div>
                    <h4 className="text-xl font-semibold mb-2" style={{ color: "#3d2214", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                      Prayer Request Submitted
                    </h4>
                    <p className="text-sm" style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.6)" }}>
                      Your request has been added to the wall. The community is already praying.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* anonymous toggle */}
                    <div className="flex items-center justify-between p-4 rounded-2xl"
                      style={{ background: "rgba(200,146,122,0.08)", border: "1px solid rgba(200,146,122,0.18)" }}>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "#3d2214", fontFamily: "'Jost', system-ui, sans-serif" }}>
                          Post Anonymously
                        </p>
                        <p className="text-xs" style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.5)" }}>
                          Your name will not be shown
                        </p>
                      </div>
                      <button
                        onClick={() => setForm(f => ({ ...f, anonymous: !f.anonymous }))}
                        className="w-12 h-6 rounded-full transition-all relative"
                        style={{ background: form.anonymous ? "#c8927a" : "rgba(90,58,40,0.18)" }}
                      >
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm"
                          style={{ left: form.anonymous ? "1.5rem" : "0.125rem" }} />
                      </button>
                    </div>

                    {!form.anonymous && (
                      <div className="grid grid-cols-2 gap-3">
                        {["name", "location"].map((field, i) => (
                          <input
                            key={field}
                            placeholder={field === "name" ? "Your name" : "Location (optional)"}
                            value={form[field]}
                            onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                            className="px-4 py-3 text-sm rounded-xl outline-none transition"
                            style={{
                              fontFamily: "'Jost', system-ui, sans-serif",
                              fontWeight: 300,
                              background: "rgba(255,252,248,0.95)",
                              border: "1px solid rgba(200,146,122,0.22)",
                              color: "#3d2214",
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* category */}
                    <div className="relative">
                      <select
                        value={form.category}
                        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                        className="w-full px-4 py-3 text-sm rounded-xl outline-none appearance-none transition"
                        style={{
                          fontFamily: "'Jost', system-ui, sans-serif",
                          fontWeight: 300,
                          background: "rgba(255,252,248,0.95)",
                          border: "1px solid rgba(200,146,122,0.22)",
                          color: "#3d2214",
                        }}
                      >
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: "rgba(90,58,40,0.4)" }} />
                    </div>

                    {/* prayer text */}
                    <textarea
                      placeholder="Share your prayer request… Be as specific as you feel comfortable sharing."
                      value={form.text}
                      onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                      rows={5}
                      className="w-full px-4 py-3 text-sm rounded-xl outline-none resize-none transition"
                      style={{
                        fontFamily: "'EB Garamond', Georgia, serif",
                        background: "rgba(255,252,248,0.95)",
                        border: "1px solid rgba(200,146,122,0.22)",
                        color: "#3d2214",
                        lineHeight: "1.85",
                      }}
                    />

                    <button
                      onClick={handleSubmit}
                      disabled={!form.text.trim()}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-medium text-sm text-white transition-all"
                      style={{
                        fontFamily: "'Jost', system-ui, sans-serif",
                        background: form.text.trim()
                          ? "linear-gradient(145deg, #5a3020, #8b5a3a)"
                          : "rgba(90,48,32,0.25)",
                        boxShadow: form.text.trim() ? "0 8px 24px rgba(90,48,32,0.22)" : "none",
                        cursor: form.text.trim() ? "pointer" : "not-allowed",
                      }}
                    >
                      <Send size={14} /> Submit Prayer Request
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrayerWall;