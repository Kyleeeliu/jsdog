import { supabase } from './client';
import { User } from '@/types';

// Supabase table name for users
const USERS_TABLE = 'users';

export const createUser = async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .insert([{
      email: userData.email,
      full_name: userData.full_name,
      role: userData.role,
      phone: userData.phone,
      avatar_url: userData.avatar_url,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }

  return data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }

  return data || [];
};

export const getUserById = async (id: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }

  return data;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }

  return data;
};

export const updateUser = async (id: string, updates: Partial<Omit<User, 'id' | 'created_at'>>): Promise<User | null> => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    return null;
  }

  return data;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from(USERS_TABLE)
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting user:', error);
    return false;
  }

  return true;
};

export const searchUsers = async (searchTerm: string, role?: string): Promise<User[]> => {
  let query = supabase
    .from(USERS_TABLE)
    .select('*')
    .or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);

  if (role) {
    query = query.eq('role', role);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching users:', error);
    return [];
  }

  return data || [];
};

export const getUsersByRole = async (role: string): Promise<User[]> => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .select('*')
    .eq('role', role)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users by role:', error);
    return [];
  }

  return data || [];
};

// Sync user with Supabase auth - create user profile if it doesn't exist
export const syncUserWithAuth = async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> => {
  const existingUser = await getUserByEmail(userData.email);
  if (existingUser) {
    return existingUser;
  }
  return await createUser(userData);
};

// Get current user from Supabase auth and sync with users table
export const getCurrentSupabaseUser = async (): Promise<User | null> => {
  const { data: { user: authUser } } = await supabase.auth.getUser();
  
  if (!authUser) {
    return null;
  }

  // Check if user exists in our users table
  let user = await getUserByEmail(authUser.email!);
  
  if (!user) {
    // Create user profile if it doesn't exist
    user = await createUser({
      email: authUser.email!,
      full_name: authUser.user_metadata?.full_name || authUser.email!.split('@')[0],
      role: authUser.user_metadata?.role || 'parent',
      phone: authUser.user_metadata?.phone,
      avatar_url: authUser.user_metadata?.avatar_url,
    });
  }

  return user;
};
