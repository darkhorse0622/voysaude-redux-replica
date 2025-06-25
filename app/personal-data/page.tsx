import PersonalData from '@/pages/PersonalData';
import ProtectedWrapper from '../protected-wrapper';

export default function PersonalDataPage() {
  return (
    <ProtectedWrapper requiredRole="REGISTERED">
      <PersonalData />
    </ProtectedWrapper>
  );
}