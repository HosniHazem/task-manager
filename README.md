# Task Manager

A task tracking app — create tasks, set priority and due dates, filter and
check them off. Built as a React single-page app with a Supabase backend.

## What it does

- Create tasks with title, description, priority and due date
- Task list with filtering and completion toggling
- Task detail view
- User settings
- Supabase for persistence

## Stack

React · TypeScript · Vite · shadcn/ui (Radix primitives) · Tailwind CSS ·
React Hook Form with Zod · React Router · Supabase

## Running locally

```bash
npm install
npm run dev
```

Supabase URL and anon key are read from `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY`.
