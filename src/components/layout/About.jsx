import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Eye, Users } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

const ABOUT_PAGES = [
  {
    icon: BookOpen,
    label: "Our Mission",
    href: "/about/mission",
    headline: "Why We Exist",
    teaser: "To raise a generation of young adults standing firm in faith, unwavering in truth, deeply anchored in the Word of God — through Scripture, prayer, and discipleship.",
    verse: "Psalm 1:3",
    gradient: "linear-gradient(145deg, #c8927a, #b8775a)",
    accent: "#c8927a",
  },
  {
    icon: Eye,
    label: "Our Vision",
    href: "/about/vision",
    headline: "Where We Are Going",
    teaser: "A global movement of Christians who are spiritually grounded, spiritually empowered, and spiritually fearless — boldly living out their faith in every area of life.",
    verse: "Isaiah 40:31",
    gradient: "linear-gradient(145deg, #a89ab4, #8878a0)",
    accent: "#a89ab4",
  },
  {
    icon: Users,
    label: "Leadership",
    href: "/about/leadership",
    headline: "The People Behind the Mission",
    teaser: "Servant leaders rooted in humility, fuelled by faith, and called to raise a generation that moves the world. Meet the team standing behind Bold and Rooted.",
    verse: "Proverbs 27:17",
    gradient: "linear-gradient(145deg, #c4a882, #b09070)",
    accent: "#c4a882",
  },
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

const About = () => {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#fdf6f0" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');

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
      <section className="relative min-h-[65vh] flex items-end overflow-hidden pb-20"
        style={{
          background: "linear-gradient(160deg, #f5e8da 0%, #ecddc8 60%, #f0e0ce 100%)",
        }}>

        {/* paper grain */}
        <div className="absolute inset-0 paper-texture opacity-60" />

        {/* top gold line */}
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, #c8927a, transparent)" }} />

        {/* watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-bold leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "rgba(200,146,122,0.06)",
              whiteSpace: "nowrap",
            }}>
            ABOUT
          </span>
        </div>

        {/* subtle radial glow */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(200,146,122,0.15) 0%, transparent 70%)" }} />

        {/* root SVG */}
        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.08]" viewBox="0 0 1400 140" fill="none" preserveAspectRatio="none">
          <path d="M700 0 L660 30 L600 55 L520 80 L420 100 L300 118 L160 130 L0 140" stroke="#c8927a" strokeWidth="1.5" fill="none"/>
          <path d="M700 0 L740 30 L800 55 L880 80 L980 100 L1100 118 L1240 130 L1400 140" stroke="#c8927a" strokeWidth="1.5" fill="none"/>
          <path d="M700 0 L690 40 L670 80 L645 110 L620 128 L600 138 L580 140" stroke="#c8927a" strokeWidth="0.75" fill="none" opacity="0.6"/>
          <path d="M700 0 L710 40 L730 80 L755 110 L780 128 L800 138 L820 140" stroke="#c8927a" strokeWidth="0.75" fill="none" opacity="0.6"/>
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 w-full">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>

            <div className="flex items-center gap-4 mb-7">
              <Ornament className="text-[#c8927a]/50 w-28" />
              <span className="text-[#b8845a] text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                Who We Are
              </span>
            </div>

            <h1 className="leading-none tracking-tight text-[#3d2214] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              <span className="block text-[clamp(3rem,7vw,5.5rem)]">About</span>
              <span className="block text-[clamp(3rem,7vw,5.5rem)]" style={{ color: "#c8927a" }}>Bold & Rooted</span>
            </h1>

            <p className="text-[#5a3a28]/60 text-lg max-w-2xl leading-relaxed"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
              A faith movement born out of the conviction that this generation can be different — deeply rooted, boldly alive, and genuinely transformed by the gospel of Jesus Christ.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Three section cards ── */}
      <section className="py-20 parchment-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-5">
            {ABOUT_PAGES.map((page, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}>
                <Link to={page.href} className="group block">
                  <div className="rounded-3xl overflow-hidden transition-all"
                    style={{
                      background: "rgba(255,255,255,0.75)",
                      border: "1px solid rgba(200,146,122,0.18)",
                      boxShadow: "0 2px 20px rgba(180,120,90,0.07)",
                      backdropFilter: "blur(8px)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.border = "1px solid rgba(200,146,122,0.4)";
                      e.currentTarget.style.boxShadow = "0 12px 48px rgba(180,120,90,0.14)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.border = "1px solid rgba(200,146,122,0.18)";
                      e.currentTarget.style.boxShadow = "0 2px 20px rgba(180,120,90,0.07)";
                    }}
                  >
                    {/* top accent line */}
                    <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, transparent)" }} />

                    <div className="grid md:grid-cols-4">
                      {/* icon col */}
                      <div className="flex flex-col items-center justify-center p-10 min-h-40 relative overflow-hidden"
                        style={{ background: page.gradient }}>
                        <div className="absolute inset-0"
                          style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 65%)" }} />
                        <div className="relative w-13 h-13 rounded-2xl flex items-center justify-center mb-3"
                          style={{
                            background: "rgba(255,255,255,0.15)",
                            border: "1px solid rgba(255,255,255,0.25)",
                            width: "3.25rem",
                            height: "3.25rem",
                          }}>
                          <page.icon size={22} className="text-white" />
                        </div>
                        <span className="text-white/65 text-[9px] font-medium uppercase tracking-[0.22em] text-center mt-1"
                          style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                          {page.label}
                        </span>
                      </div>

                      {/* content */}
                      <div className="md:col-span-3 p-9 flex items-center justify-between gap-6">
                        <div className="flex-1">
                          <p className="text-[10px] font-medium uppercase tracking-[0.25em] mb-2"
                            style={{ color: page.accent, fontFamily: "'Jost', system-ui, sans-serif" }}>
                            {page.verse}
                          </p>
                          <h3 className="text-2xl sm:text-3xl text-[#3d2214] mb-3 transition-colors group-hover:text-[#c8927a]"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                            {page.headline}
                          </h3>
                          <p className="text-sm leading-relaxed max-w-xl"
                            style={{
                              fontFamily: "'Jost', system-ui, sans-serif",
                              fontWeight: 300,
                              color: "rgba(90,58,40,0.65)",
                            }}>
                            {page.teaser}
                          </p>
                        </div>
                        <div className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all"
                          style={{ border: "1px solid rgba(200,146,122,0.25)" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#c8927a"; e.currentTarget.style.border = "1px solid #c8927a"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.border = "1px solid rgba(200,146,122,0.25)"; }}
                        >
                          <ArrowRight size={16} style={{ color: "#c8927a" }} className="group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Origin story strip ── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #3d2214 0%, #5a3020 55%, #3d2214 100%)" }}>

        {/* watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-bold leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "rgba(200,146,122,0.04)",
              whiteSpace: "nowrap",
            }}>
            RADIX
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <Ornament className="text-[#c8927a]/40 w-40 mx-auto mb-7" />

            <p className="text-[10px] font-medium uppercase tracking-[0.3em] mb-7"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#e0b090" }}>
              The Foundation
            </p>

            <p className="text-2xl sm:text-3xl text-white leading-[1.75] mb-10"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, fontStyle: "italic" }}>
              Bold and Rooted was born from the belief that a generation raised on the uncompromised Word of God, in genuine community, with a heart for the nations — is a generation{" "}
              <span style={{ color: "#e8c4a0", fontStyle: "normal", fontWeight: 600 }}>the world has yet to see.</span>
            </p>

            <Link to="/about/mission"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-medium text-sm transition-all hover:opacity-90 hover:scale-[1.03] shadow-lg"
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                background: "linear-gradient(135deg, #c8927a 0%, #b8775a 100%)",
                boxShadow: "0 8px 28px rgba(200,146,122,0.3)",
              }}>
              Read Our Full Story <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;