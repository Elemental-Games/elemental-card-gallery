import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PasswordProtectedRoute = ({ children, password }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState('');

  useEffect(() => {
    const storedPassword = localStorage.getItem('investor_password');
    if (storedPassword === password) {
      setIsAuthenticated(true);
    }
  }, [password]);

  const handlePasswordSubmit = () => {
    if (inputPassword === password) {
      localStorage.setItem('investor_password', inputPassword);
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">Enter Password</h2>
        <p className="text-center text-gray-400">This content is protected. Please enter the password to view.</p>
        <div className="flex space-x-2">
          <Input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Password"
            className="flex-grow"
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordProtectedRoute;
