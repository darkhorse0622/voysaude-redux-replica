import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  birth?: string;
  phone?: string;
  cpf?: string;
  role?: 'VISITOR' | 'REGISTERED' | 'SUBSCRIBED' | 'ADMIN';
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  last_login?: string;
  avatar_url?: string;
  preferences?: Record<string, unknown>;
}

export interface UpdateUserProfileData {
  first_name?: string;
  last_name?: string;
  phone?: string;
  birth?: string;
  cpf?: string;
  preferences?: Record<string, unknown>;
  avatar_url?: string | null;
}

export interface DeliveryAddress {
  id?: string;
  user_id: string;
  cep?: string;
  address: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;
}

export class UserService {
  /**
   * Get current user profile from Supabase Auth
   */
  static async getCurrentUserProfile(): Promise<UserProfile | null> {
    try {
      // Get user from Supabase Auth session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return null;

      const user = session.user;

      return {
        id: user.id,
        first_name: user.user_metadata?.first_name || '',
        last_name: user.user_metadata?.last_name || '',
        email: user.email || '',
        birth: user.user_metadata?.birth || '',
        phone: user.user_metadata?.phone || '',
        cpf: user.user_metadata?.cpf || '',
        role: user.user_metadata?.role || 'REGISTERED',
        is_active: true,
        created_at: user.created_at,
        updated_at: user.updated_at,
        last_login: user.last_sign_in_at,
        avatar_url: user.user_metadata?.avatar_url || '',
        preferences: { cpf: user.user_metadata?.cpf || '' }
      };
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
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      const currentUser = session.user;
      
      // Get current user metadata
      const currentMetadata = currentUser.user_metadata || {};
      
      // Prepare updated metadata
      const updatedMetadata = {
        ...currentMetadata,
        first_name: updates.first_name || currentMetadata.first_name,
        last_name: updates.last_name || currentMetadata.last_name,
        phone: updates.phone || currentMetadata.phone,
        birth: updates.birth || currentMetadata.birth,
        cpf: updates.cpf || currentMetadata.cpf,
        avatar_url: updates.avatar_url !== undefined ? updates.avatar_url : currentMetadata.avatar_url,
        ...updates.preferences
      };

      // Update user metadata in Supabase Auth
      const { data, error } = await supabase.auth.updateUser({
        data: updatedMetadata
      });

      if (error) {
        console.error('Error updating user profile:', error);
        throw error;
      }

      // Return updated profile
      return {
        id: data.user.id,
        first_name: data.user.user_metadata?.first_name || '',
        last_name: data.user.user_metadata?.last_name || '',
        email: data.user.email || '',
        birth: data.user.user_metadata?.birth || '',
        phone: data.user.user_metadata?.phone || '',
        cpf: data.user.user_metadata?.cpf || '',
        role: data.user.user_metadata?.role || 'REGISTERED',
        is_active: true,
        created_at: data.user.created_at,
        updated_at: data.user.updated_at,
        last_login: data.user.last_sign_in_at,
        avatar_url: data.user.user_metadata?.avatar_url || '',
        preferences: { cpf: data.user.user_metadata?.cpf || '' }
      };
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
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      // Update password through Supabase Auth
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
   * Update user email
   */
  static async updateUserEmail(newEmail: string): Promise<{ requiresConfirmation: boolean }> {
    try {
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      // Update email through Supabase Auth
      const { error } = await supabase.auth.updateUser({
        email: newEmail
      });

      if (error) {
        console.error('Error updating user email:', error);
        throw error;
      }

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

  /**
   * Delivery Address Management
   * Note: Delivery addresses are now stored in user metadata
   */

  /**
   * Get user's delivery addresses from metadata
   */
  static async getDeliveryAddresses(): Promise<DeliveryAddress[]> {
    try {
      const profile = await this.getCurrentUserProfile();
      if (!profile) throw new Error('User not authenticated');

      const addresses = profile.preferences?.addresses || [];
      return Array.isArray(addresses) ? addresses : [];
    } catch (error) {
      console.error('Error in getDeliveryAddresses:', error);
      return [];
    }
  }

  /**
   * Get delivery addresses by user ID
   */
  static async getDeliveryAddressesByUserId(userId: string): Promise<DeliveryAddress[]> {
    try {
      // Get current user session to verify access
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      // Only allow users to access their own addresses
      if (session.user.id !== userId) {
        throw new Error('Access denied');
      }

      const addresses = session.user.user_metadata?.addresses || [];
      return Array.isArray(addresses) ? addresses : [];
    } catch (error) {
      console.error('Error in getDeliveryAddressesByUserId:', error);
      return [];
    }
  }

  /**
   * Get default delivery address from metadata
   */
  static async getDefaultDeliveryAddress(): Promise<DeliveryAddress | null> {
    try {
      const addresses = await this.getDeliveryAddresses();
      return addresses.find(addr => addr.is_default) || null;
    } catch (error) {
      console.error('Error in getDefaultDeliveryAddress:', error);
      return null;
    }
  }

  /**
   * Save delivery address in metadata
   */
  static async saveDeliveryAddress(addressData: Omit<DeliveryAddress, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<DeliveryAddress> {
    try {
      const profile = await this.getCurrentUserProfile();
      if (!profile) throw new Error('User not authenticated');

      const addresses = profile.preferences?.addresses || [];
      const newAddress: DeliveryAddress = {
        ...addressData,
        id: Date.now().toString(),
        user_id: profile.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // If setting as default, remove default from others
      if (newAddress.is_default) {
        addresses.forEach(addr => addr.is_default = false);
      }

      const updatedAddresses = [...addresses, newAddress];
      
      await this.updateUserProfile({
        preferences: {
          ...profile.preferences,
          addresses: updatedAddresses
        }
      });

      return newAddress;
    } catch (error) {
      console.error('Error in saveDeliveryAddress:', error);
      throw error;
    }
  }

  /**
   * Delete delivery address from metadata
   */
  static async deleteDeliveryAddress(addressId: string): Promise<void> {
    try {
      const profile = await this.getCurrentUserProfile();
      if (!profile) throw new Error('User not authenticated');

      const addresses = profile.preferences?.addresses || [];
      const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
      
      await this.updateUserProfile({
        preferences: {
          ...profile.preferences,
          addresses: updatedAddresses
        }
      });
    } catch (error) {
      console.error('Error in deleteDeliveryAddress:', error);
      throw error;
    }
  }

}