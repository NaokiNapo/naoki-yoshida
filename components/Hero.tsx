import { copy } from "../data/copy";
import Icon from "./Icon";
export default function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="hero-label">
          <span />
          NAOKI YOSHIDA<span className="hero-role">{copy["TXT-006"]}</span>
        </p>
        <h1 id="hero-heading">
          {copy["TXT-007"]
            .split("\n")
            .flatMap((line, index) =>
              index === 0 ? [line] : line.split(/(?<=、)/),
            )
            .map((line) => (
              <span className="hero-headline-line" key={line}>
                {line}
              </span>
            ))}
        </h1>
        <p className="hero-lead">{copy["TXT-008"]}</p>
        <p className="hero-description">
          そんな「どうしたらいい？」から、
          <br />
          一緒に整理して、必要なものを形にします。
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#contact">
            まずは相談してみる
            <Icon name="arrow" />
          </a>
          <a className="text-link" href="#services">
            できることを見る<span aria-hidden="true">↘</span>
          </a>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="art-grid" />
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="orbit-layer">
          <svg
            aria-hidden="true"
            className="orbit-lines"
            viewBox="0 0 520 540"
            fill="none"
          >
            <ellipse
              cx="262"
              cy="266"
              rx="200"
              ry="179"
              transform="rotate(-35 262 266)"
            />
            <ellipse
              cx="262"
              cy="266"
              rx="164"
              ry="220"
              transform="rotate(-35 262 266)"
            />
            <path d="M73 152C271 97 214 421 442 361" />
          </svg>
        </div>
        <div className="orbit-points">
          <span className="orbit-track track-one">
            <span />
          </span>
          <span className="orbit-track track-two">
            <span />
          </span>
        </div>
        <div className="floating-note note-top">
          <Icon name="chat" />
          <span>{copy["TXT-012"]}</span>
          <span className="note-dot" />
        </div>
        <div className="core-glass">
          <div className="core-symbol">
            <span />
            <span />
            <span />
          </div>
          <span className="core-overline">{copy["TXT-013"]}</span>
          <strong>{copy["TXT-014"]}</strong>
          <div className="core-line" />
          <small>小さな相談から、次の一歩へ。</small>
        </div>
        <div className="floating-note note-bottom">
          <span className="note-check">✓</span>
          <span>{copy["TXT-016"]}</span>
        </div>
        <span className="art-caption">A LITTLE SIMPLER. A LITTLE BETTER.</span>
      </div>
      <div className="hero-bottom">
        <span>AI · AUTOMATION · WEB · DATA</span>
        <a href="#problems">
          SCROLL TO EXPLORE<span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
