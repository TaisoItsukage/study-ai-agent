"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { getGenreById, getRandomQuestions } from "@/data/genres";
import { Question, Genre } from "@/data/types";
import { ProgressBar } from "@/components/ProgressBar";
import { OptionButton } from "@/components/OptionButton";
import { Explanation } from "@/components/Explanation";
import { saveQuestionResult, getGenreProgress } from "@/lib/storage";
import Link from "next/link";

const QUESTIONS_PER_SESSION = 10;

// シャッフルされた選択肢情報を保持する型
type ShuffledQuestion = {
  question: Question;
  shuffledOptions: string[];
  shuffledCorrectIndex: number;
};

// 選択肢をシャッフルして新しい正解インデックスを計算する関数
function shuffleOptions(question: Question): ShuffledQuestion {
  const indices = question.options.map((_, i) => i);
  // Fisher-Yatesシャッフル
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const shuffledOptions = indices.map((i) => question.options[i]);
  const shuffledCorrectIndex = indices.indexOf(question.correctIndex);

  return {
    question,
    shuffledOptions,
    shuffledCorrectIndex,
  };
}

// 初期クイズデータを生成する関数
function createInitialQuiz(
  genre: Genre,
  genreId: string,
  mode: string | null
): ShuffledQuestion[] {
  let selectedQuestions: Question[];

  if (mode === "retry") {
    // 間違えた問題のみモード
    const progress = getGenreProgress(genreId);
    const wrongQuestionIds = Object.entries(progress.answeredQuestions)
      .filter(([, isCorrect]) => !isCorrect)
      .map(([id]) => id);

    const wrongQuestions = genre.questions.filter((q) =>
      wrongQuestionIds.includes(q.id)
    );

    // 間違えた問題がある分だけ出題（最大10問）
    const shuffled = [...wrongQuestions].sort(() => Math.random() - 0.5);
    selectedQuestions = shuffled.slice(0, QUESTIONS_PER_SESSION);
  } else if (mode === "unanswered") {
    // 未回答の問題のみモード
    const progress = getGenreProgress(genreId);
    const answeredQuestionIds = Object.keys(progress.answeredQuestions);

    const unansweredQuestions = genre.questions.filter(
      (q) => !answeredQuestionIds.includes(q.id)
    );

    // 未回答の問題がある分だけ出題（最大10問）
    const shuffled = [...unansweredQuestions].sort(() => Math.random() - 0.5);
    selectedQuestions = shuffled.slice(0, QUESTIONS_PER_SESSION);
  } else {
    selectedQuestions = getRandomQuestions(genre, QUESTIONS_PER_SESSION);
  }

  return selectedQuestions.map((q) => shuffleOptions(q));
}

export default function QuizPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const genreId = params.genreId as string;
  const mode = searchParams.get("mode");
  const genre = getGenreById(genreId);

  if (!genre) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            ジャンルが見つかりません
          </h1>
          <Link
            href="/"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            トップに戻る
          </Link>
        </div>
      </div>
    );
  }

  // keyを使ってgenreIdやmodeが変わった時にコンポーネントを再マウント
  return (
    <QuizContent
      key={`${genreId}-${mode}`}
      genre={genre}
      genreId={genreId}
      mode={mode}
    />
  );
}

function QuizContent({
  genre,
  genreId,
  mode,
}: {
  genre: Genre;
  genreId: string;
  mode: string | null;
}) {
  const router = useRouter();

  // useStateの遅延初期化で初期クイズデータを生成
  const [shuffledQuestions] = useState<ShuffledQuestion[]>(() =>
    createInitialQuiz(genre, genreId, mode)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [answers, setAnswers] = useState<
    { questionId: string; isCorrect: boolean }[]
  >([]);

  if (shuffledQuestions.length === 0) {
    const message =
      mode === "retry"
        ? "間違えた問題がありません"
        : mode === "unanswered"
          ? "未回答の問題がありません"
          : "クイズを準備中...";

    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center">
          <div className="mb-4 text-4xl">{mode ? "✅" : "🎯"}</div>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">{message}</p>
          {mode && (
            <Link
              href={`/genres/${genreId}`}
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              ← ジャンルに戻る
            </Link>
          )}
        </div>
      </div>
    );
  }

  const currentShuffled = shuffledQuestions[currentIndex];
  const currentQuestion = currentShuffled.question;
  const isLastQuestion = currentIndex === shuffledQuestions.length - 1;

  const handleSelect = (index: number) => {
    if (isRevealed) return;
    setSelectedIndex(index);
  };

  const handleConfirm = () => {
    if (selectedIndex === null) return;

    const isCorrect = selectedIndex === currentShuffled.shuffledCorrectIndex;
    setIsRevealed(true);

    saveQuestionResult(genreId, currentQuestion.id, isCorrect);

    setAnswers([...answers, { questionId: currentQuestion.id, isCorrect }]);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const correctCount = answers.filter((a) => a.isCorrect).length;

      sessionStorage.setItem(
        `quiz-result-${genreId}`,
        JSON.stringify({
          total: shuffledQuestions.length,
          correct: correctCount,
          answers: answers,
        })
      );
      router.push(`/genres/${genreId}/results`);
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedIndex(null);
      setIsRevealed(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href={`/genres/${genreId}`}
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← 中断する
          </Link>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {genre.icon} {genre.name}
          </span>
        </div>

        <ProgressBar
          current={currentIndex + 1}
          total={shuffledQuestions.length}
        />

        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
          <h2 className="mb-6 text-lg font-medium leading-relaxed text-zinc-900 dark:text-zinc-100">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentShuffled.shuffledOptions.map((option, index) => (
              <OptionButton
                key={index}
                index={index}
                text={option}
                isSelected={selectedIndex === index}
                isCorrect={index === currentShuffled.shuffledCorrectIndex}
                isRevealed={isRevealed}
                onClick={() => handleSelect(index)}
                disabled={isRevealed}
              />
            ))}
          </div>

          {isRevealed && (
            <div className="mt-6">
              <Explanation
                isCorrect={
                  selectedIndex === currentShuffled.shuffledCorrectIndex
                }
                explanation={currentQuestion.explanation}
              />
            </div>
          )}

          <div className="mt-6">
            {!isRevealed ? (
              <button
                onClick={handleConfirm}
                disabled={selectedIndex === null}
                className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-700"
              >
                回答する
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                {isLastQuestion ? "結果を見る" : "次の問題へ"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
