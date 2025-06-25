import UserDashboard from '@/pages/UserDashboard';
import ProtectedWrapper from '../protected-wrapper';

export default function UserDashboardPage() {
  return (
    <ProtectedWrapper requiredRole="REGISTERED">
      <UserDashboard />
    </ProtectedWrapper>
  );
}