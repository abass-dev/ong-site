'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AuthService } from '@/lib/auth/sessions';

export default function DashboardPage() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem('sessionToken');
      
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('/api/auth/validate', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          localStorage.removeItem('sessionToken');
          router.push('/login');
        }
      } catch (error) {
        router.push('/login');
      }
    };

    validateSession();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('sessionToken');
    router.push('/login');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}