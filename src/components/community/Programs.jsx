import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Users, BookOpen, Globe, Crown, Sword, ChevronDown, CheckCircle2, Calendar } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

const PROGRAMS = [
  {
    id: "eagles-rising",
    emoji: "🦅",
    icon: Crown,
    title: "Eagles Rising",
    badge: "Flagship",
    duration: "12 Weeks",
    audience: "All young adults",
    format: "Online & In-Person",
    gradient: "linear-gradient(145deg, #c8927a, #b8775a)",
    accentColor: "#c8927a",
    shortDesc: "An intensive discipleship track for young believers ready to go deeper — into the Word, into community, and into their God-given calling.",
    fullDesc: "Eagles Rising is our flagship 12-week intensive discipleship programme. Named after Isaiah 40:31, it is designed to take young believers from spiritual infancy to grounded maturity. Each cohort meets weekly — alternating between deep Scripture study, prayer sessions, and practical application. Graduates leave with a personal spiritual formation plan, an accountability partner, and a clear sense of their Kingdom assignment.",
    outcomes: [
      "Grounded theology and Scripture knowledge",
      "Personal prayer and devotional rhythm",
      "Identified spiritual gifts and calling",
      "Life-long accountability relationship",
      "Community of 10–20 fellow believers",
    ],
    verse: "They shall mount up with wings as eagles.",
    verseRef: "Isaiah 40:31",
    nextCohort: "April 2026",
  },
  {
    id: "rooted-word",
    emoji: "📖",
    icon: BookOpen,
    title: "Rooted in the Word",
    badge: "Daily",
    duration: "Ongoing",
    audience: "All levels",
    format: "Digital",
    gradient: "linear-gradient(145deg, #c4a882, #b09070)",
    accentColor: "#c4a882",
    shortDesc: "A daily devotional and Scripture memory programme pairing believers with accountability partners for consistent, life-transforming Bible engagement.",
    fullDesc: "Rooted in the Word is our daily programme built around the conviction that consistent Scripture intake changes lives. Each participant receives a daily devotional, a weekly memory verse, and a bi-weekly check-in with their reading partner. The programme runs in 90-day cycles, covering a different book of the Bible each season.",
    outcomes: [
      "Daily devotional habit established",
      "Comprehensive Bible book studies",
      "Scripture memory in each cycle",
      "Accountability and growth tracking",
      "Access to study notes and commentaries",
    ],
    verse: "Thy word is a lamp unto my feet, and a light unto my path.",
    verseRef: "Psalm 119:105",
    nextCohort: "March 2026",
  },
  {
    id: "global-missions",
    emoji: "🌍",
    icon: Globe,
    title: "Global Missions",
    badge: "Outreach",
    duration: "2–4 Weeks",
    audience: "18–35 years",
    format: "In-Person",
    gradient: "linear-gradient(145deg, #9ab0c8, #7890a8)",
    accentColor: "#9ab0c8",
    shortDesc: "Short-term missions opportunities, cross-cultural gospel training, and strategic deployment to communities across Africa, Europe, and beyond.",
    fullDesc: "Our Global Missions programme equips young adults with the theology, cultural intelligence, and practical skills needed for effective cross-cultural gospel work. Participants attend a 2-week pre-deployment training before joining a short-term team. Fields include Ghana, Kenya, Nigeria, and partner communities in Europe and the diaspora.",
    outcomes: [
      "Cross-cultural ministry training",
      "Evangelism and gospel fluency",
      "Partnership with local church leaders",
      "Field reports and life testimonies",
      "Pathway to long-term missions",
    ],
    verse: "Go ye into all the world, and preach the gospel to every creature.",
    verseRef: "Mark 16:15",
    nextCohort: "June 2026",
  },
  {
    id: "prayer-room",
    emoji: "🙏",
    icon: Users,
    title: "The Prayer Room",
    badge: "Live",
    duration: "Ongoing",
    audience: "All believers",
    format: "Online",
    gradient: "linear-gradient(145deg, #a89ab4, #8878a0)",
    accentColor: "#a89ab4",
    shortDesc: "A 24/7 intercessory prayer community standing in the gap for nations, families, and the next generation — every hour covered, every day.",
    fullDesc: "The Prayer Room is the heartbeat of Bold and Rooted. Organised into prayer watches, each member commits to a one-hour weekly prayer slot to ensure continuous intercession. Monthly corporate prayer nights, fasting weeks, and prophetic intercession sessions are regular features. We believe prayer moves mountains — and we intend to prove it.",
    outcomes: [
      "Personal intercessory prayer discipline",
      "Monthly corporate prayer nights",
      "Quarterly fasting and prayer weeks",
      "Prophetic intercession training",
      "Prayer journal and warfare guides",
    ],
    verse: "Pray without ceasing.",
    verseRef: "1 Thessalonians 5:17",
    nextCohort: "Ongoing — Join any time",
  },
  {
    id: "women-of-valor",
    emoji: "👑",
    icon: Crown,
    title: "Women of Valor",
    badge: "Community",
    duration: "6 Months",
    audience: "Young women 18–35",
    format: "Hybrid",
    gradient: "linear-gradient(145deg, #c4a0b8, #a88098)",
    accentColor: "#c4a0b8",
    shortDesc: "Empowering young women to walk boldly in their God-given identity and calling — rooted in Scripture, rich in community, fearless in purpose.",
    fullDesc: "Women of Valor is a 6-month formation journey for young women who are ready to step into the fullness of who God created them to be. Through monthly intensives, mentorship pairings, and a community of sisters, participants discover their identity in Christ, break free from fear and comparison, and step into their unique Kingdom calling.",
    outcomes: [
      "Biblical womanhood and identity formation",
      "Mentorship from seasoned women leaders",
      "Financial wisdom and stewardship",
      "Emotional healing and wholeness",
      "Commissioned into calling",
    ],
    verse: "Who can find a virtuous woman? for her price is far above rubies.",
    verseRef: "Proverbs 31:10",
    nextCohort: "May 2026",
  },
  {
    id: "men-of-covenant",
    emoji: "⚔️",
    icon: Sword,
    title: "Men of Covenant",
    badge: "Community",
    duration: "6 Months",
    audience: "Young men 18–35",
    format: "Hybrid",
    gradient: "linear-gradient(145deg, #d4b882, #c0a06a)",
    accentColor: "#d4b882",
    shortDesc: "Building men of integrity, purpose, and spiritual authority — equipped to lead in the home, the community, and every sphere of God's Kingdom.",
    fullDesc: "Men of Covenant is a brotherhood forged around covenant relationship, accountability, and Kingdom purpose. Over 6 months, young men engage in Scripture-based masculinity formation, undergo deep accountability, and are equipped to lead with servant-hearted authority. The programme culminates in a commissioning ceremony where each man makes a public covenant of purpose.",
    outcomes: [
      "Biblical masculinity and servant leadership",
      "Brotherhood and iron-sharpening accountability",
      "Vocational calling and purpose clarity",
      "Marriage and family preparation",
      "Commissioned with a covenant statement",
    ],
    verse: "Watch ye, stand fast in the faith, quit you like men, be strong.",
    verseRef: "1 Corinthians 16:13",
    nextCohort: "May 2026",
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

const ProgramCard = ({ program, index, onExpand, isExpanded }) => (
  <motion.article {...fadeUp(index * 0.07)} className="group">
    <div
      className="rounded-3xl overflow-hidden transition-all duration-400"
      style={{
        background: "rgba(255,255,255,0.82)",
        border: isExpanded
          ? "1px solid rgba(200,146,122,0.45)"
          : "1px solid rgba(200,146,122,0.18)",
        boxShadow: isExpanded
          ? "0 12px 48px rgba(180,120,90,0.14)"
          : "0 2px 16px rgba(180,120,90,0.06)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* top gradient accent */}
      <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, transparent)" }} />

      <div className="p-7">
        <div className="flex items-start gap-5">
          {/* emoji icon */}
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md"
            style={{ background: program.gradient }}>
            {program.emoji}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[9px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: `${program.accentColor}22`,
                  color: program.accentColor,
                  fontFamily: "'Jost', system-ui, sans-serif",
                }}>
                {program.badge}
              </span>
              <span className="text-[9px] font-medium uppercase tracking-widest"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.4)" }}>
                {program.duration}
              </span>
            </div>
            <h3 className="text-xl text-[#3d2214] leading-snug"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              {program.title}
            </h3>
          </div>

          <button
            onClick={() => onExpand(program.id)}
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition"
            style={{
              border: "1px solid rgba(200,146,122,0.25)",
              color: "rgba(200,146,122,0.6)",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8927a"; e.currentTarget.style.color = "#c8927a"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.25)"; e.currentTarget.style.color = "rgba(200,146,122,0.6)"; }}
          >
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown size={15} />
            </motion.div>
          </button>
        </div>

        {/* meta row */}
        <div className="flex flex-wrap gap-4 mt-4 mb-4">
          {[
            { icon: Users, val: program.audience },
            { icon: Calendar, val: program.format },
            { icon: Clock, val: `Next: ${program.nextCohort}` },
          ].map(({ icon: Icon, val }, i) => (
            <span key={i} className="flex items-center gap-1.5 text-xs"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.5)" }}>
              <Icon size={11} style={{ color: "rgba(200,146,122,0.6)" }} />
              {val}
            </span>
          ))}
        </div>

        <p className="text-sm leading-relaxed"
          style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.68)" }}>
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

                <p className="text-sm leading-[1.85]"
                  style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "rgba(90,58,40,0.75)" }}>
                  {program.fullDesc}
                </p>

                {/* outcomes */}
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] mb-3"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.4)" }}>
                    What You'll Gain
                  </p>
                  <div className="space-y-2.5">
                    {program.outcomes.map((o, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={13} className="shrink-0 mt-0.5" style={{ color: program.accentColor }} />
                        <p className="text-sm" style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(61,34,20,0.75)" }}>
                          {o}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* verse */}
                <div className="rounded-2xl p-5"
                  style={{ background: "linear-gradient(145deg, #3d2214, #5a3020)" }}>
                  <p className="italic text-sm leading-relaxed mb-2"
                    style={{ color: "rgba(232,196,160,0.85)", fontFamily: "'EB Garamond', Georgia, serif" }}>
                    "{program.verse}"
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-widest"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(200,146,122,0.55)" }}>
                    — {program.verseRef}
                  </p>
                </div>

                {/* apply CTA */}
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
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Daily", "Flagship", "Outreach", "Live", "Community"];

  const filtered = filter === "All" ? PROGRAMS : PROGRAMS.filter(p => p.badge === filter);

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

        {/* watermark */}
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
              <span className="text-[#b8845a] text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                Grow With Us
              </span>
            </div>
            <h1 className="leading-none tracking-tight text-[#3d2214] mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              <span className="block text-[clamp(3rem,7vw,5.5rem)]">Our</span>
              <span className="block text-[clamp(3rem,7vw,5.5rem)]" style={{ color: "#c8927a" }}>Programs</span>
            </h1>
            <p className="text-[#5a3a28]/60 text-base max-w-xl leading-relaxed"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
              Structured pathways for spiritual growth, community, and Kingdom impact — designed for every season of your faith journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <div className="sticky top-14 z-30 backdrop-blur-md"
        style={{ backgroundColor: "rgba(253,246,240,0.96)", borderBottom: "1px solid rgba(200,146,122,0.15)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="shrink-0 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest transition"
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                background: filter === f
                  ? "linear-gradient(135deg, #c8927a, #b8775a)"
                  : "rgba(255,255,255,0.8)",
                color: filter === f ? "white" : "rgba(90,58,40,0.6)",
                border: filter === f ? "none" : "1px solid rgba(200,146,122,0.25)",
                boxShadow: filter === f ? "0 4px 16px rgba(200,146,122,0.3)" : "none",
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Programs grid ── */}
      <section className="py-16 parchment-bg">
        <div className="max-w-6xl mx-auto px-6">
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
            <Ornament className="text-white/30 w-40 mx-auto mb-7" />
            <h2 className="text-4xl text-white mb-4 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              Not Sure Which Programme<br />
              <em className="italic font-normal">Is Right for You?</em>
            </h2>
            <p className="text-white/65 max-w-lg mx-auto text-base mb-8"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
              Reach out to our team — we'll help you find the best fit for where you are in your faith journey.
            </p>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-sm transition-all hover:scale-[1.03] shadow-xl"
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                background: "white",
                color: "#7a4a32",
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