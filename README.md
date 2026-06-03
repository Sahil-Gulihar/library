# Sacred Scriptures Search Library

A comprehensive web application for managing a library of sacred scriptures and books. Built with a modern tech stack focused on performance, accessibility, and ease of use.

## System Architecture

### Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS with vanilla CSS custom properties for theming
- **UI Components:** shadcn/ui (Radix UI primitives)
- **State Management:** React Context API + LocalStorage (`AdminStoreContext`)
- **Data Fetching:** React Query (`@tanstack/react-query`)
- **Icons:** Lucide React
- **Forms:** React Hook Form with Zod validation
- **Type Safety:** TypeScript

### Application Structure

The application is structured using Next.js App Router conventions:

```
src/
├── app/                  # Next.js App Router (Pages, Layouts, API routes)
│   ├── admin/            # Admin portal routes
│   │   ├── books/        # Book management
│   │   ├── issue/        # Issue books
│   │   ├── return/       # Return books
│   │   └── team/         # Team management
│   ├── layout.tsx        # Root layout with global providers
│   ├── page.tsx          # Main landing page
│   └── providers.tsx     # Global React context providers
├── components/           # Reusable UI components
│   ├── admin/            # Admin-specific components
│   ├── library/          # Public-facing library components
│   └── ui/               # shadcn/ui generic components
├── data/                 # Static data and mock APIs
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and Global Store
│   └── store.tsx         # AdminStoreContext for global state
└── old_pages/            # Legacy Vite pages (kept for reference during migration)
```

### State Management

The application utilizes a lightweight, Context-based global store (`AdminStoreContext`) defined in `src/lib/store.tsx`. 

- **Persistence:** State is synchronized with `localStorage` on the client side, ensuring data persists across page reloads without requiring a backend database during the prototype phase.
- **Entities Managed:**
  - `books`: Catalog of available and issued books.
  - `teamMembers`: Staff and volunteers.
  - `issues`: Active book checkout records.

### Styling & Theming

- Uses Tailwind CSS configured in `tailwind.config.ts`.
- Employs a custom color palette including specific brand colors (gold, navy, ivory, cream) and semantic colors (primary, secondary, destructive, etc.).
- UI Components are built using `shadcn/ui`, providing highly accessible, unstyled components that are then styled with Tailwind classes.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sacred-scriptures-search
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Recent Updates

- **Migrated to Next.js:** The project was recently migrated from Vite to Next.js App Router to benefit from Server Components and improved routing.
- **Removed Heavy Dependencies:** Playwright and Lovable tags were removed to significantly reduce repository size and installation time.
- **Gitignore Update:** Fixed `.gitignore` to properly exclude the `.next` build directory.
