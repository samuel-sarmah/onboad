const stats = [
  { value: "10,000+", label: "Teams worldwide" },
  { value: "300ms", label: "Average sync latency" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "50k+", label: "Tasks completed daily" },
];

export function Stats() {
  return (
    <section className="py-20 px-6 border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gray-600 text-sm uppercase tracking-widest font-semibold">By the numbers</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
