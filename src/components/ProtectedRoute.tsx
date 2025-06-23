import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserService, type UserProfile } from '@/services/userService';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'VISITOR' | 'REGISTERED' | 'SUBSCRIBED' | 'ADMIN';
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  requiredRole = 'REGISTERED',
  redirectTo = '/auth/login'
}: ProtectedRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        try {
          const profile = await UserService.getCurrentUserProfile();
          setUserProfile(profile);
        } catch (error) {
          console.error('Failed to load user profile:', error);
        }
      }
      setProfileLoading(false);
    };

    if (!authLoading) {
      loadUserProfile();
    }
  }, [user, authLoading]);

  // Show loading state while checking authentication
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-primary">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  // Check role-based access if specified
  if (requiredRole && userProfile) {
    const roleHierarchy = {
      'VISITOR': 0,
      'REGISTERED': 1,
      'SUBSCRIBED': 2,
      'ADMIN': 3
    };

    const userRoleLevel = roleHierarchy[userProfile.role || 'VISITOR'];
    const requiredRoleLevel = roleHierarchy[requiredRole];

    if (userRoleLevel < requiredRoleLevel) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;