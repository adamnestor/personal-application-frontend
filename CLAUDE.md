# Personal Application Frontend

A React + TypeScript frontend application with budget management and authentication features.

## Tech Stack
- **Framework**: React 19.1 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query (@tanstack/react-query)
- **HTTP Client**: Axios
- **UI Libraries**: @dnd-kit for drag-and-drop functionality
- **Date Handling**: date-fns

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production (runs TypeScript check + Vite build)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure
- `src/components/` - React components organized by feature
  - `auth/` - Authentication forms
  - `budget/` - Budget management components
  - `layout/` - Layout components (Header, Sidebar)
  - `ui/` - Reusable UI components
- `src/services/` - API service layer
- `src/hooks/` - Custom React hooks
- `src/context/` - React context providers
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions

## Key Features
- User authentication (login/register)
- Budget management with calendar interface
- Template system for budget items
- Drag-and-drop functionality
- Responsive design with Tailwind CSS