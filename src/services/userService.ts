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
        // If user profile doesn't exist, return a fallback profile from auth user
        if (error.code === 'PGRST116') {
          console.log('User profile not found in database, using auth user data...');
          // Return fallback profile from auth user without trying to insert
          return {
            id: user.id,
            email: user.email || '',
            first_name: user.user_metadata?.first_name || '',
            last_name: user.user_metadata?.last_name || '',
            role: 'REGISTERED' as const,
            is_active: true,
            created_at: user.created_at,
            updated_at: user.updated_at || user.created_at
          };
        }
        
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

      // First check if user exists in database
      const existingProfile = await this.getCurrentUserProfile();
      
      if (!existingProfile) {
        throw new Error('User profile not found');
      }

      // If user exists in database, update normally
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
        // If update fails, return updated fallback profile
        console.error('Error updating user profile in database:', error);
        return {
          ...existingProfile,
          ...updates,
          updated_at: new Date().toISOString()
        };
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

  /**
   * Delivery Address Management
   */

  /**
   * Get user's delivery addresses
   */
  static async getDeliveryAddresses(): Promise<DeliveryAddress[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('delivery_addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching delivery addresses:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getDeliveryAddresses:', error);
      throw error;
    }
  }

  /**
   * Get default delivery address
   */
  static async getDefaultDeliveryAddress(): Promise<DeliveryAddress | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('delivery_addresses')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_default', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching default delivery address:', error);
        throw error;
      }

      return data || null;
    } catch (error) {
      console.error('Error in getDefaultDeliveryAddress:', error);
      return null;
    }
  }

  /**
   * Save delivery address (create or update)
   */
  static async saveDeliveryAddress(addressData: Omit<DeliveryAddress, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<DeliveryAddress> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');

      // First, check if we need to unset other default addresses
      if (addressData.is_default) {
        await supabase
          .from('delivery_addresses')
          .update({ is_default: false })
          .eq('user_id', user.id);
      }

      // Check if user already has a default address
      const existingDefault = await this.getDefaultDeliveryAddress();
      
      const addressToSave = {
        ...addressData,
        user_id: user.id,
        // If no existing default, make this one default
        is_default: addressData.is_default ?? !existingDefault
      };

      if (existingDefault) {
        // Update existing default address
        const { data, error } = await supabase
          .from('delivery_addresses')
          .update(addressToSave)
          .eq('id', existingDefault.id)
          .select()
          .single();

        if (error) {
          console.error('Error updating delivery address:', error);
          throw error;
        }

        return data;
      } else {
        // Create new address
        const { data, error } = await supabase
          .from('delivery_addresses')
          .insert([addressToSave])
          .select()
          .single();

        if (error) {
          console.error('Error creating delivery address:', error);
          throw error;
        }

        return data;
      }
    } catch (error) {
      console.error('Error in saveDeliveryAddress:', error);
      throw error;
    }
  }

  /**
   * Delete delivery address
   */
  static async deleteDeliveryAddress(addressId: string): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('delivery_addresses')
        .delete()
        .eq('id', addressId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting delivery address:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in deleteDeliveryAddress:', error);
      throw error;
    }
  }

  /**
   * Search CEP using Brazilian postal code API
   */
  static async searchCEP(cep: string): Promise<{
    cep: string;
    address: string;
    neighborhood: string;
    city: string;
    state: string;
  } | null> {
    try {
      const cleanCep = cep.replace(/\D/g, '');
      
      if (cleanCep.length !== 8) {
        throw new Error('CEP deve ter 8 dígitos');
      }

      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        throw new Error('CEP não encontrado');
      }

      return {
        cep: data.cep,
        address: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf
      };
    } catch (error) {
      console.error('Error in searchCEP:', error);
      throw error;
    }
  }
}