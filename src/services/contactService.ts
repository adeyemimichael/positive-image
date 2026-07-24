// Contact Service - Handles contact form submissions
import { supabase, ContactMessage } from '../lib/supabase';

/**
 * Submit a contact form message
 */
export const submitContactMessage = async (
  messageData: Omit<ContactMessage, 'id' | 'created_at' | 'status'>
): Promise<ContactMessage> => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        ...messageData,
        status: 'new'
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error submitting contact message:', error);
    throw error;
  }
};

/**
 * Get all contact messages
 */
export const getContactMessages = async (status?: string): Promise<ContactMessage[]> => {
  try {
    let query = supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    throw error;
  }
};

/**
 * Get a single contact message by ID
 */
export const getContactMessageById = async (id: string): Promise<ContactMessage | null> => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching contact message:', error);
    throw error;
  }
};

/**
 * Update contact message status
 */
export const updateContactMessageStatus = async (
  id: string,
  status: string
): Promise<ContactMessage> => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating contact message status:', error);
    throw error;
  }
};

/**
 * Mark message as read
 */
export const markMessageAsRead = async (id: string): Promise<void> => {
  try {
    await updateContactMessageStatus(id, 'read');
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};

/**
 * Delete contact message
 */
export const deleteContactMessage = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting contact message:', error);
    throw error;
  }
};
