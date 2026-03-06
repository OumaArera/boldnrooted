import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowLeft, TreePine, Wind, Droplets, Sun, Mountain } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

const VISION_MARKS = [
  {
    icon: TreePine,
    headline: "Deeply Rooted",
    gradient: "linear-gradient(145deg, #c8927a, #b8775a)",
    body: "Like the tree in Psalm 1:3, we envision believers with roots so deep in the Word of God that no storm, no doctrine of man, no cultural pressure can uproot them. Rooted people produce fruit — consistently, seasonally, abundantly.",
    verse: "That ye, being rooted and grounded in love, may be able to comprehend… the love of Christ.",
    ref: "Ephesians 3:17–18",
  },
  {
    icon: Wind,
    headline: "Spiritually Empowered",
    gradient: "linear-gradient(145deg, #a89ab4, #8878a0)",
    body: "We envision a generation that does not move in human cleverness but in the power of the Holy Spirit — signs, wonders, transformed hearts, and unshakeable peace that confounds the world.",
    verse: "Not by might, nor by power, but by my Spirit, saith the Lord of hosts.",
    ref: "Zechariah 4:6",
  },
  {
    icon: Mountain,
    headline: "Spiritually Fearless",
    gradient: "linear-gradient(145deg, #c4a882, #b09070)",
    body: "We see a people who do not faint in trials, do not retreat in opposition, and do not compromise truth. Not fearless because life is easy, but fearless because they trust the sovereign authority of God.",
    verse: "They shall mount up with wings as eagles; they shall run, and not be weary.",
    ref: "Isaiah 40:31",
  },
  {
    icon: Droplets,
    headline: "Continually Nourished",
    gradient: "linear-gradient(145deg, #9ab0c8, #7890a8)",
    body: "Even in drought, they remain steadfast. Our vision is for believers who return daily to the river of God's Word and Spirit — nourished not by circumstance but by the eternal, living waters of Christ.",
    verse: "His leaf also shall not wither; and whatsoever he doeth shall prosper.",
    ref: "Psalm 1:3",
  },
  {
    icon: Sun,
    headline: "Bearing Fruit in Every Season",
    gradient: "linear-gradient(145deg, #d4b882, #c0a06a)",
    body: "Not just in the easy seasons of life, but in winter, in drought, in grief, and in uncertainty. We envision lives that produce love, joy, peace, faith, and godly influence — regardless of what the world around them looks like.",
    verse: "Bringeth forth his fruit in his season.",
    ref: "Psalm 1:3",
  },
];

const GLOBAL_VISION = [
  { region: "Africa", desc: "Planting discipleship hubs in Ghana, Kenya, Nigeria, and across the continent — reaching urban youth and rural communities alike.", count: "15+ Nations" },
  { region: "North America", desc: "Campus movements, church partnerships, and digital outreach connecting young believers across the diaspora.", count: "Growing" },
  { region: "Europe", desc: "Equipping second-generation immigrants and native youth with deep faith identity in a post-Christian landscape.", count: "Emerging" },
  { region: "Asia & Pacific", desc: "Strategic gospel partnerships with local leaders to reach the unreached in closed and open nations.", count: "In Progress" },
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

const Vision = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#fdf6f0" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&family=EB+Garamond:ital,wght@0,400;1,400&display=swap');

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

      {/* ── Hero with parallax ── */}
      <section ref={heroRef} className="relative min-h-[72vh] flex items-end overflow-hidden pb-20"
        style={{ background: "linear-gradient(160deg, #f5e8da 0%, #ecddc8 60%, #f0e0ce 100%)" }}>

        <div className="absolute inset-0 paper-texture opacity-60" />
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, #c8927a, transparent)" }} />

        {/* parallax radial glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: bgY,
            background: "radial-gradient(ellipse at 30% 40%, rgba(200,146,122,0.14) 0%, transparent 55%), radial-gradient(ellipse at 75% 60%, rgba(212,184,130,0.10) 0%, transparent 50%)",
          }}
        />

        {/* watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.06)", whiteSpace: "nowrap" }}>
            VISIO
          </span>
        </div>

        {/* root SVG */}
        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.08]" viewBox="0 0 1400 220" fill="none" preserveAspectRatio="none">
          <path d="M700 0 L670 40 L620 70 L550 110 L460 145 L350 170 L220 190 L100 205 L0 220" stroke="#c8927a" strokeWidth="1.5" fill="none"/>
          <path d="M700 0 L730 40 L780 70 L850 110 L940 145 L1050 170 L1180 190 L1300 205 L1400 220" stroke="#c8927a" strokeWidth="1.5" fill="none"/>
          <path d="M700 0 L693 50 L670 100 L638 148 L598 180 L550 205 L500 218 L450 220" stroke="#e8c4a0" strokeWidth="1" fill="none"/>
          <path d="M700 0 L707 50 L730 100 L762 148 L802 180 L850 205 L900 218 L950 220" stroke="#e8c4a0" strokeWidth="1" fill="none"/>
          <path d="M700 0 L700 60 L687 115 L668 162 L643 195 L615 215 L585 220" stroke="#c8927a" strokeWidth="0.7" fill="none"/>
          <path d="M700 0 L700 60 L713 115 L732 162 L757 195 L785 215 L815 220" stroke="#c8927a" strokeWidth="0.7" fill="none"/>
        </svg>

        <motion.div style={{ y: textY }} className="relative z-10 max-w-6xl mx-auto px-6 pt-36 w-full">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/about"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] mb-8 transition"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(184,132,90,0.6)" }}
              onMouseEnter={e => e.currentTarget.style.color = "#b8845a"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(184,132,90,0.6)"}>
              <ArrowLeft size={12} /> About
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}>
            <div className="flex items-center gap-4 mb-7">
              <Ornament className="text-[#c8927a]/50 w-28" />
              <span className="text-[#b8845a] text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                Where We Are Going
              </span>
            </div>
            <h1 className="leading-none tracking-tight text-[#3d2214]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              <span className="block text-[clamp(3rem,7vw,5.5rem)]">Our</span>
              <span className="block text-[clamp(3rem,7vw,5.5rem)]" style={{ color: "#c8927a" }}>Vision</span>
            </h1>
            <p className="text-[#5a3a28]/60 text-lg mt-6 max-w-2xl leading-relaxed"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
              A global movement of Christians who are spiritually grounded, spiritually empowered, and spiritually fearless — believers deeply rooted in God's Word and boldly living out their faith in every area of life.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Isaiah 40:31 anchor ── */}
      <section className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #3d2214 0%, #5a3020 55%, #3d2214 100%)" }}>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[16vw] font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.04)", whiteSpace: "nowrap" }}>
            AQUILA
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8"
              style={{ background: "rgba(200,146,122,0.12)", border: "1px solid rgba(200,146,122,0.25)" }}>
              <TreePine size={13} style={{ color: "#e8c4a0" }} />
              <span className="text-[10px] font-medium uppercase tracking-[0.22em]"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#e8c4a0" }}>
                Vision Anchored In
              </span>
            </div>
            <p className="text-3xl sm:text-4xl text-white leading-[1.65]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, fontStyle: "italic" }}>
              "But they that wait upon the Lord shall renew their strength; they shall{" "}
              <span style={{ color: "#e8c4a0", fontStyle: "normal", fontWeight: 600 }}>mount up with wings as eagles</span>
              ; they shall run, and not be weary; and they shall walk, and not faint."
            </p>
            <Ornament className="text-[#c8927a]/35 w-36 mx-auto mt-7 mb-4" />
            <p className="text-[10px] font-medium uppercase tracking-[0.25em]"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(200,146,122,0.55)" }}>
              Isaiah 40:31 (KJV)
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 5 Vision Marks ── */}
      <section className="py-24 parchment-bg">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="mb-16">
            <div className="flex items-center gap-4 mb-5">
              <Ornament className="text-[#c8927a]/50 w-28" />
              <span className="text-[#b8845a] text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                The Marks of Our Vision
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-[#3d2214] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              What We Are<br />
              <em className="not-italic" style={{ color: "#c8927a" }}>Believing For</em>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {VISION_MARKS.map((v, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                className="group grid md:grid-cols-5 gap-0 rounded-3xl overflow-hidden transition-all"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  border: "1px solid rgba(200,146,122,0.18)",
                  boxShadow: "0 2px 16px rgba(180,120,90,0.06)",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.38)"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(180,120,90,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.18)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(180,120,90,0.06)"; }}
              >
                {/* top accent line */}
                <div className="md:hidden h-0.5 col-span-5"
                  style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, transparent)" }} />

                {/* colored icon column */}
                <div className="md:col-span-1 flex flex-col items-center justify-center p-8 min-h-28 relative overflow-hidden"
                  style={{ background: v.gradient }}>
                  <div className="absolute inset-0"
                    style={{ background: "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.12) 0%, transparent 65%)" }} />
                  <v.icon size={24} className="text-white/80 mb-2 relative z-10" />
                  <span className="text-white/60 text-[9px] font-medium uppercase tracking-[0.2em] text-center relative z-10"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* content */}
                <div className="md:col-span-4 p-8">
                  <h3 className="text-2xl text-[#3d2214] mb-3 group-hover:text-[#c8927a] transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                    {v.headline}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.68)" }}>
                    {v.body}
                  </p>
                  <div className="flex items-start gap-3">
                    <div className="w-0.5 h-10 shrink-0 mt-0.5 rounded-full"
                      style={{ background: "linear-gradient(to bottom, #c8927a, rgba(200,146,122,0.2))" }} />
                    <div>
                      <p className="italic text-sm" style={{ color: "#7a4a32", fontFamily: "'EB Garamond', Georgia, serif" }}>
                        "{v.verse}"
                      </p>
                      <p className="text-[10px] font-medium uppercase tracking-widest mt-1.5"
                        style={{ color: "#c8927a", fontFamily: "'Jost', system-ui, sans-serif" }}>
                        — {v.ref}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global Vision ── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #3d2214 0%, #5a3020 55%, #3d2214 100%)" }}>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[16vw] font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.04)", whiteSpace: "nowrap" }}>
            MUNDUS
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-5">
              <Ornament className="text-[#c8927a]/40 w-28" />
              <span className="text-[#e0b090] text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                Four Corners of the Earth
              </span>
              <Ornament className="text-[#c8927a]/40 w-28" />
            </div>
            <h2 className="text-4xl sm:text-5xl text-white mt-2 mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              A Global Vision
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-base"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
              Bold and Rooted exists to spread the gospel to young adults in every nation — not stopping until every soul has heard that Jesus reigns over every circumstance.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GLOBAL_VISION.map((g, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="rounded-2xl p-6 transition-all"
                style={{
                  background: "rgba(253,246,240,0.05)",
                  border: "1px solid rgba(200,146,122,0.15)",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(253,246,240,0.08)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.38)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(253,246,240,0.05)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.15)"; }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-base"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    {g.region}
                  </h3>
                  <span className="text-[9px] font-medium uppercase tracking-widest"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#e8c4a0" }}>
                    {g.count}
                  </span>
                </div>
                <p className="text-xs leading-relaxed"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.42)" }}>
                  {g.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision Declaration ── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #f0e0d0 0%, #f8ede2 100%)" }}>

        <div className="absolute inset-0 paper-texture opacity-50" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp(0)} className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex items-center gap-4 mb-7">
                <Ornament className="text-[#c8927a]/50 w-28" />
                <span className="text-[#b8845a] text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                  We Declare
                </span>
              </div>
              <h2 className="text-4xl text-[#3d2214] leading-snug mb-6"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                When God Plants,<br />
                <em className="not-italic" style={{ color: "#c8927a" }}>No Force Can Uproot</em>
              </h2>
              <p className="leading-[1.85] text-base mb-8"
                style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "rgba(90,58,40,0.70)" }}>
                Like the trees planted in the river, we want to see young people flourishing — planted by living waters, continually nourished by the Spirit of God, bearing fruit in every season. Even in drought, remaining steadfast. Even in storms, remaining secure.
              </p>
              <Link to="/join"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-medium text-sm transition-all hover:opacity-90 hover:scale-[1.03] shadow-lg"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  background: "linear-gradient(135deg, #c8927a 0%, #b8775a 100%)",
                  boxShadow: "0 8px 28px rgba(200,146,122,0.35)",
                }}>
                Be Part of the Vision <ArrowRight size={14} />
              </Link>
            </div>

            {/* declaration card */}
            <div className="relative">
              <div className="rounded-2xl p-10 text-center relative overflow-hidden"
                style={{ background: "linear-gradient(145deg, #3d2214, #5a3020)" }}>

                <div className="absolute inset-0"
                  style={{ background: "radial-gradient(circle at 50% 30%, rgba(200,146,122,0.08) 0%, transparent 60%)" }} />

                {/* top accent */}
                <div className="h-0.5 absolute top-0 left-0 right-0"
                  style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, #c8927a, transparent)" }} />

                <p className="text-[10px] font-medium uppercase tracking-[0.3em] mb-7"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(232,196,160,0.5)" }}>
                  Our Declaration
                </p>

                <div className="space-y-3 relative z-10">
                  {["Grounded in Truth", "Empowered by the Spirit", "Fearless in Faith", "Fruitful in Every Season", "Global in Reach"].map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="text-white/90"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontWeight: 600,
                        fontSize: i === 0 ? "1.5rem" : i === 1 ? "1.3rem" : i === 2 ? "1.15rem" : "1rem",
                      }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                <div className="mt-8 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(200,146,122,0.4), transparent)" }} />

                <Ornament className="text-[#c8927a]/30 w-28 mx-auto mt-5 mb-3" />
                <p className="text-[10px] font-medium uppercase tracking-[0.22em]"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#c8927a" }}>
                  Bold & Rooted
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Nav to other about pages ── */}
      <section className="py-14 parchment-bg" style={{ borderTop: "1px solid rgba(200,146,122,0.15)" }}>
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <Link to="/about/mission"
            className="flex items-center gap-2 text-sm font-medium transition"
            style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(184,132,90,0.55)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#b8845a"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(184,132,90,0.55)"}>
            <ArrowLeft size={14} /> Our Mission
          </Link>
          <Link to="/about/leadership"
            className="flex items-center gap-2 text-sm font-medium transition"
            style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}
            onMouseEnter={e => e.currentTarget.style.color = "#7a4a32"}
            onMouseLeave={e => e.currentTarget.style.color = "#b8845a"}>
            Meet Our Leadership <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Vision;