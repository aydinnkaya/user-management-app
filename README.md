<div align="center">
  <img src="public/spl-logo.png" 
       alt="Superlive Logo" 
       width="120" 
       style="border-radius: 20px; box-shadow: 0 10px 28px rgba(0,0,0,0.15);" />
  
  <h1>👥 User Management App</h1>
  <p><em>🚀 Modern Vue 3 + TypeScript application for exploring and managing user profiles</em></p>
  
  <p>
    <img src="https://img.shields.io/badge/Status-Production%20Ready-4CAF50?style=for-the-badge&logo=vercel&logoColor=white&labelColor=000" />
    <img src="https://img.shields.io/badge/Framework-Vue%203.5.x-42B883?style=for-the-badge&logo=vue.js&logoColor=white" />
    <img src="https://img.shields.io/badge/Build-Vite%207-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  </p>

  <p>
    <img src="https://img.shields.io/badge/Language-TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/State-Pinia%203-FFDD00?style=for-the-badge&logo=pinia&logoColor=black" />
    <img src="https://img.shields.io/badge/Router-Vue%20Router%204-35495E?style=for-the-badge&logo=vue.js&logoColor=white" />
    <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS%204-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  </p>
</div>

---
## ✨ Features

- 📖 **User directory** with country & gender filters  
- ⭐ **Favorites system** persisted in `localStorage`  
- 📱 **Responsive UI** (mobile nav bar & desktop header)  
- ⚡ **Lazy-loaded routes/views** for performance  
- 🎨 **Heroicons integration** for accessible icons  
- 🔒 **Type-safe state** with Pinia + TypeScript  
- 🚀 **Vite + Vue Devtools** for fast developer experience  
- ✅ **Prettier + ESLint** for consistent code style  

---

## 🧱 Tech Stack

| Category | Tools |
|----------|-------|
| **Framework** | Vue 3.5.x + Vite 7 |
| **Language** | TypeScript 5.x |
| **State** | Pinia 3.x |
| **Router** | Vue Router 4.5.x |
| **Styling** | Tailwind CSS 4.x (+ plugins: forms, typography, line-clamp, aspect-ratio) |
| **Icons** | @heroicons/vue |
| **Tooling** | ESLint 9, Prettier 3, Vue Devtools |
| **Build** | PostCSS / Autoprefixer |

---

## 📁 Project Structure

```plaintext
user-management-app-3/
├─ public/
│  └─ spl-logo.png
├─ src/
│  ├─ assets/
│  │  ├─ nav-logo/
│  │  ├─ base.css
│  │  └─ main.css
│  ├─ components/
│  │  ├─ CountryPicker.vue
│  │  ├─ GenderFilter.vue
│  │  ├─ NavBar.vue
│  │  ├─ UserCard.vue
│  │  └─ UserList.vue
│  ├─ composables/
│  │  └─ useUsers.ts
│  ├─ lib/
│  │  └─ flags.ts
│  ├─ router/
│  │  └─ index.ts
│  ├─ stores/
│  │  └─ useUserStore.ts
│  ├─ types/
│  │  └─ User.ts
│  ├─ views/
│  │  ├─ ChatsView.vue
│  │  ├─ ExploreView.vue
│  │  ├─ FavoritesView.vue
│  │  ├─ HomeView.vue
│  │  ├─ ProfileView.vue
│  │  └─ UserView.vue
│  ├─ App.vue
│  ├─ main.ts
│  └─ vite-env.d.ts
├─ index.html
├─ package.json
├─ package-lock.json
├─ .eslintrc.*
├─ .prettierrc.json
└─ tsconfig.json
```

---

## 📸 Screenshots

<div align="center">

### Desktop Views
<img src="https://github.com/user-attachments/assets/e4488489-a2e4-47cb-8a25-208fb5eb24a5" alt="Home View" width="600" />

<img src="https://github.com/user-attachments/assets/17a6702f-532c-44cc-838d-1894c57a2b2a" alt="User Profile" width="600" />
<img width="1466" height="917" alt="Screenshot 2025-08-27 at 01 07 00" src="https://github.com/user-attachments/assets/50dba6fb-97f3-4f02-ae74-988964ae2484" /><img width="1466" height="917" alt="Screenshot 2025-08-27 at 01 06 49" src="https://github.com/user-attachments/assets/664a15cb-1a44-4a78-8c57-98684c803257" />
<img width="1466" height="917" alt="Screenshot 2025-08-27 at 00 45 30" src="https://github.com/user-attachments/assets/c48a3896-dcb3-4e75-a075-ad77cb82666c" />
<img width="1466" height="920" alt="Screenshot 2025-08-27 at 00 45 16" src="https://github.com/user-attachments/assets/61518d79-f726-4f4b-901b-2173e02dfe8f" />



### User Management
<img src="https://github.com/user-attachments/assets/21217e13-e98a-49c7-baef-9a5f9359c105" alt="User Directory" width="600" />

<img src="https://github.com/user-attachments/assets/9e87deb5-4dee-46db-b2eb-22f22ee51012" alt="Favorites View" width="600" />

### Responsive Design
<img src="https://github.com/user-attachments/assets/330a6bf6-2442-4789-94f8-3c638d4a9737" alt="Mobile Navigation" width="400" />
<img src="https://github.com/user-attachments/assets/4803763e-10b1-4405-88fd-7ef8a09b4b2b" alt="Mobile User List" width="400" />

</div>

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 20 or 22
- **Package manager**: npm (or pnpm / yarn)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd user-management-app-3

# Install dependencies (deterministic)
npm ci
# or: pnpm i --frozen-lockfile
# or: yarn install --immutable
```

### Development

```bash
npm run dev
```

Vite will typically serve at `http://localhost:5173`

### Type Check, Lint & Format

```bash
npm run typecheck   # vue-tsc
npm run lint        # eslint
npm run format      # prettier
```

### Build & Preview

```bash
npm run build       # production build
npm run preview     # local production server
```

---

## 🔧 Configuration Notes

### Tailwind CSS (v4)
- **Plugins**: @tailwindcss/forms, @tailwindcss/typography, @tailwindcss/line-clamp, @tailwindcss/aspect-ratio
- **Global styles**: `src/assets/*.css`
- Dark-theme focused application with utility-first classes used extensively in components

### Routing

**Routes defined in `src/router/index.ts`:**
- `/` → HomeView
- `/favorites` → FavoritesView
- `/explore` → ExploreView
- `/chats` → ChatsView
- `/profile` → ProfileView
- `/user/:id` → UserView (detail)

### State Management (Pinia)

**`src/stores/useUserStore.ts` manages:**
- `users`, `selectedUser`, `favoriteUsers`
- Filters: `countryFilter`, `genderFilter`
- Derived lists & statistics
- localStorage persistence

### Data Fetching

`src/composables/useUsers.ts` handles user data fetching and normalization.
(Can be easily replaced with real API integration in the future.)

### Icons (Heroicons)

```typescript
import { HeartIcon as HeartSolid } from '@heroicons/vue/24/solid'
import { HeartIcon as HeartOutline } from '@heroicons/vue/24/outline'
```

### Assets
- **Static files**: `public/` (e.g., `public/spl-logo.png`)
- **Country flags helper**: `src/lib/flags.ts`

---

## 🛟 Troubleshooting

- **Blank page / 404 on refresh** → Ensure your host has SPA history fallback to `index.html`
- **Missing styles** → Verify `src/assets/main.css` is imported in `main.ts`
- **Missing icons** → Check if `@heroicons/vue` is installed and import paths use `/24/solid` or `/24/outline`
- **Cross-machine inconsistencies** → Commit lockfiles and use `npm ci` for installation

---

<div align="center">
  <p>Made with ❤️ using Vue 3 + TypeScript</p>
</div>
