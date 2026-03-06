import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

const PrivacyPolicy = () => (
  <div className="bg-[#faf4ee] min-h-screen" style={{ fontFamily: "system-ui, sans-serif" }}>
    <div className="max-w-2xl mx-auto px-6 py-20">

      <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#d4a574] uppercase tracking-widest mb-12 hover:text-[#6b2d2d] transition">
        <ArrowLeft size={13} /> Back to Home
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#6b2d2d]/10 flex items-center justify-center">
          <Shield size={18} className="text-[#6b2d2d]" />
        </div>
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d4a574]">Legal</p>
          <h1 className="text-2xl font-bold text-[#1c0808]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Privacy Policy
          </h1>
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-10">Last updated: March 2026</p>

      <div className="space-y-8 text-[#4a3a3a]/80 text-sm leading-relaxed">
        {[
          {
            heading: "1. Information We Collect",
            body: "We collect information you provide directly — such as your name, email address, phone number, and any other details you submit through our forms (contact, prayer requests, joining, giving). We may also collect non-personal usage data to improve our website."
          },
          {
            heading: "2. How We Use Your Information",
            body: "Your information is used solely to connect you with the Bold & Rooted community, respond to your inquiries, send ministry updates (with your consent), and process donations. We do not sell or share your personal data with third parties for marketing purposes."
          },
          {
            heading: "3. Prayer Requests",
            body: "Prayer requests submitted to our Prayer Wall may be visible to the community. Anonymous submissions are available and encouraged if you prefer privacy. Requests marked as anonymous will not display any identifying information."
          },
          {
            heading: "4. Donation Data",
            body: "Financial transactions are processed through secure third-party payment providers. Bold & Rooted does not store your full payment card details. Donation records may be retained for legal and accounting purposes."
          },
          {
            heading: "5. Cookies",
            body: "Our website may use cookies to improve your browsing experience. You can disable cookies in your browser settings at any time, though some features may not function correctly as a result."
          },
          {
            heading: "6. Data Security",
            body: "We take reasonable measures to protect your personal information against unauthorised access, loss, or misuse. However, no method of transmission over the internet is 100% secure."
          },
          {
            heading: "7. Your Rights",
            body: "You have the right to request access to, correction of, or deletion of your personal data held by us. To exercise these rights, contact us at gontse@boldnrooted.org."
          },
          {
            heading: "8. Contact",
            body: "If you have any questions about this Privacy Policy, please contact Gontse at gontse@boldnrooted.org or call +1 (206) 861-5475."
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
        <Link to="/terms" className="text-xs font-bold text-[#6b2d2d] hover:underline">Terms of Service →</Link>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;