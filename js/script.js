document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (id) => document.getElementById(id);
  const root = document.documentElement;

  const year = $("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Theme switcher ---------- */
  const themeToggle = $("themeToggle");
  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    if (!themeToggle) return;
    const isDark = theme === "dark";
    themeToggle.innerHTML = isDark
      ? '<i class="bi bi-sun"></i><span class="theme-toggle-label">Light</span>'
      : '<i class="bi bi-moon-stars"></i><span class="theme-toggle-label">Dark</span>';
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    themeToggle.title = isDark ? "Switch to light theme" : "Switch to dark theme";
  };
  applyTheme(root.getAttribute("data-theme") || "light");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("portfolio-theme", next); } catch (e) {}
    });
  }

  /* ---------- Mobile nav closes after selecting a link ---------- */
  document.querySelectorAll("#navMenu .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = $("navMenu");
      if (menu && menu.classList.contains("show") && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  /* ---------- Scroll: progress bar, navbar shadow, back-to-top ---------- */
  const nav = $("mainNav"), bar = $("scrollProgress"), toTop = $("toTop");
  const onScroll = () => {
    const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    if (nav) nav.classList.toggle("scrolled", y > 20);
    if (toTop) toTop.classList.toggle("show", y > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  /* ---------- Reveal on scroll, animated skill bars & counters ---------- */
  const bars = document.querySelectorAll(".progress-bar");
  bars.forEach((b) => { b.dataset.w = b.style.width; if (!reduceMotion) b.style.width = "0"; });

  const counters = document.querySelectorAll("[data-count]");
  const runCounter = (el) => {
    const end = parseFloat(el.dataset.count), dec = parseInt(el.dataset.decimals || "0", 10), suf = el.dataset.suffix || "";
    if (reduceMotion) return;
    const start = performance.now(), dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (end * eased).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const revealTargets = document.querySelectorAll(".section-heading, .content-card, .fact-card, .timeline-item, .project-card, .contact-form, .contact-detail");
  if ("IntersectionObserver" in window && !reduceMotion) {
    revealTargets.forEach((el, i) => { el.classList.add("reveal"); el.style.transitionDelay = (i % 3) * 90 + "ms"; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        entry.target.querySelectorAll(".progress-bar").forEach((b) => { b.style.width = b.dataset.w; });
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    revealTargets.forEach((el) => io.observe(el));
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { runCounter(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
  }

  /* ---------- Typed role rotator ---------- */
  const typed = $("typed");
  if (typed && !reduceMotion) {
    const words = ["things for the web.", "full-stack apps.", "clean interfaces.", "data-driven tools."];
    let w = 0, c = 0, deleting = false;
    const step = () => {
      const word = words[w];
      c += deleting ? -1 : 1;
      typed.textContent = word.slice(0, c);
      let delay = deleting ? 35 : 70;
      if (!deleting && c === word.length) { deleting = true; delay = 1800; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 400; }
      setTimeout(step, delay);
    };
    typed.textContent = "";
    setTimeout(step, 600);
  }

  /* ---------- Contact form ---------- */
  const form = $("contactForm"), feedback = $("formFeedback"), msg = $("message"), count = $("charCount");
  const OWNER_EMAIL = "meghana.24mic7069@vitapstudent.ac.in";
  const setFeedback = (text, type) => { feedback.textContent = text; feedback.className = "form-feedback" + (type ? " " + type : ""); };

  if (msg && count) msg.addEventListener("input", () => { count.textContent = msg.value.length; });

  if (form) {
    // live validation once a field has been touched
    form.querySelectorAll(".form-control").forEach((field) => {
      field.addEventListener("blur", () => { field.value = field.value.trim(); field.classList.toggle("is-invalid", !field.checkValidity()); field.classList.toggle("is-valid", field.checkValidity()); });
      field.addEventListener("input", () => { if (field.classList.contains("is-invalid") && field.checkValidity()) { field.classList.remove("is-invalid"); field.classList.add("is-valid"); } });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.querySelectorAll(".form-control").forEach((f) => { f.value = f.value.trim(); });
      form.classList.add("was-validated");

      if (!form.checkValidity()) {
        setFeedback("Please review the highlighted fields and try again.", "error");
        const firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const d = new FormData(form);
      const body = `${d.get("message")}\n\n— ${d.get("name")} (${d.get("email")})`;
      window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(d.get("subject"))}&body=${encodeURIComponent(body)}`;
      setFeedback("Thank you! Your email app should open with your message ready to send.", "success");
      form.reset();
      form.classList.remove("was-validated");
      form.querySelectorAll(".form-control").forEach((f) => f.classList.remove("is-valid", "is-invalid"));
      if (count) count.textContent = "0";
    });
  }
});
