import DeliveryAddress from '@/pages/DeliveryAddress';
import ProtectedWrapper from '../protected-wrapper';

export default function DeliveryAddressPage() {
  return (
    <ProtectedWrapper requiredRole="REGISTERED">
      <DeliveryAddress />
    </ProtectedWrapper>
  );
}