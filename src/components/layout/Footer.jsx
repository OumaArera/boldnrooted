import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Facebook, Twitter, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const LINKS = {
  Explore: [
    { label: "About Us", href: "/about" },
    { label: "Our Mission", href: "/about/mission" },
    { label: "Leadership", href: "/about/leadership" },
    { label: "Programs", href: "/programs" },
    { label: "Events", href: "/events" },
  ],
  Resources: [
    { label: "Blogs", href: "/blogs" },
    { label: "Prayer Wall", href: "/prayer" },
    { label: "Discipleship", href: "/discipleship" },
  ],
  Connect: [
    { label: "Join the Movement", href: "/join" },
    { label: "Partner With Us", href: "/give" },
    // { label: "Volunteer", href: "/volunteer" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const TikTok = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 256"
    fill="currentColor"
  >
    <path d="M224 80.5a87.1 87.1 0 0 1-50.5-16.1v73.6a72 72 0 1 1-62.5-71.4v37.2a34.9 34.9 0 1 0 24.5 33.4V0h37.5a49.7 49.7 0 0 0 1.1 10.6A50.2 50.2 0 0 0 224 48.5Z"/>
  </svg>
);

const SOCIALS = [
  { icon: Instagram, href: "https://www.instagram.com/boldrooted", label: "Instagram" },
  { icon: TikTok, href: "https://www.tiktok.com/@boldrooted1", label: "TikTok" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "X / Twitter" },
];

/* small ornament divider */
const Ornament = ({ className = "" }) => (
  <svg viewBox="0 0 80 20" fill="none" className={className}>
    <line x1="0" y1="10" x2="28" y2="10" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="40" cy="10" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="33" cy="10" r="1" fill="currentColor" opacity="0.3" />
    <circle cx="47" cy="10" r="1" fill="currentColor" opacity="0.3" />
    <line x1="52" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="0.75" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #3d2214 0%, #5a3020 55%, #3d2214 100%)", color: "white" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');
      `}</style>

      {/* large watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-bold leading-none"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: "rgba(200,146,122,0.04)",
            whiteSpace: "nowrap",
          }}>
          FIDES
        </span>
      </div>

      {/* top gold line */}
      <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, #c8927a, transparent)" }} />

      {/* upper CTA band */}
      <div className="relative" style={{ borderBottom: "1px solid rgba(200,146,122,0.15)" }}>
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Ornament className="text-[#c8927a]/40 w-32 mb-5" />
            {/* was #e0b090 → now #f0c8a0 for stronger warmth on dark bg */}
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#f0c8a0] mb-4"
              style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
              Psalm 1:3 · Isaiah 40:31
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Ready to be Planted<br />
              {/* was #e8c4a0 → kept, it reads well as display text */}
              <em className="not-italic" style={{ color: "#e8c4a0" }}>by Living Waters?</em>
            </h2>
            {/* was white/45 → now white/72 */}
            <p className="text-white/72 mt-4 text-sm leading-relaxed max-w-md"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 400 }}>
              Join a global movement of young believers rooted in faith, empowered by Scripture, and rising with renewed strength.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/join"
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-full text-white font-medium text-sm transition-all hover:opacity-90 hover:scale-[1.03] shadow-xl"
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                background: "linear-gradient(135deg, #c8927a 0%, #b8775a 100%)",
                boxShadow: "0 8px 32px rgba(200,146,122,0.3)",
              }}>
              Join the Movement
              <ArrowUpRight size={15} />
            </Link>
            {/* was white/65 border → now white/80 for more visible outline */}
            <Link to="/give"
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-medium transition"
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                fontWeight: 400,
                color: "rgba(255,255,255,0.80)",
                border: "1px solid rgba(200,146,122,0.45)",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.75)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.80)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.45)"; }}
            >
              Support Our Mission
            </Link>
          </div>
        </div>
      </div>

      {/* main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">

          {/* brand column */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <img src="/logo-.png" alt="Bold & Rooted" className="h-10 w-auto object-contain brightness-0 invert opacity-90" />
              <div>
                <span className="block text-white font-semibold text-lg leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  Bold & Rooted
                </span>
                <span className="block text-[9px] font-medium uppercase tracking-[0.22em]"
                  style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#c8927a" }}>
                  Psalm 1:3
                </span>
              </div>
            </Link>

            {/* was white/40 → now white/68 */}
            <p className="text-white/68 text-sm leading-relaxed mb-7 max-w-xs"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 400 }}>
              Raising a generation of young adults standing firm in faith, unwavering in truth, deeply anchored in the Word of God.
            </p>

            {/* Socials — was white/45 → now white/65 */}
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition"
                  style={{
                    border: "1px solid rgba(200,146,122,0.35)",
                    color: "rgba(255,255,255,0.65)",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#e8c4a0"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.7)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; e.currentTarget.style.borderColor = "rgba(200,146,122,0.35)"; }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              {/* was rgba(232,196,160,0.6) → now rgba(232,196,160,0.85) */}
              <p className="text-[9px] font-medium uppercase tracking-[0.28em] mb-5"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(232,196,160,0.85)" }}>
                {group}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    {/* was white/45 → now white/68; fontWeight 300 → 400 */}
                    <Link to={item.href}
                      className="text-sm transition"
                      style={{
                        fontFamily: "'Jost', system-ui, sans-serif",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.68)",
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = "rgba(232,196,160,0.95)"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.68)"}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* contact strip — was white/30 → now white/58 */}
        <div className="mt-14 pt-8 flex flex-wrap gap-5 text-xs"
          style={{
            borderTop: "1px solid rgba(200,146,122,0.15)",
            fontFamily: "'Jost', system-ui, sans-serif",
            color: "rgba(255,255,255,0.58)",
          }}>
          <a href="mailto:info@boldandrooted.org"
            className="flex items-center gap-1.5 transition"
            onMouseEnter={e => e.currentTarget.style.color = "#e8c4a0"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.58)"}>
            <Mail size={12} /> info@boldandrooted.org
          </a>
          <a href="tel:+1234567890"
            className="flex items-center gap-1.5 transition"
            onMouseEnter={e => e.currentTarget.style.color = "#e8c4a0"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.58)"}>
            <Phone size={12} /> Contact Us
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} /> Global Ministry
          </span>
        </div>
      </div>

      {/* bottom bar — was white/25 → now white/50 */}
      <div style={{ borderTop: "1px solid rgba(200,146,122,0.15)" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]"
          style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(255,255,255,0.50)" }}>
          <span>© {new Date().getFullYear()} Bold & Rooted. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy"
              className="transition"
              onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.80)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.50)"}>
              Privacy Policy
            </Link>
            <Link to="/terms"
              className="transition"
              onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.80)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.50)"}>
              Terms
            </Link>
            {/* was rgba(200,146,122,0.5) → now rgba(200,146,122,0.80) */}
            <a href="https://zafrika.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 transition"
              style={{ color: "rgba(200,146,122,0.80)" }}
              onMouseEnter={e => e.currentTarget.style.color = "#c8927a"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(200,146,122,0.80)"}>
              Powered by Zafrika Tech Lab
              <ArrowUpRight size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;