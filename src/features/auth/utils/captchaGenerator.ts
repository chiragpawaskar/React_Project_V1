import type { CaptchaChallengeData } from '@/types';

const CHAR_POOL = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz';

export const captchaGenerator = {
  /**
   * Generates a new random captcha code
   */
  generateChallenge(length = 6): CaptchaChallengeData {
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * CHAR_POOL.length);
      code += CHAR_POOL[randomIndex];
    }

    const id = 'cap_' + Math.random().toString(36).substring(2, 11);
    const token = btoa(`${id}:${code}:${Date.now()}`);

    return {
      id,
      code,
      token,
      createdAt: Date.now(),
      expiresInSeconds: 180,
    };
  },

  /**
   * Renders the captcha code onto an HTML5 canvas with realistic security noise
   */
  renderToCanvas(canvas: HTMLCanvasElement, code: string, _isDark = false): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Reset transform
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // 1. Clean textured background (light cream/gray)
    ctx.fillStyle = '#f3f6f9';
    ctx.fillRect(0, 0, width, height);

    // Subtle gradient overlay
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, 'rgba(238, 242, 246, 0.9)');
    grad.addColorStop(0.5, 'rgba(248, 250, 252, 0.7)');
    grad.addColorStop(1, 'rgba(226, 232, 240, 0.85)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Border inner
    ctx.strokeStyle = '#dbe3ea';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, width - 1, height - 1);

    // 2. Faint security wavy background grid
    ctx.lineWidth = 0.8;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(148, 163, 184, ${0.2 + Math.random() * 0.15})`;
      ctx.moveTo(0, Math.random() * height);
      ctx.bezierCurveTo(
        width * 0.25,
        Math.random() * height,
        width * 0.75,
        Math.random() * height,
        width,
        Math.random() * height
      );
      ctx.stroke();
    }

    // 3. Realistic security noise dots & speckles
    for (let i = 0; i < 65; i++) {
      const colors = ['#64748b', '#0284c7', '#16a34a', '#dc2626', '#9333ea', '#ca8a04'];
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.globalAlpha = 0.35 + Math.random() * 0.35;
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, 0.6 + Math.random() * 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // 4. Character rendering with jitter, distinctive colors, and angles
    const charList = code.split('');
    const charSpacing = width / (charList.length + 1);
    const fonts = ['Plus Jakarta Sans', 'Arial', 'Georgia', 'Courier New', 'Verdana'];

    // Authentic corporate palette: Dark Green, Rust Orange, Deep Purple, Crimson Red, Navy, Emerald
    const letterPalette = [
      '#1b5e20', // deep green
      '#b45309', // amber/brown
      '#4a148c', // deep purple
      '#b91c1c', // deep red
      '#0f766e', // teal
      '#15803d', // forest green
      '#1d4ed8', // royal blue
    ];

    charList.forEach((char, index) => {
      ctx.save();

      const x = charSpacing * (index + 0.9);
      const y = height / 2 + (Math.random() * 6 - 3);
      const angle = (Math.random() * 24 - 12) * (Math.PI / 180);
      const fontSize = 23 + Math.floor(Math.random() * 5);
      const fontName = fonts[Math.floor(Math.random() * fonts.length)];

      ctx.translate(x, y);
      ctx.rotate(angle);

      ctx.font = `bold ${fontSize}px ${fontName}, sans-serif`;
      ctx.fillStyle = letterPalette[index % letterPalette.length];
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      // Slight noise shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      ctx.fillText(char, 0, 0);

      ctx.restore();
    });

    // 5. Fine interference line cutting across
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
    ctx.lineWidth = 1;
    ctx.moveTo(8, height * 0.4 + Math.random() * 10);
    ctx.quadraticCurveTo(width * 0.5, height * 0.6 + Math.random() * 8, width - 8, height * 0.4 + Math.random() * 10);
    ctx.stroke();
  },

  /**
   * Accessible Web Speech API audio playback for visually impaired users
   */
  speakCode(code: string): void {
    if (!('speechSynthesis' in window)) {
      alert(`Captcha code audio readout: ${code.split('').join(' - ')}`);
      return;
    }

    window.speechSynthesis.cancel();
    // Read spaced characters clearly: "Code is: A ... 5 ... B"
    const textToSpeak = 'Verification code is ' + code.split('').join(', ');
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  },
};
