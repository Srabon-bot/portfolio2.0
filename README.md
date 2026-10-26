# BazarDor (বাজার দর) 🛒

A modern, responsive commodity and grocery price tracking web application for Bangladesh. BazarDor provides consumers with transparent insights into daily market prices, tracking day-to-day rate fluctuations, category-wise breakdowns, and market-by-market comparisons across multiple divisions.

---

## 🌐 Live Demo & Repository

- **Live Application:** [https://assignment-7-kw2m.vercel.app](https://assignment-7-kw2m.vercel.app/)
- **GitHub Repository:** [https://github.com/Srabon-bot/Assignment-7](https://github.com/Srabon-bot/Assignment-7)

---

## 📖 Project Overview

**BazarDor (বাজার দর)** is designed to empower everyday consumers by making grocery price trends accessible and intuitive. The application surfaces essential commodity insights, highlighting items experiencing the highest price increases and steepest drops. Authenticated users can access comprehensive product breakdowns, comparing live rates across various wholesale and retail markets throughout Bangladesh.

---

## 📸 Screenshots

### 🏠 Home Page
Live price marquee, Bangla calendar date, category navigation, and the daily price risers section.

![Home Page](./home.png)

### 🍚 Category Page
Category-wise product listing with numeric sorting (Default, Low to High, High to Low).

![Category Page](./category.png)

### 🔐 Sign In
Email/password authentication with Google and GitHub OAuth options.

![Sign In Page](./signin.png)

### 📊 Product Details (Protected Route)
Minimum, maximum, and average price summary with a market-wise comparison table.

![Product Details Page](./product-details.png)

---

## 🚀 Key Features

1. **Real-time Price Marquee & Live Bangla Calendar Date:**
   - Continuous price ticker displaying essential commodity rates, units, and fluctuation badges.
   - Dynamic Bangla calendar date formatted natively based on Bangladesh Standard Time.

2. **Daily Price Risers & Fallers Breakdown:**
   - **আজ দাম বেড়েছে ▲:** Dedicated top 6 commodity risers highlighting daily rate increases.
   - **আজ দাম কমেছে ▼:** Dedicated top 6 commodity fallers highlighting daily price reductions.
   - All rates and percentage calculations presented using Bengali numerals.

3. **Numeric Category Sorting & Filtering (Challenge C1):**
   - Category-wise navigation across staples including rice, lentils, vegetables, fish, and meat.
   - Numerical value-based sorting controls (*Default*, *Price: Low to High*, and *Price: High to Low*) evaluating underlying values accurately rather than lexicographical string comparisons.

4. **Protected Product Details & Market Breakdown:**
   - Secure route guarding `/product/[slug]` requiring user authentication.
   - Comprehensive price overview displaying minimum, maximum, and average market rates.
   - Market-wise comparison table showing price intervals and division details for individual bazaars.

5. **Robust Authentication & Profile Management (Challenge C3):**
   - Built on Better Auth with MongoDB Atlas supporting email/password, Google, and GitHub OAuth sign-in.
   - Seamless account linking allowing users with existing accounts to authenticate via social providers.
   - Profile management interface (`/profile`) with direct name update capabilities (`/profile/update`).

6. **Adaptive Responsive UI & Loading States:**
   - Fully optimized layouts across mobile, tablet, and desktop screens with DaisyUI and Tailwind CSS.
   - Dedicated skeleton loaders across Home, Category, Product, and Authentication routes.
   - Custom 404 error page with fallback navigation back to the homepage.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js (App Router)** | Core framework, partial prerendering & server component architecture |
| **TypeScript** | Type safety and reliable code structure |
| **Tailwind CSS v4** | Utility-first responsive styling |
| **DaisyUI v5** | Accessible UI component primitives |
| **Better Auth** | Authentication framework with OAuth & session handling |
| **MongoDB Atlas** | Persistent storage for users, accounts, and sessions |
| **React Toastify** | Interactive feedback notifications |
| **react-marquee-text** | Infinite scrolling price ticker strip |
| **Vercel** | Production hosting and edge deployment |

---

## 👨‍💻 Author

- GitHub: [@Srabon-bot](https://github.com/Srabon-bot)
