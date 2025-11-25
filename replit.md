# LootLedger - Whatnot Inventory Management Application

## Overview

LootLedger is a full-stack inventory management application designed for Whatnot marketplace sellers. The application helps sellers track collectibles, manage sales, and export listings in Whatnot's CSV format. Built with a modern tech stack featuring React, Express, and PostgreSQL, it provides a dark-themed gaming aesthetic ("LootLedger") while maintaining clean, efficient seller dashboard functionality.

The application centers around managing inventory items (trading cards, collectibles, sneakers, etc.) with features for tracking purchase/selling prices, calculating profit margins, categorizing items, and generating bulk export files compatible with Whatnot's platform.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing with these core pages:
- Dashboard (homepage with stats and recent items)
- Inventory (main item management grid/list view)
- Orders (sales tracking table)
- Export (CSV generation for Whatnot)
- Settings (application preferences)

**UI Component System**: Shadcn/ui components with Radix UI primitives, styled with Tailwind CSS. The design uses a dark theme with yellow accent (#F4E43D) as the primary brand color, replacing the original Whatnot purple design system mentioned in guidelines. Custom CSS variables in `index.css` define the dark mode color palette.

**State Management**: TanStack Query (React Query) for server state, with a custom query client configured for API calls. Local component state managed with React hooks.

**Styling Approach**: Tailwind CSS with custom configuration extending the base theme. Typography uses Inter for body text and Poppins for headings. The design system includes custom elevation utilities (`hover-elevate`, `active-elevate-2`) and shadow variables.

**Key Design Patterns**:
- Component composition with shadcn/ui base components
- Reusable card-based layouts for inventory items
- Dialog/modal system for forms (add/edit items)
- Responsive grid system adapting from 1 to 4 columns based on viewport
- Sidebar navigation pattern with mobile sheet overlay

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js.

**Server Setup**: Two entry points for different environments:
- `index-dev.ts`: Development mode with Vite middleware for HMR
- `index-prod.ts`: Production mode serving pre-built static files

**API Structure**: RESTful API routes registered through `registerRoutes` function. All API endpoints prefixed with `/api` to separate from frontend routes.

**Storage Layer**: Abstracted through `IStorage` interface in `storage.ts`, currently implemented with in-memory storage (`MemStorage` class). The interface defines CRUD operations for:
- Users (authentication/accounts)
- Inventory items (main data model)
- Item state transitions (marking as sold, updating status)

**Rationale**: The storage abstraction allows swapping from in-memory to database implementation (like Drizzle with PostgreSQL) without changing business logic. This was chosen to enable rapid prototyping while maintaining production-ready architecture.

### Data Models

**User Model**:
- id (UUID primary key)
- username (unique)
- password (hashed)

**InventoryItem Model** (core entity):
- id (UUID primary key)
- Basic info: title, category, subCategory, condition
- Financial: purchasePrice, sellingPrice (numeric with 2 decimal precision)
- Inventory: quantity (integer), weight (optional numeric)
- Content: description, imageUrl, tags (text array)
- Status tracking: status ("in_stock" | "sold" | "draft")
- Sales data: buyerName, buyerEmail, soldDate (for completed sales)
- Special flags: isGiveaway (integer as boolean)
- Timestamps: createdAt

**Design Decisions**:
- Numeric types for prices to avoid floating-point precision issues
- Text array for tags enabling flexible categorization
- Status enum for inventory lifecycle management
- Separate buyer fields populated only when item sold
- UUID for IDs providing globally unique identifiers

### Database Schema

**ORM**: Drizzle ORM configured for PostgreSQL with `@neondatabase/serverless` driver.

**Schema Location**: `shared/schema.ts` defines tables and validation schemas.

**Migration Strategy**: Drizzle Kit configured with `drizzle.config.ts` for schema migrations. Migrations output to `./migrations` directory.

**Validation**: Zod schemas generated from Drizzle tables via `createInsertSchema` for runtime type validation on inserts.

**Connection**: Requires `DATABASE_URL` environment variable. Configuration throws error if not provided, ensuring database is provisioned before app starts.

## External Dependencies

### UI Component Libraries
- **Radix UI**: Unstyled, accessible component primitives (dialogs, dropdowns, popovers, etc.)
- **shadcn/ui**: Pre-styled components built on Radix UI with Tailwind CSS
- **cmdk**: Command palette/menu component
- **embla-carousel-react**: Carousel/slider functionality
- **lucide-react**: Icon library for consistent iconography

### Data & Forms
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Zod resolver integration for form validation
- **zod**: Runtime type validation
- **drizzle-zod**: Schema-to-Zod converter for database types
- **date-fns**: Date formatting and manipulation

### Backend Services
- **@neondatabase/serverless**: Neon Postgres serverless driver
- **drizzle-orm**: TypeScript ORM for SQL databases
- **connect-pg-simple**: PostgreSQL session store for Express

### State Management
- **@tanstack/react-query**: Async state management for server data

### Development Tools
- **Vite**: Build tool and dev server with HMR
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing with Autoprefixer
- **Replit plugins**: Runtime error overlay, cartographer, dev banner (development only)

### Build & Deployment
- **esbuild**: Server-side bundling for production
- **tsx**: TypeScript execution for development
- **Wouter**: Lightweight client-side routing

### Expected Future Integrations
- **Whatnot API**: For direct listing uploads (CSV export currently manual)
- **Image upload service**: Currently using URLs; may need Cloudinary/S3
- **Authentication provider**: Currently basic username/password; may add OAuth