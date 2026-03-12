const badges = [
  { label: "SOC 2", sub: "Type II Certified" },
  { label: "ISO 27001", sub: "Certified" },
  { label: "GDPR", sub: "Compliant" },
  { label: "HIPAA", sub: "Ready" },
];

const companies = ["Stripe", "Notion", "Vercel", "Linear", "Figma", "Loom"];

export function TrustBadges() {
  return (
    <section className="py-16 px-6 border-b border-white/5">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xs text-gray-600 uppercase tracking-widest font-semibold mb-8">
          Trusted by teams at
        </p>
        {/* Company logos (text placeholders) */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-12">
          {companies.map((name) => (
            <span key={name} className="text-gray-700 font-semibold text-sm tracking-wide hover:text-gray-500 transition-colors">
              {name}
            </span>
          ))}
        </div>

        {/* Compliance badges */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-3 px-5 py-3 border border-white/10 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
            >
              {/* Shield icon */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white/40 shrink-0">
                <path
                  d="M10 2L3 5v5c0 4.418 3.134 7.86 7 8.93C16.866 17.86 20 14.418 20 10V5l-7-3h-3z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <div className="text-xs font-bold text-white leading-tight">{badge.label}</div>
                <div className="text-[10px] text-gray-600">{badge.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
