const tools = [
  { label: "AI", items: "ChatGPT / OpenAI API" },
  { label: "Data", items: "SQL / Python / Tableau" },
  { label: "Web", items: "Next.js / TypeScript / Supabase / Vercel" },
  { label: "Cloud / Others", items: "AWS / GitHub" },
];
export default function Skills() {
  return (
    <section className="skills-section" aria-labelledby="skills-heading">
      <div className="container skills-layout">
        <div>
          <p className="eyebrow">06 / SKILLS & TOOLS</p>
          <h2 id="skills-heading">
            必要に応じて、
            <br />
            こんな技術を使います。
          </h2>
          <p>方法は、目的に合わせて選びます。</p>
        </div>
        <dl className="tools-list">
          {tools.map((tool) => (
            <div key={tool.label}>
              <dt>{tool.label}</dt>
              <dd>{tool.items}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
