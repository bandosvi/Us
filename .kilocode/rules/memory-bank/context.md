# Active Context: Next.js Starter Template

## Current State

**Template Status**: ✅ Ready for development

The application is a comprehensive "Us" Couples Quiz suite with 17+ relationship quizzes, Date Wheel, Calendar, Notes, Boundaries, and Dr. Rescue AI mediator. Uses localStorage for persistence between partners. Built with Next.js 16, TypeScript, and dark theme UI.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] Professional landing page with hero, features, and CTA sections
- [x] Full Couples Quiz App deployed with complete feature set:
  - 17+ relationship quizzes (Love Languages, Apology Languages, Attachment Style, How You Fight, Communication Style, What You Carry, Trust & Loyalty, The Hard Questions, The 36 Questions, Relationship Health, Dreams & Alignment, Financial Compatibility, This or That, Would You Rather, Never Have I Ever, Daily Check-In, Weekly Pulse, Gratitude Exchange)
  - Date Wheel (spin wheel to pick date ideas)
  - Calendar for events
  - Notes (shared notes between partners)
  - Boundaries (relationship boundaries)
  - Dr. Rescue (AI-powered relationship mediator)
  - Partner connection system with 6-letter codes
  - localStorage for data persistence

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Couples Quiz app main page | ✅ Ready |
| `src/components/FullCouplesQuizApp.tsx` | Full quiz application with 17+ quizzes, Date Wheel, Calendar, Notes, Boundaries, Dr. Rescue | ✅ Ready |
| `src/app/layout.tsx` | Root layout | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Current Focus

The template is ready. Next steps depend on user requirements:

1. What type of application to build
2. What features are needed
3. Design/branding preferences

## Quick Start Guide

### To add a new page:

Create a file at `src/app/[route]/page.tsx`:
```tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### To add components:

Create `src/components/` directory and add components:
```tsx
// src/components/ui/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>;
}
```

### To add a database:

Follow `.kilocode/recipes/add-database.md`

### To add API routes:

Create `src/app/api/[route]/route.ts`:
```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Available Recipes

| Recipe | File | Use Case |
|--------|------|----------|
| Add Database | `.kilocode/recipes/add-database.md` | Data persistence with Drizzle + SQLite |

## Pending Improvements

- [ ] Add more recipes (auth, email, etc.)
- [ ] Add example components
- [ ] Add testing setup recipe

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| Recent | Comprehensive Couples Quiz app deployed with 3 core quizzes (Love Languages, Apology Languages, Attachment Styles) |
| Today | Full Us.jsx couples quiz app integrated with all 17+ quizzes, Date Wheel, Calendar, Notes, Boundaries, Dr. Rescue |
