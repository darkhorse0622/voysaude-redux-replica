import AccountDetails from '@/pages/AccountDetails';
import ProtectedWrapper from '../protected-wrapper';

export default function AccountDetailsPage() {
  return (
    <ProtectedWrapper requiredRole="REGISTERED">
      <AccountDetails />
    </ProtectedWrapper>
  );
}