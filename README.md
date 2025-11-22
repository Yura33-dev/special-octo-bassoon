# 🌱 ProGround - E-commerce Platform

**🌐 Languages / Sprachen:**

- [🇩🇪 Deutsch](README.de.md)

---

Modern full-featured e-commerce platform for selling seeds and plant protection
products with an administrative content management panel.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-8.9-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Main Features](#-main-features)
- [Development](#-development)

## 🎯 About the Project

ProGround is a modern e-commerce project developed for selling seeds and plant
protection products. The project includes a full-featured online store for
customers and a powerful administrative panel for managing content, orders, and
settings.

The project supports multilingualism (Ukrainian and Russian languages), has a
responsive design, and is optimized for search engines.

## ✨ Key Features

### 🛒 Online Store

- **Product Catalog** with detailed information about each product
- **Category System** with support for nested categories
- **Product Filtering** by various parameters (manufacturer, characteristics,
  etc.)
- **Shopping Cart** with state persistence in localStorage
- **Order Processing** with delivery and payment method selection
- **Product Comparison** for convenient selection
- **Product Search** through the catalog
- **Responsive Design** for all devices

### 👨‍💼 Administrative Panel

- **Product Management** (create, edit, delete)
- **Category Management** with support for hierarchical structure
- **Manufacturer Management**
- **Filter Management** for the catalog
- **Order Management** with archiving capability
- **Packaging Management** with price variants
- **Banner and Slide Management** for the homepage
- **Site Settings** and SEO parameters
- **Image Upload** to AWS S3

### 🌍 Internationalization

- Support for **Ukrainian** and **Russian** languages
- Automatic user language detection
- Language switching with context preservation
- Localized URLs

### 🔐 Security and Authentication

- Integration with **Clerk** for user management
- Protected routes for the administrative panel
- Data validation on client and server

## 🛠 Tech Stack

### Frontend

- **[Next.js 14](https://nextjs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[DaisyUI](https://daisyui.com/)**
- **[Framer Motion](https://www.framer.com/motion/)**
- **[Swiper](https://swiperjs.com/)**
- **[React Quill](https://github.com/zenoamaro/react-quill)**
- **[Formik](https://formik.org/)** + **[Yup](https://github.com/jquense/yup)**
- **[Zustand](https://github.com/pmndrs/zustand)**
- **[next-intl](https://next-intl-docs.vercel.app/)**
- **[Sonner](https://sonner.emilkowal.ski/)**
- **[Lucide React](https://lucide.dev/)**

### Backend

- **[MongoDB](https://www.mongodb.com/)**
- **[Mongoose](https://mongoosejs.com/)**
- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)**
- **[Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)**

### Infrastructure and Services

- **[AWS S3](https://aws.amazon.com/s3/)**
- **[Clerk](https://clerk.com/)**
- **[Google Tag Manager](https://tagmanager.google.com/)**

### Development Tools

- **[ESLint](https://eslint.org/)**
- **[Prettier](https://prettier.io/)**
- **[Husky](https://typicode.github.io/husky/)**
- **[lint-staged](https://github.com/okonet/lint-staged)**
- **[Yarn](https://yarnpkg.com/)**

## 📁 Project Structure

```
graund-a-new/
├── app/                          # Next.js App Router
│   ├── [locale]/                # Localized routes
│   │   ├── (admin)/             # Administrative panel
│   │   │   ├── dashboard/       # Admin pages
│   │   │   └── _components/     # Admin components
│   │   └── (shop)/               # Online store
│   │       ├── catalog/          # Product catalog
│   │       ├── checkout/         # Order processing
│   │       ├── compare/          # Product comparison
│   │       └── _components/      # Store components
│   └── api/                      # API routes
├── components/                   # Shared components
│   └── shared/                   # Reusable components
├── lib/                          # Utilities and helpers
│   ├── actions/                  # Server Actions
│   ├── api/                      # API functions
│   ├── config/                   # Configuration
│   ├── constants/                # Constants
│   ├── hooks/                    # React hooks
│   ├── utils/                    # Utilities
│   └── validations/              # Validation schemas
├── models/                       # Mongoose models
├── providers/                    # React providers (Zustand stores)
├── types/                        # TypeScript types and interfaces
├── translations/                 # Translation files (ru.json, uk.json)
├── i18n/                         # Internationalization configuration
└── public/                       # Static files
```

## 🎨 Main Features

### Product Management

- Create and edit products with multilingual content
- Upload images to AWS S3
- Configure packaging variants and prices
- Link to categories and manufacturers
- Configure filters for products
- Manage visibility and labels (top, sale)

### Category Management

- Hierarchical category structure (parent and child categories)
- Multilingual names and descriptions
- SEO settings for each category
- Category image upload
- Category sorting

### Order System

- View all orders
- Detailed order information
- Change order status
- Archive orders
- Filter and search orders

### Shopping Cart

- Add products to cart
- Change product quantities
- Select packaging variant
- Save cart to localStorage
- Calculate total cost

### Order Processing

- Order form with validation
- Delivery method selection
- Payment method selection
- Send order to server
- Order confirmation

## 💻 Development

### Code Conventions

- **TypeScript** is used for typing
- Following **ESLint** and **Prettier** rules
- Components organized by functionality
- Server Actions for server logic

### Git Workflow

The project uses **Husky** for automatic code checking before commit. All `.ts`
and `.tsx` files are automatically checked by the linter and formatted.

## 📝 License

This project is private and intended for internal use.

## 👥 Contact

For questions and suggestions, please contact via email:
yurii.kasian.25@gmail.com

---
