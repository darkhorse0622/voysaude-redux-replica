import ChangePassword from '@/pages/ChangePassword';
import ProtectedWrapper from '../protected-wrapper';

export default function ChangePasswordPage() {
  return (
    <ProtectedWrapper requiredRole="REGISTERED">
      <ChangePassword />
    </ProtectedWrapper>
  );
}