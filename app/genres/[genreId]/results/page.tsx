"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getGenreById } from "@/data/genres";
import Link from "next/link";

interface QuizResult {
  total: number;
  correct: number;
  answers: { questionId: string; isCorrect: boolean }[];
}

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const genreId = params.genreId as string;
  const genre = getGenreById(genreId);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const storedResult = sessionStorage.getItem(`quiz-result-${genreId}`);
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      router.push(`/genres/${genreId}`);
    }
  }, [genreId, router]);

  if (!genre || !result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center">
          <div className="mb-4 text-4xl">📊</div>
          <p className="text-zinc-600 dark:text-zinc-400">結果を読み込み中...</p>
        </div>
      </div>
    );
  }

  const percentage = Math.round((result.correct / result.total) * 100);
  const isPerfect = result.correct === result.total;
  const isGood = percentage >= 80;
  const isFair = percentage >= 60;

  const getMessage = () => {
    if (isPerfect) return { emoji: "🎉", text: "パーフェクト！素晴らしい！" };
    if (isGood) return { emoji: "👏", text: "よくできました！" };
    if (isFair) return { emoji: "💪", text: "もう少し頑張りましょう！" };
    return { emoji: "📚", text: "復習して再挑戦しましょう！" };
  };

  const message = getMessage();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8 rounded-xl bg-white p-8 text-center shadow-sm dark:bg-zinc-900">
          <div className="mb-4 text-6xl">{message.emoji}</div>
          <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {message.text}
          </h1>
          <p className="mb-6 text-zinc-600 dark:text-zinc-400">
            {genre.icon} {genre.name}
          </p>

          <div className="mb-8">
            <div className="mb-2 text-5xl font-bold text-blue-600 dark:text-blue-400">
              {result.correct} / {result.total}
            </div>
            <div className="text-lg text-zinc-600 dark:text-zinc-400">
              正解率: {percentage}%
            </div>
          </div>

          <div className="mb-8 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
            <h2 className="mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              回答結果
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {result.answers.map((answer, index) => (
                <div
                  key={index}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    answer.isCorrect
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/genres/${genreId}/quiz`}
              className="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700"
            >
              もう一度挑戦
            </Link>
            <Link
              href={`/genres/${genreId}`}
              className="flex-1 rounded-lg border border-zinc-300 px-6 py-3 text-center font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              ジャンルに戻る
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← トップに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
