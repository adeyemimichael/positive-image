/**
 * Format date to a readable string
 * @param dateString - Date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-NG', options);
};

/**
 * Generate a unique ID
 * @returns Unique ID string
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Filter an array of objects based on a search term
 * @param array - Array to filter
 * @param searchTerm - Search term
 * @param keys - Object keys to search in
 * @returns Filtered array
 */
export function filterArrayBySearchTerm<T>(
  array: T[], 
  searchTerm: string, 
  keys: (keyof T)[]
): T[] {
  if (!searchTerm.trim()) return array;
  
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
  return array.filter(item => {
    return keys.some(key => {
      const value = item[key];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerCaseSearchTerm);
      }
      return false;
    });
  });
}