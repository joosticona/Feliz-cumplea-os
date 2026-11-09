// Toda la experiencia funciona en el navegador: sin backend, sin rastreadores.
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const smooth = prefersReducedMotion ? 'auto' : 'smooth';

// Estrellitas reproducibles para dar ambiente, sin descargar imágenes pesadas.
function makeStars(container, count) {
  if (!container) return;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i += 1) {
    const star = document.createElement('i');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--star-size', `${Math.random() * 2.3 + 0.7}px`);
    star.style.setProperty('--star-o', `${Math.random() * 0.65 + 0.15}`);
    star.style.setProperty('--star-dur', `${Math.random() * 5 + 2}s`);
    star.style.animationDelay = `${Math.random() * -9}s`;
    fragment.append(star);
  }
  container.append(fragment);
}
makeStars($('#hero-stars'), 75);
makeStars($('#wish-sky'), 90);

// Scroll y efectos de entrada progresivos.
const scrollProgress = $('#scroll-progress');
function handleScroll() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${available > 0 ? (window.scrollY / available) * 100 : 0}%`;
}
window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', handleScroll);
handleScroll();

// Encabezado sticky con efecto al desplazarse.
const siteHeader = $('#site-header');
function handleHeader() {
  if (siteHeader) {
    if (window.scrollY > 20) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  }
}
window.addEventListener('scroll', handleHeader, { passive: true });
handleHeader();

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -55px 0px', threshold: 0.07 }
  );
  $$('.reveal').forEach((element) => revealObserver.observe(element));
} else {
  $$('.reveal').forEach((element) => element.classList.add('is-visible'));
}
if (window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
  window.addEventListener(
    'pointermove',
    (event) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
    },
    { passive: true }
  );
}

// Confeti liviano: lo limpiamos al acabar para no consumir memoria.
const confettiLayer = $('#confetti-layer');
const confettiColors = ['#d6b6ff', '#eab8e9', '#a9d6ff', '#fff1b9', '#ffffff', '#b9a0ee'];
function burstConfetti(amount = 90) {
  const pieces = prefersReducedMotion ? Math.min(amount, 18) : amount;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < pieces; i += 1) {
    const piece = document.createElement('i');
    piece.className = 'confetti';
    piece.style.setProperty('--x', `${Math.random() * 100}%`);
    piece.style.setProperty('--size', `${Math.random() * 6 + 5}px`);
    piece.style.setProperty(
      '--color',
      confettiColors[Math.floor(Math.random() * confettiColors.length)]
    );
    piece.style.setProperty('--duration', `${Math.random() * 2 + 3}s`);
    piece.style.setProperty('--delay', `${Math.random() * 0.65}s`);
    piece.style.setProperty('--drift', `${(Math.random() - 0.5) * 300}px`);
    piece.style.setProperty('--rotate', `${Math.random() * 360}deg`);
    piece.addEventListener('animationend', () => piece.remove(), { once: true });
    fragment.append(piece);
  }
  confettiLayer.append(fragment);
  // En movimiento reducido los elementos se eliminan enseguida.
  if (prefersReducedMotion) setTimeout(() => confettiLayer.replaceChildren(), 200);
}

const toast = $('#toast');
let toastTimer;
function notify(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3600);
}

// Melodía clásica de cumpleaños en notas, generada con Web Audio.
// No depende de enlaces, MP3, bibliotecas o servicios externos.
const noteFrequencies = {
  G4: 392,
  A4: 440,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
};
const birthdayNotes = [
  ['G4', 0.29],
  ['G4', 0.2],
  ['A4', 0.5],
  ['G4', 0.52],
  ['C5', 0.5],
  ['B4', 0.93],
  ['G4', 0.29],
  ['G4', 0.2],
  ['A4', 0.5],
  ['G4', 0.52],
  ['D5', 0.5],
  ['C5', 0.95],
  ['G4', 0.28],
  ['G4', 0.22],
  ['G5', 0.52],
  ['E5', 0.52],
  ['C5', 0.5],
  ['B4', 0.5],
  ['A4', 0.9],
  ['F5', 0.28],
  ['F5', 0.22],
  ['E5', 0.52],
  ['C5', 0.52],
  ['D5', 0.52],
  ['C5', 1.1],
];
let audioContext;
let masterGain;
let musicEnabled = false;
let musicTimer = null;
let loopId = 0;
const soundButton = $('#sound-toggle');
const soundLabel = $('#sound-label');

function scheduleTone(frequency, when, duration) {
  const oscillator = audioContext.createOscillator();
  const voiceGain = audioContext.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, when);
  // Una segunda oscilación, muy suave, produce un timbre de campanita.
  const over = audioContext.createOscillator();
  const overGain = audioContext.createGain();
  over.type = 'sine';
  over.frequency.setValueAtTime(frequency * 2, when);
  overGain.gain.setValueAtTime(0.018, when);
  overGain.gain.exponentialRampToValueAtTime(0.001, when + duration + 0.25);
  voiceGain.gain.setValueAtTime(0.0001, when);
  voiceGain.gain.exponentialRampToValueAtTime(0.095, when + 0.025);
  voiceGain.gain.exponentialRampToValueAtTime(0.0001, when + duration + 0.24);
  oscillator.connect(voiceGain).connect(masterGain);
  over.connect(overGain).connect(masterGain);
  oscillator.start(when);
  over.start(when);
  oscillator.stop(when + duration + 0.27);
  over.stop(when + duration + 0.27);
}
function playSong(currentLoop) {
  if (!musicEnabled || currentLoop !== loopId || !audioContext) return;
  let at = audioContext.currentTime + 0.08;
  for (const [note, duration] of birthdayNotes) {
    scheduleTone(noteFrequencies[note], at, duration * 0.82);
    at += duration;
  }
  // Deja una pausa entre vueltas para que la música no resulte insistente.
  musicTimer = window.setTimeout(
    () => playSong(currentLoop),
    (at - audioContext.currentTime + 2.5) * 1000
  );
}
async function setMusic(enabled) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (enabled && !AudioCtx) {
    notify('Tu navegador no permite reproducir esta música.');
    return;
  }
  if (enabled && !audioContext) {
    audioContext = new AudioCtx();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.36;
    masterGain.connect(audioContext.destination);
  }
  musicEnabled = enabled;
  soundButton.setAttribute('aria-pressed', String(enabled));
  soundButton.setAttribute('aria-label', enabled ? 'Silenciar música' : 'Activar música');
  soundLabel.textContent = enabled ? 'Sonando' : 'Música';
  loopId += 1;
  clearTimeout(musicTimer);
  if (audioContext) {
    try {
      if (enabled) {
        await audioContext.resume();
        if (musicEnabled) playSong(loopId);
      } else {
        await audioContext.suspend();
      }
    } catch {
      musicEnabled = false;
      soundButton.setAttribute('aria-pressed', 'false');
      soundLabel.textContent = 'Música';
      notify('No se pudo iniciar el sonido en este navegador.');
    }
  }
}
soundButton.addEventListener('click', () => {
  void setMusic(!musicEnabled);
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden && audioContext && musicEnabled) {
    clearTimeout(musicTimer);
    loopId += 1;
    void audioContext.suspend();
  } else if (!document.hidden && audioContext && musicEnabled) {
    const current = ++loopId;
    void audioContext
      .resume()
      .then(() => playSong(current))
      .catch(() => {});
  }
});

// Entrada al regalo.
const overlay = $('#welcome-overlay');
const startButton = $('#start-experience');
document.body.classList.add('overlay-open');
startButton.addEventListener(
  'click',
  () => {
    overlay.classList.add('is-leaving');
    document.body.classList.remove('overlay-open');
    overlay.setAttribute('aria-hidden', 'true');
    void setMusic(true);
    setTimeout(
      () => {
        overlay.hidden = true;
        burstConfetti(90);
      },
      prefersReducedMotion ? 50 : 950
    );
  },
  { once: true }
);

// Apaga y vuelve a encender todas las velas.
const stage = $('#cake-stage');
const blowButton = $('#blow-candles');
const relightButton = $('#relight-candles');
const wishResult = $('#wish-result');
blowButton.addEventListener('click', () => {
  if (stage.classList.contains('candles-out')) return;
  stage.classList.add('candles-out');
  stage
    .querySelector('.cake-art')
    ?.setAttribute('aria-label', 'Pastel lila de cumpleaños con las velas apagadas');
  blowButton.disabled = true;
  blowButton.textContent = '¡Deseo pedido! ♡';
  wishResult.classList.add('show');
  relightButton.hidden = false;
  burstConfetti(110);
  notify('¡Feliz cumpleaños, Anahí! ✨');
});
relightButton.addEventListener('click', () => {
  stage.classList.remove('candles-out');
  stage
    .querySelector('.cake-art')
    ?.setAttribute('aria-label', 'Pastel lila de cumpleaños con cinco velas encendidas');
  blowButton.disabled = false;
  blowButton.innerHTML = 'Soplar las velitas <span aria-hidden="true">✧</span>';
  relightButton.hidden = true;
  wishResult.classList.remove('show');
});

// Tarjetas giratorias, accesibles por teclado gracias al elemento <button>.
$$('[data-reason-card]').forEach((card) => {
  card.addEventListener('click', () => {
    const flipped = card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed', String(flipped));
  });
});

// Deseos: son privados, locales y temporales, sin envío de datos.
const wishForm = $('#wish-form');
const wishInput = $('#wish-input');
const wishList = $('#wishes-list');
const sky = $('#wish-sky');
wishForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const wish = wishInput.value.trim().replace(/\s+/g, ' ');
  if (!wish) {
    wishInput.focus();
    return;
  }
  const pill = document.createElement('span');
  pill.className = 'wish-pill';
  const smallStar = document.createElement('span');
  smallStar.setAttribute('aria-hidden', 'true');
  smallStar.textContent = '✦';
  const textSpan = document.createElement('span');
  textSpan.className = 'wish-text';
  textSpan.textContent = wish;
  pill.append(smallStar, textSpan);
  wishList.prepend(pill);
  while (wishList.children.length > 8) wishList.lastElementChild?.remove();
  const star = document.createElement('i');
  star.className = 'shooting-star';
  star.style.left = `${25 + Math.random() * 50}%`;
  star.style.top = `${40 + Math.random() * 40}%`;
  sky.append(star);
  star.addEventListener('animationend', () => star.remove(), { once: true });
  if (prefersReducedMotion) setTimeout(() => star.remove(), 200);
  wishInput.value = '';
  notify('Tu deseo acaba de convertirse en una estrella. ✦');
});

// Sobre de carta y mensaje escrito.
const envelopeInteraction = $('.letter-interaction');
const letterButton = $('#open-letter');
const letterPaper = $('#letter-paper');
const letterClose = $('#close-letter');
let letterTimer;
letterButton.addEventListener('click', () => {
  if (!letterPaper.hidden) {
    letterPaper.scrollIntoView({ behavior: smooth, block: 'start' });
    return;
  }
  envelopeInteraction.classList.add('is-open');
  letterButton.setAttribute('aria-expanded', 'true');
  letterButton.textContent = 'Leer de nuevo ♡';
  clearTimeout(letterTimer);
  letterTimer = setTimeout(
    () => {
      letterPaper.hidden = false;
      requestAnimationFrame(() => letterPaper.scrollIntoView({ behavior: smooth, block: 'start' }));
      $('#letter-paper article')?.focus({ preventScroll: true });
      burstConfetti(35);
    },
    prefersReducedMotion ? 0 : 650
  );
});
letterClose.addEventListener('click', () => {
  clearTimeout(letterTimer);
  letterPaper.hidden = true;
  envelopeInteraction.classList.remove('is-open');
  letterButton.setAttribute('aria-expanded', 'false');
  letterButton.innerHTML = 'Abrir mi carta <span aria-hidden="true">↗</span>';
  letterButton.focus({ preventScroll: true });
  envelopeInteraction.scrollIntoView({ behavior: smooth, block: 'center' });
});

// Último regalo, repetible para celebrar más de una vez.
const giftButton = $('#open-gift');
const giftWrap = $('#gift-wrap');
const giftMessage = $('#gift-message');
giftButton.addEventListener('click', () => {
  giftWrap.classList.add('is-open');
  giftMessage.hidden = false;
  giftButton.textContent = '¡Celebrar otra vez! ✦';
  burstConfetti(170);
  giftMessage.scrollIntoView({ behavior: smooth, block: 'nearest' });
});
