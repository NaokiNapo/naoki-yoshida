const steps = [
  {
    title: "まずはお話を聞きます",
    text: "今困っていることや、こうなったら嬉しいということを聞かせてください。",
  },
  {
    title: "一緒に整理します",
    text: "今のやり方を確認し、何を変えると良さそうか整理します。",
  },
  {
    title: "必要なものをつくります",
    text: "AI、自動化、Web、データなどから、必要な方法を選んで形にします。",
  },
  {
    title: "使いながら改善します",
    text: "作って終わりではなく、実際に使った結果を見ながら改善できます。",
  },
];
export default function Process() {
  return (
    <section
      id="process"
      className="section process-section"
      aria-labelledby="process-heading"
    >
      <div className="container">
        <p className="eyebrow">03 / OUR PROCESS</p>
        <h2 id="process-heading">
          <span className="process-quote">「何を頼めばいいか分からない」</span>
          <br />
          ところからでも大丈夫です。
        </h2>
        <ol className="steps">
          {steps.map((step, i) => (
            <li key={step.title}>
              <span className="step-number">
                <small>STEP</small>0{i + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
