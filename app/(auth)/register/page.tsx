'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QRCodeSVG } from 'qrcode.react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [twoFactorSecret, setTwoFactorSecret] = useState<string | null>(null);
  const [twoFactorToken, setTwoFactorToken] = useState('');

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setTwoFactorSecret(data.twoFactorSecret);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Try again.');
    }
  };

  const handleTwoFactorSetup = async (e: React.FormEvent) => {
    try {
      const response = await fetch('/api/auth/2fa?action=enable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          token: twoFactorToken 
        })
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/login');
      } else {
        setError(data.error || '2FA setup failed');
      }
    } catch (err) {
      setError('Network error. Try again.');
    }
  };

  if (twoFactorSecret) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl mb-4">Set Up Two-Factor Authentication</h2>
        <div className="text-center">
          <QRCodeSVG value={`otpauth://totp/SecureApp:${email}?secret=${twoFactorSecret}&issuer=SecureApp`} />
          <p className="mt-4">Scan QR code with authenticator app</p>
          <form onSubmit={handleTwoFactorSetup} className="mt-4 space-y-4">
            <Input 
              type="text" 
              placeholder="Enter 6-digit token" 
              value={twoFactorToken}
              onChange={(e) => setTwoFactorToken(e.target.value)}
              required 
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Enable Two-Factor Authentication
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-6">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
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
        <Input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required 
        />

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </div>
  );
}