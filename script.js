document.addEventListener("DOMContentLoaded", () => {
    const txtElement = document.querySelector("h1");
    if (!txtElement) return;
    const textContent = txtElement.textContent;
    const ANIMATION_DELAY_STEP = 0.05;

    function animateHeading() {
        txtElement.textContent = "";
        textContent.split("").forEach((char, index) => {
            const span = document.createElement("span");
            span.textContent = char;
            span.style.animationDelay = `${index * ANIMATION_DELAY_STEP}s`;
            span.style.display = char === " " ? "inline-block" : "inline";
            txtElement.appendChild(span);
        });
    }

    function debounce(fn, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    animateHeading();
    txtElement.addEventListener("click", debounce(animateHeading, 200));

    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const terminal = document.querySelector(".terminal");
    if (terminal) {
        const onEnter = () => (terminal.style.transform = "translateY(-3px)");
        const onLeave = () => (terminal.style.transform = "");
        terminal.addEventListener("mouseenter", onEnter);
        terminal.addEventListener("mouseleave", onLeave);
        window.addEventListener("pagehide", () => {
            terminal.removeEventListener("mouseenter", onEnter);
            terminal.removeEventListener("mouseleave", onLeave);
        });
    }
});