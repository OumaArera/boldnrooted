import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Clock, Users, Filter, ChevronRight, Globe, X, Share2, Check } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

const EVENTS = [
  {
    id: "bold-faith-2026",
    title: "Bold Faith Conference 2026",
    type: "Conference",
    date: "March 15, 2026",
    dateShort: { day: "15", month: "MAR", year: "2026" },
    time: "9:00 AM – 6:00 PM",
    location: "Online & Yaoundé, Cameroon",
    format: "Hybrid",
    capacity: "500+",
    description: "Our annual flagship conference bringing together young believers from across the globe for two days of powerful worship, teaching, and commissioning. This year's theme: 'Unmovable — Standing Firm in a Shaking World'.",
    speakers: ["Rev. Gontse T", "Pastor Adaeze Okonkwo", "Dr. Nathan Boadi"],
    gradient: "linear-gradient(145deg, #c8927a, #b8775a)",
    accentGradient: "linear-gradient(135deg, #c8927a 0%, #b8775a 100%)",
    accent: "#c8927a",
    featured: true,
    registrationOpen: true,
    tags: ["Worship", "Teaching", "Networking"],
  },
  {
    id: "womens-retreat-2026",
    title: "Rooted Women's Retreat",
    type: "Retreat",
    date: "April 2–4, 2026",
    dateShort: { day: "02", month: "APR", year: "2026" },
    time: "Check-in: Friday 4 PM",
    location: "Atlanta, GA, USA",
    format: "In-Person",
    capacity: "80",
    description: "Three days of rest, renewal, and encounter for young women. Set in a serene retreat centre, this gathering is designed for deep community, healing worship, and prophetic activation in a safe, sacred space.",
    speakers: ["Adaeze Okonkwo", "Grace Owusu"],
    gradient: "linear-gradient(145deg, #c4a0b8, #a88098)",
    accentGradient: "linear-gradient(135deg, #c4a0b8, #a88098)",
    accent: "#c4a0b8",
    featured: false,
    registrationOpen: true,
    tags: ["Women", "Healing", "Worship"],
  },
  {
    id: "discipleship-camp-ghana",
    title: "Youth Discipleship Camp — Ghana",
    type: "Camp",
    date: "April 20–25, 2026",
    dateShort: { day: "20", month: "APR", year: "2026" },
    time: "5-Day Residential",
    location: "Accra, Ghana",
    format: "In-Person",
    capacity: "150",
    description: "A week-long residential camp for young Ghanaians aged 16–30. Packed with Scripture teaching, outdoor activities, evangelism training, and a final commissioning night.",
    speakers: ["Joshua Mensah", "Emmanuel Asante", "Local Church Leaders"],
    gradient: "linear-gradient(145deg, #c4a882, #b09070)",
    accentGradient: "linear-gradient(135deg, #c4a882, #b09070)",
    accent: "#c4a882",
    featured: false,
    registrationOpen: true,
    tags: ["Youth", "Camp", "Evangelism"],
  },
  {
    id: "prayer-night-may",
    title: "Global Prayer Night",
    type: "Prayer",
    date: "May 10, 2026",
    dateShort: { day: "10", month: "MAY", year: "2026" },
    time: "10:00 PM – 2:00 AM",
    location: "Online (Global)",
    format: "Online",
    capacity: "Unlimited",
    description: "An all-night intercessory prayer session streamed globally. Prayer watches covering every continent, prophetic declarations, and corporate fasting broken together at dawn.",
    speakers: ["Grace Owusu", "The Prayer Room Community"],
    gradient: "linear-gradient(145deg, #a89ab4, #8878a0)",
    accentGradient: "linear-gradient(135deg, #a89ab4, #8878a0)",
    accent: "#a89ab4",
    featured: false,
    registrationOpen: true,
    tags: ["Prayer", "Fasting", "Intercession"],
  },
  {
    id: "mens-covenant-day",
    title: "Men of Covenant Commissioning Day",
    type: "Commissioning",
    date: "May 30, 2026",
    dateShort: { day: "30", month: "MAY", year: "2026" },
    time: "10:00 AM – 4:00 PM",
    location: "Yaoundé, Cameroon",
    format: "In-Person",
    capacity: "200",
    description: "The culmination of the Men of Covenant 6-month programme — a powerful public commissioning ceremony where men make their covenant statements and are sent out as Kingdom leaders.",
    speakers: ["Rev. Gontse T", "Joshua Mensah"],
    gradient: "linear-gradient(145deg, #d4b882, #c0a06a)",
    accentGradient: "linear-gradient(135deg, #d4b882, #c0a06a)",
    accent: "#d4b882",
    featured: false,
    registrationOpen: false,
    tags: ["Men", "Leadership", "Commissioning"],
  },
  {
    id: "missions-debrief",
    title: "Global Missions Debrief & Send-Off",
    type: "Missions",
    date: "June 14, 2026",
    dateShort: { day: "14", month: "JUN", year: "2026" },
    time: "2:00 PM – 7:00 PM",
    location: "Nairobi, Kenya",
    format: "Hybrid",
    capacity: "300",
    description: "Celebrating returning mission teams and sending off the next cohort. Stories from the field, prophetic prayer over departing missionaries, and a call to the nations.",
    speakers: ["Miriam Abubakar", "Daniel Appiah"],
    gradient: "linear-gradient(145deg, #9ab0c8, #7890a8)",
    accentGradient: "linear-gradient(135deg, #9ab0c8, #7890a8)",
    accent: "#9ab0c8",
    featured: false,
    registrationOpen: true,
    tags: ["Missions", "Sending", "Global"],
  },
];

const TYPES = ["All", "Conference", "Retreat", "Camp", "Prayer", "Commissioning", "Missions"];
const FORMATS = ["All Formats", "Hybrid", "In-Person", "Online"];

const Ornament = ({ className = "" }) => (
  <svg viewBox="0 0 80 20" fill="none" className={className}>
    <line x1="0" y1="10" x2="28" y2="10" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="40" cy="10" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="33" cy="10" r="1" fill="currentColor" opacity="0.3" />
    <circle cx="47" cy="10" r="1" fill="currentColor" opacity="0.3" />
    <line x1="52" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="0.75" />
  </svg>
);

/* ── Event Modal ── */
const EventModal = ({ event, onClose }) => {
  const [copied, setCopied] = useState(false);
  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/events/${event.id}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
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
        transition={{ type: "spring", damping: 24, stiffness: 220 }}
        className="max-w-xl w-full overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{
          background: "#fdf6f0",
          borderRadius: "1.5rem",
          boxShadow: "0 32px 80px rgba(61,34,20,0.3)",
          border: "1px solid rgba(200,146,122,0.25)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* gradient header */}
        <div className="p-8 relative overflow-hidden" style={{ background: event.gradient }}>
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 55%)" }} />

          {/* top accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/65 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.12)", fontFamily: "'Jost', system-ui, sans-serif" }}>
                {event.type}
              </span>
              <button onClick={onClose}
                className="transition"
                style={{ color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={e => e.currentTarget.style.color = "white"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}>
                <X size={18} />
              </button>
            </div>
            <h2 className="text-2xl text-white leading-snug mb-4"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              {event.title}
            </h2>
            <div className="flex flex-wrap gap-4 text-xs"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.65)" }}>
              <span className="flex items-center gap-1.5"><Calendar size={11} />{event.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={11} />{event.time}</span>
              <span className="flex items-center gap-1.5"><MapPin size={11} />{event.location}</span>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <p className="text-sm leading-[1.82]"
            style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "rgba(90,58,40,0.78)" }}>
            {event.description}
          </p>

          {/* Speakers */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] mb-3"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.4)" }}>
              Speakers & Facilitators
            </p>
            <div className="flex flex-wrap gap-2">
              {event.speakers.map((s, i) => (
                <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{
                    fontFamily: "'Jost', system-ui, sans-serif",
                    color: "#7a4a32",
                    background: "rgba(200,146,122,0.1)",
                    border: "1px solid rgba(200,146,122,0.22)",
                  }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {event.tags.map((t, i) => (
              <span key={i} className="text-[10px] font-medium uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  color: "rgba(90,58,40,0.45)",
                  background: "rgba(200,146,122,0.08)",
                }}>
                {t}
              </span>
            ))}
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-3 gap-4 py-5"
            style={{ borderTop: "1px solid rgba(200,146,122,0.15)", borderBottom: "1px solid rgba(200,146,122,0.15)" }}>
            {[
              { label: "Format", val: event.format },
              { label: "Capacity", val: event.capacity },
              { label: "Status", val: event.registrationOpen ? "Open" : "Closed" },
            ].map(({ label, val }, i) => (
              <div key={i} className="text-center">
                <p className="text-[9px] font-medium uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.38)" }}>
                  {label}
                </p>
                <p className="text-sm font-semibold"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: label === "Status"
                      ? (event.registrationOpen ? "#7a9a6a" : "#a06060")
                      : "#3d2214",
                  }}>
                  {val}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {event.registrationOpen ? (
              <Link to={`/events/${event.id}/register`}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-medium text-white transition hover:opacity-90 hover:scale-[1.02]"
                style={{
                  background: event.accentGradient,
                  fontFamily: "'Jost', system-ui, sans-serif",
                  boxShadow: `0 6px 20px ${event.accent}40`,
                }}>
                Register Now <ArrowRight size={14} />
              </Link>
            ) : (
              <div className="flex-1 flex items-center justify-center py-3.5 rounded-full text-sm font-medium"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  color: "rgba(90,58,40,0.4)",
                  background: "rgba(200,146,122,0.08)",
                  border: "1px solid rgba(200,146,122,0.2)",
                }}>
                Registration Closed
              </div>
            )}
            <button onClick={handleShare}
              className="w-12 h-12 rounded-full flex items-center justify-center transition"
              style={{
                border: "1px solid rgba(200,146,122,0.3)",
                color: "rgba(200,146,122,0.7)",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8927a"; e.currentTarget.style.color = "#c8927a"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.3)"; e.currentTarget.style.color = "rgba(200,146,122,0.7)"; }}
            >
              {copied ? <Check size={15} style={{ color: "#7a9a6a" }} /> : <Share2 size={15} />}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Main ── */
const Events = () => {
  const [typeFilter, setTypeFilter] = useState("All");
  const [formatFilter, setFormatFilter] = useState("All Formats");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filtered = EVENTS.filter(e =>
    (typeFilter === "All" || e.type === typeFilter) &&
    (formatFilter === "All Formats" || e.format === formatFilter)
  );

  const featured = EVENTS.find(e => e.featured);
  const rest = filtered.filter(e => !e.featured);

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
      <section className="relative min-h-[58vh] flex items-end overflow-hidden pb-20"
        style={{ background: "linear-gradient(160deg, #f5e8da 0%, #ecddc8 60%, #f0e0ce 100%)" }}>

        <div className="absolute inset-0 paper-texture opacity-60" />
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, #c8927a, transparent)" }} />

        {/* watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.06)", whiteSpace: "nowrap" }}>
            COETUS
          </span>
        </div>

        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(200,146,122,0.12) 0%, transparent 70%)" }} />

        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.08]" viewBox="0 0 1400 130" fill="none" preserveAspectRatio="none">
          <path d="M0 130 L300 90 L600 50 L700 0 L800 50 L1100 90 L1400 130" stroke="#c8927a" strokeWidth="1.5" fill="none"/>
          <path d="M0 130 L200 105 L450 75 L700 0 L950 75 L1200 105 L1400 130" stroke="#e8c4a0" strokeWidth="0.8" fill="none"/>
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 w-full">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="flex items-center gap-4 mb-6">
              <Ornament className="text-[#c8927a]/50 w-28" />
              <span className="text-[#b8845a] text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                Gather · Grow · Go
              </span>
            </div>
            <h1 className="leading-none tracking-tight text-[#3d2214] mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
              <span className="block text-[clamp(3rem,7vw,5.5rem)]">Events &</span>
              <span className="block text-[clamp(3rem,7vw,5.5rem)]" style={{ color: "#c8927a" }}>Gatherings</span>
            </h1>
            <p className="text-[#5a3a28]/60 text-base max-w-xl leading-relaxed"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
              From intimate retreats to global conferences — every gathering is an opportunity to encounter God, build community, and be sent out changed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Featured event ── */}
      {featured && (
        <section className="py-14 max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp(0)}>
            <div className="flex items-center gap-3 mb-6">
              <Ornament className="text-[#c8927a]/50 w-24" />
              <span className="text-[#b8845a] text-[10px] font-medium uppercase tracking-[0.25em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                ✦ Featured Event
              </span>
            </div>

            <div
              className="rounded-3xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]"
              style={{
                background: featured.gradient,
                boxShadow: "0 12px 48px rgba(180,120,90,0.28)",
              }}
              onClick={() => setSelectedEvent(featured)}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }} />

              <div className="relative p-10 sm:p-14 overflow-hidden">
                <div className="absolute inset-0"
                  style={{ background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 55%)" }} />

                {/* date card */}
                <div className="absolute top-8 right-8 rounded-2xl p-5 text-center hidden sm:block"
                  style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <p className="text-white font-bold text-4xl leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    {featured.dateShort.day}
                  </p>
                  <p className="text-white/70 text-[10px] font-medium uppercase tracking-widest mt-1"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                    {featured.dateShort.month}
                  </p>
                  <p className="text-white/50 text-[10px] mt-0.5"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                    {featured.dateShort.year}
                  </p>
                </div>

                <div className="relative z-10 max-w-xl">
                  <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/60 px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.12)", fontFamily: "'Jost', system-ui, sans-serif" }}>
                    {featured.type} · {featured.format}
                  </span>
                  <h2 className="text-3xl sm:text-4xl text-white mt-5 mb-4 leading-snug"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                    {featured.title}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-7"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
                    {featured.description}
                  </p>
                  <div className="flex flex-wrap gap-5 text-white/65 text-xs mb-8"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
                    <span className="flex items-center gap-1.5"><Calendar size={11} />{featured.date}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={11} />{featured.location}</span>
                    <span className="flex items-center gap-1.5"><Clock size={11} />{featured.time}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white font-medium text-sm"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#7a4a32" }}>
                    View & Register <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ── Filters ── */}
      <div className="sticky top-14 z-30 backdrop-blur-md"
        style={{ backgroundColor: "rgba(253,246,240,0.96)", borderBottom: "1px solid rgba(200,146,122,0.15)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3 overflow-x-auto scrollbar-hide">
          <Filter size={13} style={{ color: "rgba(200,146,122,0.5)" }} className="shrink-0" />
          <div className="flex gap-2">
            {TYPES.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className="shrink-0 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest transition"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  background: typeFilter === t ? "linear-gradient(135deg, #c8927a, #b8775a)" : "rgba(255,255,255,0.8)",
                  color: typeFilter === t ? "white" : "rgba(90,58,40,0.6)",
                  border: typeFilter === t ? "none" : "1px solid rgba(200,146,122,0.25)",
                  boxShadow: typeFilter === t ? "0 4px 14px rgba(200,146,122,0.3)" : "none",
                }}>
                {t}
              </button>
            ))}
          </div>
          <div className="w-px h-5 mx-1 shrink-0" style={{ background: "rgba(200,146,122,0.2)" }} />
          <div className="flex gap-2">
            {FORMATS.map(f => (
              <button key={f} onClick={() => setFormatFilter(f)}
                className="shrink-0 px-4 py-2 rounded-full text-xs font-medium transition"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  background: formatFilter === f ? "linear-gradient(145deg, #3d2214, #5a3020)" : "rgba(255,255,255,0.8)",
                  color: formatFilter === f ? "white" : "rgba(90,58,40,0.5)",
                  border: formatFilter === f ? "none" : "1px solid rgba(200,146,122,0.2)",
                }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Events list ── */}
      <section className="py-14 parchment-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-4">
            {rest.map((event, i) => (
              <motion.div
                key={event.id}
                {...fadeUp(i * 0.07)}
                className="group rounded-2xl overflow-hidden cursor-pointer transition-all"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(200,146,122,0.18)",
                  boxShadow: "0 2px 14px rgba(180,120,90,0.06)",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.4)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(180,120,90,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.18)"; e.currentTarget.style.boxShadow = "0 2px 14px rgba(180,120,90,0.06)"; }}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-stretch">
                  {/* date block */}
                  <div className="w-20 sm:w-24 flex flex-col items-center justify-center py-6 shrink-0"
                    style={{ background: event.gradient }}>
                    <span className="text-white font-bold text-3xl leading-none"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                      {event.dateShort.day}
                    </span>
                    <span className="text-white/70 text-[9px] font-medium uppercase tracking-wider mt-1"
                      style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                      {event.dateShort.month}
                    </span>
                    <span className="text-white/45 text-[9px] mt-0.5"
                      style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                      {event.dateShort.year}
                    </span>
                  </div>

                  {/* content */}
                  <div className="flex-1 px-6 py-5 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-[9px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor: `${event.accent}20`,
                              color: event.accent,
                              fontFamily: "'Jost', system-ui, sans-serif",
                            }}>
                            {event.type}
                          </span>
                          <span className="text-[9px] flex items-center gap-1"
                            style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.4)" }}>
                            <Globe size={9} /> {event.format}
                          </span>
                          {!event.registrationOpen && (
                            <span className="text-[9px] font-medium px-2 py-0.5 rounded-full"
                              style={{
                                fontFamily: "'Jost', system-ui, sans-serif",
                                color: "#a06060",
                                background: "rgba(160,96,96,0.1)",
                              }}>
                              Closed
                            </span>
                          )}
                        </div>
                        <h3 className="text-[#3d2214] text-lg leading-snug mb-2"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}>
                          {event.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-xs"
                          style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.5)" }}>
                          <span className="flex items-center gap-1"><Clock size={10} />{event.time}</span>
                          <span className="flex items-center gap-1"><MapPin size={10} />{event.location}</span>
                          <span className="flex items-center gap-1"><Users size={10} />Cap. {event.capacity}</span>
                        </div>
                      </div>
                      <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all mt-1"
                        style={{ border: "1px solid rgba(200,146,122,0.25)" }}>
                        <ChevronRight size={14} style={{ color: "rgba(200,146,122,0.6)" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      </AnimatePresence>

    </div>
  );
};

export default Events;