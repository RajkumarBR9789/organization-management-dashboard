import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, UserPlus } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl">OrgManager</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/add-organization"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              <Building2 className="h-4 w-4" />
              <span>Add Organization</span>
            </Link>
            
            <Link
              to="/add-team"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              <Users className="h-4 w-4" />
              <span>Add Team</span>
            </Link>
            
            <Link
              to="/add-member"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              <UserPlus className="h-4 w-4" />
              <span>Add Member</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;