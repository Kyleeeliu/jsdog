import { supabase } from './client';
import { Message } from '@/types';

// Supabase table name for messages
const MESSAGES_TABLE = 'messages';

export const createMessage = async (messageData: Omit<Message, 'id' | 'created_at' | 'updated_at'>): Promise<Message> => {
  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .insert([{
      sender_id: messageData.sender_id,
      recipient_id: messageData.recipient_id,
      subject: messageData.subject,
      content: messageData.content,
      is_announcement: messageData.is_announcement,
      target_roles: messageData.target_roles,
      read_at: messageData.read_at,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating message:', error);
    throw error;
  }

  return data;
};

export const getAllMessages = async (): Promise<Message[]> => {
  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return data || [];
};

export const getMessagesByUser = async (userId: string): Promise<Message[]> => {
  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .select('*')
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId},is_announcement.eq.true`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages by user:', error);
    return [];
  }

  return data || [];
};

export const getMessagesByRecipient = async (recipientId: string): Promise<Message[]> => {
  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .select('*')
    .or(`recipient_id.eq.${recipientId},is_announcement.eq.true`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages by recipient:', error);
    return [];
  }

  return data || [];
};

export const getMessagesBySender = async (senderId: string): Promise<Message[]> => {
  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .select('*')
    .eq('sender_id', senderId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages by sender:', error);
    return [];
  }

  return data || [];
};

export const getMessageById = async (id: string): Promise<Message | null> => {
  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching message by ID:', error);
    return null;
  }

  return data;
};

export const updateMessage = async (id: string, updates: Partial<Omit<Message, 'id' | 'created_at'>>): Promise<Message | null> => {
  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating message:', error);
    return null;
  }

  return data;
};

export const deleteMessage = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from(MESSAGES_TABLE)
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting message:', error);
    return false;
  }

  return true;
};

export const searchMessages = async (searchTerm: string, userId?: string): Promise<Message[]> => {
  let query = supabase
    .from(MESSAGES_TABLE)
    .select('*')
    .or(`subject.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);

  if (userId) {
    query = query.or(`sender_id.eq.${userId},recipient_id.eq.${userId},is_announcement.eq.true`);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching messages:', error);
    return [];
  }

  return data || [];
};

export const getUnreadMessages = async (userId: string): Promise<Message[]> => {
  const { data, error } = await supabase
    .from(MESSAGES_TABLE)
    .select('*')
    .or(`recipient_id.eq.${userId},is_announcement.eq.true`)
    .is('read_at', null)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching unread messages:', error);
    return [];
  }

  return data || [];
};

export const markMessageAsRead = async (messageId: string): Promise<Message | null> => {
  return await updateMessage(messageId, { read_at: new Date().toISOString() });
};

// Real-time subscription for new messages
export const subscribeToMessages = (userId: string, callback: (message: Message) => void) => {
  return supabase
    .channel('messages')
    .on('postgres_changes', 
      { 
        event: 'INSERT', 
        schema: 'public', 
        table: MESSAGES_TABLE,
        filter: `or(sender_id.eq.${userId},recipient_id.eq.${userId},is_announcement.eq.true)`
      }, 
      (payload) => {
        callback(payload.new as Message);
      }
    )
    .subscribe();
};
