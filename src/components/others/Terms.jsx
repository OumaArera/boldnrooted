import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

const Terms = () => (
  <div className="bg-[#faf4ee] min-h-screen" style={{ fontFamily: "system-ui, sans-serif" }}>
    <div className="max-w-2xl mx-auto px-6 py-20">

      <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#d4a574] uppercase tracking-widest mb-12 hover:text-[#6b2d2d] transition">
        <ArrowLeft size={13} /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#6b2d2d]/10 flex items-center justify-center">
          <FileText size={18} className="text-[#6b2d2d]" />
        </div>
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d4a574]">Legal</p>
          <h1 className="text-2xl font-bold text-[#1c0808]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Terms of Service
          </h1>
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-10">Last updated: March 2026</p>

      <div className="space-y-8 text-[#4a3a3a]/80 text-sm leading-relaxed">
        {[
          {
            heading: "1. Acceptance of Terms",
            body: "By accessing or using the Bold & Rooted website and its services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our site or services."
          },
          {
            heading: "2. Use of the Website",
            body: "This website is intended for personal, non-commercial use. You agree not to misuse the site, post harmful or offensive content, impersonate others, or attempt to gain unauthorised access to any part of our systems."
          },
          {
            heading: "3. Community Standards",
            body: "Bold & Rooted is a faith community grounded in love, respect, and the Word of God. All community interactions — including prayer wall submissions, forms, and correspondence — must reflect these values. We reserve the right to remove content that is offensive, harmful, or inconsistent with our community standards."
          },
          {
            heading: "4. Prayer Wall",
            body: "Prayer requests submitted to the Prayer Wall are shared within the Bold & Rooted community. By submitting a request, you consent to it being visible to community members. Do not submit sensitive personal information you would not wish others to see. Anonymous posting is available."
          },
          {
            heading: "5. Donations",
            body: "All donations made through this website are voluntary contributions to the ministry of Bold & Rooted. Donations are non-refundable unless there has been a processing error. For questions about a donation, contact gontse@boldnrooted.org."
          },
          {
            heading: "6. Intellectual Property",
            body: "All content on this website — including articles, blog posts, design elements, and graphics — is the property of Bold & Rooted unless otherwise stated. You may not reproduce, distribute, or use our content without written permission."
          },
          {
            heading: "7. Disclaimer",
            body: "The content on this website is provided for spiritual encouragement and general information only. It does not constitute professional legal, financial, medical, or counselling advice. For personal crises or emergencies, please contact a qualified professional or emergency services."
          },
          {
            heading: "8. Changes to These Terms",
            body: "We reserve the right to update these Terms at any time. Continued use of the website after changes are posted constitutes your acceptance of the revised Terms."
          },
          {
            heading: "9. Contact",
            body: "For questions about these Terms, contact us at gontse@boldnrooted.org or +1 (206) 861-5475."
          },
        ].map((s, i) => (
          <div key={i}>
            <h2 className="font-bold text-[#1c0808] text-base mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {s.heading}
            </h2>
            <p>{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 pt-8 border-t border-[#6b2d2d]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-gray-400">© 2026 Bold & Rooted. All rights reserved.</p>
        <Link to="/privacy" className="text-xs font-bold text-[#6b2d2d] hover:underline">Privacy Policy →</Link>
      </div>
    </div>
  </div>
);

export default Terms;