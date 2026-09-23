import ContactForm from "./ContactForm";
export default function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className="contact-panel contact-layout">
          <div className="contact-light" aria-hidden="true" />
          <div className="contact-intro">
            <p className="eyebrow">LET’S TALK</p>
            <h2 id="contact-heading">
              まだまとまっていなくても、
              <br />
              まずは聞かせてください。
            </h2>
            <p>
              「こんなこともできる？」
              <br />
              くらいの段階でも大丈夫です。
            </p>
            <p>
              内容を聞いたうえで、
              <br />
              できること・できないことを含めてお答えします。
            </p>
            <span className="contact-bottom-note">
              YOUR NEXT STEP STARTS WITH A CONVERSATION.
            </span>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
