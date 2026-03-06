import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Play, BookOpen, Calendar,
  Users, Heart, Globe, Star, ChevronRight, Quote
} from "lucide-react";

/* ─── animation helpers ─── */
const fadeUp = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

/* ─── data ─── */
const VERSES = [
  { ref: "Psalm 1:3", text: "He shall be like a tree planted by rivers of water, bearing fruit in season; his leaf shall not wither, and whatever he does shall prosper." },
  { ref: "Isaiah 40:31", text: "But those who wait on the Lord shall renew their strength; they shall mount up with wings like eagles, they shall run and not be weary." },
  { ref: "Joshua 1:9", text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." },
];

const PILLARS = [
  { icon: BookOpen, title: "Rooted in Scripture", desc: "Deep, disciplined engagement with the Word of God as the foundation for every decision and step of faith.", color: "from-[#c8927a] to-[#b87868]" },
  { icon: Users, title: "Community & Discipleship", desc: "Iron sharpens iron. We walk together, hold each other accountable, and build the body of Christ through genuine relationship.", color: "from-[#c4a882] to-[#b09070]" },
  { icon: Globe, title: "Global Gospel Reach", desc: "Bold and Rooted exists to spread the gospel to young adults in every corner of the world — no barrier, no border.", color: "from-[#a89ab4] to-[#9080a0]" },
  { icon: Heart, title: "Prayer & Intercession", desc: "A culture of prayer is at our core. We believe prayer moves mountains and transforms the hearts of nations.", color: "from-[#d4a0a8] to-[#c08890]" },
];

const UPCOMING_EVENTS = [
  { date: "MAR", day: "15", year: "2026", title: "Bold Faith Conference", location: "Online & In-Person", type: "Conference" },
  { date: "APR", day: "02", year: "2026", title: "Rooted Women's Retreat", location: "Atlanta, GA", type: "Retreat" },
  { date: "APR", day: "20", year: "2026", title: "Youth Discipleship Camp", location: "Accra, Ghana", type: "Camp" },
];

const BLOGS = [
  { tag: "Faith", title: "Benevolence: The Quiet Power That Transforms Lives", author: "Kwaku Duah Junior", read: "5 min", id: "blog_benevolence_2026_001" },
  { tag: "Identity", title: "Standing Firm When the World Says Bend", author: "Editorial", read: "4 min", id: "blog_002" },
  { tag: "Prayer", title: "When You're Waiting on God: A Letter to the Weary", author: "Editorial", read: "6 min", id: "blog_003" },
];

const STATS = [
  { val: "12K+", label: "Young Believers" },
  { val: "40+", label: "Nations Reached" },
  { val: "300+", label: "Prayer Warriors" },
  { val: "5+", label: "Years of Ministry" },
];

/* ─── Verse Rotator ─── */
const VerseRotator = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % VERSES.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-[#6b4a3a]/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto italic"
          style={{ fontFamily: "'EB Garamond', 'Garamond', Georgia, serif" }}>
          "{VERSES[idx].text}"
        </p>
        <p className="text-[#b8845a] text-xs font-semibold uppercase tracking-[0.2em] mt-4"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "normal" }}>
          — {VERSES[idx].ref}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─── Decorative cross/ornament SVG ─── */
const Ornament = ({ className = "" }) => (
  <svg viewBox="0 0 80 20" fill="none" className={className}>
    <line x1="0" y1="10" x2="28" y2="10" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="40" cy="10" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="33" cy="10" r="1" fill="currentColor" opacity="0.3" />
    <circle cx="47" cy="10" r="1" fill="currentColor" opacity="0.3" />
    <line x1="52" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="0.75" />
  </svg>
);

/* ─── Main ─── */
const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden"
      style={{
        fontFamily: "'EB Garamond', 'Garamond', Georgia, serif",
        backgroundColor: "#fdf6f0",
      }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

        .parchment-bg {
          background-color: #fdf6f0;
          background-image:
            radial-gradient(ellipse at 20% 50%, rgba(212,168,140,0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(200,146,122,0.06) 0%, transparent 50%);
        }

        .hero-bg {
          background-color: #f5e8da;
          background-image:
            radial-gradient(ellipse at 50% 0%, rgba(212,168,140,0.35) 0%, transparent 65%),
            radial-gradient(ellipse at 15% 80%, rgba(200,146,122,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 70%, rgba(180,130,110,0.10) 0%, transparent 50%);
        }

        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
        }

        .drop-cap::first-letter {
          font-size: 3.5em;
          font-weight: 700;
          float: left;
          line-height: 0.8;
          margin-right: 0.08em;
          margin-top: 0.05em;
          color: #c8927a;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .gold-line {
          background: linear-gradient(90deg, transparent, #c8927a, #e8c4a0, #c8927a, transparent);
        }

        .verse-drop-cap::first-letter {
          font-size: 2.8em;
          font-weight: 600;
          color: #b8845a;
        }
      `}</style>

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center hero-bg overflow-hidden">

        {/* subtle paper grain overlay */}
        <div className="absolute inset-0 paper-texture opacity-60" />

        {/* gentle top border line */}
        <div className="absolute top-0 left-0 right-0 h-0.75" style={{ background: "linear-gradient(90deg, transparent 0%, #c8927a 30%, #e8c4a0 50%, #c8927a 70%, transparent 100%)" }} />

        {/* large decorative watermark text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[22vw] font-bold text-[#c8927a]/4 leading-none whitespace-nowrap"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            LOGOS
          </span>
        </div>

        {/* ornamental top accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-16 left-1/2 -translate-x-1/2 w-48"
        >
          <Ornament className="text-[#c8927a]/50 w-full" />
        </motion.div>

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-24 pb-32">

          {/* eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <span className="text-[#b8845a] text-[11px] font-medium uppercase tracking-[0.35em]"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              A Faith Movement for Young Believers
            </span>
          </motion.div>

          {/* headline — calm, biblical, like an illuminated manuscript */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15 }}
          >
            <h1 className="leading-[1.12] tracking-tight text-[#3d2214] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              <span className="block text-[clamp(3rem,8vw,6.5rem)]">
                He that dwelleth
              </span>
              <span className="block text-[clamp(3rem,8vw,6.5rem)] text-[#c8927a]">
                in the secret place
              </span>
              <span className="block text-[clamp(1.6rem,4vw,3rem)] font-normal italic text-[#6b4a3a]/70 mt-3">
                shall abide under the shadow of the Almighty.
              </span>
            </h1>
          </motion.div>

          {/* reference */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-2 mb-10"
          >
            <Ornament className="text-[#c8927a]/40 w-40 mx-auto my-4" />
            <span className="text-[#b8845a] text-xs font-medium tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              Psalm 91:1
            </span>
          </motion.div>

          {/* subhead */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5 }}
            className="text-[#5a3a28]/65 text-base sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed"
            style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
            Raising a generation of young adults rooted in Scripture, anchored in truth, and walking in the fullness of God's calling.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/join"
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full text-white text-sm font-medium tracking-wide transition-all hover:opacity-90 hover:scale-[1.03] shadow-lg"
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                background: "linear-gradient(135deg, #c8927a 0%, #b8775a 100%)",
                boxShadow: "0 8px 32px rgba(200,146,122,0.35)",
              }}>
              Join the Movement
              <ArrowRight size={15} />
            </Link>
            <Link to="/about"
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-medium tracking-wide border transition hover:bg-[#c8927a]/8"
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                color: "#7a4a32",
                borderColor: "rgba(200,146,122,0.35)",
              }}>
              <Play size={13} className="fill-current" />
              Our Story
            </Link>
          </motion.div>

          {/* rotating verse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className="mt-20 pt-10"
            style={{ borderTop: "1px solid rgba(200,146,122,0.2)" }}
          >
            <VerseRotator />
          </motion.div>
        </div>

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: "linear-gradient(to bottom, transparent, #fdf6f0)" }} />
      </section>

      {/* ══════════ STATS STRIP ══════════ */}
      <section className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #c8927a 0%, #d4a882 50%, #c0927a 100%)" }}>
        <div className="absolute inset-0 paper-texture opacity-40" />
        <div className="relative max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.07)} className="text-center">
              <p className="text-4xl font-bold text-white"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {s.val}
              </p>
              <p className="text-white/65 text-[11px] mt-1 uppercase tracking-[0.2em] font-medium"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════ MISSION ══════════ */}
      <section className="py-28 parchment-bg relative overflow-hidden">

        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeUp(0)}>
            <div className="flex items-center gap-3 mb-8">
              <Ornament className="text-[#c8927a]/60 w-32" />
              <span className="text-[#b8845a] text-[10px] font-medium uppercase tracking-[0.28em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                Our Mission
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl text-[#3d2214] leading-tight mb-8"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              Planted by the<br />
              <em className="text-[#c8927a] not-italic">River of Life</em>
            </h2>

            {/* editorial paragraph with drop cap feel */}
            <p className="text-[#5a3a28]/75 leading-[1.85] text-[1.05rem] mb-7 drop-cap"
              style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
              At Bold and Rooted, our mission is to raise a generation of young adults who stand firm in faith, unwavering in truth, and deeply anchored in the Word of God. We are committed to cultivating spiritual strength, resilience, and maturity through the power of Scripture, prayer, and discipleship.
            </p>

            <div className="my-8" style={{ borderLeft: "2px solid #e0b090", paddingLeft: "1.25rem" }}>
              <p className="text-[#7a4a32] italic text-xl leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}>
                "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles."
              </p>
              <cite className="text-[#b8845a] text-[11px] font-medium uppercase tracking-widest mt-3 block not-italic"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                — Isaiah 40:31
              </cite>
            </div>

            <Link to="/about/mission"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#b8845a] hover:text-[#a07040] transition"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              Read Our Full Mission <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* visual panel — illuminated manuscript style */}
          <motion.div {...fadeUp(0.15)} className="relative lg:pt-8">
            <div className="relative rounded-2xl overflow-hidden max-w-sm mx-auto"
              style={{
                background: "linear-gradient(145deg, #f5e8da 0%, #ecddc8 100%)",
                border: "1px solid rgba(200,146,122,0.3)",
                boxShadow: "0 32px 80px rgba(180,120,90,0.2), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}>

              {/* top ornamental band */}
              <div className="h-1.5" style={{ background: "linear-gradient(90deg, #c8927a, #e8c4a0, #c8927a)" }} />

              <div className="p-10 text-center">
                {/* cross ornament */}
                <div className="mb-6 flex justify-center">
                  <svg viewBox="0 0 40 56" fill="none" className="w-8 h-10">
                    <rect x="17" y="0" width="6" height="40" rx="1" fill="#c8927a" opacity="0.7"/>
                    <rect x="4" y="14" width="32" height="6" rx="1" fill="#c8927a" opacity="0.7"/>
                    {/* roots */}
                    <path d="M20 40 L20 50 M20 46 L14 54 M20 46 L26 54 M20 48 L10 56 M20 48 L30 56" stroke="#c8927a" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
                  </svg>
                </div>

                <p className="text-4xl font-bold text-[#3d2214] leading-tight mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  Bold &<br/>Rooted
                </p>

                <div className="my-5 gold-line h-px opacity-50" />

                <p className="text-[#7a5a3a] text-sm leading-relaxed italic mb-5"
                  style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                  "He shall be like a tree planted<br/>by rivers of water."
                </p>

                <p className="text-[#b8845a] text-[11px] font-medium uppercase tracking-[0.25em]"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                  Psalm 1:3
                </p>
              </div>

              {/* bottom ornamental band */}
              <div className="h-1" style={{ background: "linear-gradient(90deg, transparent, #c8927a, transparent)" }} />
            </div>

            {/* floating stat tag */}
            <div className="absolute -bottom-3 -right-2 bg-white rounded-xl px-5 py-3 shadow-xl"
              style={{ border: "1px solid rgba(200,146,122,0.2)", fontFamily: "'Jost', system-ui, sans-serif" }}>
              <p className="text-[#c8927a] font-semibold text-sm">40+ Nations</p>
              <p className="text-[#9a7a6a] text-[11px]">Gospel Reach</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ FOUR PILLARS ══════════ */}
      <section className="py-28 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #3d2214 0%, #5a3020 50%, #3d2214 100%)" }}>

        {/* scripture watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-bold leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "rgba(200,146,122,0.04)",
              whiteSpace: "nowrap",
            }}>
            VERITAS
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <Ornament className="text-[#c8927a]/40 w-40 mx-auto mb-5" />
            <span className="text-[#e0b090] text-[11px] font-medium uppercase tracking-[0.28em]"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              What We Stand On
            </span>
            <h2 className="text-4xl sm:text-5xl text-white mt-4 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              Our Four Pillars
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((p, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="group relative rounded-2xl p-7 transition-all duration-400 cursor-pointer"
                style={{
                  background: "rgba(253,246,240,0.05)",
                  border: "1px solid rgba(200,146,122,0.15)",
                  backdropFilter: "blur(4px)",
                }}
                whileHover={{ borderColor: "rgba(200,146,122,0.4)", background: "rgba(253,246,240,0.08)" }}
              >
                <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${p.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <p.icon size={18} className="text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3 leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {p.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
                  {p.desc}
                </p>
                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition">
                  <ArrowUpRight size={15} className="text-[#e0b090]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ EVENTS ══════════ */}
      <section className="py-28 parchment-bg">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="flex items-end justify-between mb-14 flex-wrap gap-5">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Ornament className="text-[#c8927a]/50 w-28" />
                <span className="text-[#b8845a] text-[10px] font-medium uppercase tracking-[0.28em] whitespace-nowrap"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                  Upcoming
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl text-[#3d2214] leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                Gatherings &<br/><em className="not-italic text-[#c8927a]">Events</em>
              </h2>
            </div>
            <Link to="/events"
              className="flex items-center gap-2 text-sm font-medium text-[#b8845a] hover:text-[#a07040] transition"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              View all <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="space-y-4">
            {UPCOMING_EVENTS.map((ev, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="group flex items-center gap-6 rounded-2xl p-6 cursor-pointer transition-all"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(200,146,122,0.15)",
                  boxShadow: "0 2px 16px rgba(180,120,90,0.06)",
                  backdropFilter: "blur(8px)",
                }}
                whileHover={{ borderColor: "rgba(200,146,122,0.35)", boxShadow: "0 8px 32px rgba(180,120,90,0.12)" }}
              >
                {/* date block */}
                <div className="shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center text-white"
                  style={{ background: "linear-gradient(145deg, #c8927a, #b8775a)" }}>
                  <span className="text-xl font-bold leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    {ev.day}
                  </span>
                  <span className="text-[9px] font-medium uppercase tracking-wider text-white/75 leading-tight mt-0.5"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                    {ev.date}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-[#b8845a] bg-[#c8927a]/10 px-2 py-0.5 rounded-full"
                      style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                      {ev.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#3d2214] text-lg leading-snug"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    {ev.title}
                  </h3>
                  <p className="text-[#9a7060] text-sm mt-0.5"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
                    {ev.location} · {ev.year}
                  </p>
                </div>

                <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ border: "1px solid rgba(200,146,122,0.3)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#c8927a"; e.currentTarget.style.border = "1px solid #c8927a"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.border = "1px solid rgba(200,146,122,0.3)"; }}
                >
                  <ChevronRight size={14} className="text-[#c8927a] group-hover:text-white transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BLOGS ══════════ */}
      <section className="py-28 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #f0e0d0 0%, #f8ede2 100%)" }}>
        <div className="absolute inset-0 paper-texture opacity-50" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp(0)} className="flex items-end justify-between mb-14 flex-wrap gap-5">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Ornament className="text-[#c8927a]/50 w-28" />
                <span className="text-[#b8845a] text-[10px] font-medium uppercase tracking-[0.28em] whitespace-nowrap"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                  Insights & Devotion
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl text-[#3d2214] leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                Words That<br/><em className="not-italic text-[#c8927a]">Build Faith</em>
              </h2>
            </div>
            <Link to="/blogs"
              className="flex items-center gap-2 text-sm font-medium text-[#b8845a] hover:text-[#a07040] transition"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              All writings <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {BLOGS.map((b, i) => (
              <motion.article key={i} {...fadeUp(i * 0.1)} className="group">
                <Link to={`/blogs/${b.id}`} className="block h-full">
                  <div className="rounded-2xl overflow-hidden h-full flex flex-col transition-all"
                    style={{
                      background: "rgba(253,246,240,0.9)",
                      border: "1px solid rgba(200,146,122,0.18)",
                      boxShadow: "0 2px 20px rgba(180,120,90,0.06)",
                    }}>

                    {/* top accent */}
                    <div className="h-0.5" style={{ background: "linear-gradient(90deg, #c8927a, #e8c4a0, #c8927a)" }} />

                    <div className="p-7 flex-1">
                      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#b8845a]"
                        style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                        {b.tag}
                      </span>
                      <h3 className="text-xl text-[#3d2214] mt-3 mb-4 leading-snug transition-colors group-hover:text-[#c8927a]"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                        {b.title}
                      </h3>
                      <div className="flex items-center justify-between"
                        style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
                        <span className="text-xs text-[#9a7060]">{b.author}</span>
                        <span className="text-xs text-[#9a7060]">{b.read} read</span>
                      </div>
                    </div>

                    <div className="px-7 pb-6 flex items-center justify-between pt-4"
                      style={{ borderTop: "1px solid rgba(200,146,122,0.12)" }}>
                      <span className="text-xs font-medium text-[#c8927a] opacity-0 group-hover:opacity-100 transition flex items-center gap-1"
                        style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                        Read <ArrowRight size={11} />
                      </span>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all ml-auto"
                        style={{ border: "1px solid rgba(200,146,122,0.3)" }}>
                        <ArrowUpRight size={12} className="text-[#c8927a]" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROGRAMS TEASER ══════════ */}
      <section className="py-28 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #3d2214 0%, #5a3020 60%, #3d2214 100%)" }}>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-bold leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "rgba(200,146,122,0.035)",
              whiteSpace: "nowrap",
            }}>
            ECCLESIA
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <Ornament className="text-[#c8927a]/40 w-40 mx-auto mb-5" />
            <span className="text-[#e0b090] text-[11px] font-medium uppercase tracking-[0.28em]"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              Grow With Us
            </span>
            <h2 className="text-4xl sm:text-5xl text-white mt-4"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              Our Programs
            </h2>
            <p className="text-white/45 mt-4 max-w-xl mx-auto text-base"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
              Structured pathways for growth, community, and kingdom impact.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🦅", title: "Eagles Rising", desc: "An intensive 12-week discipleship track for young believers ready to go deeper.", badge: "Flagship" },
              { icon: "📖", title: "Rooted in the Word", desc: "Daily devotional and Scripture memory program with accountability partners.", badge: "Daily" },
              { icon: "🌍", title: "Global Missions", desc: "Short-term mission opportunities, cross-cultural gospel training, and field deployment.", badge: "Outreach" },
              { icon: "🙏", title: "The Prayer Room", desc: "24/7 intercessory prayer community — standing in the gap for nations.", badge: "Live" },
              { icon: "👑", title: "Women of Valor", desc: "Empowering young women to walk boldly in their God-given identity and calling.", badge: "Community" },
              { icon: "⚔️", title: "Men of Covenant", desc: "Building men of integrity, purpose, and spiritual authority in every sphere.", badge: "Community" },
            ].map((prog, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                className="group rounded-2xl p-6 transition-all cursor-pointer"
                style={{
                  background: "rgba(253,246,240,0.05)",
                  border: "1px solid rgba(200,146,122,0.15)",
                }}
                whileHover={{ borderColor: "rgba(200,146,122,0.4)", background: "rgba(253,246,240,0.08)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl">{prog.icon}</span>
                  <span className="text-[9px] font-medium uppercase tracking-widest text-[#e0b090] bg-[#c8927a]/15 px-2 py-1 rounded-full"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                    {prog.badge}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-base mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {prog.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
                  {prog.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.4)} className="text-center mt-12">
            <Link to="/programs"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-white text-sm font-medium tracking-wide hover:opacity-90 hover:scale-[1.03] transition-all shadow-lg"
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                background: "linear-gradient(135deg, #c8927a 0%, #b8775a 100%)",
                boxShadow: "0 8px 32px rgba(200,146,122,0.3)",
              }}>
              Explore All Programs <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════ VISION QUOTE ══════════ */}
      <section className="py-28 parchment-bg relative overflow-hidden">
        <div className="absolute inset-0 paper-texture opacity-60" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeUp(0)}>
            {/* illuminated ornament */}
            <div className="flex justify-center mb-8">
              <svg viewBox="0 0 120 60" fill="none" className="w-24 h-12">
                <path d="M60 5 L65 20 L80 20 L68 30 L73 45 L60 35 L47 45 L52 30 L40 20 L55 20 Z" fill="none" stroke="#c8927a" strokeWidth="0.75" opacity="0.5"/>
                <circle cx="60" cy="25" r="3" fill="#c8927a" opacity="0.3"/>
                <line x1="0" y1="55" x2="42" y2="55" stroke="#c8927a" strokeWidth="0.5" opacity="0.4"/>
                <line x1="78" y1="55" x2="120" y2="55" stroke="#c8927a" strokeWidth="0.5" opacity="0.4"/>
                <circle cx="60" cy="55" r="2" fill="#c8927a" opacity="0.3"/>
              </svg>
            </div>

            <p className="text-2xl sm:text-3xl text-[#3d2214] leading-[1.6] mb-10"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, fontStyle: "italic" }}>
              "We envision a community that rises with renewed strength, anchored in the promise of Isaiah 40:31, soaring above adversity not because of human ability, but because of{" "}
              <span className="text-[#c8927a] not-italic font-semibold">divine empowerment.</span>"
            </p>

            <Ornament className="text-[#c8927a]/40 w-40 mx-auto mb-4" />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#b8845a]"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              Bold & Rooted — Vision Statement
            </span>
          </motion.div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="relative py-32 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #c8927a 0%, #d4a882 40%, #c8927a 100%)" }}>

        <div className="absolute inset-0 paper-texture opacity-40" />

        {/* root decoration */}
        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-15" viewBox="0 0 1200 150" fill="none" preserveAspectRatio="none">
          <path d="M600 0 L580 30 L540 50 L480 80 L400 110 L300 130 L200 143 L0 150" stroke="white" strokeWidth="1.5" fill="none"/>
          <path d="M600 0 L620 30 L660 50 L720 80 L800 110 L900 130 L1000 143 L1200 150" stroke="white" strokeWidth="1.5" fill="none"/>
          <path d="M600 0 L595 40 L580 80 L560 115 L540 135 L520 148 L500 150" stroke="white" strokeWidth="0.75" fill="none" opacity="0.5"/>
          <path d="M600 0 L605 40 L620 80 L640 115 L660 135 L680 148 L700 150" stroke="white" strokeWidth="0.75" fill="none" opacity="0.5"/>
        </svg>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <Ornament className="text-white/40 w-40 mx-auto mb-8" />

            <p className="text-white/70 text-[11px] font-medium uppercase tracking-[0.3em] mb-6"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              Your season starts now
            </p>

            <h2 className="text-5xl sm:text-6xl text-white leading-tight mb-4"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              Ready to Be<br />
              <em className="italic font-normal">Planted & Flourish?</em>
            </h2>

            <p className="text-white/65 text-base max-w-lg mx-auto mb-10 leading-relaxed"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
              Join thousands of young believers choosing to stand firm, grow deep, and soar high in the purposes of God.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/join"
                className="flex items-center gap-2.5 px-9 py-4 rounded-full bg-white font-medium text-sm tracking-wide hover:bg-[#fdf6f0] hover:scale-[1.03] transition-all shadow-2xl"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  color: "#7a4a32",
                  boxShadow: "0 12px 40px rgba(90,48,32,0.25)",
                }}>
                Join the Movement <ArrowRight size={15} />
              </Link>
              <Link to="/prayer"
                className="flex items-center gap-2.5 px-9 py-4 rounded-full font-medium text-sm tracking-wide border-2 border-white/30 text-white hover:border-white/60 transition"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                Submit a Prayer Request
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;