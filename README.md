# Task Board

A simple, professional, client-side Task Board application built for a React/Next.js coding assessment.

## Features

- **Task Management**: Create, edit, and delete tasks.
- **Organization**: Filter tasks by status and search by title.
- **Sorting**: Sort tasks by due date or priority.
- **Persistence**: All data is saved locally using browser `localStorage` and restored on reload.
- **Responsive Design**: Mobile-friendly, responsive layout.
- **Theming**: Integrated Dark/Light mode toggle.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix Primitives)
- **Icons**: Lucide React
- **Testing**: Vitest

## Local Setup

1. **Clone the repository**
2. **Install dependencies**: 
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Open application**: Visit `http://localhost:3000` in your browser.

## Assumptions

- **Single User System**: There is no authentication or multi-user access required.
- **Storage**: Data resides entirely in client-side `localStorage`. No remote database is used, meaning data will not sync across different browsers or devices.
- **Mandatory Fields**: Task Title is the only strictly required text field (minimum 3 characters). Priority and Status have default values. Due Date and Description are optional.
- **Search**: The search function filters based exclusively on the task title (case-insensitive).
- **Validation**: Strict validation prevents the creation of invalid tasks.

## Scripts

- `npm run dev` - Starts development server.
- `npm run build` - Creates an optimized production build.
- `npm start` - Starts production server.
- `npm run lint` - Runs ESLint.
- `npx vitest run` - Runs unit tests.
