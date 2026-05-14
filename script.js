// === Year =================================================================
document.getElementById("year").textContent = new Date().getFullYear();

// === Best-effort hydration aus data/paul-kiefer.json =====================
// Wenn fetch nicht funktioniert (z.B. file://), bleiben die HTML-Defaults stehen.
(async () => {
  try {
    const res = await fetch("data/paul-kiefer.json", { cache: "no-cache" });
    if (!res.ok) return;
    const data = await res.json();

    // tagline ist die einzige Stelle, die wir aktuell überschreiben.
    // Wir lassen das »…« drumherum stehen und tauschen nur den inneren Text.
    const tag = document.querySelector('[data-bind="tagline"]');
    if (tag && data?.identity?.tagline) {
      const quotes = tag.querySelectorAll(".hero__tagline-quote");
      tag.textContent = "";
      if (quotes[0]) tag.appendChild(quotes[0]);
      tag.appendChild(document.createTextNode(" " + data.identity.tagline + " "));
      if (quotes[1]) tag.appendChild(quotes[1]);
    }
  } catch (_) {
    /* fallback ok */
  }
})();

// === Scroll reveal ========================================================
const revealTargets = document.querySelectorAll(
  ".section, .card, .track, .sticker, .path__cell, .contact__link, .hanko"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
revealTargets.forEach((el) => io.observe(el));

// === Glitch-Tick: kurzer Versatz auf den Outline-Buchstaben =============
// Brutalist-Akzent — der "KIEFER"-Schriftzug zuckt minimal alle paar Sekunden.
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const altRow = document.querySelector(".hero__name-row--alt");

if (altRow && !prefersReduced) {
  const baseTransform = altRow.style.transform || "";
  const glitch = () => {
    const offset = (Math.random() - 0.5) * 8;
    altRow.style.transform = `${baseTransform} translateX(${offset}px)`;
    setTimeout(() => {
      altRow.style.transform = baseTransform;
    }, 120);
  };
  setInterval(() => {
    if (Math.random() > 0.4) glitch();
  }, 2400);
}

// === Subtile Mouse-Parallaxe auf Hero-Name ===============================
const nameDe = document.querySelectorAll(".hero__name-de");
if (!prefersReduced && nameDe.length) {
  window.addEventListener(
    "mousemove",
    (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      nameDe.forEach((el, i) => {
        const factor = i === 0 ? 1 : 0.6;
        el.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    },
    { passive: true }
  );
}
