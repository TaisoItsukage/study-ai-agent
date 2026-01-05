import { Progress } from "@/data/types";

const STORAGE_KEY = "ai-agent-quiz-progress";

export function getProgress(): Record<string, Progress> {
  if (typeof window === "undefined") return {};

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function saveQuestionResult(
  genreId: string,
  questionId: string,
  isCorrect: boolean
): void {
  if (typeof window === "undefined") return;

  const progress = getProgress();

  if (!progress[genreId]) {
    progress[genreId] = {
      genreId,
      answeredQuestions: {},
      lastAccessedAt: new Date().toISOString(),
    };
  }

  progress[genreId].answeredQuestions[questionId] = isCorrect;
  progress[genreId].lastAccessedAt = new Date().toISOString();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getGenreProgress(genreId: string): {
  correct: number;
  total: number;
  answeredQuestions: Record<string, boolean>;
} {
  const progress = getProgress();
  const genreProgress = progress[genreId];

  if (!genreProgress) {
    return { correct: 0, total: 0, answeredQuestions: {} };
  }

  const answers = Object.values(genreProgress.answeredQuestions);
  const correct = answers.filter(Boolean).length;

  return {
    correct,
    total: answers.length,
    answeredQuestions: genreProgress.answeredQuestions
  };
}

export function resetGenreProgress(genreId: string): void {
  if (typeof window === "undefined") return;

  const progress = getProgress();
  delete progress[genreId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetAllProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getTotalProgress(): { correct: number; total: number } {
  const progress = getProgress();
  let correct = 0;
  let total = 0;

  Object.values(progress).forEach((genreProgress) => {
    const answers = Object.values(genreProgress.answeredQuestions);
    correct += answers.filter(Boolean).length;
    total += answers.length;
  });

  return { correct, total };
}
