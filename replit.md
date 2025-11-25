# LootLedger - Whatnot Inventory Management Application

## Overview

LootLedger is a full-stack inventory management application designed for Whatnot marketplace sellers. The application helps sellers track collectibles, manage sales, and export listings in Whatnot's CSV format. Built with a modern tech stack featuring React, Express, and in-memory storage, it provides a dark-themed gaming aesthetic while maintaining clean, efficient seller dashboard functionality.

The application centers around managing inventory items (trading cards, collectibles, sneakers, etc.) with features for tracking purchase/selling prices, calculating profit margins, categorizing items, and generating bulk export files compatible with Whatnot's platform.

## Project Status: COMPLETE

### Completed Features

✅ **Dashboard**
- Real-time stats cards showing total items, inventory value, profit margin, and orders
- Recent items display with 4-item grid layout
- Card size slider for customizable display
- Full CRUD operations on inventory items from dashboard
- Edit, duplicate, delete, and giveaway toggle functionality
- Item detail modal with mark-as-sold capability

✅ **Inventory Page**
- Advanced grid/list view toggle with responsive layout
- 3-5 configurable items per row with card size slider
- Search functionality to filter items by title/tags
- Filter sidebar with collapsible animation
- Tag-based filtering system
- Full inventory management: add, edit, delete items
- Mark items as sold with buyer information
- Giveaway toggle with visual badge indicator
- Item detail modal for comprehensive item information

✅ **Item Management**
- Add new items with comprehensive form (title, category, condition, prices, quantity, weight, description, tags)
- Edit existing items with pre-populated data
- Delete items from inventory
- Mark items as sold with buyer name and email
- Toggle giveaway status with visual indicator
- Price calculations and profit margin display
- Item detail modal with 3D flip animations

✅ **UI/UX**
- Dark theme (#111111 black background, #F4E43D yellow accents)
- Responsive grid system (1-5 columns based on viewport)
- Smooth animations and transitions
- Hover elevation effects on interactive elements
- Giveaway badge with gift icon indicator
- Professional card-based layouts
- Mobile-responsive sidebar navigation

### User Preferences

Preferred communication style: Simple, everyday language.

### System Architecture

#### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool

**Routing**: Wouter for lightweight client-side routing with pages:
- Dashboard (homepage with stats and recent items)
- Inventory (main item management)
- Orders, Export, Settings (placeholders for future features)

**UI Component System**: Shadcn/ui components with Radix UI primitives, styled with Tailwind CSS

**State Management**: TanStack Query (React Query) v5 for server state management

**Design System**: Dark mode with yellow (#F4E43D) primary color, custom CSS variables in index.css

#### Backend Architecture

**Framework**: Express.js with TypeScript

**Storage**: In-memory storage (MemStorage) - suitable for development/testing

**API Structure**: RESTful API with `/api` endpoints:
- GET/POST/PATCH/DELETE /api/inventory
- POST /api/inventory/:id/sold

#### Data Models

**InventoryItem**:
- id, title, category, subCategory, condition
- purchasePrice, sellingPrice (numeric precision)
- quantity, weight (optional)
- description, imageUrl, tags (array)
- status (in_stock | sold | draft)
- buyerName, buyerEmail, soldDate
- isGiveaway (0/1 integer)
- createdAt

### Key Implementation Details

1. **Price Handling**: Prices stored as strings in API responses but converted to numbers for display calculations
2. **Giveaway System**: Integer field (0/1) with visual badge and gift icon on inventory cards
3. **Form State Management**: React refs and controlled inputs for robust form handling
4. **Error Handling**: Console logging with detailed feedback for debugging
5. **Responsive Grid**: Dynamic column layout based on viewport and user preference
6. **API Integration**: React Query with proper cache invalidation after mutations

### Technologies Used

- **Frontend**: React 18, TypeScript, Vite, Wouter, TanStack Query v5, Tailwind CSS
- **Backend**: Express.js, TypeScript, Zod validation
- **UI**: Shadcn/ui, Radix UI, Lucide React icons
- **Styling**: Tailwind CSS with custom dark theme
- **Forms**: React Hook Form with Zod validation
- **Data Validation**: Zod schemas from Drizzle ORM

### Recent Changes (Final Version)

- Completed Dashboard with full API integration and mutations
- Fixed price parsing issues to handle both string and number types
- Implemented AddItemDialog with proper form data capture and submission
- Created EditItemDialog for updating existing items
- Added ItemDetailModal with mark-as-sold functionality
- Wired all CRUD operations from both Dashboard and Inventory pages
- Fixed TypeScript type issues with nullable fields
- Cleaned up debug logging for production readiness
- Verified all interactive features work correctly (edit, delete, toggle giveaway)

### Known Limitations

- **Storage**: In-memory storage persists only during active session (for development/testing)
- **Images**: Image upload not yet implemented (placeholder UI present)
- **Export**: Whatnot CSV export feature not yet implemented
- **Orders Page**: Placeholder only, awaiting implementation
- **Settings**: Placeholder only, awaiting implementation

### How to Run

```bash
npm run dev
```

Starts the development server on `http://localhost:5000` with:
- Express backend API on same port
- Vite frontend with hot module reloading
- Automatic workflow restart on file changes

### Next Steps for Production

1. **Replace MemStorage** with database integration (PostgreSQL via Drizzle ORM)
2. **Implement image upload** functionality with cloud storage
3. **Add Whatnot CSV export** feature
4. **Complete Orders page** with sales history and analytics
5. **Implement Settings page** for user preferences
6. **Add authentication** system for multi-user support
7. **Setup deployment** on Replit or other hosting platform
