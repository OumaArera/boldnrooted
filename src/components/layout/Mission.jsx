import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, BookOpen, Heart, Shield, Globe, ChevronDown, Quote } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

const MISSION_PILLARS = [
  {
    icon: BookOpen,
    title: "Spiritual Strength Through Scripture",
    body: "We cultivate deep, disciplined engagement with the Word of God. Every program, gathering, and piece of content is anchored in Scripture — because we believe truth transforms.",
    verse: "Thy word is a lamp unto my feet, and a light unto my path.",
    ref: "Psalm 119:105",
  },
  {
    icon: Heart,
    title: "Resilience Through Prayer",
    body: "True boldness is forged on the knees. We are committed to building a culture of prayer that connects young believers to the living God, producing a resilience no circumstance can shake.",
    verse: "Pray without ceasing.",
    ref: "1 Thessalonians 5:17",
  },
  {
    icon: Shield,
    title: "Maturity Through Discipleship",
    body: "Faith is not a solo journey. We walk together in community, in accountability, and in love — sharpening one another and growing into the full stature of Christ.",
    verse: "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.",
    ref: "Proverbs 27:17",
  },
  {
    icon: Globe,
    title: "Impact Through the Gospel",
    body: "We exist to spread the gospel to every corner of the world — equipping young adults to be ambassadors of Christ in every sphere of life, from the boardroom to the village square.",
    verse: "Go ye into all the world, and preach the gospel to every creature.",
    ref: "Mark 16:15",
  },
];

const COMMITMENTS = [
  { num: "01", title: "Create Safe Spaces", desc: "We build environments where young adults can dwell in God's presence without fear of judgment — spaces of raw honesty, radical grace, and genuine encounter." },
  { num: "02", title: "Raise Up Leaders", desc: "We identify, equip, and deploy a new generation of servant leaders who demonstrate boldness grounded in humility and wisdom rooted in the Word." },
  { num: "03", title: "Break Cycles of Poverty & Despair", desc: "Through education, mentorship, and gospel proclamation, we believe faith-fueled communities can break generational cycles and walk in God's abundance." },
  { num: "04", title: "Spread the Gospel Globally", desc: "From Ghana to Georgia, from Nairobi to New York — Bold and Rooted exists to see every young adult encounter the saving grace of Jesus Christ." },
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

const Mission = () => {
  const [expandedCommitment, setExpandedCommitment] = useState(null);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#fdf6f0" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

        .parchment-bg {
          background-color: #fdf6f0;
          background-image:
            radial-gradient(ellipse at 20% 50%, rgba(212,168,140,0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(200,146,122,0.06) 0%, transparent 50%);
        }
        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
        }
        .drop-cap-lg::first-letter {
          font-size: 3.2em;
          font-weight: 600;
          float: left;
          line-height: 0.82;
          margin-right: 0.08em;
          margin-top: 0.06em;
          color: #c8927a;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative min-h-[68vh] flex items-end overflow-hidden pb-20"
        style={{ background: "linear-gradient(160deg, #f5e8da 0%, #ecddc8 60%, #f0e0ce 100%)" }}>

        <div className="absolute inset-0 paper-texture opacity-60" />
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, #c8927a, transparent)" }} />

        {/* watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.06)", whiteSpace: "nowrap" }}>
            MISSIO
          </span>
        </div>

        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(200,146,122,0.13) 0%, transparent 70%)" }} />

        {/* root SVG */}
        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.08]" viewBox="0 0 1400 180" fill="none" preserveAspectRatio="none">
          <path d="M700 0 L680 35 L640 55 L580 90 L500 118 L400 140 L280 158 L160 170 L0 180" stroke="#c8927a" strokeWidth="1.5" fill="none"/>
          <path d="M700 0 L720 35 L760 55 L820 90 L900 118 L1000 140 L1120 158 L1240 170 L1400 180" stroke="#c8927a" strokeWidth="1.5" fill="none"/>
          <path d="M700 0 L695 45 L675 85 L645 120 L605 150 L560 168 L510 178 L460 180" stroke="#c8927a" strokeWidth="0.8" fill="none"/>
          <path d="M700 0 L705 45 L725 85 L755 120 L795 150 L840 168 L890 178 L940 180" stroke="#c8927a" strokeWidth="0.8" fill="none"/>
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 w-full">
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
                Why We Exist
              </span>
            </div>
            <h1 className="leading-none tracking-tight text-[#3d2214]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              <span className="block text-[clamp(3rem,7vw,5.5rem)]">Our</span>
              <span className="block text-[clamp(3rem,7vw,5.5rem)]" style={{ color: "#c8927a" }}>Mission</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── Mission Statement ── */}
      <section className="py-24 parchment-bg">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeUp(0)}>
            <Quote size={40} className="mb-8" style={{ color: "rgba(200,146,122,0.3)" }} />
            <p className="text-2xl sm:text-3xl text-[#3d2214] leading-[1.72] mb-8 drop-cap-lg"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}>
              To raise a generation of young adults who stand firm in faith, unwavering in truth, and deeply anchored in the Word of God — cultivating spiritual strength, resilience, and maturity through the power of{" "}
              <em style={{ color: "#c8927a", fontStyle: "normal", fontWeight: 600 }}>Scripture, prayer, and discipleship.</em>
            </p>

            <div className="my-10 h-px" style={{ background: "linear-gradient(90deg, rgba(200,146,122,0.4), transparent)" }} />

            <p className="text-[#5a3a28]/68 text-lg leading-[1.85]"
              style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
              We believe that true boldness comes from knowing God's sovereignty, faithfulness, and unchanging ways — and from trusting fully in His strength rather than our own. Bold and Rooted is not a programme. It is a movement. A movement of young believers choosing, in a distracted and broken world, to be planted by the rivers of living water.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Four Mission Pillars ── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #3d2214 0%, #5a3020 55%, #3d2214 100%)" }}>

        {/* watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[16vw] font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.04)", whiteSpace: "nowrap" }}>
            VERITAS
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp(0)} className="mb-16">
            <Ornament className="text-[#c8927a]/40 w-36 mb-5" />
            <span className="text-[#e0b090] text-[10px] font-medium uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              How We Fulfil It
            </span>
            <h2 className="text-4xl sm:text-5xl text-white mt-4 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              Four Commitments<br />
              <em className="not-italic" style={{ color: "#e8c4a0" }}>to the Mission</em>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {MISSION_PILLARS.map((p, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="group rounded-3xl p-8 transition-all duration-300"
                style={{
                  background: "rgba(253,246,240,0.05)",
                  border: "1px solid rgba(200,146,122,0.15)",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(253,246,240,0.08)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(253,246,240,0.05)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.15)"; }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(200,146,122,0.15)",
                      border: "1px solid rgba(200,146,122,0.3)",
                    }}>
                    <p.icon size={18} style={{ color: "#e8c4a0" }} />
                  </div>
                  <h3 className="text-white text-xl leading-snug pt-1"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                    {p.title}
                  </h3>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-6"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
                  {p.body}
                </p>

                <div className="pt-5" style={{ borderTop: "1px solid rgba(200,146,122,0.15)" }}>
                  <p className="italic text-sm leading-relaxed" style={{ color: "rgba(232,196,160,0.75)", fontFamily: "'EB Garamond', Georgia, serif" }}>
                    "{p.verse}"
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-widest mt-2"
                    style={{ color: "rgba(200,146,122,0.5)", fontFamily: "'Jost', system-ui, sans-serif" }}>
                    — {p.ref}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Are Committed To ── */}
      <section className="py-24 parchment-bg">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="mb-14">
            <div className="flex items-center gap-4 mb-5">
              <Ornament className="text-[#c8927a]/50 w-28" />
              <span className="text-[#b8845a] text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                In Practice
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-[#3d2214] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              What We Are<br />
              <em className="not-italic" style={{ color: "#c8927a" }}>Committed To</em>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {COMMITMENTS.map((c, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="group">
                <button
                  onClick={() => setExpandedCommitment(expandedCommitment === i ? null : i)}
                  className="w-full flex items-center gap-6 rounded-2xl px-7 py-6 transition-all text-left"
                  style={{
                    background: expandedCommitment === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)",
                    border: expandedCommitment === i ? "1px solid rgba(200,146,122,0.35)" : "1px solid rgba(200,146,122,0.18)",
                    boxShadow: "0 2px 16px rgba(180,120,90,0.06)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span className="font-medium text-sm shrink-0"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#c8927a" }}>
                    {c.num}
                  </span>
                  <h3 className="flex-1 text-[#3d2214] text-xl"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                    {c.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedCommitment === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ color: "rgba(200,146,122,0.5)" }}
                    className="shrink-0"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedCommitment === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-7 pt-2 rounded-b-2xl -mt-2"
                        style={{
                          background: "rgba(255,255,255,0.85)",
                          borderLeft: "1px solid rgba(200,146,122,0.3)",
                          borderRight: "1px solid rgba(200,146,122,0.3)",
                          borderBottom: "1px solid rgba(200,146,122,0.3)",
                        }}>
                        <div className="h-px mb-5" style={{ background: "rgba(200,146,122,0.15)" }} />
                        <p className="text-base leading-relaxed"
                          style={{
                            fontFamily: "'Jost', system-ui, sans-serif",
                            fontWeight: 300,
                            color: "rgba(90,58,40,0.72)",
                          }}>
                          {c.desc}
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

      {/* ── Psalm 1:3 anchor verse ── */}
      <section className="relative py-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #c8927a 0%, #d4a882 45%, #c0927a 100%)" }}>

        <div className="absolute inset-0 paper-texture opacity-40" />

        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.12]" viewBox="0 0 1400 120" fill="none" preserveAspectRatio="none">
          <path d="M700 0 L660 30 L600 55 L520 80 L420 100 L300 114 L160 120 L0 120" stroke="white" strokeWidth="1.5" fill="none"/>
          <path d="M700 0 L740 30 L800 55 L880 80 L980 100 L1100 114 L1240 120 L1400 120" stroke="white" strokeWidth="1.5" fill="none"/>
        </svg>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <Ornament className="text-white/30 w-40 mx-auto mb-8" />
            <p className="text-white/60 text-[10px] font-medium uppercase tracking-[0.3em] mb-8"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              Our Anchor Verse
            </p>
            <p className="text-3xl sm:text-4xl text-white leading-[1.65] mb-8"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, fontStyle: "italic" }}>
              "And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper."
            </p>
            <Ornament className="text-white/30 w-40 mx-auto mb-5" />
            <p className="text-white/80 text-sm font-medium uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              Psalm 1:3 (KJV)
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 parchment-bg">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <Ornament className="text-[#c8927a]/40 w-36 mx-auto mb-8" />
            <h2 className="text-4xl text-[#3d2214] mb-5 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              Walk With Us<br />
              <em className="not-italic" style={{ color: "#c8927a" }}>in This Mission</em>
            </h2>
            <p className="text-base max-w-lg mx-auto mb-10"
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                fontWeight: 300,
                color: "rgba(90,58,40,0.65)",
              }}>
              You don't have to pursue faith alone. Join a community that will root you, hold you, and help you soar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/join"
                className="flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium text-sm transition-all hover:opacity-90 hover:scale-[1.03] shadow-lg"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  background: "linear-gradient(135deg, #c8927a 0%, #b8775a 100%)",
                  boxShadow: "0 8px 28px rgba(200,146,122,0.35)",
                }}>
                Join the Movement <ArrowRight size={15} />
              </Link>
              <Link to="/about/vision"
                className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  color: "#7a4a32",
                  border: "1px solid rgba(200,146,122,0.35)",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.7)"; e.currentTarget.style.background = "rgba(200,146,122,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.35)"; e.currentTarget.style.background = "transparent"; }}
              >
                Read Our Vision <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Mission;