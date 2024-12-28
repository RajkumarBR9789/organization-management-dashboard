import React, { useEffect } from 'react';
import { useStore } from '../store';
import { Building2, Users, User, Check, X } from 'lucide-react';

const Dashboard = () => {
  const { 
    organizations,
    teams,
    members,
    fetchOrganizations,
    fetchTeams,
    fetchMembers
  } = useStore();

  useEffect(() => {
    fetchOrganizations();
    fetchTeams();
    fetchMembers();
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Building2 className="h-6 w-6 mr-2 text-indigo-600" />
          Organizations
        </h2>
        <div className="space-y-4">
          {organizations.map(org => (
            <div key={org.id} className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold">{org.name}</h3>
              <p className="text-gray-600">{org.email}</p>
              <p className="text-gray-600">{org.location}</p>
              
              <div className="mt-4 pl-4 border-l-2 border-indigo-200">
                <h4 className="text-lg font-medium flex items-center">
                  <Users className="h-5 w-5 mr-2 text-indigo-500" />
                  Teams
                </h4>
                {teams
                  .filter(team => team.organization_id === org.id)
                  .map(team => (
                    <div key={team.id} className="mt-2 pl-4">
                      <h5 className="font-medium">{team.name}</h5>
                      <div className="mt-2 space-y-2">
                        {members
                          .filter(member => member.team_id === team.id)
                          .map(member => (
                            <div 
                              key={member.id}
                              className="flex items-center space-x-3 p-2 bg-gray-50 rounded"
                            >
                              {member.image_url ? (
                                <img
                                  src={member.image_url}
                                  alt={member.name}
                                  className="h-8 w-8 rounded-full object-cover"
                                />
                              ) : (
                                <User className="h-8 w-8 p-1 bg-gray-200 rounded-full" />
                              )}
                              <span>{member.name}</span>
                              {member.image_status === 'uploaded' ? (
                                <Check className="h-5 w-5 text-green-500" />
                              ) : (
                                <X className="h-5 w-5 text-red-500" />
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;