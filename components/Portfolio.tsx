import { portfolio, portfolioCategories } from "../data/portfolio";
import Icon from "./Icon";
export default function Portfolio() {
  return (
    <section
      id="works"
      className="section works-section"
      aria-labelledby="works-heading"
    >
      <div className="container">
        <div className="section-intro">
          <div>
            <p className="eyebrow">04 / SELECTED WORKS</p>
            <h2 id="works-heading">
              これまでに、
              <br />
              こんなことをしてきました。
            </h2>
          </div>
          <p className="intro-copy">
            どんな困りごとに、どう向き合ったか。
            <br />
            取り組みの背景からご紹介します。
          </p>
        </div>
        {portfolio.length ? (
          <div className="portfolio-grid">
            {portfolio.map((item) => (
              <article className="work-card" key={item.id}>
                <p className="eyebrow">{item.category}</p>
                <h3>{item.title}</h3>
                <dl className="work-flow">
                  <div>
                    <dt>困っていたこと</dt>
                    <dd>{item.problem}</dd>
                  </div>
                  <div>
                    <dt>行ったこと</dt>
                    <dd>{item.action}</dd>
                  </div>
                  {item.outcome ? (
                    <div>
                      <dt>結果・変化</dt>
                      <dd>{item.outcome}</dd>
                    </div>
                  ) : null}
                </dl>
                <ul className="tags" aria-label="使用した技術">
                  {item.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <details>
                  <summary>詳細を見る</summary>
                  <p>{item.detail}</p>
                  {item.url ? (
                    <a className="text-link" href={item.url}>
                      関連サイトを見る
                      <Icon name="arrow" />
                    </a>
                  ) : null}
                </details>
              </article>
            ))}
          </div>
        ) : (
          <>
            <div className="works-notice">
              <span className="preparation-badge">
                実績は、ただいま掲載準備中です
              </span>
              <h3>公開できる事例を、準備しています。</h3>
              <p>
                掲載内容を確認のうえ、順次ご紹介します。
                <br />
                ご相談いただける内容は「お手伝いできること」をご覧ください。
              </p>
              <a href="#services" className="text-link">
                お手伝いできること
                <Icon name="arrow" />
              </a>
            </div>
            <p className="portfolio-category-label">掲載予定のカテゴリ</p>
            <div className="work-placeholder-grid">
              {portfolioCategories.map((category) => (
                <article
                  className="work-placeholder-card"
                  key={category}
                  aria-label={`${category}：掲載準備中`}
                >
                  <div className="placeholder-visual" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <div className="skeleton-chart">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                  <h3>{category}</h3>
                  <div className="skeleton-lines" aria-hidden="true">
                    <span />
                    <span />
                  </div>
                  <span className="coming-soon">
                    COMING SOON <small>掲載準備中</small>
                  </span>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
