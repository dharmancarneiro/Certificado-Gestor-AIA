
export interface Question {
  id: number;
  enunciado: string;
  alternativas: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  gabarito: string;
}

export interface UserData {
  nome: string;
  email: string;
  whatsapp: string;
}

export interface SurveyQuestion {
  id: number;
  text: string;
  type: 'select' | 'text';
  options?: { label: string; value: string }[];
}

export type AppStep = 'welcome' | 'identification' | 'quiz' | 'result' | 'survey' | 'final';

export interface AppState {
  step: AppStep;
  userData: UserData;
  quizAnswers: Record<number, string>;
  surveyAnswers: Record<number, string>;
  currentQuestionIndex: number;
  currentSurveyIndex: number;
}
