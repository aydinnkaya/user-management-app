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

<a href="https://drive.google.com/file/d/1Ozy8p2LHM8WnaPJuf3mk7DX04F6ilsKJ/view?usp=sharing" target="_blank">
  <img src="https://img.shields.io/badge/▶️%20WATCH%20DEMO-4285F4?style=for-the-badge&logo=google-drive&logoColor=white&labelColor=0A0A0A&color=34A853" 
       alt="Watch Demo" 
       width="350"
       style="border-radius:12px; box-shadow:0px 4px 14px rgba(0,0,0,0.25);" />
</a>

<br><em>🚀 Complete application demo showcasing responsive design, filtering capabilities, and user management features</em>
</div>

---

## 📸 Application Screenshots

### 🏠 Home View & User Directory
<div align="center">
<img width="900" height="799" alt="Home View Desktop" src="https://github.com/user-attachments/assets/1f52a7f2-8cd0-481f-92ef-a635d0b6d228" />
<br><em>Desktop - Home view with user directory and filtering</em>
</div>


### ⭐ Favorites View!
<div align="center">
<img width="900" height="799" alt="Favorites View Desktop"src="https://github.com/user-attachments/assets/64f0868d-4021-48b6-accf-90db1656c9b0" />
<br><em>Desktop - Favorites management with filtering options</em>
</div>

### 🔍 Explore View & User Listings
<div align="center">
<img width="900" height="799" alt="Screenshot 2025-09-15 at 17 56 26" src="https://github.com/user-attachments/assets/bb6da931-e971-452c-be69-aec180eaafb1" /><br><em>Desktop - Explore view with advanced user browsing</em>
</div>

### 💬 Chat View
<div align="center">
<img width="900" height="799" alt="Screenshot 2025-09-15 at 17 57 34" src="https://github.com/user-attachments/assets/ef27e65f-ea07-48f9-8586-6a1eafd0497f" /><br><em>Desktop - Chat interface and messaging view</em>
</div>

### 👤 User Profile View
<div align="center">
<img width="900" height="799" alt="Screenshot 2025-09-15 at 17 53 21" src="https://github.com/user-attachments/assets/b7c2bc4c-0f50-4469-aa76-557c524e3cbf" />
<br><em>Desktop - Individual user profile with detailed information</em>
</div>

### 🎛️ Filter Components
<div align="center">
<img width="900" height="799" alt="Screenshot 2025-09-15 at 17 58 17" src="https://github.com/user-attachments/assets/0c012cda-1db5-4d7b-a6fa-895563c132b1" />
<br><em>Desktop - Country picker component with statistics</em>
</div>

### 👤 Other Profile View
<div align="center">
<img width="900" height="891" alt="Screenshot 2025-09-15 at 17 59 13" src="https://github.com/user-attachments/assets/bd1f77d4-42d9-43f7-92a7-4200ad8d7be1" />
<br><em>Desktop - Individual user profile with detailed information</em>
</div>


---

## 📱 Mobile Responsive Views

### 🏠 Mobile Home & Favorites
<div align="center">
  <table>
    <tr>
      <td>
        <img width="900" alt="Mobile Home View" src="https://github.com/user-attachments/assets/92c0eca5-7e99-4f9e-9726-9fb53b0f925d" />
      </td>
      <td>
        <img width="900" alt="Mobile User List" src="https://github.com/user-attachments/assets/2d2068eb-cd52-4fe5-8651-ddb87595ce57" />
      </td>
    </tr>
    <tr>
      <td colspan="2" align="center"><em>Mobile - Home and Favorites views with responsive navigation and management interface</em></td>
    </tr>
  </table>
</div>

### 🎛️ Mobile Filter Interfaces
<div align="center">
  <table>
    <tr>
      <td>
        <img width="900" alt="Mobile Filters 1" src="https://github.com/user-attachments/assets/b3fa834b-0598-4042-8d75-9d9aa01fc02d" />
      </td>
      <td>
        <img width="900" alt="Mobile Filters 2" src="https://github.com/user-attachments/assets/090ee861-e7ae-4d35-948e-6ec918bc0cb9" />
      </td>
    </tr>
    <tr>
      <td colspan="2" align="center"><em>Mobile - Filter components optimized for touch</em></td>
    </tr>
  </table>
</div>

---

## 📱 Tablet Responsive Views

### 🖥️ Tablet Layout Adaptations
<div align="center">
  <table>
    <tr>
      <td>
        <img width="900" alt="Tablet Home View" src="https://github.com/user-attachments/assets/ebbf476d-5274-43ef-adc8-3ef492d2be66" />
      </td>
      <td>
        <img width="900" alt="Tablet User Management" src="https://github.com/user-attachments/assets/17856804-ae3c-45fc-a646-a9fa58d7078a" />
      </td>
    </tr>
    <tr>
      <td colspan="2" align="center"><em>Tablet - Home and User Management views</em></td>
    </tr>
  </table>
</div>

### 🗂️ Module Visualization
<div align="center">
<img width="900"  height="891" alt="Mobile User Interface Detail" src="https://github.com/user-attachments/assets/0f36cf0f-2153-4907-a5bb-aa06aded7297" />
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
