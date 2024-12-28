/*
  # Initial Schema Setup for Organization Management

  1. New Tables
    - organizations
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - location (text)
      - created_at (timestamp)
      
    - teams
      - id (uuid, primary key)
      - name (text)
      - organization_id (uuid, foreign key)
      - created_at (timestamp)
      
    - members
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - team_id (uuid, foreign key)
      - image_url (text)
      - image_status (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Organizations table
CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  location text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read organizations"
  ON organizations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert organizations"
  ON organizations FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Teams table
CREATE TABLE teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read teams"
  ON teams FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert teams"
  ON teams FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Members table
CREATE TABLE members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  image_url text,
  image_status text DEFAULT 'not_uploaded',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read members"
  ON members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert and update members"
  ON members FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);