# Design Guidelines: Whatnot Inventory Management Application

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Whatnot's marketplace interface and Shopify admin panels - clean, efficient seller dashboards with purple brand identity and card-based organization.

## Color Palette
- **Primary**: #6C5CE7 (Whatnot purple) - Primary buttons, active states, key CTAs
- **Secondary**: #A8A4FF (Light purple) - Hover states, secondary elements, borders
- **Background**: #F8F9FF (Very light purple) - Main background, content areas
- **Text**: #2D3436 (Dark grey) - Primary text, headings, labels
- **Success**: #00B894 (Teal) - Success messages, sold item indicators, profit metrics
- **Accent**: #FDCB6E (Warm yellow) - Highlights, badges, important notifications
- **White**: #FFFFFF - Cards, modals, form backgrounds
- **Grey Scale**: #E9ECEF (borders), #6C757D (secondary text)

## Typography
- **Font Families**: Inter (primary UI text) and Poppins (headings)
- **Hierarchy**:
  - H1: Poppins 2xl/3xl font-bold (Dashboard titles)
  - H2: Poppins xl/2xl font-semibold (Section headers)
  - H3: Poppins lg/xl font-semibold (Card titles)
  - Body: Inter base/sm (Forms, descriptions, metadata)
  - Small: Inter xs/sm (Timestamps, helper text)

## Layout System
**Spacing Units**: Tailwind spacing - primary units are `2, 4, 8, 12, 16` (p-2, p-4, p-8, m-12, gap-16)
- Card padding: p-6 to p-8
- Section spacing: py-12 to py-16
- Grid gaps: gap-4 to gap-6
- Form element spacing: space-y-4

**Grid System**:
- Inventory grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Dashboard stats: grid-cols-2 lg:grid-cols-4
- Form layouts: Single column with max-w-2xl for focus

## Component Library

**Navigation**:
- Sidebar navigation (desktop) with purple accent for active items
- Top mobile navigation with hamburger menu
- Persistent action bar for bulk operations

**Cards**:
- Inventory item cards with rounded-lg borders, shadow-sm
- Hover state: shadow-md transition
- Image preview at top, metadata below
- Quick action buttons (Edit, Duplicate, Delete) in corner overlay
- Status badges (In Stock, Sold, Draft) with appropriate colors

**Forms**:
- Clean, spacious form layouts with clear labels above inputs
- Multi-file drag-and-drop upload zone with visual feedback
- Tag input with chip-style display (removable tags)
- Dropdown selects matching Whatnot CSV categories
- Price inputs with $ prefix and decimal formatting
- Condition selector with radio buttons or segmented control

**Buttons**:
- Primary: bg-primary text-white rounded-lg px-6 py-3
- Secondary: border-2 border-primary text-primary
- Icon buttons: rounded-full p-2 for quick actions
- Bulk action buttons: Sticky bottom bar on mobile

**Data Display**:
- Inventory table view option with sortable columns
- Stats cards showing total items, total value, profit/loss
- Order history table with buyer info, dates, prices
- Filter sidebar with collapsible sections

**Modals & Overlays**:
- Full-screen modals for add/edit item (mobile)
- Centered modals for confirmations (desktop)
- Image lightbox for viewing uploaded photos
- Export preview modal showing CSV data before download

## Interactions
- Smooth transitions (transition-all duration-200)
- Drag-and-drop file uploads with visual drop zones
- Inline editing for quick price/quantity updates
- Bulk select with checkboxes for multi-item actions
- Toast notifications for success/error states (top-right positioning)

## Images
No hero images needed - this is a utility application focused on efficient inventory management. All images are user-uploaded product photos displayed in cards and detail views.

## Key Screens

1. **Dashboard**: Stats overview, recent items, quick actions
2. **Inventory List**: Grid/table toggle, filters, search, bulk actions
3. **Add/Edit Item**: Comprehensive form with all Whatnot fields, photo management
4. **Order Tracking**: Sales history table, buyer details, profit calculations
5. **Export Manager**: CSV preview, template mapping, export options