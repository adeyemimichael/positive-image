// Student Service - Handles all student registration database operations
import { supabase, Student } from '../lib/supabase';

/**
 * Create a new student registration
 */
export const createStudentRegistration = async (
  studentData: Omit<Student, 'id' | 'created_at' | 'updated_at'>
): Promise<Student> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .insert([{
        ...studentData,
        registration_date: studentData.registration_date || new Date().toISOString(),
        registration_status: studentData.registration_status || 'pending',
        payment_status: studentData.payment_status || 'pending'
      }])
      .select()
      .single();

    if (error) throw error;

    // Record initial pending payment in payments table
    if (data?.id && studentData.payment_reference) {
      await supabase
        .from('payments')
        .upsert([{
          student_id: data.id,
          reference: studentData.payment_reference,
          amount: studentData.payment_amount || 0,
          currency: 'NGN',
          payment_type: 'registration_fee',
          status: studentData.payment_status || 'pending',
          payment_method: 'pending'
        }], { onConflict: 'reference' })
        .catch(e => console.warn('Payment record notice:', e));
    }

    return data;
  } catch (error) {
    console.error('Error creating student registration:', error);
    throw error;
  }
};

/**
 * Get student by ID
 */
export const getStudentById = async (id: string): Promise<Student | null> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching student:', error);
    throw error;
  }
};

/**
 * Get student by payment reference
 */
export const getStudentByPaymentReference = async (reference: string): Promise<Student | null> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('payment_reference', reference)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching student by payment reference:', error);
    return null;
  }
};

/**
 * Get all students (with optional filters)
 */
export const getStudents = async (filters?: {
  campus?: string;
  class?: string;
  status?: string;
}): Promise<Student[]> => {
  try {
    let query = supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.campus) {
      query = query.eq('campus', filters.campus);
    }
    if (filters?.class) {
      query = query.eq('class_applying_for', filters.class);
    }
    if (filters?.status) {
      query = query.eq('registration_status', filters.status);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

/**
 * Update student information
 */
export const updateStudent = async (
  id: string,
  updates: Partial<Student>
): Promise<Student> => {
  try {
    const { data, error } = await supabase
      .from('students')
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
    console.error('Error updating student:', error);
    throw error;
  }
};

/**
 * Update student payment information & record transaction in backend
 */
export const updateStudentPayment = async (
  paymentReference: string,
  paymentData: {
    payment_status: string;
    payment_amount?: number;
    payment_date?: string;
    payment_method?: string;
  }
): Promise<Student> => {
  try {
    // 1. Update students table
    const { data, error } = await supabase
      .from('students')
      .update({
        ...paymentData,
        updated_at: new Date().toISOString()
      })
      .eq('payment_reference', paymentReference)
      .select()
      .single();

    if (error) throw error;

    // 2. Record/Update in payments table in Supabase
    if (data) {
      await supabase
        .from('payments')
        .upsert([{
          student_id: data.id,
          reference: paymentReference,
          amount: paymentData.payment_amount || data.payment_amount || 0,
          currency: 'NGN',
          payment_type: 'registration_fee',
          status: paymentData.payment_status,
          payment_method: paymentData.payment_method || 'paystack',
          paid_at: paymentData.payment_date || new Date().toISOString()
        }], { onConflict: 'reference' })
        .catch(payErr => console.warn('Payment table sync notice:', payErr));
    }

    return data;
  } catch (error) {
    console.error('Error updating student payment:', error);
    throw error;
  }
};

/**
 * Upload student passport photo to Supabase Storage
 */
export const uploadStudentPhoto = async (
  file: File,
  studentId: string
): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${studentId}-${Date.now()}.${fileExt}`;
    const filePath = `students/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('student-photos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage
      .from('student-photos')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading student photo:', error);
    throw error;
  }
};

/**
 * Delete student (soft delete by changing status)
 */
export const deleteStudent = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('students')
      .update({ registration_status: 'cancelled' })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};
