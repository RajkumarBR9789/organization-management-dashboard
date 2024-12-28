import { create } from 'zustand';
import { Organization, Team, Member } from '../types';
import { supabase } from '../lib/supabase';

interface AppState {
  organizations: Organization[];
  teams: Team[];
  members: Member[];
  loading: boolean;
  fetchOrganizations: () => Promise<void>;
  fetchTeams: () => Promise<void>;
  fetchMembers: () => Promise<void>;
  addOrganization: (org: Partial<Organization>) => Promise<Organization | null>;
  addTeam: (team: Partial<Team>) => Promise<Team | null>;
  addMember: (member: Partial<Member>) => Promise<Member | null>;
  updateMemberImage: (memberId: string, imageUrl: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  organizations: [],
  teams: [],
  members: [],
  loading: false,

  fetchOrganizations: async () => {
    const { data } = await supabase.from('organizations').select('*');
    if (data) set({ organizations: data });
  },

  fetchTeams: async () => {
    const { data } = await supabase.from('teams').select('*');
    if (data) set({ teams: data });
  },

  fetchMembers: async () => {
    const { data } = await supabase.from('members').select('*');
    if (data) set({ members: data });
  },

  addOrganization: async (org) => {
    const { data, error } = await supabase
      .from('organizations')
      .insert([org])
      .select()
      .single();
    
    if (error) return null;
    
    set(state => ({
      organizations: [...state.organizations, data]
    }));
    
    return data;
  },

  addTeam: async (team) => {
    const { data, error } = await supabase
      .from('teams')
      .insert([team])
      .select()
      .single();
    
    if (error) return null;
    
    set(state => ({
      teams: [...state.teams, data]
    }));
    
    return data;
  },

  addMember: async (member) => {
    const { data, error } = await supabase
      .from('members')
      .insert([{ ...member, image_status: 'not_uploaded' }])
      .select()
      .single();
    
    if (error) return null;
    
    set(state => ({
      members: [...state.members, data]
    }));
    
    return data;
  },

  updateMemberImage: async (memberId, imageUrl) => {
    await supabase
      .from('members')
      .update({ 
        image_url: imageUrl,
        image_status: 'uploaded'
      })
      .eq('id', memberId);

    set(state => ({
      members: state.members.map(member =>
        member.id === memberId
          ? { ...member, image_url: imageUrl, image_status: 'uploaded' }
          : member
      )
    }));
  },
}));