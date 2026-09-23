"use client";
import { useEffect } from "react";

/** A single observer and rAF scheduler; content remains visible without JS. */
export default function MotionEffects() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};
    const setup = () => {
      dispose();
      if (media.matches || !("IntersectionObserver" in window)) return;
      const reveals = [
        ...document.querySelectorAll<HTMLElement>(
          ".section-intro > *, .problem-card, .service-card, .steps > li, .process-section h2, .works-notice, .work-placeholder-card, .about-identity, .about-copy > *, .skills-layout > *, .contact-intro",
        ),
      ];
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).dataset.reveal = "shown";
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
      );
      for (const element of reveals) {
        // Do not hide content already visible, especially a deep-linked section.
        if (element.getBoundingClientRect().top > innerHeight)
          element.dataset.reveal = "pending";
        const siblings = [...(element.parentElement?.children ?? [])];
        element.style.setProperty(
          "--reveal-delay",
          `${Math.min(siblings.indexOf(element) % 3, 2) * 65}ms`,
        );
        observer.observe(element);
      }
      const scenes = [
        ...document.querySelectorAll<HTMLElement>(
          ".hero-art, .process-section, .about-section, .contact-panel",
        ),
      ];
      const active = new Set<HTMLElement>();
      let frame = 0;
      const render = () => {
        frame = 0;
        for (const element of active) {
          const rect = element.getBoundingClientRect();
          const progress = Math.max(
            -1,
            Math.min(
              1,
              (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight,
            ),
          );
          element.style.setProperty(
            "--motion-y",
            `${(progress * 26).toFixed(2)}px`,
          );
          element.style.setProperty(
            "--motion-x",
            `${(progress * 12).toFixed(2)}px`,
          );
        }
      };
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(render);
      };
      const sceneObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) active.add(entry.target as HTMLElement);
            else active.delete(entry.target as HTMLElement);
          }
          schedule();
        },
        { rootMargin: "80px" },
      );
      for (const scene of scenes) sceneObserver.observe(scene);
      const onFocus = (event: FocusEvent) => {
        if (event.target instanceof Element) {
          const target = event.target.closest<HTMLElement>(
            '[data-reveal="pending"]',
          );
          if (target) {
            target.dataset.reveal = "shown";
            observer.unobserve(target);
          }
        }
      };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      document.addEventListener("focusin", onFocus);
      dispose = () => {
        observer.disconnect();
        sceneObserver.disconnect();
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        document.removeEventListener("focusin", onFocus);
        cancelAnimationFrame(frame);
        for (const element of reveals) {
          delete element.dataset.reveal;
          element.style.removeProperty("--reveal-delay");
        }
        for (const scene of scenes) {
          scene.style.removeProperty("--motion-y");
          scene.style.removeProperty("--motion-x");
        }
      };
    };
    setup();
    media.addEventListener("change", setup);
    return () => {
      dispose();
      media.removeEventListener("change", setup);
    };
  }, []);
  return null;
}
