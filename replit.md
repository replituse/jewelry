# Jewelry Catalog Application

## Overview

This is a modern jewelry catalog web application built with React and Express. The application displays a beautiful, elegant catalog of jewelry products with categories, featured items, and a carousel showcase. Users can browse different jewelry categories (necklaces, rings, earrings, bracelets, etc.), search for products, and view detailed product information. The application features a responsive design with a golden jewelry theme and smooth animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management and caching
- Framer Motion for animations and transitions
- Tailwind CSS for styling with shadcn/ui component library

**Design Decisions:**
- **Component-based UI**: Uses shadcn/ui (Radix UI primitives) for accessible, customizable components
- **Custom theming**: Golden jewelry theme with CSS custom properties for colors and fonts
- **Responsive layout**: Mobile-first approach with hamburger menu and side drawer navigation
- **State management**: TanStack Query handles all server state, eliminating need for global state management
- **File organization**: Components are modular with clear separation (pages, components, UI components)

### Backend Architecture

**Technology Stack:**
- Express.js with TypeScript
- MongoDB with native MongoDB driver for data persistence
- Zod for runtime validation and schema definition
- Drizzle ORM configuration (present but MongoDB is the active database)

**API Structure:**
- RESTful API endpoints under `/api` prefix
- Categories: CRUD operations for jewelry categories
- Products: CRUD operations with filtering by category
- Carousel: Manages homepage carousel images
- Shop Info: Store information and contact details
- User management: Basic user operations

**Design Decisions:**
- **Validation**: Zod schemas in shared directory ensure type safety between client and server
- **Error handling**: Centralized error responses with appropriate HTTP status codes
- **Logging**: Request/response logging middleware for API routes
- **Database abstraction**: Storage interface pattern allows for potential database swapping

### Data Storage

**Database Choice: MongoDB**
- Document-based storage fits the product catalog use case well
- Collections: products, categories, carouselImages, shopInfo, users
- Indexed fields for performance: category, slug, displayOrder, featured
- ObjectId used for primary keys, converted to strings for client consumption

**Schema Design:**
- Categories: name, slug (unique), icon, displayOrder
- Products: name, description, price, imageUrl, category reference, tags, featured flag, stock status
- CarouselImages: imageUrl, title, subtitle, button text/link, displayOrder, active flag
- ShopInfo: Contact details, social media links, business hours

**Why MongoDB over PostgreSQL:**
- Flexible schema suitable for varying product attributes
- Better fit for catalog data with nested structures
- Simpler deployment in Replit environment
- Note: Drizzle configuration exists for potential PostgreSQL migration

### External Dependencies

**UI Component Library:**
- @radix-ui/* components for accessible UI primitives (dialogs, dropdowns, popovers, etc.)
- shadcn/ui configuration for consistent component styling

**Database Service:**
- MongoDB Atlas or compatible MongoDB service (via MONGODB_URI environment variable)
- @neondatabase/serverless package present (suggests Neon Postgres as alternative)

**Third-party Services (configured in shop info):**
- Social media integrations: Facebook, Instagram, Pinterest
- Contact methods: Phone, email, physical address
- Google Fonts: Playfair Display, Poppins, Cormorant Garamond for typography

**Development Tools:**
- Replit-specific plugins for development experience
- Vite plugins: error overlay, cartographer, dev banner
- TypeScript for type checking across the stack

**Build and Deployment:**
- Vite builds the frontend to `dist/public`
- esbuild bundles the backend to `dist/index.js`
- Environment variables: DATABASE_URL (Drizzle), MONGODB_URI (active database)