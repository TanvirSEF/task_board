# Product Requirements Document (PRD)
# Task Board Web App — React / Next.js Developer Coding Assignment

**Document Version:** 1.0  
**Project Type:** React / Next.js Coding Assessment  
**Primary Goal:** Build a clean, simple, production-style Task Board that demonstrates strong React fundamentals, Next.js conventions, state management, form validation, UI/UX judgment, persistence, code organization, and Git hygiene.

---

## 1. Executive Summary

The product is a small Task Board web application inspired by a simplified Trello/Todo workflow.

A user should be able to:

- View all tasks
- Create a task
- Edit a task
- Delete a task after confirmation
- Search tasks by title
- Filter tasks by status
- Persist tasks across page refreshes
- Optionally sort tasks
- Optionally see loading and empty states
- Optionally use dark mode
- Optionally use the application responsively on mobile
- Optionally run a basic automated test
- Optionally use a live deployment

The assessment explicitly prioritizes clean implementation over feature quantity. The application should therefore remain small, understandable, reliable, and easy to explain in a technical interview.

The official assignment states that the purpose is to evaluate project structure, React components, state management, forms/validation, and code organization rather than building a large application. fileciteturn0file0L5-L11

---

# 2. Assessment Alignment

## 2.1 Mandatory Technology Requirements

The assignment requires:

- Next.js v13+
- App Router preferred
- React functional components and hooks
- JavaScript or TypeScript
- Any reasonable CSS solution
- Data persistence through either:
  - Next.js API routes + in-memory storage
  - Next.js API routes + local JSON storage
  - Client-side localStorage
- No real database is required
- Complex or paid external services should not be used

These requirements are stated directly in the assessment. fileciteturn0file0L12-L24

## 2.2 Recommended Implementation Decision

### Framework

**Next.js App Router + TypeScript**

Reason:

- Strong type safety
- Clear route structure
- Better maintainability
- Demonstrates modern React/Next.js capability
- Makes the implementation easier to explain during a review

### Styling

**Tailwind CSS**

Reason:

- Fast development
- Easy responsive design
- Simple dark-mode implementation
- Avoids unnecessary styling architecture
- Keeps UI consistency manageable

### Persistence

**Client-side localStorage**

Reason:

- Explicitly allowed by the assignment
- No backend/database complexity
- Works immediately after deployment
- Appropriate for a small coding assessment
- Keeps the implementation focused on the requested React fundamentals

The final README should explicitly state this architectural assumption because the assignment allows multiple persistence approaches. fileciteturn0file0L18-L24

---

# 3. Product Goals

## 3.1 Primary Goals

1. Deliver every required assessment feature correctly.
2. Keep the codebase easy to read and explain.
3. Demonstrate good React state and hook usage.
4. Maintain clear separation between UI, business logic, types, and utilities.
5. Make every important user action have clear visual feedback.
6. Provide graceful empty, invalid, and destructive-action states.
7. Ensure data survives a browser refresh.
8. Maintain a professional responsive UI without unnecessary complexity.
9. Maintain clean Git history through incremental commits.
10. Keep the app small enough to complete and defend confidently.

## 3.2 Secondary Goals

- Add selected bonus features where they improve quality without creating risk.
- Make the visual language consistent.
- Keep components reusable.
- Minimize unnecessary re-renders.
- Keep dependencies lightweight.

## 3.3 Non-Goals

The project should NOT become:

- A multi-user SaaS
- A real-time collaboration system
- A full Trello clone
- A project-management platform
- A role/permission system
- A server-authenticated application
- A database-backed production system
- A drag-and-drop Kanban system unless there is extra time and it does not compromise required features
- A complex design-system project

The assignment explicitly emphasizes that a clean, working application is better than a complex application with broken features. fileciteturn0file0L84-L100

---

# 4. User Persona

## Primary User

A single individual who wants a lightweight way to maintain personal tasks.

### User needs

- Quickly see what needs to be done
- Understand task priority
- Understand task progress
- Create tasks without friction
- Update tasks as work progresses
- Find a task quickly
- Remove completed/unnecessary tasks
- Return later and still have the same task data

Because the assignment is intentionally small, authentication and multi-user support are not required.

---

# 5. Core Domain Model

## 5.1 Task

```ts
export type TaskStatus = "todo" | "in-progress" | "done";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
```

## 5.2 Why These Fields Exist

| Field | Required | Purpose |
|---|---:|---|
| id | Yes | Unique task identifier |
| title | Yes | Main task label |
| description | No | Additional context |
| status | Yes | Task workflow state |
| priority | Yes | Importance level |
| dueDate | No | Optional deadline |
| createdAt | Yes | Useful for stable ordering |
| updatedAt | Yes | Useful when editing and debugging |

The assessment explicitly requires title, optional description, priority, status, and optional due date. fileciteturn0file0L41-L49

---

# 6. Status Model

## 6.1 Status Values

### To Do
Internal value: `todo`

Meaning:
Task has been created but work has not started.

### In Progress
Internal value: `in-progress`

Meaning:
Task is currently being worked on.

### Done
Internal value: `done`

Meaning:
Task has been completed.

## 6.2 Status Presentation

Recommended UI treatment:

- To Do → neutral/slate visual
- In Progress → blue visual
- Done → green visual

These colors are a design recommendation, not an assessment requirement. The assessment only requires colored status badges. fileciteturn0file0L25-L30

---

# 7. Priority Model

## 7.1 Priority Values

- Low
- Medium
- High

## 7.2 Recommended Visual Treatment

- Low → neutral
- Medium → amber/warning
- High → red/destructive emphasis

Priority should be visually secondary to the task title while still being easy to scan.

---

# 8. Information Architecture

## Main Routes

```text
/
└── Task List Page

/tasks
└── Optional route alias if needed

/tasks/new
└── Create Task Page

/tasks/[id]
└── Edit Task Page
```

## Recommended Route Strategy

Use:

```text
/
```

for the primary task board.

Use:

```text
/tasks/new
```

for task creation.

Use:

```text
/tasks/[id]
```

for editing an existing task.

This provides a clean App Router structure and makes the flows easy to understand during code review.

---

# 9. Application Architecture

## 9.1 High-Level Architecture

```text
┌──────────────────────────────────────────┐
│              Next.js App Router          │
├──────────────────────────────────────────┤
│ Pages / Routes                            │
│  /                                       │
│  /tasks/new                              │
│  /tasks/[id]                             │
├──────────────────────────────────────────┤
│ UI Components                            │
│  TaskCard                                │
│  TaskList                                │
│  TaskForm                                │
│  TaskFilters                             │
│  StatusBadge                             │
│  PriorityBadge                           │
│  EmptyState                              │
│  ConfirmDialog                            │
├──────────────────────────────────────────┤
│ State / Application Logic                │
│  useTasks                                │
│  filtering                               │
│  searching                               │
│  sorting                                 │
│  validation                               │
├──────────────────────────────────────────┤
│ Persistence                               │
│  browser localStorage                    │
└──────────────────────────────────────────┘
```

## 9.2 Responsibility Separation

### Route Components

Responsible for:

- Reading route parameters
- Composing page-level UI
- Connecting route-specific state to reusable components

### Components

Responsible for:

- Rendering UI
- Receiving props
- Calling callbacks
- Keeping presentation concerns local

### Hooks

Responsible for:

- Task state
- CRUD operations
- localStorage synchronization
- reusable stateful behavior

### Utilities

Responsible for:

- Validation
- Date formatting
- Sorting helpers
- localStorage parsing/serialization when appropriate

### Types

Responsible for:

- Task interfaces
- Status types
- Priority types
- Filter/sort types

---

# 10. Proposed Folder Structure

```text
task-board/
├── public/
│   └── ...
│
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   │
│   │   └── tasks/
│   │       ├── new/
│   │       │   └── page.tsx
│   │       │
│   │       └── [id]/
│   │           └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.tsx
│   │   │   └── PageContainer.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── Spinner.tsx
│   │   │
│   │   └── tasks/
│   │       ├── TaskCard.tsx
│   │       ├── TaskList.tsx
│   │       ├── TaskForm.tsx
│   │       ├── TaskFilters.tsx
│   │       ├── TaskSearch.tsx
│   │       ├── TaskSort.tsx
│   │       ├── StatusBadge.tsx
│   │       ├── PriorityBadge.tsx
│   │       ├── DeleteTaskDialog.tsx
│   │       └── TaskBoard.tsx
│   │
│   ├── hooks/
│   │   ├── useTasks.ts
│   │   └── useTheme.ts
│   │
│   ├── lib/
│   │   ├── storage.ts
│   │   └── constants.ts
│   │
│   ├── types/
│   │   └── task.ts
│   │
│   └── utils/
│       ├── validation.ts
│       ├── dateUtils.ts
│       ├── taskUtils.ts
│       └── cn.ts
│
├── docs/
│   └── PRD.md
│
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── ...
```

---

# 11. Page Design — Task Board

## Route

```text
/
```

## Purpose

The home page is the central workspace.

## Layout

```text
┌─────────────────────────────────────────────────────────────┐
│ Logo / Task Board                  Theme     New Task       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Task Board                                                   │
│ Manage your tasks in one simple workspace.                  │
│                                                             │
│ [ Search tasks... ] [ Status ▼ ] [ Sort ▼ ]                 │
│                                                             │
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐     │
│ │ Task title     │ │ Task title     │ │ Task title     │     │
│ │ description    │ │ description    │ │ description    │     │
│ │ [To Do]        │ │ [In Progress]  │ │ [Done]         │     │
│ │ High           │ │ Medium         │ │ Low            │     │
│ │ Due: Aug 20    │ │ Due: Aug 22    │ │ No due date    │     │
│ │ Edit  Delete   │ │ Edit  Delete   │ │ Edit  Delete   │     │
│ └────────────────┘ └────────────────┘ └────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Header

Elements:

- Application name
- Optional small product icon
- Dark/light mode toggle
- Primary "New Task" button

The header should remain visually lightweight.

---

# 12. Task List Requirements

The assignment requires all tasks to be displayed in a list or grid with:

- Title
- Status
- Priority
- Due Date

Each task needs a colored status badge. fileciteturn0file0L25-L30

## Recommended Desktop Layout

Use a 3-column responsive card grid.

```text
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
```

## Recommended Mobile Layout

One card per row.

The assignment explicitly lists responsive design as a bonus feature. fileciteturn0file0L61-L68

---

# 13. Task Card Design

## Card Contents

1. Task title
2. Optional description preview
3. Status badge
4. Priority indicator
5. Due date
6. Edit action
7. Delete action

## Recommended hierarchy

```text
[Status]

Task title
Short description...

Priority: High
Due: Aug 20, 2026

[Edit] [Delete]
```

## Task title behavior

- Use clear typography
- Allow wrapping
- Avoid breaking layout on long titles
- Do not truncate aggressively unless necessary

## Description behavior

- Optional
- Limit visual height in cards
- Preserve content for editing

---

# 14. Create Task Flow

## Route

```text
/tasks/new
```

## User Journey

```text
Task Board
   ↓
Click "New Task"
   ↓
Create Task Form
   ↓
Fill fields
   ↓
Submit
   ↓
Validate
   ↓
Create task
   ↓
Persist to localStorage
   ↓
Return to task board
```

## Form Fields

### Title

Required.

Validation:

- Cannot be empty
- Minimum 3 characters

Assignment requirement: title is required and must be at least 3 characters. fileciteturn0file0L41-L49

### Description

Optional text area.

No strict length requirement from the assessment.

Recommended reasonable constraint:

```text
0–1000 characters
```

This is a product-level assumption and should be documented in README if implemented.

### Priority

Required select:

```text
Low
Medium
High
```

### Status

Required select:

```text
To Do
In Progress
Done
```

### Due Date

Optional native date input.

---

# 15. Form Validation Design

## Validation Principle

Errors should appear near the field that caused them.

Example:

```text
Title
[                     ]

Title must be at least 3 characters.
```

## Validation Rules

```ts
title:
  required
  trimmed length >= 3

description:
  optional

priority:
  must be low | medium | high

status:
  must be todo | in-progress | done

dueDate:
  optional
  if provided, must be a valid date value
```

## Submission behavior

On invalid submission:

- Do not create the task
- Preserve entered values
- Show field-level errors
- Focus the first invalid field when practical

On success:

- Create task
- Persist task
- Navigate to board
- Show success feedback if desired

---

# 16. Edit Task Flow

## Route

```text
/tasks/[id]
```

## Behavior

1. Read task ID from route.
2. Find task from local state/storage.
3. Populate the form.
4. User modifies fields.
5. Validate.
6. Update task.
7. Update `updatedAt`.
8. Persist new task collection.
9. Return to task board.

The assessment requires the ability to update any existing task field. fileciteturn0file0L50-L52

## Missing Task Behavior

If the ID does not exist:

```text
Task not found

The task you are trying to edit does not exist.

[Back to Tasks]
```

This is an important error-handling improvement.

---

# 17. Delete Task Flow

## Requirement

The assessment requires a confirmation prompt before deletion. fileciteturn0file0L53-L54

## Recommended UX

Use a custom confirmation dialog rather than relying only on `window.confirm`.

Dialog:

```text
Delete task?

Are you sure you want to delete "Design homepage"?
This action cannot be undone.

[Cancel] [Delete]
```

## Delete sequence

```text
Delete clicked
   ↓
Confirmation dialog
   ↓
Cancel → close dialog
Delete → remove task
   ↓
Persist
   ↓
Update UI immediately
```

---

# 18. Search

## Requirement

Search task titles using case-insensitive text matching. fileciteturn0file0L55-L57

## Behavior

Input:

```text
Search tasks...
```

Example:

```text
search = "design"
```

Matches:

```text
Design homepage
Design landing page
Redesign dashboard
```

Does not match:

```text
Fix API bug
```

## Search implementation

Recommended:

```ts
task.title.toLowerCase().includes(search.toLowerCase())
```

Search should update immediately as the user types.

No server request is necessary.

---

# 19. Status Filtering

## Requirement

Filter tasks by status. fileciteturn0file0L55-L57

## Filter options

```text
All
To Do
In Progress
Done
```

## State

```ts
type TaskStatusFilter = "all" | TaskStatus;
```

## Combination

Search and filter should work together.

Example:

```text
Search: "website"
Status: In Progress
```

Only tasks satisfying BOTH conditions should appear.

---

# 20. Sorting — Bonus

The assessment lists sorting by due date or priority as optional. fileciteturn0file0L61-L63

Recommended options:

```text
Default
Due Date — Earliest
Due Date — Latest
Priority — High to Low
Priority — Low to High
```

## Sorting rules

### Due date

Tasks without a due date can appear after dated tasks.

### Priority

Recommended order:

```text
High > Medium > Low
```

Sorting should not mutate the original state array.

Use a copied array:

```ts
const sortedTasks = [...filteredTasks].sort(...)
```

This avoids accidental state mutation.

---

# 21. Empty States — Bonus

The assessment specifically mentions loading and empty states such as "No tasks yet". fileciteturn0file0L61-L65

## Empty board

```text
No tasks yet

Create your first task to get started.

[Create Task]
```

## No search results

```text
No matching tasks

Try changing your search or status filter.
```

These should be treated as separate states.

---

# 22. Loading State — Bonus

Although localStorage is fast, there can be a short client hydration/initialization period.

Recommended:

```text
Loading tasks...
```

or a small skeleton.

Do not over-engineer this.

---

# 23. Dark Mode — Bonus

The assessment explicitly lists a dark-mode toggle. fileciteturn0file0L67-L68

## Theme modes

```text
Light
Dark
```

## Header

Place theme toggle in the top navigation.

## Light Theme

Recommended visual direction:

- White or near-white page background
- White cards
- Dark slate text
- Soft borders
- Muted secondary text

## Dark Theme

Recommended direction:

- Near-black/slate page background
- Slightly lighter dark cards
- White primary text
- Muted gray secondary text
- Subtle borders

## Theme rule

Do not create a different UI system for dark mode.

Only change:

- background
- surface
- border
- primary text
- muted text
- interactive states
- badges where necessary

---

# 24. UI Design System

## 24.1 Design Philosophy

The UI should communicate:

- Clean
- Modern
- Minimal
- Professional
- Functional
- Easy to scan

Avoid:

- Excessive gradients
- Huge hero sections
- Unnecessary animation
- Excessive shadows
- Decorative UI that does not improve usability

The assignment evaluates basic UI/UX quality and specifically says the interface does not need to be fancy; it needs to be clean, usable, and functional. fileciteturn0file0L95-L97

---

# 25. Color System

This is a proposed design system, not an explicit requirement.

## Light Theme

```text
Background:        #F8FAFC
Surface:           #FFFFFF
Border:            #E2E8F0
Primary Text:      #0F172A
Secondary Text:    #64748B
Primary Action:    #2563EB
Success:           #16A34A
Warning:           #D97706
Danger:            #DC2626
```

## Dark Theme

```text
Background:        #0F172A
Surface:           #111827
Border:            #334155
Primary Text:      #F8FAFC
Secondary Text:    #94A3B8
Primary Action:    #3B82F6
Success:           #22C55E
Warning:           #F59E0B
Danger:            #EF4444
```

---

# 26. Typography

Recommended:

- System font stack or Geist/Inter-style sans-serif
- Clear weight hierarchy
- Avoid excessive font sizes

Suggested:

```text
Page title:      30–36px / bold
Section title:   20–24px / semibold
Card title:      16–18px / semibold
Body:            14–16px
Metadata:        12–14px
Badge:           12px / medium
```

The exact values may be adapted according to the chosen Tailwind implementation.

---

# 27. Spacing System

Use a consistent spacing scale.

Example:

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
```

Do not use random values throughout components.

---

# 28. Border Radius

Recommended:

```text
Inputs: 8–10px
Buttons: 8–10px
Cards: 12–16px
Dialogs: 12–16px
Badges: 9999px
```

The objective is consistency rather than any specific numeric value.

---

# 29. Buttons

## Primary

Example:

```text
+ New Task
```

Use for the main action.

## Secondary

Examples:

```text
Cancel
Back
```

## Destructive

Example:

```text
Delete
```

Destructive actions should not visually compete with the primary action.

---

# 30. Accessibility

## Minimum accessibility requirements

- All inputs have labels
- Buttons have readable text or accessible labels
- Focus states are visible
- Color is not the only indicator of state
- Dialogs are keyboard accessible
- Inputs display validation messages
- Interactive elements are large enough for touch
- Semantic HTML should be preferred

For example, a status badge should display text such as `Done`, not rely only on green color.

---

# 31. Responsive Design

## Breakpoints

Recommended behavior:

### Mobile

```text
< 640px
```

- Single-column task list
- Filters stack vertically
- Header actions remain accessible
- Full-width form inputs
- Dialog fits within screen margins

### Tablet

```text
640px–1024px
```

- 2-column task grid where practical

### Desktop

```text
> 1024px
```

- 3-column grid
- Horizontal filter toolbar

---

# 32. State Management Architecture

## Main State

Tasks:

```ts
const [tasks, setTasks] = useState<Task[]>([]);
```

Search:

```ts
const [search, setSearch] = useState("");
```

Status filter:

```ts
const [statusFilter, setStatusFilter] =
  useState<TaskStatusFilter>("all");
```

Sort:

```ts
const [sortBy, setSortBy] =
  useState<TaskSortOption>("default");
```

Delete dialog:

```ts
const [taskToDelete, setTaskToDelete] =
  useState<Task | null>(null);
```

---

# 33. useTasks Hook

## Responsibilities

`useTasks.ts` should encapsulate task-related CRUD logic.

Recommended API:

```ts
interface UseTasksResult {
  tasks: Task[];
  isLoading: boolean;
  createTask: (input: CreateTaskInput) => void;
  updateTask: (id: string, input: UpdateTaskInput) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
}
```

## Why use a custom hook?

It prevents route/components from directly implementing persistence logic.

Instead:

```text
Component
   ↓
useTasks
   ↓
storage helper
   ↓
localStorage
```

This separation improves readability and testability.

---

# 34. localStorage Architecture

## Key

Use a namespaced key:

```text
task-board:tasks
```

## Data format

JSON array:

```json
[
  {
    "id": "abc123",
    "title": "Build landing page",
    "description": "Create responsive hero section",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2026-08-20",
    "createdAt": "2026-08-12T05:00:00.000Z",
    "updatedAt": "2026-08-12T05:00:00.000Z"
  }
]
```

## Important Next.js consideration

`localStorage` does not exist during server rendering.

Therefore any access must be performed on the client.

Recommended pattern:

```text
"use client"

useEffect(() => {
  read localStorage
}, [])
```

and state updates should write the serialized task list back to storage.

---

# 35. Storage Utility

Recommended API:

```ts
const TASKS_STORAGE_KEY = "task-board:tasks";

export function loadTasks(): Task[] {}

export function saveTasks(tasks: Task[]): void {}

export function clearTasks(): void {}
```

`useTasks` should consume these utilities instead of directly repeating `localStorage.getItem()` throughout multiple components.

---

# 36. Filtering Pipeline

The UI should derive visible tasks rather than maintaining a separate list state.

Recommended pipeline:

```text
All Tasks
   ↓
Search
   ↓
Status Filter
   ↓
Sort
   ↓
Visible Tasks
```

Pseudo-code:

```ts
const visibleTasks = useMemo(() => {
  let result = tasks;

  if (search.trim()) {
    result = result.filter(...);
  }

  if (statusFilter !== "all") {
    result = result.filter(...);
  }

  result = sortTasks(result, sortBy);

  return result;
}, [tasks, search, statusFilter, sortBy]);
```

This keeps source data canonical and derives the display state.

---

# 37. React Performance

The assignment specifically evaluates React fundamentals and avoidance of unnecessary re-renders. fileciteturn0file0L90-L91

## Guidelines

- Do not store derived visible-task arrays in state.
- Use `useMemo` for meaningful derived calculations if needed.
- Do not overuse `useMemo` or `useCallback` without reason.
- Keep component responsibility focused.
- Pass stable, simple props.
- Avoid creating duplicate copies of task state.
- Update state immutably.

---

# 38. Component Architecture

## AppHeader

Responsibilities:

- Product name
- New Task button
- Theme toggle

Props:

```ts
{
  onCreateTask?: () => void;
}
```

## TaskBoard

Responsibilities:

- Coordinate board state
- Render filters and task list

## TaskFilters

Responsibilities:

- Search
- Status filter
- Sort

## TaskList

Responsibilities:

- Render collection
- Show empty/loading states

## TaskCard

Responsibilities:

- Display one task
- Trigger edit
- Trigger delete

## TaskForm

Responsibilities:

- Render fields
- Validate
- Submit

It should receive initial values when used for editing.

---

# 39. Form Reusability

Use the same `TaskForm` for create and edit.

Example:

```tsx
<TaskForm
  mode="create"
  initialValues={defaultTaskValues}
  onSubmit={handleCreate}
/>
```

and:

```tsx
<TaskForm
  mode="edit"
  initialValues={task}
  onSubmit={handleUpdate}
/>
```

This avoids duplicating form implementation.

---

# 40. Validation Utility

Recommended:

```ts
interface TaskFormValues {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

interface ValidationErrors {
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
  dueDate?: string;
}
```

Function:

```ts
validateTask(values): ValidationErrors
```

This makes validation easy to test.

---

# 41. Date Handling

## Storage Format

Use:

```text
YYYY-MM-DD
```

for the optional due date input.

## Display

Format into a human-readable label.

Example:

```text
Due Aug 20, 2026
```

Avoid complex date libraries unless necessary.

A simple utility is enough for this assessment.

---

# 42. Error Handling

The assignment explicitly evaluates basic handling for invalid input, failed actions, and empty states. fileciteturn0file0L98-L98

## Cases to handle

### Invalid task form

Show field-level validation.

### Task not found

Show a clear not-found state.

### Invalid localStorage data

Fail safely and use an empty task array rather than crashing.

### Delete action

Always confirm before deleting.

### Unexpected runtime issue

Avoid exposing technical implementation details to users.

---

# 43. UX Feedback

Recommended:

### Create

After successful creation:

```text
Task created successfully.
```

### Update

```text
Task updated successfully.
```

### Delete

```text
Task deleted.
```

This can be implemented with a lightweight toast if desired, but a toast library is not required.

Because the assessment asks to avoid paid/complex external services, a small custom feedback component is preferable to adding unnecessary dependencies. fileciteturn0file0L118-L120

---

# 44. Task Board Interaction States

The board should support these visible states:

```text
1. Loading
2. No tasks
3. Tasks available
4. Search results
5. No search results
6. Filtered results
7. No filtered results
8. Delete confirmation
9. Error state
```

This creates a complete UX without requiring a large application.

---

# 45. Initial Sample Data

Recommended approach:

Do not automatically insert sample data into localStorage on every visit.

Better options:

- Start empty
- Or provide optional seed data in development only

For an assessment submission, an empty initial state is more faithful to the product's expected behavior.

---

# 46. Create Task Defaults

Recommended defaults:

```text
Title: ""
Description: ""
Priority: Medium
Status: To Do
Due Date: ""
```

This reduces friction while maintaining valid defaults.

---

# 47. Edit Behavior

When editing:

- Preserve the original ID
- Preserve `createdAt`
- Update `updatedAt`
- Replace editable fields
- Persist immediately after save

Example:

```ts
{
  ...existingTask,
  ...updatedValues,
  updatedAt: new Date().toISOString()
}
```

---

# 48. Delete Behavior

Delete should be immutable:

```ts
setTasks(prev =>
  prev.filter(task => task.id !== id)
);
```

Then persist the new result.

Do not mutate:

```ts
tasks.splice(...)
```

because that can create state-management bugs.

---

# 49. ID Strategy

Use a client-safe unique ID.

Recommended:

```ts
crypto.randomUUID()
```

with a fallback if required by environment constraints.

Example:

```ts
const id = crypto.randomUUID();
```

The ID should never depend on array index because tasks can be deleted or reordered.

---

# 50. Recommended UI Components

## Button

Variants:

```text
primary
secondary
danger
ghost
```

## Input

Supports:

- label
- placeholder
- value
- onChange
- error
- disabled

## Select

Supports:

- label
- options
- value
- onChange
- error

## Textarea

Supports:

- label
- value
- onChange
- error

## Badge

Generic component that can display:

```text
status
priority
```

## Modal

Generic confirmation dialog shell.

---

# 51. Accessibility Details

## Form labels

Every field:

```html
<label htmlFor="title">Title</label>
<input id="title" ... />
```

## Error association

Where practical:

```html
aria-invalid="true"
aria-describedby="title-error"
```

## Dialog

The delete confirmation should:

- Trap or manage focus appropriately
- Close on cancel
- Have clear primary/destructive actions
- Have a meaningful title

---

# 52. Keyboard UX

Recommended:

- Tab through controls
- Enter submits forms where appropriate
- Escape closes dialogs
- Focus remains visible
- No click-only essential actions

---

# 53. Responsive Forms

Desktop:

```text
Priority        Status
[ Select ]      [ Select ]
```

Mobile:

```text
Priority
[ Select ]

Status
[ Select ]
```

Use CSS grid/flex responsive behavior.

---

# 54. README Requirements

The assignment requires a public GitHub repository and a README containing:

- Brief description
- Tech stack
- Local setup
- Assumptions
- Skipped features and why
- Optional live deployment link

These are explicit submission requirements. fileciteturn0file0L101-L111

## Recommended README Sections

```text
# Task Board

## Overview
## Features
## Tech Stack
## Architecture
## Project Structure
## Getting Started
## Scripts
## Persistence
## Assumptions
## Bonus Features
## Testing
## Deployment
## Git Strategy
```

---

# 55. Git Strategy

The assessment explicitly asks for multiple logical commits rather than one giant final commit. fileciteturn0file0L101-L104

## Recommended Commit Sequence

```text
chore: initialize Next.js project
feat: add task domain types
feat: add task storage utilities
feat: implement useTasks hook
feat: build base UI components
feat: build task board layout
feat: add task creation flow
feat: add task editing flow
feat: add task deletion confirmation
feat: add search and status filters
feat: add task sorting
feat: add responsive styling
feat: add dark mode
test: add validation utility tests
docs: update README and PRD
fix: handle invalid localStorage data
```

Do not create fake commits just to inflate history. Each commit should represent a coherent change.

---

# 56. Development Workflow

## Phase 1 — Project Setup

- Create Next.js application
- Enable TypeScript
- Install/configure Tailwind
- Configure linting
- Create initial Git repository
- Make initial setup commit

## Phase 2 — Domain Layer

- Define Task type
- Define status and priority types
- Define constants
- Implement storage utilities

## Phase 3 — State Layer

- Implement `useTasks`
- Add initial hydration
- Add CRUD operations
- Add persistence

## Phase 4 — UI Foundation

- Build Button
- Build Input
- Build Select
- Build Textarea
- Build Badge
- Build Modal
- Build EmptyState

## Phase 5 — Main Board

- Header
- Search
- Status filter
- Task grid
- Task card
- Empty state

## Phase 6 — Create/Edit

- Task form
- Validation
- Create page
- Edit page

## Phase 7 — Delete

- Confirmation modal
- Delete state
- Persistence

## Phase 8 — Bonus Features

Prioritize:

1. Responsive design
2. Sorting
3. Empty/loading states
4. Dark mode
5. Basic unit test
6. Deployment

This order keeps core feature risk low.

---

# 57. Testing Strategy

The assignment lists one basic unit test as optional. fileciteturn0file0L61-L65

## Highest-value test

Test the validation utility.

Example cases:

### Valid

```text
Title: "Build homepage"
Priority: High
Status: To Do
```

Expected:

```text
{}
```

### Invalid title

```text
Title: ""
```

Expected:

```text
title: required error
```

### Too-short title

```text
Title: "Hi"
```

Expected:

```text
title: minimum length error
```

## Optional additional tests

- Search behavior
- Status filter
- Priority sorting
- Due-date sorting
- Storage parsing fallback

Do not spend more time building a large test suite than implementing the required features.

---

# 58. Deployment

## Recommended Platform

Vercel.

The assessment specifically mentions Vercel as a free/easy deployment option. fileciteturn0file0L65-L68

## Deployment Checklist

- Build succeeds
- No TypeScript errors
- No ESLint blockers
- Responsive UI checked
- localStorage works in deployed browser
- Routes work
- Refreshing route does not produce a broken UX
- README has live URL
- GitHub repository is public

---

# 59. Security / Privacy Scope

Because this application uses client-side localStorage:

- No account system
- No authentication
- No server secrets
- No external database
- No sensitive user information should be stored

This is appropriate for the assessment scope.

---

# 60. Performance Requirements

The application is small, so performance goals should focus on avoiding unnecessary complexity.

Requirements:

- No unnecessary API calls
- No repeated parsing of localStorage for every render
- No duplicate task state
- Avoid huge dependencies
- Keep UI interactions immediate
- Avoid unnecessary expensive computations

For normal assessment-scale task lists, straightforward array filtering/sorting is sufficient.

---

# 61. Quality Standards

## Code Quality

Must have:

- Consistent naming
- Clear component responsibility
- No dead code
- No unnecessary abstraction
- Type-safe task model
- Small, understandable components

These areas align directly with the evaluation criteria in the assignment. fileciteturn0file0L84-L91

## Example naming

Good:

```text
TaskCard
TaskForm
TaskFilters
useTasks
validateTask
formatDate
```

Avoid vague names:

```text
Thing
DataBox
Helper2
NewComponent
```

---

# 62. Next.js Conventions

Use App Router conventions:

```text
src/app/page.tsx
src/app/layout.tsx
src/app/tasks/new/page.tsx
src/app/tasks/[id]/page.tsx
```

The assignment specifically prefers the App Router. fileciteturn0file0L12-L15

Client components should only be introduced where interactive browser APIs or hooks require them.

Examples:

- `TaskBoard` → client
- `TaskForm` → client
- `TaskFilters` → client
- `TaskCard` → client if handlers/state are passed directly
- Static layout wrapper → can remain server component where appropriate

---

# 63. Suggested Client/Server Boundary

Because the persistence mechanism is browser localStorage, the task state layer is client-side.

Recommended structure:

```text
Server-compatible route shell
        ↓
Client TaskBoard
        ↓
useTasks
        ↓
localStorage
```

This keeps the architecture understandable and avoids pretending that a backend exists.

---

# 64. Optional URL Query State

Not required.

Do not implement unless useful.

For example:

```text
/?status=done&search=design
```

could theoretically persist filters in the URL, but this adds complexity not required by the assessment.

Recommended decision:

**Skip it.**

---

# 65. Optional Drag-and-Drop

Not required by the assignment.

Recommended decision:

**Skip it.**

Reason:

- Increases complexity
- Adds dependency/interaction risk
- Does not contribute directly to the required evaluation areas
- Could distract from clean CRUD/search/filter implementation

---

# 66. Optional Backend API

The assignment allows API routes, but they are not required.

Recommended decision:

**Skip the API layer and use localStorage.**

Reason:

- Faster and safer
- Fewer failure modes
- No need for server persistence
- Directly permitted by the assignment

---

# 67. Assumptions

These should appear in README:

1. The application is single-user.
2. Tasks are stored locally in the user's browser.
3. Data is not synchronized across devices.
4. No authentication is required.
5. No database is required.
6. Due dates are optional.
7. Search only matches task titles because the assignment specifically requests title matching.
8. Status and priority values are fixed enumerations.
9. A task can be deleted only after confirmation.
10. Dark mode, sorting, loading states, testing, responsiveness, and deployment are bonus features.

The assessment explicitly encourages making reasonable assumptions and documenting them in the README. fileciteturn0file0L118-L125

---

# 68. Scope Prioritization

## P0 — Must Work

- Task list
- Create task
- Edit task
- Delete task
- Delete confirmation
- Search
- Status filter
- Persistence
- Validation
- Responsive baseline usability
- Public GitHub repository
- README
- Incremental Git history

## P1 — Strongly Recommended

- Sorting
- Excellent empty state
- Loading state
- Responsive layout
- Dark mode

## P2 — Optional Polish

- Unit test
- Toast feedback
- More refined animations
- Small accessibility enhancements
- Live Vercel deployment

The required features should be fully stable before P1/P2 features are started.

---

# 69. Acceptance Criteria

## AC-01 Task List

Given there are tasks in storage,

When the user opens `/`,

Then all tasks should be rendered with:

- title
- status
- priority
- due date

## AC-02 Empty Task List

Given there are no tasks,

When the user opens `/`,

Then an empty-state UI should be shown.

## AC-03 Create Task

Given valid form values,

When the user submits the create form,

Then a new task should be created and visible in the board.

## AC-04 Title Validation

Given the title is empty or shorter than 3 characters,

When the form is submitted,

Then the task should not be created and an appropriate validation message should appear.

## AC-05 Edit Task

Given an existing task,

When the user edits and saves it,

Then all changed fields should be reflected on the board.

## AC-06 Delete Task

Given an existing task,

When the user selects delete,

Then a confirmation prompt/dialog should appear.

## AC-07 Confirm Delete

When the user confirms deletion,

Then the task should be removed immediately from the list and storage.

## AC-08 Cancel Delete

When the user cancels deletion,

Then the task should remain unchanged.

## AC-09 Search

Given tasks exist,

When the user enters text in search,

Then only title matches should remain visible.

Search should be case-insensitive.

## AC-10 Filter

Given tasks exist,

When the user selects a status,

Then only tasks with the selected status should be shown.

## AC-11 Search + Filter

When search and status filter are both active,

Then only tasks matching both criteria should be shown.

## AC-12 Persistence

Given a task exists,

When the browser is refreshed,

Then the task should still exist.

## AC-13 Edit Persistence

Given an edited task,

When the browser is refreshed,

Then the updated information should still exist.

## AC-14 Delete Persistence

Given a task is deleted,

When the browser is refreshed,

Then the deleted task should remain absent.

## AC-15 Invalid Task ID

Given an invalid edit URL,

When the page loads,

Then a user-friendly not-found state should appear.

## AC-16 Responsive UX

On a small screen,

Then the interface should remain usable without horizontal overflow.

---

# 70. Definition of Done

A feature is considered complete only when:

- UI is implemented
- State logic works
- Persistence works when applicable
- Validation exists where applicable
- Error/empty state exists where appropriate
- Responsive behavior is checked
- No obvious console errors exist
- Code is formatted and understandable
- Feature is committed in Git

---

# 71. Final QA Checklist

## Functional

- [ ] Can create a task
- [ ] Can edit a task
- [ ] Can delete a task
- [ ] Delete requires confirmation
- [ ] Search works
- [ ] Status filter works
- [ ] Search and filter combine correctly
- [ ] Tasks survive refresh
- [ ] Invalid title is rejected
- [ ] Optional fields work
- [ ] Invalid task ID is handled

## UI

- [ ] Status badges are clearly colored
- [ ] Priority is visible
- [ ] Due date is readable
- [ ] Buttons have clear hierarchy
- [ ] Empty state is polished
- [ ] Mobile layout works
- [ ] Dark mode works if implemented
- [ ] No visual overflow

## Code

- [ ] TypeScript types are clear
- [ ] Components are reasonably sized
- [ ] No duplicated CRUD logic
- [ ] No direct state mutation
- [ ] localStorage access is client-safe
- [ ] Derived data is not stored unnecessarily
- [ ] Naming is consistent
- [ ] Dead code removed

## Git

- [ ] Multiple meaningful commits
- [ ] Commit messages describe real changes
- [ ] No giant single final commit
- [ ] Repository is public
- [ ] Main branch is clean

## Documentation

- [ ] README exists
- [ ] Setup instructions work
- [ ] Tech stack documented
- [ ] Architecture documented
- [ ] Assumptions documented
- [ ] Skipped features documented
- [ ] Deployment link included if available

The Git and README expectations are directly specified by the assignment. fileciteturn0file0L101-L111

---

# 72. Interview / Code Walkthrough Preparedness

The assignment explicitly allows AI coding assistants but states that the candidate should understand and be able to explain every part of the code. fileciteturn0file0L126-L128

Be prepared to explain:

### Why localStorage?

Because the assignment permits it and no real backend/database is required.

### Why a custom `useTasks` hook?

To isolate stateful CRUD/persistence logic from UI components.

### Why TypeScript?

To model Task, Status, Priority, form values, and callback contracts safely.

### Why derive filtered tasks?

Because search/filter/sort results are derived from canonical task state.

### Why not mutate arrays?

React state should be updated immutably for predictable rendering.

### Why localStorage in `useEffect`?

Because browser localStorage is not available during server rendering.

### Why a reusable TaskForm?

It avoids duplicating create/edit form logic.

### Why confirm before delete?

Because deletion is destructive and the assignment explicitly requires confirmation.

### Why multiple Git commits?

Because the assessment explicitly evaluates Git hygiene and asks to see development process.

---

# 73. Recommended Demo Flow

When presenting the finished assignment:

```text
1. Open Task Board
2. Show empty state
3. Create a task
4. Show validation briefly with invalid title
5. Create valid task
6. Create two more tasks with different statuses/priorities
7. Search by title
8. Filter by status
9. Sort by priority/due date
10. Edit a task
11. Delete a task and show confirmation
12. Refresh browser
13. Demonstrate persistence
14. Toggle dark mode
15. Resize to mobile layout
16. Show Git history
17. Show README
```

This flow demonstrates nearly every evaluation dimension with minimal presentation time.

---

# 74. Final Product Vision

The finished Task Board should feel like a small but complete product rather than a collection of assignment requirements.

The ideal experience is:

```text
Open app
   ↓
Immediately understand the board
   ↓
Create task quickly
   ↓
See status + priority clearly
   ↓
Find tasks instantly
   ↓
Edit or delete safely
   ↓
Refresh and keep data
   ↓
Use comfortably on desktop/mobile
```

The project should resist unnecessary complexity. The assessment explicitly states that clean, simple, working code is more valuable than a feature-heavy but unreliable implementation. fileciteturn0file0L95-L100

---

# 75. Final Recommended Stack

```text
Framework:       Next.js App Router
Language:        TypeScript
UI:              React Functional Components
Styling:         Tailwind CSS
State:           React useState/useEffect + custom useTasks hook
Persistence:     localStorage
Validation:      Custom utility
Testing:         Jest/Vitest + React Testing Library (bonus)
Deployment:      Vercel (bonus)
Repository:      Public GitHub
```

No paid services are required. The assessment specifically asks candidates to keep the solution simple and free to run locally. fileciteturn0file0L118-L120

---

# 76. Source of Requirements

This PRD is based primarily on the provided coding assessment:

**Coding Assignment — React / Next.js Developer**

The source assignment specifies:

- Task Board overview
- Next.js/React requirements
- Task list
- Create task
- Edit task
- Delete task
- Search/filter
- Persistence
- Optional bonus features
- Evaluation criteria
- GitHub/submission requirements
- README requirements
- Simplicity expectations
- AI coding assistant usage expectations

The assessment describes the assignment as a 3–5 hour exercise for a React/Next.js developer with 1–2 years of experience and a 3-day deadline. fileciteturn0file0L2-L4

---

# 77. Implementation Principle

> **Build the required features perfectly first. Add polish only after reliability is established.**

The strongest submission is not the one with the most features.

It is the one where:

- every required feature works,
- the UI feels intentional,
- the architecture is easy to understand,
- the code is clean,
- state is handled correctly,
- persistence is reliable,
- error/empty states are considered,
- Git history shows real progress,
- and the developer can confidently explain every important decision.

