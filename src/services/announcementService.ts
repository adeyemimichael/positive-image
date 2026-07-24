// Announcement Service - Handles all announcement-related database operations
import { supabase, Announcement } from '../lib/supabase';

/**
 * Fetch all active announcements, ordered by upload date (newest first)
 */
export const getAnnouncements = async (): Promise<Announcement[]> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('status', 'active')
      .order('upload_date', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
};

/**
 * Fetch a single announcement by ID
 */
export const getAnnouncementById = async (id: string): Promise<Announcement | null> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching announcement:', error);
    throw error;
  }
};

/**
 * Create a new announcement
 */
export const createAnnouncement = async (
  announcementData: Omit<Announcement, 'id' | 'created_at' | 'updated_at'>
): Promise<Announcement> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .insert([{
        ...announcementData,
        status: announcementData.status || 'active',
        upload_date: announcementData.upload_date || new Date().toISOString(),
        published_date: announcementData.published_date || new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating announcement:', error);
    throw error;
  }
};

/**
 * Update an existing announcement
 */
export const updateAnnouncement = async (
  id: string,
  updates: Partial<Announcement>
): Promise<Announcement> => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating announcement:', error);
    throw error;
  }
};

/**
 * Delete an announcement (soft delete by setting status to 'archived')
 */
export const deleteAnnouncement = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('announcements')
      .update({ status: 'archived' })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting announcement:', error);
    throw error;
  }
};

/**
 * Permanently delete an announcement from database
 */
export const permanentlyDeleteAnnouncement = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error permanently deleting announcement:', error);
    throw error;
  }
};

/**
 * Upload announcement image to Supabase Storage
 */
export const uploadAnnouncementImage = async (
  file: File,
  announcementId: string
): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${announcementId}-${Date.now()}.${fileExt}`;
    const filePath = `announcements/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('announcement-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage
      .from('announcement-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading announcement image:', error);
    throw error;
  }
};

/**
 * Delete announcement image from Supabase Storage
 */
export const deleteAnnouncementImage = async (imageUrl: string): Promise<void> => {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split('/announcement-images/');
    if (urlParts.length < 2) return;
    
    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from('announcement-images')
      .remove([`announcements/${filePath}`]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting announcement image:', error);
    // Don't throw - image deletion is not critical
  }
};
