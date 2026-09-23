import { copy } from "../data/copy";
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
          <p className="about-role">{copy["TXT-107"]}</p>
        </div>
        <div className="about-copy">
          <h2 id="about-heading">
            相談しながら、
            <br />
            ちょうどいい方法を
            <br />
            一緒に考えます。
          </h2>
          <p>{copy["TXT-109"]}</p>
          <p>
            データ分析やBI、Web制作、AI活用など、
            <br className="desktop-break" />
            さまざまな領域の仕事に携わってきました。
          </p>
          <p>
            ただ、技術そのものより大切にしているのは、
            <br className="desktop-break" />
            「何に困っているのか」を最初にきちんと理解することです。
          </p>
          <p>最初から作るものが決まっていなくても構いません。</p>
          <p>
            話を聞きながら整理し、
            <br className="desktop-break" />
            必要であれば実際に作るところまでお手伝いします。
          </p>
          <div className="about-signature">
            一緒に考える。小さく始める。使いながら育てる。
          </div>
        </div>
      </div>
    </section>
  );
}
