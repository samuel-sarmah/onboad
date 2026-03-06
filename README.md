# Onboard - Project Management for Small Teams

A modern project management SaaS built with Next.js, Tailwind CSS, and Supabase. Inspired by the clean design of Ridge Wallet.

## Features

- **Kanban Boards** - Visualize workflow with drag-and-drop task management
- **Calendar View** - Track deadlines and schedules
- **Team Collaboration** - Real-time comments and notifications
- **Roles & Permissions** - Admin, Manager, Member, Viewer access levels
- **Progress Reports** - Track team velocity and project completion
- **Subtasks** - Break down complex tasks into manageable pieces

## Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Drag & Drop**: @hello-pangea/dnd
- **State**: Zustand
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier works)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd onboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Fill in your Supabase credentials in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Set up your Supabase database:
- Go to Supabase Dashboard > SQL Editor
- Copy and run the contents of `src/lib/supabase/schema.sql`

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── dashboard/       # Main app pages
│   ├── login/           # Authentication
│   ├── signup/
│   └── page.tsx         # Landing page
├── components/
│   ├── calendar/        # Calendar view
│   ├── collaboration/   # Comments, notifications
│   ├── dashboard/       # App shell, sidebar
│   ├── kanban/          # Board, columns, cards
│   ├── landing/         # Marketing pages
│   ├── reports/         # Analytics
│   ├── tasks/           # Subtasks
│   └── ui/              # Base components
├── hooks/               # Custom React hooks
└── lib/
    └── supabase/        # Database client, types, schema
```

## Design System

The UI follows Ridge Wallet's design principles:
- Clean white space
- Black/white/gray color palette
- Sharp corners on buttons
- Bold typography
- Minimal, functional aesthetic

## License

MIT
