import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: 'VISITOR' | 'REGISTERED' | 'SUBSCRIBED' | 'ADMIN';
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  last_login?: string;
  avatar_url?: string;
  phone?: string;
  date_of_birth?: string;
  preferences?: Record<string, unknown>;
}

export interface UpdateUserProfileData {
  first_name?: string;
  last_name?: string;
  phone?: string;
  date_of_birth?: string;
  preferences?: Record<string, unknown>;
  avatar_url?: string | null;
}

export class UserService {
  /**
   * Get current user profile from users table
   */
  static async getCurrentUserProfile(): Promise<UserProfile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getCurrentUserProfile:', error);
      return null;
    }
  }

  /**
   * Update user profile information
   */
  static async updateUserProfile(updates: UpdateUserProfileData): Promise<UserProfile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating user profile:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in updateUserProfile:', error);
      throw error;
    }
  }

  /**
   * Update user password
   */
  static async updateUserPassword(newPassword: string): Promise<void> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error('Error updating user password:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in updateUserPassword:', error);
      throw error;
    }
  }

  /**
   * Update user email (requires re-authentication and email confirmation)
   */
  static async updateUserEmail(newEmail: string): Promise<{ requiresConfirmation: boolean }> {
    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail
      });

      if (error) {
        console.error('Error updating user email:', error);
        throw error;
      }

      // Email change requires confirmation via email
      return { requiresConfirmation: true };
    } catch (error) {
      console.error('Error in updateUserEmail:', error);
      throw error;
    }
  }

  /**
   * Check if user has permission for action
   */
  static async hasPermission(requiredRole: 'VISITOR' | 'REGISTERED' | 'SUBSCRIBED' | 'ADMIN'): Promise<boolean> {
    try {
      const profile = await this.getCurrentUserProfile();
      if (!profile) return false;

      const roleHierarchy = {
        'VISITOR': 0,
        'REGISTERED': 1,
        'SUBSCRIBED': 2,
        'ADMIN': 3
      };

      const userRoleLevel = roleHierarchy[profile.role || 'VISITOR'];
      const requiredRoleLevel = roleHierarchy[requiredRole];

      return userRoleLevel >= requiredRoleLevel;
    } catch (error) {
      console.error('Error in hasPermission:', error);
      return false;
    }
  }
}