export default function About() {
  return (
    <section
      id="about"
      className="section about-section"
      aria-labelledby="about-heading"
    >
      <div className="container about-layout">
        <div className="about-identity">
          <p className="eyebrow">05 / ABOUT</p>
          <div className="monogram" aria-hidden="true">
            ny<span>.</span>
            <div className="monogram-orbit" />
          </div>
          <p className="about-name">Naoki Yoshida</p>
          <p className="about-role">Freelance Engineer / Technology Partner</p>
        </div>
        <div className="about-copy">
          <h2 id="about-heading">
            話を聞くところから、
            <br />
            つくるところまで。
          </h2>
          <p>
            仕事の中の「もう少し、こうなったら」を、
            <br className="desktop-break" />
            一緒に考えて、形にしていきたい。
          </p>
          <p>
            AI、自動化、Web、データ。使える方法はいろいろあります。
            <br className="desktop-break" />
            でも、最初に知りたいのは技術の話よりも、
            <br className="desktop-break" />
            今どんなことに時間がかかり、何を大切にしているかです。
          </p>
          <p>
            難しい言葉ではなく、分かり合える言葉で。
            <br />
            相談しながら、必要なものを一緒につくっていきます。
          </p>
          <div className="about-signature">
            一緒に考える。小さく始める。使いながら育てる。
          </div>
        </div>
      </div>
    </section>
  );
}
