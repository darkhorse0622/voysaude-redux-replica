import Support from '@/pages/Support';
import ProtectedWrapper from '../protected-wrapper';

export default function SupportPage() {
  return (
    <ProtectedWrapper requiredRole="REGISTERED">
      <Support />
    </ProtectedWrapper>
  );
}