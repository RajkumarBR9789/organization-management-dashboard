import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { supabase } from '../lib/supabase';
import { UserPlus, Upload } from 'lucide-react';

const MemberForm = () => {
  const navigate = useNavigate();
  const { 
    organizations,
    teams,
    fetchOrganizations,
    fetchTeams,
    addMember,
    updateMemberImage
  } = useStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    team_id: '',
    organization_id: ''
  });
  
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    fetchOrganizations();
    fetchTeams();
  }, []);

  const filteredTeams = teams.filter(
    team => team.organization_id === formData.organization_id
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async (memberId: string) => {
    if (!image) return;

    const fileExt = image.name.split('.').pop();
    const fileName = `${memberId}.${fileExt}`;
    const filePath = `member-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('members')
      .upload(filePath, image);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('members')
      .getPublicUrl(filePath);

    await updateMemberImage(memberId, publicUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { organization_id, ...memberData } = formData;
    const result = await addMember(memberData);
    
    if (result && image) {
      await uploadImage(result.id);
    }
    
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <UserPlus className="h-6 w-6 mr-2 text-indigo-600" />
          Add Member
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Organization
            </label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.organization_id}
              onChange={e => setFormData(prev => ({ ...prev, organization_id: e.target.value, team_id: '' }))}
            >
              <option value="">Select an organization</option>
              {organizations.map(org => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Team
            </label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.team_id}
              onChange={e => setFormData(prev => ({ ...prev, team_id: e.target.value }))}
            >
              <option value="">Select a team</option>
              {filteredTeams.map(team => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <div className="mt-1 flex items-center">
              <label className="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-500">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
}

export default MemberForm;