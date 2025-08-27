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

## 🎬 Live Demo

### 📽️ Application Walkthrough
<div align="center">

https://github.com/user-attachments/assets/af9a1fcf-5fc1-48d0-9d62-d89cda460946

<br><em>🚀 Complete application demo showcasing responsive design, filtering capabilities, and user management features</em>
</div>

---

## 📸 Application Screenshots

### 🏠 Home View & User Directory
<div align="center">
<img width="600" alt="Home View Desktop" src="https://github.com/user-attachments/assets/61518d79-f726-4f4b-901b-2173e02dfe8f" />
<br><em>Desktop - Home view with user directory and filtering</em>
</div>

### 🔍 Explore View & User Listings
<div align="center">
<img width="600" alt="Explore View Desktop" src="https://github.com/user-attachments/assets/dcad5664-841d-477e-9202-cfc1d40b8b2c" />
<br><em>Desktop - Explore view with advanced user browsing</em>
</div>

### ⭐ Favorites View
<div align="center">
<img width="600" alt="Favorites View Desktop" src="https://github.com/user-attachments/assets/12442d56-fc1f-4a42-89c4-0787e15789ff" />
<br><em>Desktop - Favorites management with filtering options</em>
</div>

### 👤 User Profile View
<div align="center">
<img width="600" alt="User Profile Desktop" src="https://github.com/user-attachments/assets/4c77ed46-9183-4a92-ad10-3d72cbd65551" />
<br><em>Desktop - Individual user profile with detailed information</em>
</div>

### 🎛️ Filter Components
<div align="center">
<img width="600" alt="Country Filter Component" src="https://github.com/user-attachments/assets/65dc213f-1f0a-489e-ac99-eeb2fd772762" />
<br><em>Desktop - Country picker component with statistics</em>
</div>

<div align="center">
<img width="600" alt="Gender Filter Component" src="https://github.com/user-attachments/assets/ba8b715e-9515-4bcb-9fe6-249395c88cac" />
<br><em>Desktop - Gender filter component interface</em>
</div>

### 💬 Chat View
<div align="center">
<img width="600" alt="Chat View Desktop" src="https://github.com/user-attachments/assets/ace902b9-d9ab-4a51-8519-6ab9e7ba9d97" />
<br><em>Desktop - Chat interface and messaging view</em>
</div>

---

## 📱 Mobile Responsive Views

### 🏠 Mobile Home & Navigation
<div align="center">
<img width="300" alt="Mobile Home View" src="https://github.com/user-attachments/assets/7324ce82-9c93-449d-ae85-6294d0c13abd" />
<br><em>Mobile - Home view with responsive navigation</em>
</div>

### 👥 Mobile User Management
<div align="center">
<img width="300" alt="Mobile User List" src="https://github.com/user-attachments/assets/49405362-de04-429a-adbd-4df4023c2f90" />
<img width="300" alt="Mobile User Cards" src="https://github.com/user-attachments/assets/f9866e89-0fe0-40bf-a4a9-e746383da66d" />
<br><em>Mobile - User list and card components</em>
</div>

### 📱 Mobile Navigation Components
<div align="center">
<img width="300" alt="Mobile Navigation Bar" src="https://github.com/user-attachments/assets/330a6bf6-2442-4789-94f8-3c638d4a9737" />
<img width="300" alt="Mobile Menu" src="https://github.com/user-attachments/assets/7aaec652-3e2c-46af-8036-10785bec5e6d" />
<br><em>Mobile - Bottom navigation and menu interface</em>
</div>

### ⭐ Mobile Favorites
<div align="center">
<img width="300" alt="Mobile Favorites View" src="https://github.com/user-attachments/assets/791ea48d-25fd-4ab7-a872-e5cdfa642284" />
<img width="300" alt="Mobile Favorites Management" src="https://github.com/user-attachments/assets/41a95791-58bc-43da-b522-667208c0a12b" />
<br><em>Mobile - Favorites view and management interface</em>
</div>

### 🎛️ Mobile Filter Interface
<div align="center">
<img width="300" alt="Mobile Filters" src="https://github.com/user-attachments/assets/94bf9caf-189b-442a-a6f0-6b308ac781ec" />
<br><em>Mobile - Filter components optimized for touch</em>
</div>

---

## 📱 Tablet Responsive Views

### 🖥️ Tablet Layout Adaptation
<div align="center">
<img width="500" alt="Tablet Home View" src="https://github.com/user-attachments/assets/a7b9f0e0-ae68-43b8-9155-4ac892aecdc3" />
<br><em>Tablet - Home view with adapted layout</em>
</div>

<div align="center">
<img width="500" alt="Tablet User Management" src="https://github.com/user-attachments/assets/a97641e0-c0f3-4fad-8b0e-1c538a1b1d64" />
<br><em>Tablet - User management interface</em>
</div>

### 🎨 Additional Mobile Interface
<div align="center">
<img width="300" alt="Mobile User Interface Detail" src="https://github.com/user-attachments/assets/4803763e-10b1-4405-88fd-7ef8a09b4b2b" />
<br><em>Mobile - Detailed user interface components</em>
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


