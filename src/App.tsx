import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import OrganizationForm from './components/OrganizationForm';
import TeamForm from './components/TeamForm';
import MemberForm from './components/MemberForm';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { error } = await supabase.from('organizations').select('count');
        if (error) throw error;
        setIsLoading(false);
      } catch (err) {
        setError('Failed to connect to the database. Please check your configuration.');
        setIsLoading(false);
      }
    };

    checkConnection();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h2>
          <p className="text-gray-600">{error}</p>
          <p className="mt-4 text-sm text-gray-500">
            Please ensure you have:
            <ul className="list-disc ml-5 mt-2">
              <li>Connected to Supabase (click "Connect to Supabase" button)</li>
              <li>Set up the database schema</li>
              <li>Added the correct environment variables</li>
            </ul>
          </p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-organization" element={<OrganizationForm />} />
            <Route path="/add-team" element={<TeamForm />} />
            <Route path="/add-member" element={<MemberForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;