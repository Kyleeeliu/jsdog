'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCurrentUser, signIn, signOut } from '@/lib/auth/auth';

export default function DebugPage() {
  const [user, setUser] = useState<any>(null);
  const [localStorageData, setLocalStorageData] = useState<any>({});
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth error:', error);
      }
    };

    // Get localStorage data
    const mockUser = localStorage.getItem('mockUser');
    const newUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('newUser_')) {
        newUsers.push({ key, value: localStorage.getItem(key) });
      }
    }

    setLocalStorageData({
      mockUser,
      newUsers,
      totalItems: localStorage.length
    });

    checkAuth();
  }, []);

  const clearAll = () => {
    localStorage.clear();
    setLocalStorageData({});
    setUser(null);
    setTestResults([]);
    window.location.reload();
  };

  const testDemoAccounts = async () => {
    const results: string[] = [];
    
    // Test admin account
    try {
      await signIn('admin@justdogs.co.za', 'admin123');
      const adminUser = await getCurrentUser();
      if (adminUser && adminUser.role === 'admin') {
        results.push('✅ Admin account works');
      } else {
        results.push('❌ Admin account failed');
      }
      await signOut();
    } catch (error) {
      results.push('❌ Admin account error: ' + error);
    }

    // Test trainer account
    try {
      await signIn('trainer@justdogs.co.za', 'trainer123');
      const trainerUser = await getCurrentUser();
      if (trainerUser && trainerUser.role === 'trainer') {
        results.push('✅ Trainer account works');
      } else {
        results.push('❌ Trainer account failed');
      }
      await signOut();
    } catch (error) {
      results.push('❌ Trainer account error: ' + error);
    }

    // Test parent account
    try {
      await signIn('parent@justdogs.co.za', 'parent123');
      const parentUser = await getCurrentUser();
      if (parentUser && parentUser.role === 'parent') {
        results.push('✅ Parent account works');
      } else {
        results.push('❌ Parent account failed');
      }
      await signOut();
    } catch (error) {
      results.push('❌ Parent account error: ' + error);
    }

    setTestResults(results);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Debug Page</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Authentication Status</CardTitle>
            <CardDescription>Current user and authentication state</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>LocalStorage Data</CardTitle>
            <CardDescription>All authentication-related localStorage items</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
              {JSON.stringify(localStorageData, null, 2)}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demo Account Tests</CardTitle>
            <CardDescription>Test if demo accounts are working</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={testDemoAccounts}>
              Test Demo Accounts
            </Button>
            {testResults.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Test Results:</h4>
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm">
                    {result}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Debug actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={clearAll} variant="destructive">
              Clear All localStorage
            </Button>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
            <Button onClick={() => window.location.href = '/login'}>
              Go to Login
            </Button>
            <Button onClick={() => window.location.href = '/dashboard'}>
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
