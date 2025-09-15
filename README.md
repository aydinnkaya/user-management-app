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
- ♾️ **Infinite Scroll** with Intersection Observer
- ⭐ **Favorites system** persisted in `localStorage`  
- 📱 **Responsive UI** (mobile nav bar & desktop header)  
- ⚡ **Lazy-loaded routes/views** for performance  
- 🧩 **SVG Sprite + BaseIcon:** centralized, fast, color-inheriting icons  
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
| **Icons**  | vite-plugin-svg-icons + custom SVG sprite + BaseIcon 
| **Tooling** | ESLint 9, Prettier 3, Vue Devtools |
| **Build** | PostCSS / Autoprefixer |

---

## 📁 Project Structure

```plaintext
user-management-app/
├─ public/
│  └─ spl-logo.png
├─ src/
│  ├─ assets/
│  │  └─ icons/                 # raw SVGs for sprite (dropdown_arrow.svg, favorite_heart.svg, ...)
│  ├─ components/
│  │  ├─ BaseIcon.vue           # <BaseIcon name="..." size="..." class="..." />
│  │  ├─ ConfirmDialog.vue      # reusable modal (teleport + transition)
│  │  ├─ CountryPickers.vue     # multi-select country control with flags & counts
│  │  ├─ EmptyState.vue
│  │  ├─ FavoriteButton.vue
│  │  ├─ genderFilter.vue
│  │  ├─ NavBar.vue
│  │  ├─ UserCard.vue
│  │  └─ UserList.vue
│  ├─ composables/
│  │  ├─ useInfiniteScroll.ts
│  │  └─ useUsers.ts
│  ├─ i18n/
│  │  └─ index.ts
│  ├─ lib/
│  │  ├─ countries.ts           # country list with iso2 + name + flag
│  │  ├─ flags.ts               # helpers for flags
│  │  └─ genders.ts
│  ├─ locales/
│  │  ├─ en.json
│  │  └─ tr.json
│  ├─ models/
│  │  └─ User.ts
│  ├─ router/
│  │  └─ index.ts
│  ├─ stores/
│  │  ├─ favoritesStore.ts
│  │  ├─ filterStore.ts
│  │  ├─ selectedUserStore.ts
│  │  └─ userStore.ts
│  ├─ types
│  ├─ utils/
│  │  ├─ globalSetup.ts
│  │  └─ storage.ts
│  ├─ views/
│  │  ├─ ChatsView.vue
│  │  ├─ ExploreView.vue
│  │  ├─ FavoritesView.vue
│  │  ├─ HomeView.vue
│  │  ├─ ProfileView.vue
│  │  └─ UserView.vue
│  ├─ App.vue
│  └─ main.ts
├─ index.html
├─ package.json
├─ tailwind.config.ts
├─ tsconfig.json
└─ vite.config.ts
```

---

## 🎬 Live Demo

### 📽️ Application Walkthrough
<div align="center">



[https://github.com/user-attachments/assets/af9a1fcf-5fc1-48d0-9d62-d89cda460946
](https://drive.google.com/file/d/1Ozy8p2LHM8WnaPJuf3mk7DX04F6ilsKJ/view?usp=sharing)

<br><em>🚀 Complete application demo showcasing responsive design, filtering capabilities, and user management features</em>
</div>

---

## 📸 Application Screenshots

### 🏠 Home View & User Directory
<div align="center">
<img width="1438" height="799" alt="Home View Desktop" src="https://github.com/user-attachments/assets/1f52a7f2-8cd0-481f-92ef-a635d0b6d228" />
<br><em>Desktop - Home view with user directory and filtering</em>
</div>


### ⭐ Favorites View!
<div align="center">
<img width="1438" height="799" alt="Favorites View Desktop"src="https://github.com/user-attachments/assets/64f0868d-4021-48b6-accf-90db1656c9b0" />
<br><em>Desktop - Favorites management with filtering options</em>
</div>

### 🔍 Explore View & User Listings
<div align="center">
<img width="1438" height="799" alt="Screenshot 2025-09-15 at 17 56 26" src="https://github.com/user-attachments/assets/bb6da931-e971-452c-be69-aec180eaafb1" /><br><em>Desktop - Explore view with advanced user browsing</em>
</div>

### 💬 Chat View
<div align="center">
<img width="1438" height="799" alt="Screenshot 2025-09-15 at 17 57 34" src="https://github.com/user-attachments/assets/ef27e65f-ea07-48f9-8586-6a1eafd0497f" /><br><em>Desktop - Chat interface and messaging view</em>
</div>

### 👤 User Profile View
<div align="center">
<img width="1438" height="799" alt="Screenshot 2025-09-15 at 17 53 21" src="https://github.com/user-attachments/assets/b7c2bc4c-0f50-4469-aa76-557c524e3cbf" />
<br><em>Desktop - Individual user profile with detailed information</em>
</div>

### 🎛️ Filter Components
<div align="center">
<img width="1438" height="799" alt="Screenshot 2025-09-15 at 17 58 17" src="https://github.com/user-attachments/assets/0c012cda-1db5-4d7b-a6fa-895563c132b1" />
<br><em>Desktop - Country picker component with statistics</em>
</div>

### 👤 Other Profile View
<div align="center">
<img width="1438" height="891" alt="Screenshot 2025-09-15 at 17 59 13" src="https://github.com/user-attachments/assets/bd1f77d4-42d9-43f7-92a7-4200ad8d7be1" />
<br><em>Desktop - Individual user profile with detailed information</em>
</div>


---

## 📱 Mobile Responsive Views

### 🏠 Mobile Home & Navigation
<div align="center">
<img width="1438" height="891" alt="Mobile Home View" src="https://github.com/user-attachments/assets/7324ce82-9c93-449d-ae85-6294d0c13abd" />
<br><em>Mobile - Home view with responsive navigation</em>
</div>

### 👥 Mobile User Management
<div align="center">
<img width="1438" height="891" alt="Mobile User List" src="https://github.com/user-attachments/assets/49405362-de04-429a-adbd-4df4023c2f90" />
<img width="1438" height="891" alt="Mobile User Cards" src="https://github.com/user-attachments/assets/f9866e89-0fe0-40bf-a4a9-e746383da66d" />
<br><em>Mobile - User list and card components</em>
</div>

### 📱 Mobile Navigation Components
<div align="center">
<img width="1438" height="891" alt="Mobile Navigation Bar" src="https://github.com/user-attachments/assets/330a6bf6-2442-4789-94f8-3c638d4a9737" />
<img width="1438" height="891" alt="Mobile Menu" src="https://github.com/user-attachments/assets/7aaec652-3e2c-46af-8036-10785bec5e6d" />
<br><em>Mobile - Bottom navigation and menu interface</em>
</div>

### ⭐ Mobile Favorites
<div align="center">
<img width="1438"  height="891" alt="Mobile Favorites View" src="https://github.com/user-attachments/assets/791ea48d-25fd-4ab7-a872-e5cdfa642284" />
<img width="1438"  height="891" alt="Mobile Favorites Management" src="https://github.com/user-attachments/assets/41a95791-58bc-43da-b522-667208c0a12b" />
<br><em>Mobile - Favorites view and management interface</em>
</div>

### 🎛️ Mobile Filter Interface
<div align="center">
<img width="1438" height="891" alt="Mobile Filters" src="https://github.com/user-attachments/assets/94bf9caf-189b-442a-a6f0-6b308ac781ec" />
<br><em>Mobile - Filter components optimized for touch</em>
</div>

---

## 📱 Tablet Responsive Views

### 🖥️ Tablet Layout Adaptation
<div align="center">
<img width="1438"  height="891" alt="Tablet Home View" src="https://github.com/user-attachments/assets/a7b9f0e0-ae68-43b8-9155-4ac892aecdc3" />
<br><em>Tablet - Home view with adapted layout</em>
</div>

<div align="center">
<img width="1438"  height="891" alt="Tablet User Management" src="https://github.com/user-attachments/assets/a97641e0-c0f3-4fad-8b0e-1c538a1b1d64" />
<br><em>Tablet - User management interface</em>
</div>

### 🎨 Additional Mobile Interface
<div align="center">
<img width="1438"  height="891" alt="Mobile User Interface Detail" src="https://github.com/user-attachments/assets/4803763e-10b1-4405-88fd-7ef8a09b4b2b" />
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

**`src/stores/userStore.ts` manages:**

- `users`, `selectedUser`, `favoriteUsers`
- Filters: `countryFilter`, `genderFilter`
- **Pagination state for infinite scroll** (`currentPage`, `hasMore`, `isLoading`)
- Derived lists & statistics
- `localStorage` persistence

---

### Data Fetching & Infinite Scroll

- **`src/composables/useUsers.ts`**  
  Handles user data fetching and normalization.

- **`src/composables/useInfiniteScroll.ts`**  
  Encapsulates scroll observer logic and triggers additional user fetches when the sentinel element is visible.  
  Reusable and easily extendable for other lists.


### Assets

- **Static files:** Located in `public/` (e.g., `public/spl-logo.png`)
- **Country flags helper:** `src/lib/flags.ts`

---

## 🛟 Troubleshooting

- **Blank page / 404 on refresh**  
  Ensure your hosting environment is configured with SPA history fallback to `index.html`.

- **Missing styles**  
  Verify that `src/assets/main.css` is imported in `main.ts`.

- **Missing icons**  
  Check that `@heroicons/vue` is installed and import paths correctly use `/24/solid` or `/24/outline`.

- **Infinite scroll does not trigger**  
  Ensure the sentinel `<div ref="loadMoreRef">` is present in `UserList.vue` and that `useInfiniteScroll` composable is initialized.  
  Also confirm that your browser supports [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

- **Cross-machine inconsistencies**  
  Commit lockfiles and use `npm ci` (or `pnpm i --frozen-lockfile` / `yarn install --immutable`) for deterministic installs. 
