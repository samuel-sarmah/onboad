# Onboard - Project Management for Small Teams

A modern, fast, and beautiful project management tool built with Next.js 16, Tailwind CSS 4, and Turbopack. Features a fully interactive Kanban board demo with no backend required to get started.

## Key Highlights

- **Interactive Kanban Board Demo** - Live on the landing page with full CRUD functionality (Add, Edit, Delete tasks)
- **Drag & Drop** - Smooth task movement between columns
- **Clean, Modern UI** - Minimal aesthetic with functional design
- **No Authentication Required** - Open, public landing page with interactive demo
- **Easy to Use** - Intuitive interface inspired by modern product design
- **Fast Performance** - Built with Next.js 16 and Turbopack

## Available Features

- **Kanban Boards** - Visualize workflow with drag-and-drop task management (demo on homepage)
- **Task Management** - Create, edit, and delete tasks with full details
- **Priority Levels** - Low, Medium, High, Urgent task prioritization
- **Due Dates** - Track task deadlines
- **Column Organization** - To Do, In Progress, Review, Done columns
- **Features Documentation** - Dedicated page showcasing all planned features
- **Responsive Design** - Works perfectly on desktop and mobile

## Tech Stack

- **Frontend**: Next.js 16.1.6, Tailwind CSS 4, TypeScript 5
- **Build Tool**: Turbopack (fast compilation)
- **Drag & Drop**: @hello-pangea/dnd
- **Icons**: Lucide React
- **CSS**: Tailwind CSS with Postcss 4
- **Runtime**: React 19 Concurrent

## Getting Started

### Quick Start

The project requires **Node.js 18+** and that's it! No database setup needed.

### Installation

1. Clone the repository:
```bash
git clone git@github.com:samuel-sarmah/onboad.git
cd onboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run start
```

## Page Routes

- **Homepage** (`/`) - Landing page with interactive Kanban board demo
- **Features** (`/features`) - Detailed feature showcase
- **Sign Up** (`/signup`) - Sign up page (UI only, no backend)

## Demo Kanban Board Usage

The interactive Kanban board on the homepage allows you to:

1. **Add Task** - Click "Add Task" button to create new tasks in any column
2. **Edit Task** - Click on a task to view details, then click the edit icon
3. **Delete Task** - Click on a task and use the delete (trash) icon
4. **Drag & Drop** - Drag tasks between columns (To Do → In Progress → Review → Done)
5. **Set Details** - Each task can have:
   - Title and description
   - Priority level (Low, Medium, High, Urgent)
   - Due date
   - Column assignment

All changes are stored in browser memory (session only, not persisted).

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # 🏠 Landing page with interactive Kanban demo
│   ├── features/
│   │   └── page.tsx          # Features showcase page
│   ├── signup/               # Sign up page (UI only)
│   ├── login/                # Login page (UI only)
│   ├── api/
│   │   └── auth/me/          # Auth endpoint (disabled)
│   └── dashboard/            # Future app pages
├── components/
│   ├── landing/              # Landing page components
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Hero.tsx          # Hero section
│   │   ├── DemoKanban.tsx    # Interactive Kanban demo ⭐
│   │   ├── Features.tsx      # Features list
│   │   ├── Pricing.tsx       # Pricing table
│   │   ├── CTA.tsx           # Call-to-action
│   │   └── Footer.tsx        # Footer
│   ├── kanban/               # Kanban board components
│   │   ├── KanbanBoard.tsx   # Main board
│   │   ├── KanbanColumn.tsx  # Column component
│   │   └── TaskCard.tsx      # Task card
│   ├── ui/                   # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Checkbox.tsx
│   │   └── ...
│   └── dashboard/            # Future app components
├── hooks/                    # Custom React hooks
├── lib/
│   └── supabase/             # Supabase config (future use)
└── styles/
    └── globals.css           # Global styles with Tailwind theme
```

## Design System

- **Colors**: Black, white, and gray palette with accent colors
- **Typography**: Clean, modern fonts with proper hierarchy
- **Components**: Reusable, well-structured components
- **Tailwind CSS 4**: Latest version with @theme support
- **Responsive**: Mobile-first, fully responsive design

## Available Scripts

```bash
# Development
npm run dev              # Start dev server (automatic reload)

# Production
npm run build            # Build for production (Turbopack)
npm run start            # Start production server
npm run start            # Run production build

# Linting
npm run lint             # Run ESLint
```

## Future Features (Planned)

- Backend integration with Supabase
- User authentication and authorization
- Calendar view for deadline tracking
- Real-time team collaboration
- Comments and mentions on tasks
- Progress reports and analytics
- Team management and roles
- Subtasks and nested tasks
- Notifications system
- File attachments
- Dark mode support

## Roadmap

1. **Phase 1** ✅ - Landing page with interactive demo
2. **Phase 2** - User authentication and account creation
3. **Phase 3** - Backend database integration
4. **Phase 4** - Team features and collaboration
5. **Phase 5** - Advanced analytics and reporting
6. **Phase 6** - Mobile app and PWA

## Component Documentation

### DemoKanban Component

The interactive Kanban board is implemented in `src/components/landing/DemoKanban.tsx` with:

- **Full CRUD Operations**: Create, Read, Update, Delete tasks
- **Drag & Drop**: Smooth task movement using @hello-pangea/dnd
- **Task Details**: Title, description, priority, due date, column assignment
- **Modal Dialogs**: Add task form, edit task form, view task details
- **State Management**: React hooks with local state

### UI Components

All UI components are located in `src/components/ui/` and include:

- `Button.tsx` - Primary, secondary, outline, ghost variants
- `Card.tsx` - Flexible card component with padding options
- `Input.tsx` - Text input with label, error, and icon support
- `Badge.tsx` - Status indicators with multiple variants
- `Checkbox.tsx` - Accessible checkbox input
- `Textarea.tsx` - Multi-line text input

Each component is TypeScript-first and fully accessible.

## Contributing

This is a personal project, but contributions are welcome! Feel free to open issues or submit PRs.

## License

MIT License - Feel free to use this project for personal or commercial purposes.
