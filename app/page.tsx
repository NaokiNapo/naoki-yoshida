import MotionEffects from "../components/MotionEffects";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Problems from "../components/Problems";
import Services from "../components/Services";
import Process from "../components/Process";
import Portfolio from "../components/Portfolio";
import About from "../components/About";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        本文へスキップ
      </a>
      <Header />
      <MotionEffects />
      <main id="main-content">
        <div id="top" />
        <Hero />
        <Problems />
        <Services />
        <Process />
        <Portfolio />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
