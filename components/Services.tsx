import { services } from "../data/services";
import Icon from "./Icon";
export default function Services() {
  return (
    <section
      id="services"
      className="section services-section"
      aria-labelledby="services-heading"
    >
      <div className="container">
        <div className="section-intro">
          <div>
            <p className="eyebrow">02 / HOW I CAN HELP</p>
            <h2 id="services-heading">
              一緒に考えて、
              <br />
              必要な形までつくります。
            </h2>
          </div>
          <p className="intro-copy">
            特定のサービスを無理に当てはめるのではなく、
            <br className="desktop-break" />
            今の状況や目的を聞いたうえで、
            <br className="desktop-break" />
            必要な方法を一緒に考えます。
          </p>
        </div>
        <div className="service-grid">
          {services.map((service, i) => (
            <article
              key={service.category}
              className={`service-card service-${i}`}
            >
              <div className="service-top">
                <span className="service-icon">
                  <Icon name={service.icon} />
                </span>
                <span>{service.english}</span>
                <span className="service-index">0{i + 1}</span>
              </div>
              <p className="service-category">{service.category}</p>
              <h3>{service.title}</h3>
              <p className="service-description">{service.text}</p>
              <ul className="tags">
                {service.examples.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
