import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Our Mission", href: "/about/mission" },
      { label: "Our Vision", href: "/about/vision" },
      { label: "Leadership", href: "/about/leadership" },
    ],
  },
  {
    label: "Community",
    href: "#",
    children: [
      { label: "Programs", href: "/programs" },
      { label: "Events", href: "/events" },
      { label: "Prayer Wall", href: "/prayer" },
      { label: "Discipleship", href: "/discipleship" },
    ],
  },
  { label: "Blogs", href: "/blogs" },
  { label: "Give", href: "/give" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500;600&display=swap');
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
        style={scrolled ? { backgroundColor: "rgba(253,246,240,0.97)", borderBottom: "1px solid rgba(200,146,122,0.2)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo-.png"
              alt="Bold & Rooted"
              className="h-10 w-auto object-contain"
            />
            <div className="leading-tight">
              <span
                className="block font-semibold text-lg tracking-tight leading-none transition-colors"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: scrolled ? "#3d2214" : "#3d2214",
                }}
              >
                Bold & Rooted
              </span>
              <span
                className="block text-[9px] font-medium uppercase tracking-[0.22em]"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  color: "#c8927a",
                }}
              >
                Psalm 1:3
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition"
                    style={{
                      fontFamily: "'Jost', system-ui, sans-serif",
                      color: scrolled ? "rgba(61,34,20,0.7)" : "rgba(61,34,20,0.75)",
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "#3d2214"}
                    onMouseLeave={e => e.currentTarget.style.color = scrolled ? "rgba(61,34,20,0.7)" : "rgba(61,34,20,0.75)"}
                  >
                    {item.label}
                    <ChevronDown size={13} className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-2 w-52 rounded-2xl overflow-hidden"
                        style={{
                          background: "rgba(253,246,240,0.98)",
                          border: "1px solid rgba(200,146,122,0.25)",
                          boxShadow: "0 16px 48px rgba(180,120,90,0.18)",
                          backdropFilter: "blur(16px)",
                        }}
                      >
                        <div className="h-0.5" style={{ background: "linear-gradient(90deg, #c8927a, #e8c4a0, #c8927a)" }} />
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="flex items-center gap-3 px-5 py-3 text-sm transition"
                            style={{
                              fontFamily: "'Jost', system-ui, sans-serif",
                              color: "rgba(61,34,20,0.65)",
                              fontWeight: 400,
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = "#3d2214"; e.currentTarget.style.background = "rgba(200,146,122,0.08)"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "rgba(61,34,20,0.65)"; e.currentTarget.style.background = "transparent"; }}
                          >
                            <div className="w-1 h-1 rounded-full bg-[#c8927a] shrink-0 opacity-60" />
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-4 py-2 rounded-full text-sm font-medium transition"
                  style={{
                    fontFamily: "'Jost', system-ui, sans-serif",
                    color: location.pathname === item.href
                      ? "#c8927a"
                      : scrolled ? "rgba(61,34,20,0.7)" : "rgba(61,34,20,0.75)",
                    background: location.pathname === item.href ? "rgba(200,146,122,0.1)" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* ── CTA + Hamburger ── */}
          <div className="flex items-center gap-3">
            <Link
              to="/join"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 hover:scale-[1.03]"
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                background: "linear-gradient(135deg, #c8927a 0%, #b8775a 100%)",
                boxShadow: "0 6px 24px rgba(200,146,122,0.35)",
              }}
            >
              Join the Movement
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full transition"
              style={{ color: "#7a4a32", border: "1px solid rgba(200,146,122,0.3)" }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "#fdf6f0" }}
          >
            {/* top gradient band */}
            <div className="h-0.5" style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, #c8927a, transparent)" }} />

            {/* top bar */}
            <div className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(200,146,122,0.18)" }}>
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Bold & Rooted" className="h-9 w-auto object-contain" />
                <span className="font-semibold text-lg text-[#3d2214]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  Bold & Rooted
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full transition"
                style={{ color: "#9a6a50", border: "1px solid rgba(200,146,122,0.25)" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* links */}
            <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-1">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {item.children ? (
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#c8927a]/70 px-2 pt-5 pb-2"
                        style={{ fontFamily: "'Jost', system-ui, sans-serif" }}>
                        {item.label}
                      </p>
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-base transition"
                          style={{
                            fontFamily: "'Jost', system-ui, sans-serif",
                            color: "rgba(61,34,20,0.65)",
                            fontWeight: 400,
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = "#3d2214"; e.currentTarget.style.background = "rgba(200,146,122,0.08)"; }}
                          onMouseLeave={e => { e.currentTarget.style.color = "rgba(61,34,20,0.65)"; e.currentTarget.style.background = "transparent"; }}
                        >
                          <div className="w-1 h-1 rounded-full bg-[#c8927a] opacity-60" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link to={item.href}
                      className="flex items-center px-4 py-3 rounded-xl text-base font-medium transition"
                      style={{
                        fontFamily: "'Jost', system-ui, sans-serif",
                        color: location.pathname === item.href ? "#c8927a" : "rgba(61,34,20,0.75)",
                        background: location.pathname === item.href ? "rgba(200,146,122,0.08)" : "transparent",
                      }}>
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* bottom CTA */}
            <div className="px-6 pb-10" style={{ borderTop: "1px solid rgba(200,146,122,0.15)", paddingTop: "1.5rem" }}>
              <Link to="/join"
                className="block text-center py-4 rounded-2xl text-white font-medium text-base shadow-lg"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  background: "linear-gradient(135deg, #c8927a 0%, #b8775a 100%)",
                  boxShadow: "0 8px 32px rgba(200,146,122,0.35)",
                }}>
                Join the Movement
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;