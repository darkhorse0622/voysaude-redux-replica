import Survey from '@/pages/Survey';
import ProtectedWrapper from '../protected-wrapper';

export default function SurveyPage() {
  return (
    <ProtectedWrapper requiredRole="REGISTERED">
      <Survey />
    </ProtectedWrapper>
  );
}