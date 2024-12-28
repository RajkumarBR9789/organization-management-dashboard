# Organization Management Dashboard

A comprehensive web application for managing organizations, teams, and members with image upload capabilities.

## Features

- Organization Management
  - Register organizations with name, email, and location
  - View all organizations in a hierarchical structure

- Team Management
  - Create teams under organizations
  - Associate teams with their parent organization

- Member Management
  - Add members to teams
  - Upload profile images for members
  - Track image upload status with visual indicators

- Hierarchical View
  - Display organizations, teams, and members in a nested structure
  - Visual status indicators for member profile images

## Tech Stack

- Frontend:
  - React with TypeScript
  - Tailwind CSS for styling
  - React Router for navigation
  - Zustand for state management
  - Lucide React for icons

- Backend:
  - Supabase for database and storage
  - Row Level Security (RLS) for data protection
  - Image storage with public URLs

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new Supabase project
   - Click "Connect to Supabase" in the top right of the editor
   - Set up the database schema using the migration in `supabase/migrations/initial_schema.sql`

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/         # React components
├── lib/               # Utility functions and configurations
├── store/             # State management
├── types/             # TypeScript type definitions
└── App.tsx            # Main application component
```

## API Endpoints

The application uses Supabase's auto-generated REST API endpoints:

- `GET /rest/v1/organizations` - List all organizations
- `GET /rest/v1/teams` - List all teams
- `GET /rest/v1/members` - List all members
- `POST /rest/v1/organizations` - Create a new organization
- `POST /rest/v1/teams` - Create a new team
- `POST /rest/v1/members` - Create a new member
- `PATCH /rest/v1/members` - Update member details

## Security

- Row Level Security (RLS) enabled on all tables
- Authenticated access required for all operations
- Secure image upload and storage

## Limitations

- Image uploads are limited to 10MB
- Supported image formats: PNG, JPG, GIF
- Email confirmation is disabled by default