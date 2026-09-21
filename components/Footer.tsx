import { footerLinks } from "../data/site";
export default function Footer() {
  return (
    <footer className="site-footer container">
      <div>
        <a className="wordmark" href="#top">
          Naoki Yoshida<span className="wordmark-period">.</span>
        </a>
        <p>Freelance Engineer</p>
      </div>
      <nav aria-label="フッターナビゲーション">
        <a href="#contact">Contact</a>
        {footerLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <small>© {new Date().getFullYear()} Naoki Yoshida</small>
    </footer>
  );
}
