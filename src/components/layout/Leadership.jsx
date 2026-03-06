import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Mail, Instagram, Twitter, Linkedin, Quote, X, ChevronRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

/* ── Team data ── */
const EXECUTIVE = [
  {
    name: "Gontse T",
    role: "Founder & Executive Director",
    bio: "Gontse is a minister of the gospel, author, and youth leader with a burning passion to see this generation walk boldly in their God-given identity. She is at the heart of what drives Bold and Rooted — that goodwill, grounded in Scripture.",
    verse: "For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation.",
    verseRef: "Romans 1:16",
    contact: "gontse@bold-n-rooted.org",
    initials: "GT",
    gradient: "linear-gradient(145deg, #c8927a, #b8775a)",
    accent: "#c8927a",
    socials: { instagram: "#", twitter: "#", linkedin: "#" },
  },
];

const CORE_TEAM = [
  {
    name: "Adaeze Okonkwo",
    role: "Director of Programs",
    dept: "Programs",
    bio: "Adaeze oversees all discipleship tracks, women's ministry, and curriculum development. She brings 8 years of youth ministry experience across Nigeria and the UK.",
    verse: "Let all things be done decently and in order.",
    verseRef: "1 Corinthians 14:40",
    initials: "AO",
    gradient: "linear-gradient(145deg, #a89ab4, #8878a0)",
    accent: "#a89ab4",
  },
  {
    name: "Emmanuel Asante",
    role: "Head of Worship & Creative",
    dept: "Creative",
    bio: "Emmanuel leads the worship culture of Bold and Rooted — creating spaces where encounters with God become the foundation for bold living.",
    verse: "Shout for joy to the Lord, all the earth.",
    verseRef: "Psalm 100:1",
    initials: "EA",
    gradient: "linear-gradient(145deg, #c4a882, #b09070)",
    accent: "#c4a882",
  },
  {
    name: "Miriam Abubakar",
    role: "Global Missions Coordinator",
    dept: "Missions",
    bio: "Miriam coordinates short-term missions, international partnerships, and the deployment of young missionaries to unreached communities worldwide.",
    verse: "Go ye into all the world, and preach the gospel to every creature.",
    verseRef: "Mark 16:15",
    initials: "MA",
    gradient: "linear-gradient(145deg, #9ab0c8, #7890a8)",
    accent: "#9ab0c8",
  },
  {
    name: "Joshua Mensah",
    role: "Head of Discipleship",
    dept: "Discipleship",
    bio: "Joshua builds and oversees the one-on-one discipleship and accountability systems that are the backbone of spiritual growth in Bold and Rooted.",
    verse: "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.",
    verseRef: "Proverbs 27:17",
    initials: "JM",
    gradient: "linear-gradient(145deg, #d4b882, #c0a06a)",
    accent: "#d4b882",
  },
  {
    name: "Grace Owusu",
    role: "Prayer & Intercession Lead",
    dept: "Prayer",
    bio: "Grace anchors the spiritual life of Bold and Rooted through a culture of 24/7 intercessory prayer, fasting weeks, and prophetic intercession for nations.",
    verse: "Pray without ceasing.",
    verseRef: "1 Thessalonians 5:17",
    initials: "GO",
    gradient: "linear-gradient(145deg, #c4a0b8, #a88098)",
    accent: "#c4a0b8",
  },
  {
    name: "Daniel Appiah",
    role: "Communications Director",
    dept: "Comms",
    bio: "Daniel leads all media, digital strategy, and content creation — ensuring the message of Bold and Rooted reaches young adults in every digital space.",
    verse: "How beautiful are the feet of them that preach the gospel of peace.",
    verseRef: "Romans 10:15",
    initials: "DA",
    gradient: "linear-gradient(145deg, #a8b8c4, #889aa8)",
    accent: "#a8b8c4",
  },
];

const ADVISORY = [
  { name: "Dr. Sarah Osei", role: "Theological Advisor", initials: "SO", gradient: "linear-gradient(145deg, #c4a882, #b09070)" },
  { name: "Pastor Nathan Boadi", role: "Pastoral Advisor", initials: "NB", gradient: "linear-gradient(145deg, #c8927a, #b8775a)" },
  { name: "Prof. Ama Darko", role: "Educational Strategy", initials: "AD", gradient: "linear-gradient(145deg, #9ab0c8, #7890a8)" },
  { name: "Rev. David Kofi", role: "Missions Advisor", initials: "DK", gradient: "linear-gradient(145deg, #a89ab4, #8878a0)" },
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

/* ── Team member modal ── */
const TeamModal = ({ member, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ background: "rgba(61,34,20,0.65)", backdropFilter: "blur(8px)" }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.93, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.93, y: 20 }}
      transition={{ type: "spring", damping: 26, stiffness: 220 }}
      className="max-w-lg w-full overflow-hidden"
      style={{
        background: "#fdf6f0",
        borderRadius: "1.5rem",
        boxShadow: "0 32px 80px rgba(61,34,20,0.3)",
        border: "1px solid rgba(200,146,122,0.25)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* gradient top */}
      <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, #c8927a, transparent)" }} />

      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0"
              style={{ background: member.gradient, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              {member.initials}
            </div>
            <div>
              <h3 className="text-[#3d2214] font-semibold text-xl"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {member.name}
              </h3>
              <p className="text-[10px] font-medium uppercase tracking-widest mt-0.5"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#c8927a" }}>
                {member.role}
              </p>
            </div>
          </div>
          <button onClick={onClose}
            className="transition p-1 rounded-full"
            style={{ color: "rgba(90,58,40,0.4)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#3d2214"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(90,58,40,0.4)"}>
            <X size={18} />
          </button>
        </div>

        <p className="text-sm leading-relaxed mb-6"
          style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.75)" }}>
          {member.bio}
        </p>

        <div className="rounded-2xl p-5" style={{ background: "linear-gradient(145deg, #3d2214, #5a3020)" }}>
          <p className="italic text-sm leading-relaxed mb-2"
            style={{ color: "rgba(232,196,160,0.85)", fontFamily: "'EB Garamond', Georgia, serif" }}>
            "{member.verse}"
          </p>
          <p className="text-[10px] font-medium uppercase tracking-widest"
            style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(200,146,122,0.55)" }}>
            — {member.verseRef}
          </p>
        </div>

        {member.contact && (
          <div className="mt-5 flex items-center gap-4">
            <a href={`mailto:${member.contact}`}
              className="flex items-center gap-2 text-xs font-medium transition"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#c8927a" }}
              onMouseEnter={e => e.currentTarget.style.color = "#7a4a32"}
              onMouseLeave={e => e.currentTarget.style.color = "#c8927a"}>
              <Mail size={13} /> {member.contact}
            </a>
          </div>
        )}
      </div>
    </motion.div>
  </motion.div>
);

/* ── Main ── */
const Leadership = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#fdf6f0" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&family=EB+Garamond:ital,wght@0,400;1,400&display=swap');

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
        style={{ background: "linear-gradient(160deg, #f5e8da 0%, #ecddc8 60%, #f0e0ce 100%)" }}>

        <div className="absolute inset-0 paper-texture opacity-60" />
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, #c8927a, transparent)" }} />

        {/* watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.06)", whiteSpace: "nowrap" }}>
            PASTORES
          </span>
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(200,146,122,0.12) 0%, transparent 70%)" }} />

        {/* root SVG */}
        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.08]" viewBox="0 0 1400 160" fill="none" preserveAspectRatio="none">
          <path d="M0 160 L200 130 L400 100 L600 70 L700 0 L800 70 L1000 100 L1200 130 L1400 160" stroke="#c8927a" strokeWidth="1.5" fill="none"/>
          <path d="M0 160 L150 140 L350 115 L550 85 L700 0 L850 85 L1050 115 L1250 140 L1400 160" stroke="#e8c4a0" strokeWidth="0.8" fill="none"/>
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
                The Team
              </span>
            </div>
            <h1 className="leading-none tracking-tight text-[#3d2214]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              <span className="block text-[clamp(3rem,7vw,5.5rem)]">Our</span>
              <span className="block text-[clamp(3rem,7vw,5.5rem)]" style={{ color: "#c8927a" }}>Leadership</span>
            </h1>
            <p className="text-[#5a3a28]/60 text-base mt-5 max-w-lg leading-relaxed"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
              Servant leaders rooted in humility, fuelled by faith, and called to raise a generation that moves the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Founder feature ── */}
      {EXECUTIVE.map((leader, i) => (
        <section key={i} className="py-24 parchment-bg">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div {...fadeUp(0)} className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <Ornament className="text-[#c8927a]/50 w-28" />
                <span className="text-[#b8845a] text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                  Founder
                </span>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp(0.1)}
              className="group relative grid md:grid-cols-3 gap-0 rounded-3xl overflow-hidden cursor-pointer transition-all"
              style={{
                boxShadow: "0 4px 40px rgba(180,120,90,0.14)",
                border: "1px solid rgba(200,146,122,0.2)",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 16px 60px rgba(180,120,90,0.22)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 40px rgba(180,120,90,0.14)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.2)"; }}
              onClick={() => setSelectedMember(leader)}
            >
              {/* left — gradient avatar column */}
              <div className="flex flex-col items-center justify-center p-12 min-h-64 relative overflow-hidden"
                style={{ background: leader.gradient }}>
                <div className="absolute inset-0"
                  style={{ background: "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.12) 0%, transparent 65%)" }} />
                <div className="relative w-24 h-24 rounded-3xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.25)" }}>
                  <span className="text-white font-bold text-4xl"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    {leader.initials}
                  </span>
                </div>
                <p className="text-white/50 text-[9px] font-medium uppercase tracking-[0.22em]"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                  Tap to read more
                </p>
              </div>

              {/* right — content */}
              <div className="md:col-span-2 p-10" style={{ background: "rgba(255,255,255,0.85)" }}>
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] mb-3"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#c8927a" }}>
                  {leader.role}
                </p>
                <h2 className="text-3xl text-[#3d2214] mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                  {leader.name}
                </h2>
                <p className="text-base leading-[1.82] mb-7"
                  style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "rgba(90,58,40,0.75)" }}>
                  {leader.bio}
                </p>

                <div className="pl-5 mb-7" style={{ borderLeft: "2px solid rgba(200,146,122,0.5)" }}>
                  <p className="italic text-base" style={{ color: "#7a4a32", fontFamily: "'EB Garamond', Georgia, serif" }}>
                    "{leader.verse}"
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-widest mt-2"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#c8927a" }}>
                    — {leader.verseRef}
                  </p>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <a href={`mailto:${leader.contact}`}
                    className="flex items-center gap-2 text-xs font-medium transition"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#c8927a" }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={e => e.currentTarget.style.color = "#7a4a32"}
                    onMouseLeave={e => e.currentTarget.style.color = "#c8927a"}>
                    <Mail size={13} /> Contact
                  </a>
                  {leader.socials && Object.entries(leader.socials).map(([platform, href]) => {
                    const icons = { instagram: Instagram, twitter: Twitter, linkedin: Linkedin };
                    const Icon = icons[platform];
                    return Icon ? (
                      <a key={platform} href={href}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition"
                        style={{ border: "1px solid rgba(200,146,122,0.3)", color: "rgba(200,146,122,0.6)" }}
                        onMouseEnter={e => { e.currentTarget.style.color = "#c8927a"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.7)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "rgba(200,146,122,0.6)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.3)"; }}
                        onClick={(e) => e.stopPropagation()}>
                        <Icon size={13} />
                      </a>
                    ) : null;
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ── Core Team ── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #f0e0d0 0%, #f8ede2 100%)" }}>
        <div className="absolute inset-0 paper-texture opacity-50" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp(0)} className="mb-14">
            <div className="flex items-center gap-4 mb-5">
              <Ornament className="text-[#c8927a]/50 w-28" />
              <span className="text-[#b8845a] text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                Core Team
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-[#3d2214] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              Serving Together<br />
              <em className="not-italic" style={{ color: "#c8927a" }}>in the Mission</em>
            </h2>
            <p className="mt-4 max-w-lg text-base"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.65)" }}>
              Each member of our core team brings a distinct gift and calling — together forming one body, unified in purpose.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_TEAM.map((member, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                className="group rounded-3xl overflow-hidden cursor-pointer transition-all"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(200,146,122,0.18)",
                  boxShadow: "0 2px 16px rgba(180,120,90,0.06)",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.38)"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(180,120,90,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.18)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(180,120,90,0.06)"; }}
                onClick={() => setSelectedMember(member)}
              >
                {/* top accent line */}
                <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, transparent)" }} />

                <div className="p-7">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                      style={{ background: member.gradient, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                      {member.initials}
                    </div>
                    <div className="pt-0.5">
                      <h3 className="text-[#3d2214] text-base leading-snug"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                        {member.name}
                      </h3>
                      <p className="text-[10px] font-medium uppercase tracking-widest mt-0.5"
                        style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#c8927a" }}>
                        {member.dept}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed mb-5 line-clamp-3"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.65)" }}>
                    {member.bio}
                  </p>

                  <div className="flex items-center justify-between pt-4"
                    style={{ borderTop: "1px solid rgba(200,146,122,0.15)" }}>
                    <p className="italic text-xs line-clamp-1 flex-1 mr-3"
                      style={{ color: "rgba(122,74,50,0.7)", fontFamily: "'EB Garamond', Georgia, serif" }}>
                      "{member.verse}"
                    </p>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0"
                      style={{ border: "1px solid rgba(200,146,122,0.3)" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#c8927a"; e.currentTarget.style.borderColor = "#c8927a"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.3)"; }}>
                      <ChevronRight size={12} style={{ color: "#c8927a" }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advisory Board ── */}
      <section className="py-24 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #3d2214 0%, #5a3020 55%, #3d2214 100%)" }}>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[16vw] font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.04)", whiteSpace: "nowrap" }}>
            CONSILIUM
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp(0)} className="mb-14">
            <Ornament className="text-[#c8927a]/40 w-36 mb-5" />
            <span className="text-[#e0b090] text-[10px] font-medium uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              Counsel & Wisdom
            </span>
            <h2 className="text-4xl sm:text-5xl text-white mt-4 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              Advisory Board
            </h2>
            <p className="text-white/42 mt-4 max-w-lg text-base"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
              A council of seasoned leaders and scholars who provide wisdom, accountability, and theological grounding.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADVISORY.map((adv, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                className="rounded-2xl p-6 transition-all"
                style={{
                  background: "rgba(253,246,240,0.05)",
                  border: "1px solid rgba(200,146,122,0.15)",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(253,246,240,0.08)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.38)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(253,246,240,0.05)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.15)"; }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4"
                  style={{ background: adv.gradient, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {adv.initials}
                </div>
                <h3 className="text-white font-semibold text-base leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {adv.name}
                </h3>
                <p className="text-[11px] mt-1.5 font-medium"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(232,196,160,0.5)" }}>
                  {adv.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join the team CTA ── */}
      <section className="py-24 parchment-bg">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <Ornament className="text-[#c8927a]/40 w-36 mx-auto mb-8" />
            <h2 className="text-4xl sm:text-5xl text-[#3d2214] mb-5 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              Called to Serve?<br />
              <em className="not-italic" style={{ color: "#c8927a" }}>We'd Love to Hear From You.</em>
            </h2>
            <p className="text-base max-w-xl mx-auto mb-10 leading-relaxed"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.65)" }}>
              Bold and Rooted is always looking for servant leaders, creatives, intercessors, and missionaries who are ready to pour out their gifts for the Kingdom.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/volunteer"
                className="flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium text-sm transition-all hover:opacity-90 hover:scale-[1.03] shadow-lg"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  background: "linear-gradient(135deg, #c8927a 0%, #b8775a 100%)",
                  boxShadow: "0 8px 28px rgba(200,146,122,0.35)",
                }}>
                Volunteer With Us <ArrowRight size={15} />
              </Link>
              <Link to="/contact"
                className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  color: "#7a4a32",
                  border: "1px solid rgba(200,146,122,0.35)",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.7)"; e.currentTarget.style.background = "rgba(200,146,122,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.35)"; e.currentTarget.style.background = "transparent"; }}
              >
                Get in Touch <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Member modal ── */}
      <AnimatePresence>
        {selectedMember && (
          <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </AnimatePresence>

    </div>
  );
};

export default Leadership;