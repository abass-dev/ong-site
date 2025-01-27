'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorToken, setTwoFactorToken] = useState('');
  const [error, setError] = useState('');
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          password, 
          twoFactorToken: requiresTwoFactor ? twoFactorToken : undefined 
        })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.requiresTwoFactor) {
          setRequiresTwoFactor(true);
        } else {
          localStorage.setItem('sessionToken', data.sessionToken);
          router.push('/dashboard');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-6">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        {!requiresTwoFactor ? (
          <>
            <Input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <Input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </>
        ) : (
          <Input 
            type="text" 
            placeholder="Two-Factor Token" 
            value={twoFactorToken}
            onChange={(e) => setTwoFactorToken(e.target.value)}
            required 
          />
        )}

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" className="w-full">
          {requiresTwoFactor ? 'Verify 2FA' : 'Login'}
        </Button>
      </form>
    </div>
  );
}