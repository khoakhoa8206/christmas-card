document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("card");
  const music = document.getElementById("bgMusic");
  const toggle = document.getElementById("musicToggle");

  let playing = false;

  // Open card + play music
  card.addEventListener("click", () => {
    card.classList.toggle("open");

    if (!playing) {
      music.volume = 0.6;
      music.play().catch(() => {});
      playing = true;
      toggle.textContent = "🔊";
    }
  });

  // Toggle music button
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (playing) {
      music.pause();
      toggle.textContent = "🔇";
    } else {
      music.play().catch(() => {});
      toggle.textContent = "🔊";
    }
    playing = !playing;
  });

  // Snow & particles
  const canvas = document.getElementById("snowCanvas");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const particles = [];
  const icons = ["❄","🍬","🍪","❤"];

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      s: Math.random() * 0.6 + 0.4,
      icon: icons[Math.floor(Math.random() * icons.length)]
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px serif";

    particles.forEach(p => {
      ctx.fillText(p.icon, p.x, p.y);
      p.y += p.s;
      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
});
