"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
const links = [
  { href: "#services", label: "できること" },
  { href: "#works", label: "実績" },
  { href: "#about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () =>
      header.current?.classList.toggle("is-scrolled", window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    const media = window.matchMedia("(min-width: 768px)");
    const close = () => setOpen(false);
    media.addEventListener("change", close);
    return () => {
      window.removeEventListener("scroll", update);
      media.removeEventListener("change", close);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        (event.target.closest("a") || !header.current?.contains(event.target))
      )
        setOpen(false);
    };
    const onFocus = (event: FocusEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);
  return (
    <header ref={header} className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#top" aria-label="Naoki Yoshida トップへ">
          <span className="brand-dot" />
          Naoki Yoshida<span className="wordmark-period">.</span>
        </a>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <span className={open ? "menu-bars active" : "menu-bars"}>
            <i />
            <i />
          </span>
        </button>
        <nav
          id="main-navigation"
          aria-label="メインナビゲーション"
          className={open ? "navigation is-open" : "navigation"}
        >
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="header-cta" href="#contact">
            相談する
            <Icon name="arrow" />
          </a>
        </nav>
      </div>
    </header>
  );
}
