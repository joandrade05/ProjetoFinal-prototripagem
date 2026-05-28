export interface RequirementFunctional {
  code: string;
  title: string;
  description: string;
  useCase?: string;
}

export interface RequirementNonFunctional {
  code: string;
  title: string;
  description: string;
  type: string; // e.g., Desempenho, Segurança, Usabilidade, Confiabilidade
}

export interface BusinessRule {
  code: string;
  title: string;
  description: string;
  linkedRF: string;
}

export interface UseCaseDescription {
  code: string;
  name: string;
  actor: string;
  description: string;
  preCondition: string;
  mainFlow: string[];
  altFlow: string[];
  postCondition: string;
}

export interface Patient {
  id: string;
  name: string;
  avatar: string;
  age: number;
  condition: string;
  city: string;
  phone: string;
  need: string;
  status: 'Pendente' | 'Atendido';
  bloodPressure?: string;
  hydrationLevel?: number; // scale 1-5 or ml
  mood?: string;
  triageNotes?: string;
}

export interface Specialist {
  id: string;
  name: string;
  specialty: string;
  association: string; // CRM / CRP / COREN, etc.
  bio: string;
  avatar: string;
  rating: number;
  availability: string;
}

export interface Consultation {
  id: string;
  patientName: string;
  patientId: string;
  specialistName: string;
  specialistId: string;
  date: string;
  time: string;
  status: 'Agendado' | 'Triagem' | 'Concluído' | 'Cancelado';
  type: string; // "Vídeo" or "Chat"
  summary?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'paciente' | 'profissional' | 'sistema' | 'ia';
  senderName: string;
  text: string;
  timestamp: string;
}
