export interface Question {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number; // 0-3
  explanation: string;
}

export interface Genre {
  id: string;
  name: string;
  description: string;
  icon: string;
  questions: Question[];
}

export interface Progress {
  genreId: string;
  answeredQuestions: Record<string, boolean>; // questionId -> isCorrect
  lastAccessedAt: string;
}

export interface QuizSession {
  genreId: string;
  questions: Question[];
  currentIndex: number;
  answers: { questionId: string; selectedIndex: number; isCorrect: boolean }[];
}
