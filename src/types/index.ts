export interface Organization {
  id: string;
  name: string;
  email: string;
  location: string;
  created_at: string;
}

export interface Team {
  id: string;
  name: string;
  organization_id: string;
  created_at: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  team_id: string;
  image_url?: string;
  image_status: 'uploaded' | 'not_uploaded';
  created_at: string;
}