# Enterprise React TypeScript Authentication Portal

A production-ready, enterprise-grade authentication portal built with **React**, **TypeScript**, **Vite**, and modern **Vanilla CSS design tokens**.

## 🚀 Key Features

- **Enterprise Security Inputs**:
  - **Username / Enterprise ID**: Format validation with minimum length enforcement.
  - **Corporate Email**: RFC-compliant business email verification.
  - **Account Password**: Real-time password strength meter (Weak $\rightarrow$ Strong) evaluating length, mixed case, numbers, and symbols, plus show/hide visibility toggle.
  - **Security Verification Captcha (Anti-Bot V3)**: Dynamic HTML5 Canvas distortion rendering with noise dots and bezier curves, refresh trigger, and accessible Web Speech API audio readout.
- **Evaluation Mode**: One-click **Auto-fill Demo Data** button for quick verification of the authentication flow.
- **Session & State Management**: Complete `AuthContext`, `ThemeContext` (Dark/Light), and `ToastContext` with safe multi-tier Local/Session Storage fallback.
- **Enterprise Design System**:
  - Rich glassmorphism with ambient glowing mesh gradient effects.
  - Zero Tailwind dependency — 100% curated CSS tokens and smooth micro-animations.
  - Mobile-responsive layout supporting handheld devices and desktops.
- **Authenticated Dashboard**: Seamless transition to the enterprise dashboard displaying assigned roles, token inspect viewer, and session sign-out.

---

## 📂 Project Architecture

```
src/
├── assets/                  # Media assets & brand icons
├── components/
│   └── common/              # Atomic UI components (Button, Input, Card, Toast)
├── config/                  # App configurations
├── context/                 # AuthContext, ThemeContext, ToastContext
├── features/
│   └── auth/                # Auth feature domain
│       ├── api/             # Simulated enterprise authentication endpoints
│       ├── components/      # LoginForm, CaptchaChallenge, PasswordStrengthMeter, AuthHeader
│       └── utils/           # Canvas captcha generator & validation suite
├── layouts/                 # AuthLayout with ambient lighting & enterprise headers/footers
├── pages/                   # LoginPage, DashboardPage
├── services/                # StorageService, TokenService, ApiClient
├── styles/                  # Global design tokens (variables, animations, reset, typography)
└── types/                   # Centralized TypeScript definitions
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```
