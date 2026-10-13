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
  renderToCanvas(canvas: HTMLCanvasElement, code: string, isDarkTheme = true): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Reset transform
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // 1. Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    if (isDarkTheme) {
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(0.5, '#1e1b4b');
      bgGrad.addColorStop(1, '#172554');
    } else {
      bgGrad.addColorStop(0, '#f1f5f9');
      bgGrad.addColorStop(0.5, '#e0e7ff');
      bgGrad.addColorStop(1, '#f8fafc');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Interference grid lines
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.strokeStyle = isDarkTheme
        ? `rgba(99, 102, 241, ${0.15 + Math.random() * 0.2})`
        : `rgba(99, 102, 241, ${0.1 + Math.random() * 0.15})`;
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.bezierCurveTo(
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height,
        Math.random() * width,
        Math.random() * height
      );
      ctx.stroke();
    }

    // 3. Noise dots
    for (let i = 0; i < 45; i++) {
      ctx.fillStyle = isDarkTheme
        ? `rgba(${120 + Math.random() * 135}, ${150 + Math.random() * 105}, 255, ${0.3 + Math.random() * 0.4})`
        : `rgba(79, 70, 229, ${0.2 + Math.random() * 0.3})`;
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Character rendering with jitter & rotation
    const charList = code.split('');
    const charSpacing = width / (charList.length + 1);
    const fonts = ['JetBrains Mono', 'Outfit', 'Courier New', 'Arial'];

    const colorsDark = ['#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#34d399', '#fbbf24'];
    const colorsLight = ['#0284c7', '#4f46e5', '#7c3aed', '#db2777', '#059669', '#d97706'];
    const palette = isDarkTheme ? colorsDark : colorsLight;

    charList.forEach((char, index) => {
      ctx.save();

      const x = charSpacing * (index + 0.8);
      const y = height / 2 + (Math.random() * 8 - 4);
      const angle = (Math.random() * 30 - 15) * (Math.PI / 180);
      const fontSize = 24 + Math.floor(Math.random() * 6);
      const fontName = fonts[Math.floor(Math.random() * fonts.length)];

      ctx.translate(x, y);
      ctx.rotate(angle);

      ctx.font = `bold ${fontSize}px ${fontName}, monospace`;
      ctx.fillStyle = palette[index % palette.length];
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      // Subtle drop shadow for letters
      ctx.shadowColor = isDarkTheme ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.15)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      ctx.fillText(char, 0, 0);

      ctx.restore();
    });

    // 5. Strike-through wavy line across characters
    ctx.beginPath();
    ctx.strokeStyle = isDarkTheme ? 'rgba(236, 72, 153, 0.4)' : 'rgba(236, 72, 153, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.moveTo(10, height / 2 + (Math.random() * 10 - 5));
    ctx.quadraticCurveTo(width / 2, height / 2 + (Math.random() * 20 - 10), width - 10, height / 2 + (Math.random() * 10 - 5));
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
