import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    <div className="p-4">
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full">Log In</Button>
      </form>
      <div className="mt-4 space-y-2">
        <Button onClick={() => handleSocialLogin('google')} className="w-full">Login with Google</Button>
        <Button onClick={() => handleSocialLogin('facebook')} className="w-full">Login with Facebook</Button>
        <Button onClick={() => handleSocialLogin('twitter')} className="w-full">Login with Twitter</Button>
      </div>
    </div>
  );
};

export default Auth;