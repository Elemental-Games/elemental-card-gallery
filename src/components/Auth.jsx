import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, X } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log('Login with:', email, password);
  };

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log('Login with:', provider);
  };

  return (
    <div className="p-4 bg-white bg-opacity-10 rounded-lg shadow-lg">
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white bg-opacity-20 text-white placeholder-gray-300"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white bg-opacity-20 text-white placeholder-gray-300"
        />
        <Button type="submit" className="w-full bg-accent text-white">Log In</Button>
      </form>
      <div className="mt-4 space-y-2">
        <Button onClick={() => handleSocialLogin('google')} className="w-full bg-red-600 text-white">
          Login with Google
        </Button>
        <Button onClick={() => handleSocialLogin('facebook')} className="w-full bg-blue-600 text-white">
          <Facebook className="mr-2" /> Login with Facebook
        </Button>
        <Button onClick={() => handleSocialLogin('x')} className="w-full bg-black text-white">
          <X className="mr-2" /> Login with X
        </Button>
      </div>
    </div>
  );
};

export default Auth;
