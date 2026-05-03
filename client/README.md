# 🏠 Homes — React Starter Project

A production-ready React starter pre-configured with:

| Package | Version | Purpose |
|--------|---------|---------|
| React 19 | latest | UI framework |
| Vite 8 | latest | Build tool & dev server |
| Tailwind CSS v4 | latest | Utility-first CSS |
| lucide-react | latest | Beautiful SVG icons |
| react-icons | latest | 1000s of icon packs (FA, MD, AI, etc.) |
| react-router-dom | latest | Client-side routing |
| framer-motion | latest | Animations & transitions |
| clsx | latest | Conditional classNames utility |

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

---

## 🗂 Project Structure

```
Homes/
├── src/
│   ├── App.jsx        ← Main app component (starter UI)
│   ├── main.jsx       ← React entry point
│   └── index.css      ← Tailwind imports + global styles
├── public/
├── vite.config.js     ← Vite + Tailwind v4 config
└── package.json
```

---

## 💡 Usage Examples

**Tailwind CSS**
```jsx
<div className="bg-blue-600 text-white rounded-xl p-4 hover:bg-blue-700">
  Hello!
</div>
```

**lucide-react**
```jsx
import { Home, Search, Heart } from 'lucide-react'
<Home size={24} className="text-blue-600" />
```

**react-icons**
```jsx
import { FaFacebook, FaTwitter } from 'react-icons/fa'
import { MdHome } from 'react-icons/md'
<FaFacebook className="text-blue-500" />
```

**framer-motion**
```jsx
import { motion } from 'framer-motion'
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  Animated!
</motion.div>
```

**react-router-dom**
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
```

**clsx**
```jsx
import clsx from 'clsx'
<div className={clsx('p-4', isActive && 'bg-blue-600', 'rounded-lg')}>
```
