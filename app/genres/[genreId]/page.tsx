"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getGenreById } from "@/data/genres";
import { getTextbookByGenreId } from "@/data/textbooks";
import { getGenreProgress, resetGenreProgress } from "@/lib/storage";
import { QuestionStatusList } from "@/components/QuestionStatusList";

export default function GenreDetailPage() {
  const params = useParams();
  const genreId = params.genreId as string;
  const genre = getGenreById(genreId);
  const textbook = getTextbookByGenreId(genreId);
  const [progress, setProgress] = useState({ correct: 0, total: 0, answeredQuestions: {} as Record<string, boolean> });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProgress(getGenreProgress(genreId));
  }, [genreId]);

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

  const totalQuestions = genre.questions.length;
  const progressPercent = totalQuestions > 0
    ? Math.round((progress.correct / totalQuestions) * 100)
    : 0;

  // 間違えた問題と未回答の問題を計算
  const wrongCount = Object.values(progress.answeredQuestions).filter(
    (isCorrect) => !isCorrect
  ).length;
  const answeredCount = Object.keys(progress.answeredQuestions).length;
  const unansweredCount = totalQuestions - answeredCount;

  const handleReset = () => {
    if (confirm("このジャンルの進捗をリセットしますか？")) {
      resetGenreProgress(genreId);
      setProgress({ correct: 0, total: 0, answeredQuestions: {} });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← ジャンル一覧に戻る
        </Link>

        <div className="mb-8 rounded-xl bg-white p-8 shadow-sm dark:bg-zinc-900">
          <div className="mb-4 text-5xl">{genre.icon}</div>
          <h1 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {genre.name}
          </h1>
          <p className="mb-6 text-zinc-600 dark:text-zinc-400">
            {genre.description}
          </p>

          <div className="mb-6 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">進捗状況</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {mounted ? progress.correct : 0} / {totalQuestions} 問正解
              </span>
            </div>
            <div className="mb-2 h-3 rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div
                className="h-3 rounded-full bg-emerald-500 transition-all"
                style={{ width: mounted ? `${progressPercent}%` : "0%" }}
              />
            </div>
            <div className="text-right text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {mounted ? progressPercent : 0}%
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/genres/${genreId}/quiz`}
              className="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700"
            >
              クイズを始める
            </Link>
            {mounted && unansweredCount > 0 ? (
              <Link
                href={`/genres/${genreId}/quiz?mode=unanswered`}
                className="flex-1 rounded-lg border border-amber-500 px-6 py-3 text-center font-medium text-amber-600 transition-colors hover:bg-amber-50 dark:border-amber-500 dark:text-amber-400 dark:hover:bg-amber-950"
              >
                未回答のみ ({unansweredCount}問)
              </Link>
            ) : (
              <button
                disabled
                className="flex-1 cursor-not-allowed rounded-lg border border-zinc-200 px-6 py-3 text-center font-medium text-zinc-400 dark:border-zinc-700 dark:text-zinc-600"
              >
                未回答のみ (0問)
              </button>
            )}
          </div>

          <div className="mt-3">
            {mounted && wrongCount > 0 ? (
              <Link
                href={`/genres/${genreId}/quiz?mode=retry`}
                className="block w-full rounded-lg border border-red-300 px-6 py-3 text-center font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950"
              >
                間違えた問題のみ ({wrongCount}問)
              </Link>
            ) : (
              <button
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-zinc-200 px-6 py-3 text-center font-medium text-zinc-400 dark:border-zinc-700 dark:text-zinc-600"
              >
                間違えた問題のみ (0問)
              </button>
            )}
          </div>

          {textbook && (
            <Link
              href={`/textbooks/${textbook.id}`}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-700"
            >
              <span>📚</span>
              <span>教材を読む</span>
            </Link>
          )}

          {mounted && progress.total > 0 && (
            <button
              onClick={handleReset}
              className="mt-4 w-full text-sm text-zinc-500 hover:text-red-500"
            >
              進捗をリセット
            </button>
          )}
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
          <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
            学習のポイント
          </h2>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>• 1セッション10問のクイズに挑戦できます</li>
            <li>• 回答後に詳しい解説が表示されます</li>
            <li>• 間違えた問題は繰り返し練習しましょう</li>
            <li>• 進捗は自動で保存されます</li>
          </ul>
        </div>

        {mounted && (
          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <h2 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
              問題一覧
            </h2>
            <QuestionStatusList
              questions={genre.questions}
              answeredQuestions={progress.answeredQuestions}
            />
          </div>
        )}
      </div>
    </div>
  );
}
