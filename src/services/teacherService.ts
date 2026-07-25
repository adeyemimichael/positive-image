import { supabase, Teacher } from '../lib/supabase';

export const getTeachers = async (filters?: { campus?: string; status?: string }): Promise<Teacher[]> => {
  try {
    let query = supabase
      .from('teachers')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.campus && filters.campus !== 'All') {
      query = query.eq('campus', filters.campus);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error;
  }
};

export const createTeacher = async (
  teacherData: Omit<Teacher, 'id' | 'created_at' | 'updated_at'>
): Promise<Teacher> => {
  try {
    const { data, error } = await supabase
      .from('teachers')
      .insert([{
        ...teacherData,
        status: teacherData.status || 'active'
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating teacher:', error);
    throw error;
  }
};

export const updateTeacher = async (
  id: string,
  updates: Partial<Teacher>
): Promise<Teacher> => {
  try {
    const { data, error } = await supabase
      .from('teachers')
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
    console.error('Error updating teacher:', error);
    throw error;
  }
};

export const deleteTeacher = async (id: string, photoUrl?: string): Promise<void> => {
  try {
    // Optional: Delete from storage if photoUrl is provided and belongs to storage
    if (photoUrl && photoUrl.includes('supabase.co/storage')) {
      const pathParts = photoUrl.split('/');
      const filePath = `teachers/${pathParts[pathParts.length - 1]}`;
      await supabase.storage.from('teacher-photos').remove([filePath]);
    }

    const { error } = await supabase
      .from('teachers')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting teacher:', error);
    throw error;
  }
};

export const uploadTeacherPhoto = async (file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
    const filePath = `teachers/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('teacher-photos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('teacher-photos')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading teacher photo:', error);
    throw error;
  }
};
