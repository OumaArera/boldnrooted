import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ArrowRight, Search, FileText, Tag, Clock, ArrowUpRight } from "lucide-react";
import { blogs } from "../../data/blogs.data";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

const ALL_TAGS = ["All", ...Array.from(new Set(blogs.flatMap(b => b.tags || [])))];

const Ornament = ({ className = "" }) => (
  <svg viewBox="0 0 80 20" fill="none" className={className}>
    <line x1="0" y1="10" x2="28" y2="10" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="40" cy="10" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="33" cy="10" r="1" fill="currentColor" opacity="0.3" />
    <circle cx="47" cy="10" r="1" fill="currentColor" opacity="0.3" />
    <line x1="52" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="0.75" />
  </svg>
);

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const filtered = blogs.filter(b => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchTag = activeTag === "All" || b.tags?.includes(activeTag);
    return matchSearch && matchTag;
  });

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", backgroundColor: "#fdf6f0" }}>

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
      `}</style>

      <section
        className="relative min-h-[58vh] flex items-end overflow-hidden pb-20"
        style={{ background: "linear-gradient(160deg, #f5e8da 0%, #ecddc8 60%, #f0e0ce 100%)" }}
      >
        <div className="absolute inset-0 paper-texture opacity-60" />
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, #c8927a, transparent)" }} />

        {/* watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-bold leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "rgba(200,146,122,0.06)", whiteSpace: "nowrap" }}>
            LOGOS
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
            <div className="flex items-center gap-4 mb-6">
              <Ornament className="text-[#c8927a]/50 w-28" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
                Words That Build Faith
              </span>
            </div>
            <h1 className="leading-none tracking-tight mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: "#3d2214" }}>
              <span className="block" style={{ fontSize: "clamp(3rem,7vw,5.5rem)" }}>Insights &</span>
              <span className="block" style={{ fontSize: "clamp(3rem,7vw,5.5rem)", color: "#c8927a" }}>Reflections</span>
            </h1>
            <p className="text-base max-w-lg leading-relaxed"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.6)" }}>
              Essays, devotionals, and deep dives on faith, Scripture, and the life God calls us to live.
            </p>
            {/* search */}
      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(90,58,40,0.38)" }} />
<input
  type="text"
  placeholder="Search by title, author, or tag…"
  value={search}
  onChange={e => setSearch(e.target.value)}
  className="w-full pl-10 pr-4 py-3 rounded-full text-sm focus:outline-none transition"
  style={{
    fontFamily: "'Jost', system-ui, sans-serif",
    fontWeight: 300,
    background: "rgba(255,252,248,0.75)",
    border: "1px solid rgba(200,146,122,0.35)",
    color: "#3d2214",
  }}
/>
      </div>
          </motion.div>
        </div>
      </section>


      {/* ── Tag filter — sticky ── */}
      <div className="sticky top-14 z-30 backdrop-blur-sm"
        style={{ background: "rgba(253,246,240,0.96)", borderBottom: "1px solid rgba(200,146,122,0.12)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
          {ALL_TAGS.map(tag => {
            const active = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-medium uppercase tracking-widest transition-all"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  background: active ? "linear-gradient(145deg, #5a3020, #8b5a3a)" : "rgba(255,252,248,0.9)",
                  color: active ? "#fff" : "rgba(90,58,40,0.65)",
                  border: active ? "1px solid #5a3020" : "1px solid rgba(200,146,122,0.22)",
                  boxShadow: active ? "0 4px 14px rgba(90,48,32,0.18)" : "none",
                }}
              >
                {tag !== "All" && <Tag size={9} style={{ opacity: 0.65 }} />}
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Listing ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 parchment-bg">
        {filtered.length === 0 ? (
          <div className="text-center py-24" style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.4)" }}>
            <FileText size={44} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#3d2214" }}>
              No results found for "{search}"
            </p>
            <button onClick={() => { setSearch(""); setActiveTag("All"); }}
              className="mt-4 text-sm transition hover:underline"
              style={{ color: "#c8927a" }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Featured first blog — large card */}
            {filtered[0] && (
              <motion.article {...fadeUp(0)} className="lg:col-span-2 group">
                <Link to={`/blogs/${filtered[0].id}`}>
                  <div
                    className="rounded-3xl overflow-hidden h-full transition-all"
                    style={{
                      background: "rgba(255,252,248,0.88)",
                      border: "1px solid rgba(200,146,122,0.18)",
                      boxShadow: "0 4px 30px rgba(90,48,32,0.07)",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.4)"; e.currentTarget.style.boxShadow = "0 12px 48px rgba(90,48,32,0.14)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.18)"; e.currentTarget.style.boxShadow = "0 4px 30px rgba(90,48,32,0.07)"; }}
                  >
                    {/* hero gradient area — mahogany like Discipleship dark sections */}
                    <div className="relative overflow-hidden min-h-52 flex flex-col justify-end p-10"
                      style={{ background: "linear-gradient(145deg, #3d2214 0%, #5a3020 100%)" }}>
                      <div className="absolute inset-0 paper-texture opacity-60" />
                      <div className="absolute top-0 left-0 right-0 h-0.5"
                        style={{ background: "linear-gradient(90deg, transparent, #c8927a, #e8c4a0, transparent)" }} />
                      <div className="absolute inset-0 opacity-[0.05]"
                        style={{ backgroundImage: "repeating-linear-gradient(45deg,#c8927a 0,#c8927a 1px,transparent 1px,transparent 24px)" }} />

                      <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full"
                        style={{ background: "rgba(200,146,122,0.15)", border: "1px solid rgba(200,146,122,0.25)" }}>
                        <span className="text-[9px] font-medium uppercase tracking-[0.2em]"
                          style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#e8c4a0" }}>
                          {filtered[0].tags?.[0] || "Essay"}
                        </span>
                      </div>

                      <div className="relative z-10">
                        <p className="text-[9px] font-medium uppercase tracking-[0.25em] mb-3"
                          style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(200,146,122,0.6)" }}>
                          Featured Essay
                        </p>
                        <h2 className="text-white text-2xl sm:text-3xl font-semibold leading-snug"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                          {filtered[0].title}
                        </h2>
                      </div>
                    </div>

                    <div className="p-8">
                      {filtered[0].subtitle && (
                        <p className="italic text-base mb-4 leading-relaxed"
                          style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "rgba(90,58,40,0.6)" }}>
                          {filtered[0].subtitle}
                        </p>
                      )}
                      <p className="text-sm leading-[1.85] mb-5"
                        style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "rgba(90,58,40,0.72)" }}>
                        {filtered[0].pages?.[0]?.sections?.[0]?.paragraphs?.[0]?.substring(0, 200)}…
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                            style={{ background: "linear-gradient(145deg, #3d2214, #5a3020)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                            {filtered[0].author?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-semibold" style={{ color: "#3d2214", fontFamily: "'Jost', system-ui, sans-serif" }}>
                              {filtered[0].author}
                            </p>
                            <p className="text-[10px]" style={{ color: "rgba(90,58,40,0.42)", fontFamily: "'Jost', system-ui, sans-serif" }}>
                              {filtered[0].copyright}
                            </p>
                          </div>
                        </div>
                        <span className="flex items-center gap-1.5 text-xs font-medium transition-all group-hover:gap-2.5"
                          style={{ color: "#c8927a", fontFamily: "'Jost', system-ui, sans-serif" }}>
                          Read Essay <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            )}

            {/* Right column — smaller cards */}
            <div className="flex flex-col gap-5">
              {filtered.slice(1, 3).map((blog, i) => (
                <BlogMiniCard key={blog.id} blog={blog} index={i + 1} />
              ))}
              {filtered.length === 1 && (
                <div className="rounded-3xl border border-dashed flex items-center justify-center p-10 text-center"
                  style={{ background: "rgba(200,146,122,0.04)", borderColor: "rgba(200,146,122,0.25)" }}>
                  <div>
                    <BookOpen size={28} className="mx-auto mb-3" style={{ color: "rgba(200,146,122,0.35)" }} />
                    <p className="text-sm" style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.45)" }}>
                      More essays coming soon
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Remaining blogs — full width row */}
            {filtered.slice(3).map((blog, i) => (
              <motion.article key={blog.id} {...fadeUp((i + 3) * 0.07)} className="group">
                <Link to={`/blogs/${blog.id}`}>
                  <div
                    className="rounded-3xl overflow-hidden transition-all"
                    style={{
                      background: "rgba(255,252,248,0.88)",
                      border: "1px solid rgba(200,146,122,0.18)",
                      boxShadow: "0 2px 16px rgba(90,48,32,0.05)",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.38)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(90,48,32,0.10)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.18)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(90,48,32,0.05)"; }}
                  >
                    <div className="h-0.5" style={{ background: "linear-gradient(90deg, #c8927a, #e8c4a0, transparent)" }} />
                    <div className="p-7 flex items-center gap-6">
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-medium uppercase tracking-[0.25em] mb-2"
                          style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
                          {blog.tags?.[0]} · {blog.category}
                        </p>
                        <h3 className="text-lg font-semibold mb-1 transition"
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            color: "#3d2214",
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = "#c8927a"}
                          onMouseLeave={e => e.currentTarget.style.color = "#3d2214"}
                        >
                          {blog.title}
                        </h3>
                        <p className="text-xs" style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.5)" }}>
                          {blog.author} · {blog.copyright}
                        </p>
                      </div>
                      <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                        style={{ border: "1px solid rgba(200,146,122,0.28)" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#c8927a"; e.currentTarget.style.border = "1px solid #c8927a"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.border = "1px solid rgba(200,146,122,0.28)"; }}
                      >
                        <ArrowUpRight size={14} style={{ color: "#c8927a" }} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const BlogMiniCard = ({ blog, index }) => {
  const wordCount = blog.pages?.reduce((acc, p) =>
    acc + p.sections.reduce((a, s) => a + s.paragraphs.join(" ").split(" ").length, 0), 0) || 0;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <motion.article {...fadeUp(index * 0.07)} className="group flex-1">
      <Link to={`/blogs/${blog.id}`}>
        <div
          className="rounded-2xl overflow-hidden h-full transition-all"
          style={{
            background: "rgba(255,252,248,0.88)",
            border: "1px solid rgba(200,146,122,0.18)",
            boxShadow: "0 2px 12px rgba(90,48,32,0.05)",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.38)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(90,48,32,0.10)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.18)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(90,48,32,0.05)"; }}
        >
          <div className="h-0.5" style={{ background: "linear-gradient(90deg, #c8927a, #e8c4a0, transparent)" }} />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] font-medium uppercase tracking-[0.2em]"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
                {blog.tags?.[0]}
              </span>
              <span style={{ color: "rgba(200,146,122,0.4)" }}>·</span>
              <span className="text-[9px] flex items-center gap-1"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.42)" }}>
                <Clock size={9} /> {readTime} min
              </span>
            </div>
            <h3 className="font-semibold text-base leading-snug mb-3 line-clamp-2 transition"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#3d2214" }}
              onMouseEnter={e => e.currentTarget.style.color = "#c8927a"}
              onMouseLeave={e => e.currentTarget.style.color = "#3d2214"}
            >
              {blog.title}
            </h3>
            <p className="text-xs" style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.5)" }}>
              {blog.author}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default Blogs;