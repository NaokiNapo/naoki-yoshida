import { contactChannels } from "../data/site";
import Icon from "./Icon";
export default function Contact() {
  const [primary, ...others] = contactChannels;
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className="contact-panel">
          <div className="contact-light" aria-hidden="true" />
          <p className="eyebrow">LET’S TALK</p>
          <h2 id="contact-heading">
            まだまとまっていなくても、
            <br />
            まずは聞かせてください。
          </h2>
          <p>
            「こんなこともできる？」
            <br className="mobile-break" />
            くらいの段階でも大丈夫です。
          </p>
          <p>
            内容を聞いたうえで、
            <br className="mobile-break" />
            できること・できないことを含めてお答えします。
          </p>
          {primary ? (
            <>
              <a
                className="button button-primary contact-button"
                href={primary.href}
              >
                相談してみる
                <Icon name="arrow" />
              </a>
              <p className="contact-channel">{primary.label}</p>
              {others.length ? (
                <div className="other-channels">
                  {others.map((channel) => (
                    <a key={channel.kind + channel.href} href={channel.href}>
                      {channel.label}
                      <Icon name="arrow" />
                    </a>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <>
              <button
                type="button"
                className="button button-unavailable contact-button"
                disabled
                aria-describedby="contact-status"
              >
                相談してみる
                <Icon name="arrow" />
              </button>
              <p id="contact-status" className="contact-status">
                お問い合わせ窓口は、ただいま準備中です。
              </p>
            </>
          )}
          <span className="contact-bottom-note">
            YOUR NEXT STEP STARTS WITH A CONVERSATION.
          </span>
        </div>
      </div>
    </section>
  );
}
