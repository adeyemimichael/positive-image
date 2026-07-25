import { supabase, GalleryImage } from '../lib/supabase';

export const getGalleryImages = async (filters?: { category?: string; status?: string }): Promise<GalleryImage[]> => {
  try {
    let query = supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.category && filters.category !== 'All') {
      query = query.eq('category', filters.category);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    throw error;
  }
};

export const uploadGalleryImage = async (file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('gallery-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('gallery-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading gallery image:', error);
    throw error;
  }
};

export const createGalleryImage = async (
  imageData: Omit<GalleryImage, 'id' | 'created_at' | 'upload_date'>
): Promise<GalleryImage> => {
  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .insert([{
        ...imageData,
        upload_date: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating gallery image record:', error);
    throw error;
  }
};

export const deleteGalleryImage = async (id: string, imageUrl?: string): Promise<void> => {
  try {
    // Optional: Delete from storage if imageUrl is provided and belongs to storage
    if (imageUrl && imageUrl.includes('supabase.co/storage')) {
      const pathParts = imageUrl.split('/');
      const filePath = `gallery/${pathParts[pathParts.length - 1]}`;
      await supabase.storage.from('gallery-images').remove([filePath]);
    }

    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    throw error;
  }
};
