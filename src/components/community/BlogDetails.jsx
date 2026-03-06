import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Share2, BookOpen, ChevronLeft, ChevronRight,
  Check, FileText, Menu, X, Mail, Phone, Clock,
  Twitter, Facebook, Link2
} from "lucide-react";
import { blogs } from "../../data/blogs.data";

/* ─── reading progress hook ─── */
const useReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
};

const getReadTime = (pages) => {
  const words = pages?.reduce(
    (acc, p) => acc + p.sections.reduce((a, s) => a + s.paragraphs.join(" ").split(" ").length, 0),
    0
  ) || 0;
  return Math.max(1, Math.ceil(words / 200));
};

const Ornament = ({ className = "" }) => (
  <svg viewBox="0 0 80 20" fill="none" className={className}>
    <line x1="0" y1="10" x2="28" y2="10" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="40" cy="10" r="2" fill="currentColor" opacity="0.5" />
    <circle cx="33" cy="10" r="1" fill="currentColor" opacity="0.3" />
    <circle cx="47" cy="10" r="1" fill="currentColor" opacity="0.3" />
    <line x1="52" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="0.75" />
  </svg>
);

/* ─── Share dropdown ─── */
const ShareMenu = ({ url, title, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => { setCopiedLink(false); onClose(); }, 1800);
    });
  };

  const shareOptions = [
    { icon: Twitter, label: "Share on X", action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank") },
    { icon: Facebook, label: "Share on Facebook", action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank") },
    { icon: Mail, label: "Share via Email", action: () => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`, "_blank") },
    { icon: copiedLink ? Check : Link2, label: copiedLink ? "Link Copied!" : "Copy Link", action: copyLink, highlight: copiedLink },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.18 }}
      className="absolute right-0 top-full mt-2 w-52 rounded-2xl overflow-hidden z-50"
      style={{
        background: "#fdf6f0",
        border: "1px solid rgba(200,146,122,0.22)",
        boxShadow: "0 8px 32px rgba(90,48,32,0.14)",
      }}
    >
      <div className="h-0.5" style={{ background: "linear-gradient(90deg, #c8927a, #e8c4a0, #c8927a)" }} />
      {shareOptions.map(({ icon: Icon, label, action, highlight }) => (
        <button
          key={label}
          onClick={action}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition"
          style={{
            fontFamily: "'Jost', system-ui, sans-serif",
            color: highlight ? "#6a9868" : "rgba(90,58,40,0.75)",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(200,146,122,0.08)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <Icon size={15} style={{ color: highlight ? "#6a9868" : "rgba(200,146,122,0.6)" }} />
          {label}
        </button>
      ))}
    </motion.div>
  );
};

/* ─── TOC Drawer ─── */
const TOCDrawer = ({ pages, currentPage, onSelect, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className="fixed top-14 left-0 right-0 z-30"
    style={{
      background: "#fdf6f0",
      borderBottom: "1px solid rgba(200,146,122,0.15)",
      boxShadow: "0 8px 32px rgba(90,48,32,0.08)",
    }}
  >
    <div className="max-w-3xl mx-auto px-6 py-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[9px] font-medium uppercase tracking-[0.25em]"
          style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.42)" }}>
          Contents
        </p>
        <button onClick={onClose} className="transition" style={{ color: "rgba(90,58,40,0.38)" }}
          onMouseEnter={e => e.currentTarget.style.color = "#3d2214"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(90,58,40,0.38)"}>
          <X size={15} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {pages.map((p, i) => (
          <button
            key={i}
            onClick={() => { onSelect(i); onClose(); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition"
            style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              background: i === currentPage ? "linear-gradient(145deg, #3d2214, #5a3020)" : "rgba(200,146,122,0.08)",
              color: i === currentPage ? "#e8c4a0" : "rgba(90,58,40,0.65)",
              border: i === currentPage ? "1px solid #3d2214" : "1px solid rgba(200,146,122,0.22)",
            }}
          >
            <span className="text-[9px] opacity-50 font-semibold">{String(i + 1).padStart(2, "0")}</span>
            {p.label}
          </button>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ─── Section renderer ─── */
const Section = ({ section, isFirstSection, pageNumber }) => (
  <div className="mb-10">
    {section.heading && (
      <motion.h2
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl font-semibold mt-12 mb-6 tracking-tight leading-snug"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#3d2214" }}
      >
        {section.heading}
      </motion.h2>
    )}

    {section.paragraphs.map((para, i) => {
      const isDropCap = isFirstSection && i === 0 && pageNumber === 1;
      const isScriptureQuote = para.startsWith('"') && para.includes('" —');

      if (isScriptureQuote) {
        const parts = para.split('" —');
        const quote = parts[0].replace(/^"/, "");
        const ref = parts[1]?.trim();
        return (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="my-8 pl-6"
            style={{ borderLeft: "2px solid #c8927a" }}
          >
            <p className="italic text-xl leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#7a4a32" }}>
              "{quote}"
            </p>
            {ref && (
              <cite className="block text-[10px] font-medium uppercase tracking-[0.2em] mt-3 not-italic"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
                — {ref}
              </cite>
            )}
          </motion.blockquote>
        );
      }

      return (
        <motion.p
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: Math.min(i * 0.04, 0.3) }}
          className={`leading-[1.95] text-[17.5px] mb-7 ${isDropCap ? "drop-cap" : ""}`}
          style={{
            textAlign: "justify",
            hyphens: "auto",
            fontFamily: "'EB Garamond', Georgia, serif",
            color: "rgba(61,34,20,0.78)",
          }}
        >
          {para}
        </motion.p>
      );
    })}
  </div>
);

/* ─── Related blogs ─── */
const RelatedBlogs = ({ currentId }) => {
  const related = blogs.filter(b => b.id !== currentId).slice(0, 2);
  if (related.length === 0) return null;

  return (
    <div className="mt-16 pt-12" style={{ borderTop: "1px solid rgba(200,146,122,0.15)" }}>
      <p className="text-[9px] font-medium uppercase tracking-[0.3em] mb-6"
        style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.4)" }}>
        Continue Reading
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {related.map(blog => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}
            className="group block rounded-2xl p-5 transition-all"
            style={{
              background: "rgba(200,146,122,0.06)",
              border: "1px solid rgba(200,146,122,0.15)",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.38)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(90,48,32,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] mb-2"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
              {blog.tags?.[0]} · {blog.readTime || 5} min
            </p>
            <h4 className="font-semibold text-sm leading-snug transition"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#3d2214" }}
              onMouseEnter={e => e.currentTarget.style.color = "#c8927a"}
              onMouseLeave={e => e.currentTarget.style.color = "#3d2214"}
            >
              {blog.title}
            </h4>
            <p className="text-[10px] mt-2"
              style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.45)" }}>
              {blog.author}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

/* ─── Main BlogDetails ─── */
const BlogDetails = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const topRef = useRef(null);
  const scrollProgress = useReadingProgress();

  const blog = blogs.find(b => b.id === id);

  useEffect(() => {
    if (!shareOpen) return;
    const handler = (e) => { if (!e.target.closest("[data-share-menu]")) setShareOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [shareOpen]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5"
        style={{ backgroundColor: "#fdf6f0", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
        <FileText size={44} style={{ color: "rgba(200,146,122,0.25)" }} />
        <h2 className="text-2xl font-semibold" style={{ color: "rgba(61,34,20,0.5)" }}>Blog not found</h2>
        <Link to="/blogs" className="flex items-center gap-2 text-sm transition hover:underline"
          style={{ color: "#c8927a", fontFamily: "'Jost', system-ui, sans-serif" }}>
          <ArrowLeft size={14} /> Back to Blogs
        </Link>
      </div>
    );
  }

  const pages = blog.pages || [];
  const page = pages[currentPage];
  const totalPages = pages.length;
  const readTime = blog.readTime || getReadTime(pages);
  const shareUrl = `${window.location.origin}/blogs/${id}`;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fdf6f0" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&family=EB+Garamond:ital,wght@0,400;1,400&display=swap');
        .drop-cap::first-letter {
          font-size: 4.8rem;
          font-weight: 700;
          float: left;
          line-height: 0.76;
          margin: 0.04em 0.14em 0 0;
          color: #3d2214;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
      `}</style>

      {/* ── Reading progress bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5"
        style={{ background: "rgba(200,146,122,0.15)" }}>
        <motion.div
          className="h-full"
          style={{
            width: `${scrollProgress}%`,
            background: "linear-gradient(90deg, #c8927a, #e8c4a0)",
          }}
        />
      </div>

      {/* ── Sticky nav ── */}
      <nav className="sticky top-0 z-40 backdrop-blur-sm"
        style={{
          background: "rgba(253,246,240,0.97)",
          borderBottom: "1px solid rgba(200,146,122,0.12)",
        }}>
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between gap-4">

          <Link to="/blogs"
            className="flex items-center gap-1.5 text-xs font-medium transition"
            style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(90,58,40,0.45)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#3d2214"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(90,58,40,0.45)"}
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">All Blogs</span>
          </Link>

          {/* page dots */}
          <div className="flex items-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                title={pages[i].label}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === currentPage ? "2rem" : "0.625rem",
                  height: "0.625rem",
                  background: i === currentPage ? "#c8927a" : "rgba(200,146,122,0.25)",
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-full transition"
              style={{ color: "rgba(90,58,40,0.45)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,146,122,0.10)"; e.currentTarget.style.color = "#3d2214"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(90,58,40,0.45)"; }}
            >
              {tocOpen ? <X size={15} /> : <Menu size={15} />}
            </button>

            <div className="relative" data-share-menu>
              <button
                onClick={() => setShareOpen(!shareOpen)}
                className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-full transition"
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  border: "1px solid rgba(200,146,122,0.22)",
                  color: "rgba(90,58,40,0.55)",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.5)"; e.currentTarget.style.color = "#3d2214"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(200,146,122,0.22)"; e.currentTarget.style.color = "rgba(90,58,40,0.55)"; }}
              >
                <Share2 size={13} />
                <span className="hidden sm:inline">Share</span>
              </button>
              <AnimatePresence>
                {shareOpen && <ShareMenu url={shareUrl} title={blog.title} onClose={() => setShareOpen(false)} />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* ── TOC drawer ── */}
      <AnimatePresence>
        {tocOpen && (
          <TOCDrawer pages={pages} currentPage={currentPage} onSelect={setCurrentPage} onClose={() => setTocOpen(false)} />
        )}
      </AnimatePresence>

      {/* ── Article ── */}
      <article className="max-w-2xl mx-auto px-6 pb-28" ref={topRef}>

        {/* ── Cover — only page 1 ── */}
        {currentPage === 0 && (
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="pt-14 pb-12"
          >
            {/* ornament category bar */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, #c8927a, transparent)" }} />
              <span className="text-[9px] font-medium uppercase tracking-[0.3em]"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
                {blog.category}
              </span>
              <div className="h-px flex-1" style={{ background: "linear-gradient(270deg, #c8927a, transparent)" }} />
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight mb-5"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#3d2214" }}>
              {blog.title}
            </h1>

            {blog.subtitle && (
              <p className="text-lg italic leading-relaxed mb-8"
                style={{ fontFamily: "'EB Garamond', Georgia, serif", color: "rgba(90,58,40,0.6)" }}>
                {blog.subtitle}
              </p>
            )}

            {/* byline */}
            <div className="flex flex-wrap items-center gap-6 pb-8"
              style={{ borderBottom: "1px solid rgba(200,146,122,0.15)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                  style={{ background: "linear-gradient(145deg, #3d2214, #5a3020)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {blog.author?.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#3d2214", fontFamily: "'Jost', system-ui, sans-serif" }}>
                    {blog.author}
                  </p>
                  {blog.authorTitle && (
                    <p className="text-[10px]" style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.45)" }}>
                      {blog.authorTitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs" style={{ color: "rgba(90,58,40,0.42)", fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300 }}>
                <span className="flex items-center gap-1.5"><Clock size={11} /> {readTime} min read</span>
                <span className="flex items-center gap-1.5"><BookOpen size={11} /> {totalPages} page{totalPages !== 1 ? "s" : ""}</span>
                {blog.copyright && <span>{blog.copyright}</span>}
              </div>
            </div>

            {/* tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {blog.tags.map((tag, i) => (
                  <span key={i}
                    className="text-[10px] font-medium px-3 py-1 rounded-full"
                    style={{
                      fontFamily: "'Jost', system-ui, sans-serif",
                      background: "rgba(200,146,122,0.08)",
                      color: "#b8845a",
                      border: "1px solid rgba(200,146,122,0.22)",
                    }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.header>
        )}

        {/* ── Page label for pages 2+ ── */}
        {currentPage > 0 && (
          <div className="pt-12 mb-10">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(200,146,122,0.5), transparent)" }} />
              <span className="text-[9px] font-medium uppercase tracking-[0.25em]"
                style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "#b8845a" }}>
                Page {page.pageNumber} — {page.label}
              </span>
              <div className="h-px flex-1" style={{ background: "linear-gradient(270deg, rgba(200,146,122,0.5), transparent)" }} />
            </div>
          </div>
        )}

        {/* ── Page sections ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {page?.sections.map((section, si) => (
              <Section key={si} section={section} isFirstSection={si === 0} pageNumber={page.pageNumber} />
            ))}

            {/* ── Author card on last page ── */}
            {currentPage === totalPages - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-14 rounded-3xl overflow-hidden"
                style={{ background: "linear-gradient(145deg, #3d2214, #5a3020)" }}
              >
                <div className="h-0.5" style={{ background: "linear-gradient(90deg, #c8927a, #e8c4a0, #c8927a)" }} />
                <div className="p-8">
                  <p className="text-[9px] font-medium uppercase tracking-[0.3em] mb-5"
                    style={{ fontFamily: "'Jost', system-ui, sans-serif", color: "rgba(200,146,122,0.55)" }}>
                    About the Author
                  </p>
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shrink-0"
                      style={{
                        background: "rgba(200,146,122,0.15)",
                        border: "1px solid rgba(200,146,122,0.25)",
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        color: "#e8c4a0",
                      }}>
                      {blog.author?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-base text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                        {blog.author}
                      </p>
                      {blog.authorTitle && (
                        <p className="text-xs mt-0.5" style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(200,146,122,0.55)" }}>
                          {blog.authorTitle}
                        </p>
                      )}
                      {blog.authorBio && (
                        <p className="text-xs leading-relaxed mt-3 max-w-sm" style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.45)" }}>
                          {blog.authorBio}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4 mt-4">
                        {blog.email && (
                          <a href={`mailto:${blog.email}`}
                            className="flex items-center gap-1.5 text-xs transition"
                            style={{ color: "rgba(200,146,122,0.65)" }}
                            onMouseEnter={e => e.currentTarget.style.color = "#e8c4a0"}
                            onMouseLeave={e => e.currentTarget.style.color = "rgba(200,146,122,0.65)"}>
                            <Mail size={12} /> {blog.email}
                          </a>
                        )}
                        {blog.contact && (
                          <a href={`tel:${blog.contact.replace(/\s/g, "")}`}
                            className="flex items-center gap-1.5 text-xs transition"
                            style={{ color: "rgba(200,146,122,0.65)" }}
                            onMouseEnter={e => e.currentTarget.style.color = "#e8c4a0"}
                            onMouseLeave={e => e.currentTarget.style.color = "rgba(200,146,122,0.65)"}>
                            <Phone size={12} /> {blog.contact}
                          </a>
                        )}
                      </div>
                      {blog.copyright && (
                        <p className="text-[10px] mt-3" style={{ color: "rgba(255,255,255,0.22)", fontFamily: "'Jost', system-ui, sans-serif" }}>
                          {blog.copyright}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentPage === totalPages - 1 && <RelatedBlogs currentId={id} />}
          </motion.div>
        </AnimatePresence>

        {/* ── Page navigation ── */}
        <div className="flex items-center justify-between mt-14 pt-6"
          style={{ borderTop: "1px solid rgba(200,146,122,0.12)" }}>
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition"
            style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              color: currentPage === 0 ? "rgba(90,58,40,0.25)" : "rgba(90,58,40,0.65)",
              border: `1px solid ${currentPage === 0 ? "rgba(200,146,122,0.12)" : "rgba(200,146,122,0.25)"}`,
              cursor: currentPage === 0 ? "not-allowed" : "pointer",
            }}
          >
            <ChevronLeft size={15} /> Previous
          </button>

          <div className="text-center">
            <p className="text-xs" style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.42)" }}>
              {currentPage + 1} / {totalPages}
            </p>
            <p className="text-[10px]" style={{ fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, color: "rgba(90,58,40,0.28)" }}>
              {page?.label}
            </p>
          </div>

          {currentPage < totalPages - 1 ? (
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-white transition hover:opacity-90"
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                background: "linear-gradient(145deg, #3d2214, #5a3020)",
                color: "#e8c4a0",
              }}
            >
              Next <ChevronRight size={15} />
            </button>
          ) : (
            <Link to="/blogs"
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-white transition hover:scale-[1.03]"
              style={{
                fontFamily: "'Jost', system-ui, sans-serif",
                background: "linear-gradient(135deg, #c8927a, #b8775a)",
                boxShadow: "0 6px 20px rgba(200,146,122,0.3)",
              }}>
              All Blogs <ChevronRight size={15} />
            </Link>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;