const steps = [
  {
    number: "01",
    title: "Create your workspace",
    description:
      "Sign up in seconds and set up your workspace. Invite your team and organize your projects in one place.",
    mockup: (
      <div className="bg-[#070f26] border border-white/5 rounded-2xl p-5 overflow-hidden">
        <div className="mb-3">
          <div className="text-white text-sm font-semibold mb-1">My Workspace</div>
          <div className="text-gray-600 text-xs">3 members · 2 projects</div>
        </div>
        <div className="space-y-2">
          {["Q1 Product Launch", "Marketing Campaign"].map((name) => (
            <div key={name} className="flex items-center gap-3 bg-white/5 rounded-lg p-2.5">
              <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
              <span className="text-xs text-white/80">{name}</span>
            </div>
          ))}
          <div className="flex items-center gap-3 border border-dashed border-white/10 rounded-lg p-2.5">
            <div className="w-2 h-2 rounded-full border border-white/30 shrink-0" />
            <span className="text-xs text-gray-700">+ New project</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Add your team",
    description:
      "Invite team members with a link or email. Assign roles — Admin, Manager, Member, or Viewer — with fine-grained permissions.",
    mockup: (
      <div className="bg-[#070f26] border border-white/5 rounded-2xl p-5 overflow-hidden">
        <div className="text-white text-sm font-semibold mb-3">Team Members</div>
        <div className="space-y-2.5">
          {[
            { name: "Sarah K.", role: "Admin", color: "#6366f1" },
            { name: "Alex M.", role: "Manager", color: "#ec4899" },
            { name: "Jordan L.", role: "Member", color: "#22c55e" },
          ].map((m) => (
            <div key={m.name} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: m.color }}
              >
                {m.name[0]}
              </div>
              <div className="flex-1">
                <div className="text-xs text-white font-medium">{m.name}</div>
              </div>
              <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                {m.role}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-3 border border-dashed border-white/10 rounded-lg p-2">
            <div className="w-8 h-8 rounded-full border border-dashed border-white/20 flex items-center justify-center text-gray-700 text-sm">+</div>
            <span className="text-xs text-gray-700">Invite member</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Ship faster",
    description:
      "Hit the ground running. Track tasks on Kanban boards, schedule deadlines on the calendar, and report progress with real-time analytics.",
    mockup: (
      <div className="bg-[#070f26] border border-white/5 rounded-2xl p-5 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white text-sm font-semibold">This Week</span>
          <span className="text-green-400 text-xs font-semibold">↑ 23% velocity</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { label: "Completed", value: "24", color: "#22c55e" },
            { label: "In Progress", value: "8", color: "#3b82f6" },
            { label: "Overdue", value: "2", color: "#ef4444" },
            { label: "Total", value: "34", color: "#ffffff" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 rounded-lg p-2.5">
              <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[10px] text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-1 h-10">
          {[50, 65, 40, 85, 70, 90, 75].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: i === 5 ? "#22c55e" : "rgba(255,255,255,0.1)" }}
            />
          ))}
        </div>
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            How it works
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Up and running in minutes
          </h2>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            No lengthy onboarding. No complex setup. Just sign up and start shipping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col">
              <div className="mb-4">
                <span className="text-5xl font-extrabold text-white/10 leading-none">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{step.description}</p>
              {step.mockup}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
