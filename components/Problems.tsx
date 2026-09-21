import { problems } from "../data/services";
import Icon from "./Icon";
export default function Problems() {
  return (
    <section
      id="problems"
      className="section problems-section"
      aria-labelledby="problems-heading"
    >
      <div className="container">
        <div className="section-intro">
          <div>
            <p className="eyebrow">01 / YOUR CHALLENGES</p>
            <h2 id="problems-heading">
              こんなことで、
              <br />
              止まっていませんか？
            </h2>
          </div>
          <div className="intro-copy">
            <p>
              「便利になりそう」は分かっていても、
              <br className="desktop-break" />
              何をどう変えればいいのかを考えるのは意外と大変です。
            </p>
            <p>
              まだやりたいことが整理できていない段階でも大丈夫です。
              <br className="desktop-break" />
              まずは今困っていることから聞かせてください。
            </p>
          </div>
        </div>
        <div className="problem-grid">
          {problems.map((problem, i) => (
            <article className="problem-card" key={problem.title}>
              <div className="card-top">
                <Icon name={problem.icon} />
                <span>0{i + 1}</span>
              </div>
              <h3>{problem.title}</h3>
              <p>{problem.text}</p>
            </article>
          ))}
        </div>
        <p className="section-note">
          <span className="small-dot" />
          うまく説明できなくても、そこから一緒に考えます。
        </p>
      </div>
    </section>
  );
}
