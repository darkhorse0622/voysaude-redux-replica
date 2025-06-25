'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

interface ProtectedWrapperProps {
  children: React.ReactNode;
  requiredRole?: 'REGISTERED' | 'ADMIN';
}

export default function ProtectedWrapper({ children, requiredRole = 'REGISTERED' }: ProtectedWrapperProps) {
  return (
    <ProtectedRoute requiredRole={requiredRole}>
      {children}
    </ProtectedRoute>
  );
}