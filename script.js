const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section[id]")];
const focusToggle = document.querySelector("#focus-toggle");
const toast = document.querySelector("#toast");
let toastTimer;

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
};

const setActiveNav = () => {
  const current = sections.reduce((visible, section) => {
    const distance = Math.abs(section.getBoundingClientRect().top - 110);
    return distance < visible.distance ? { id: section.id, distance } : visible;
  }, { id: "work", distance: Infinity }).id;
  navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`));
};

const setFocusMode = (enabled) => {
  document.body.classList.toggle("focus-mode", enabled);
  focusToggle.setAttribute("aria-pressed", String(enabled));
  showToast(enabled ? "Focus mode on — the signal is the work." : "Focus mode off — full profile restored.");
};

focusToggle.addEventListener("click", () => setFocusMode(!document.body.classList.contains("focus-mode")));
document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "f" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    setFocusMode(!document.body.classList.contains("focus-mode"));
  }
});
window.addEventListener("scroll", setActiveNav, { passive: true });
setActiveNav();
