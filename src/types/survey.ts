export interface SurveyResponse {
  id?: string;
  user_id: string;
  form_id: string;
  form_title?: string;
  submitted_at?: string;
  responses: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export interface SurveyAnswer {
  field_id: string;
  field_type: string;
  question: string;
  answer: unknown;
}