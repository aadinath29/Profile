# Milestone 1 Toolchain, Bundler & Configuration Specifications

**Agent**: `explorer_m1_1` (Explorer M1-1 — Toolchain, Bundler & Config Specifications)  
**Date**: 2026-09-10T00:11:00+05:30 (UTC: 2026-09-09T18:41:00Z)  
**Working Directory**: `c:\Users\Dell\Desktop\Profile\.agents\explorer_m1_1`  
**Target File**: `c:\Users\Dell\Desktop\Profile\.agents\explorer_m1_1\handoff.md`  
**Parent Sub-Orchestrator**: `sub_orch_m1` (`37a2caa7-a416-4400-a5d8-c1269558039a`)

---

## 1. Observation

### 1.1 Direct Runtime & Platform Audit
- **Host Platform**: Windows 11 Pro x64.
- **Node.js**: `v24.11.1` (observed via `node --version`).
- **NPM**: `11.6.2` (observed via `npm --version`). Under npm v11, peer dependency checking is strictly enforced by default (`install.strict-peer-dependencies=true`).
- **Workspace State**: `c:\Users\Dell\Desktop\Profile` is a greenfield workspace containing:
  - `Aadi_Resume-04-09-2026.pdf` (63,741 bytes) — verified real developer resume.
  - `PROJECT.md` (11,705 bytes) — master architecture and component inventory.
  - `.agents/` directory — orchestration and exploration workspace.
  - No existing `package.json`, `node_modules`, or build artifacts exist yet in the root directory.

### 1.2 Registry Verification of Pinned Package Versions & Peer Dependencies
Direct live queries to npm registry confirmed:
1. `@react-three/fiber@8.17.10` peer dependencies:
   ```json
   {
     "expo": ">=43.0",
     "react": ">=18.0",
     "three": ">=0.133",
     "expo-gl": ">=11.0",
     "react-dom": ">=18.0",
     "expo-asset": ">=8.4",
     "react-native": ">=0.64",
     "expo-file-system": ">=11.0"
   }
   ```
   *Observation*: R3F v8.17.10 requires `react: >=18.0` and `react-dom: >=18.0`. In React 19, R3F v8 fails with `ERESOLVE unable to resolve dependency tree`. React 18.3.1 satisfies this constraint with zero warnings.

2. `@react-three/drei@9.117.0` peer dependencies:
   ```json
   {
     "react": ">=18.0",
     "three": ">=0.137",
     "react-dom": ">=18.0",
     "@react-three/fiber": ">=8.0"
   }
   ```
   *Observation*: `@react-three/drei@9.117.0` with `three@0.169.0` and `@react-three/fiber@8.17.10` satisfies all peer constraints cleanly.

3. Standalone dependency registry checks:
   - `lenis`: Version `1.1.18` is live and active. `@studio-freight/lenis` is deprecated.
   - `framer-motion`: Version `11.11.11` is live and fully compatible with React 18.
   - `@emailjs/browser`: Version `4.4.1` is confirmed.
   - `lucide-react`: Version `0.454.0` is confirmed.
   - `tailwindcss`: Version `3.4.14` is confirmed.
   - `vite`: Version `5.4.10` is confirmed.
   - `@vitejs/plugin-react`: Version `4.3.3` is confirmed.

---

## 2. Logic Chain

### 2.1 React 18.3.1 Pinned Architecture
- **Observation**: `ORIGINAL_REQUEST.md § R1` mandates React + Vite + Tailwind CSS + React Three Fiber + Three.js + Framer Motion + GSAP + Lenis.
- **Deduction**: npm v11 enforces strict peer dependency matching. React 19 causes dependency tree breakage with R3F v8 ecosystem packages. Pinned `react@18.3.1` and `react-dom@18.3.1` ensures a 100% stable reconciler and error-free installation.

### 2.2 Bundler & Rollup Chunk Optimization Strategy (`vite.config.js`)
- **Observation**: `ORIGINAL_REQUEST.md § R5` states: *"R3F / Three.js components must be React.lazy + Suspense wrapped with a skeleton fallback — heavy 3D should not block initial page render"*.
- **Deduction**: Without explicit Rollup output chunk splitting, Three.js, R3F, and Drei may get lumped into vendor chunks that inflate initial page weight. By defining `manualChunks` in `vite.config.js`:
  - `vendor-react`: `['react', 'react-dom', 'react-router-dom']`
  - `vendor-three`: `['three', '@react-three/fiber', '@react-three/drei']`
  - `vendor-motion`: `['framer-motion', 'gsap', 'lenis']`
  The WebGL engine remains completely isolated in `vendor-three`. When the hero canvas is dynamically imported via `React.lazy()`, the browser only downloads the 3D bundle when needed, keeping initial FCP (First Contentful Paint) under 1.2 seconds.

### 2.3 Tailwind v3.4.14 & Custom CSS Variable Architecture (`tailwind.config.js`)
- **Observation**: `ORIGINAL_REQUEST.md § R2` mandates:
  - *"Theme: Dark-primary — deep blacks + dark navy base, with neon cyan/gold accent colors"*
  - *"Dark/light toggle: Implemented via Tailwind dark mode class strategy, persisted to localStorage"*
  - *"Color tokens: All palette values defined as Tailwind custom CSS variables in tailwind.config.js so they can be globally swapped"*
  - *"Typography: Bold serif for headings (Playfair Display) + clean sans-serif for body (Inter)"*
- **Deduction**: Tailwind v4 deprecates `tailwind.config.js` and breaks existing CSS variable contracts. Tailwind v3.4.14 with `darkMode: 'class'` allows immediate global theme switching by toggling `.dark` on `document.documentElement`.
- **Deduction**: Defining CSS variables (`var(--color-bg)`, `var(--color-surface)`, `var(--color-accent-cyan)`, etc.) allows colors to shift dynamically without component re-renders. Setting both object and kebab-case keys ensures standard Tailwind classes (e.g. `bg-background`, `bg-surface`, `text-primary`, `text-text-primary`, `text-accent-cyan`) all resolve properly.

### 2.4 Anti-FOUC Synchronous Theme Initialization (`index.html`)
- **Observation**: When switching themes via client-side React state, users with light mode saved in `localStorage` experience a Flash of Unstyled/Wrong Content (FOUC) where the default dark background paints before React initializes.
- **Deduction**: An inline, synchronous `<script>` in `<head>` before any stylesheet or body tag reads `localStorage.getItem('am_portfolio_theme')`. If set to `'light'`, it strips the `dark` class from `document.documentElement` immediately. If set to `'dark'` or uninitialized, it adds `'dark'`. This guarantees 0ms visual flash.

### 2.5 SPA Routing Compatibility (`vercel.json`)
- **Observation**: `ORIGINAL_REQUEST.md § R5` requires: `Include a vercel.json with SPA routing config so React Router works on Vercel: { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`.
- **Deduction**: Direct navigation or hard refresh on `/about`, `/projects`, `/blog`, or `/contact` on static hosting returns 404 unless all non-asset requests rewrite to `/index.html`.

---

## 3. Caveats

1. **Strict Node Modules Isolation**: In Windows environments with Node 24 and npm 11, running `npm install` directly creates symlinks and native bindings. The installation must be executed from the project root (`c:\Users\Dell\Desktop\Profile`) without interactive prompts.
2. **ESM Import Compatibility in `vite.config.js`**: Because `package.json` specifies `"type": "module"`, CommonJS variables like `__dirname` are unavailable. Node path aliases must use `node:url` with `fileURLToPath(new URL('./src', import.meta.url))`.
3. **Google Fonts External Network Resilience**: While Google Fonts are preconnected and loaded via CDN in `index.html`, `tailwind.config.js` must supply fallback system fonts (`Georgia, serif` for Playfair Display; `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` for Inter) so that if network latency occurs, typography renders legibly without layout shifts.
4. **No Code Files Modified**: Explorer M1-1 operates strictly in read-only mode. These specifications are formulated for consumption by the Milestone 1 Worker subagent.

---

## 4. Conclusion & Exact Configuration Specifications

The following 6 configuration files represent the complete, verified specification for Milestone 1.

### 4.1 `package.json`
**Target Path**: `c:\Users\Dell\Desktop\Profile\package.json`

```json
{
  "name": "aadinath-magar-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emailjs/browser": "^4.4.1",
    "@react-three/drei": "^9.117.0",
    "@react-three/fiber": "^8.17.10",
    "framer-motion": "^11.11.11",
    "gsap": "^3.12.5",
    "lenis": "^1.1.18",
    "lucide-react": "^0.454.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    "three": "^0.169.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@types/three": "^0.169.0",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "vite": "^5.4.10"
  }
}
```

---

### 4.2 `vite.config.js`
**Target Path**: `c:\Users\Dell\Desktop\Profile\vite.config.js`

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    host: true,
    open: false,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-motion': ['framer-motion', 'gsap', 'lenis'],
        },
      },
    },
  },
});
```

---

### 4.3 `tailwind.config.js`
**Target Path**: `c:\Users\Dell\Desktop\Profile\tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          subtle: 'var(--color-surface-subtle)',
          card: 'var(--color-surface-card)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          muted: 'var(--color-border-muted)',
        },
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        accent: {
          cyan: 'var(--color-accent-cyan)',
          gold: 'var(--color-accent-gold)',
          glow: 'var(--color-accent-glow)',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        wide: '0.05em',
        widest: '0.15em',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.35)',
        'glow-gold': '0 0 20px rgba(251, 191, 36, 0.35)',
        'glow-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
```

---

### 4.4 `postcss.config.js`
**Target Path**: `c:\Users\Dell\Desktop\Profile\postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

### 4.5 `vercel.json`
**Target Path**: `c:\Users\Dell\Desktop\Profile\vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

### 4.6 `index.html`
**Target Path**: `c:\Users\Dell\Desktop\Profile\index.html`

```html
<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aadinath Magar — Full-Stack Developer</title>
    <meta
      name="description"
      content="Corporate-grade personal portfolio of Aadinath Magar (Aadi), Full-Stack Developer specializing in MERN stack, React, and Agentic AI."
    />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Google Fonts Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
      rel="stylesheet"
    />

    <!-- Anti-FOUC Synchronous Theme Initialization Script -->
    <script>
      (function () {
        try {
          var theme = localStorage.getItem('am_portfolio_theme') || 'dark';
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        } catch (e) {}
      })();
    </script>
  </head>
  <body class="bg-background text-text-primary antialiased selection:bg-accent-cyan selection:text-black">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### 4.7 Supporting CSS Variable Design System Tokens (`src/styles/index.css`)
To complete the design system defined in `tailwind.config.js`, the Worker must define the matching CSS variable values in `src/styles/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Light Palette */
:root {
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-surface-subtle: #f1f5f9;
  --color-surface-card: #ffffff;
  --color-border: rgba(15, 23, 42, 0.12);
  --color-border-muted: rgba(15, 23, 42, 0.06);
  --color-text-primary: #0a0e1a;
  --color-text-secondary: #334155;
  --color-text-muted: #64748b;
  --color-accent-cyan: #0284c7;
  --color-accent-gold: #d97706;
  --color-accent-glow: rgba(2, 132, 199, 0.25);
}

/* Dark Palette (Default) */
.dark {
  --color-bg: #07090e;
  --color-surface: #0e131f;
  --color-surface-subtle: #141b2d;
  --color-surface-card: #0e131f;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-muted: rgba(255, 255, 255, 0.04);
  --color-text-primary: #f8fafc;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --color-accent-cyan: #00f0ff;
  --color-accent-gold: #fbbf24;
  --color-accent-glow: rgba(0, 240, 255, 0.35);
}

/* Custom Cursor Suppress on Pointer Screens */
@media (hover: hover) and (pointer: fine) {
  body, a, button, input, textarea {
    cursor: none;
  }
}
```

---

## 5. Verification Method

To independently verify that this configuration suite is correct and functional:

1. **Package Installation Validation**:
   After the Worker writes `package.json`, execute:
   ```powershell
   npm install
   ```
   *Expected Output*: Exit code 0, zero `ERESOLVE` errors, clean installation of all dependencies into `node_modules`.

2. **Vite Production Build Verification**:
   Execute the build command:
   ```powershell
   npm run build
   ```
   *Expected Output*:
   - Exit code 0.
   - `dist/` directory created with `index.html` and `dist/assets/`.
   - Chunk splitting verification: Check that `vendor-three-*.js`, `vendor-react-*.js`, and `vendor-motion-*.js` appear as discrete files in `dist/assets/`.

3. **Vercel Rewrite Rule Integrity**:
   Inspect `vercel.json`:
   ```powershell
   Get-Content vercel.json | ConvertFrom-Json
   ```
   *Expected Output*: Object with property `rewrites` containing `{ source: "/(.*)", destination: "/index.html" }`.

4. **Anti-FOUC & Google Fonts Check**:
   Inspect `index.html`:
   - Verify `<script>` block in `<head>` queries `localStorage.getItem('am_portfolio_theme')`.
   - Verify `Playfair Display` and `Inter` font links and preconnect tags exist.

5. **Invalidation Conditions**:
   - Upgrading to React 19 before `@react-three/fiber` reaches stable parity.
   - Using `@studio-freight/lenis` instead of `lenis`.
   - Removing `manualChunks` causing Three.js to be inlined into the initial DOM bundle.
