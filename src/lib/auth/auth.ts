import { supabase } from '../supabase/client';
import { User, UserRole } from '@/types';

// Mock user data for development when Supabase is not configured
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@justdogs.co.za',
    full_name: 'Admin User',
    role: 'admin',
    phone: '+27 82 123 4567',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'trainer@justdogs.co.za',
    full_name: 'Trainer User',
    role: 'trainer',
    phone: '+27 83 987 6543',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'parent@justdogs.co.za',
    full_name: 'Parent User',
    role: 'parent',
    phone: '+27 84 555 1234',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && 
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
         process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co';
};

export async function signIn(email: string, password: string) {
  console.log('SignIn called with:', { email, password });
  
  if (!isSupabaseConfigured()) {
    console.log('Using mock authentication');
    
    // First, check for newly registered users
    const newUserStr = localStorage.getItem('newUser_' + email);
    if (newUserStr) {
      console.log('Found newly registered user');
      const newUser = JSON.parse(newUserStr);
      // For newly registered users, accept any password (since we don't store passwords in mock)
      localStorage.setItem('mockUser', JSON.stringify(newUser));
      localStorage.removeItem('newUser_' + email);
      return { user: newUser, session: { user: newUser } };
    }
    
    // Check demo accounts
    const mockUser = mockUsers.find(user => user.email === email);
    console.log('Looking for demo user:', email, 'Found:', mockUser);
    
    if (mockUser) {
      // Demo account passwords
      const validPasswords = ['admin123', 'trainer123', 'parent123'];
      console.log('Checking password:', password, 'Valid passwords:', validPasswords);
      
      if (validPasswords.includes(password)) {
        console.log('Demo account login successful');
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        return { user: mockUser, session: { user: mockUser } };
      } else {
        console.log('Invalid password for demo account');
      }
    } else {
      console.log('No demo user found for email:', email);
    }
    
    console.log('Authentication failed - throwing error');
    throw new Error('Invalid email or password');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signUp(email: string, password: string, fullName: string, role: UserRole) {
  console.log('SignUp called with:', { email, fullName, role });
  
  if (!isSupabaseConfigured()) {
    console.log('Using mock registration');
    
    // Mock registration for development
    const newUser: User = {
      id: Date.now().toString(),
      email,
      full_name: fullName,
      role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // Store the new user temporarily with their password
    localStorage.setItem('newUser_' + email, JSON.stringify(newUser));
    localStorage.setItem('userPassword_' + email, password);
    
    // Also store in mockUsers array for future reference
    mockUsers.push(newUser);
    
    console.log('Mock registration successful');
    // Return the user immediately for mock authentication
    return { user: newUser, session: { user: newUser } };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signOut() {
  console.log('SignOut called');
  
  if (!isSupabaseConfigured()) {
    // Clear mock session
    localStorage.removeItem('mockUser');
    console.log('Mock session cleared');
    return;
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser(): Promise<User | null> {
  console.log('getCurrentUser called');
  
  if (!isSupabaseConfigured()) {
    // Get mock user from localStorage
    const mockUserStr = localStorage.getItem('mockUser');
    console.log('Mock user from localStorage:', mockUserStr);
    
    if (mockUserStr) {
      const user = JSON.parse(mockUserStr);
      console.log('Returning mock user:', user);
      return user;
    }
    
    console.log('No mock user found');
    return null;
  }

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  // Get user profile from our users table
  const { data: profile, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    return null;
  }

  return profile;
}

export async function updateUserProfile(userId: string, updates: Partial<User>) {
  if (!isSupabaseConfigured()) {
    // Mock profile update
    const mockUserStr = localStorage.getItem('mockUser');
    if (mockUserStr) {
      const mockUser = JSON.parse(mockUserStr);
      const updatedUser = { ...mockUser, ...updates, updated_at: new Date().toISOString() };
      localStorage.setItem('mockUser', JSON.stringify(updatedUser));
      return updatedUser;
    }
    throw new Error('User not found');
  }

  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    parent: 1,
    trainer: 2,
    admin: 3,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

export function canAccessResource(
  userRole: UserRole,
  resourceOwnerId: string,
  currentUserId: string
): boolean {
  // Admins can access everything
  if (userRole === 'admin') return true;
  
  // Users can access their own resources
  if (resourceOwnerId === currentUserId) return true;
  
  // Trainers can access resources related to their bookings
  if (userRole === 'trainer') {
    // This would need to be checked against the specific resource
    // For now, return false - this should be handled in specific queries
    return false;
  }
  
  return false;
}

export async function resetPassword(email: string) {
  if (!isSupabaseConfigured()) {
    console.log('Mock password reset for:', email);
    return;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function updatePassword(newPassword: string) {
  if (!isSupabaseConfigured()) {
    console.log('Mock password update');
    return;
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error(error.message);
  }
}
