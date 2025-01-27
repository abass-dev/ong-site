'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QRCodeSVG } from 'qrcode.react';

interface TwoFactorSetupProps {
  email: string;
  twoFactorSecret: string;
}

export function TwoFactorSetup({ email, twoFactorSecret }: TwoFactorSetupProps) {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleTwoFactorSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/2fa?action=enable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token })
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/dashboard');
      } else {
        setError(data.error || '2FA setup failed');
      }
    } catch (err) {
      setError('Network error. Try again.');
    }
  };

  return (
    <div className="text-center">
      <QRCodeSVG value={`otpauth://totp/SecureApp:${email}?secret=${twoFactorSecret}&issuer=SecureApp`} />
      <p className="mt-4">Scan QR code with authenticator app</p>
      <form onSubmit={handleTwoFactorSetup} className="mt-4 space-y-4">
        <Input 
          type="text" 
          placeholder="Enter 6-digit token" 
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required 
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="w-full">
          Enable Two-Factor Authentication
        </Button>
      </form>
    </div>
  );
}