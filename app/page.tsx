"use client";

import Link from "next/link";
import { GenreCard } from "@/components/GenreCard";
import { genres } from "@/data/genres";
import { useEffect, useState } from "react";
import { getTotalProgress } from "@/lib/storage";

export default function Home() {
  const [totalProgress, setTotalProgress] = useState({ correct: 0, total: 0 });
  const totalQuestions = genres.reduce((sum, g) => sum + g.questions.length, 0);

  useEffect(() => {
    setTotalProgress(getTotalProgress());
  }, []);

  const overallPercent = totalQuestions > 0
    ? Math.round((totalProgress.correct / totalQuestions) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            AIエージェント営業マン
            <br />
            学習クイズ
          </h1>
          <p className="mx-auto max-w-xl text-zinc-600 dark:text-zinc-400">
            IT未経験からAIエージェントの営業マンになるための知識を、
            クイズ形式で楽しく学びましょう。
          </p>
          <div className="mt-6">
            <Link
              href="/textbooks"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-700"
            >
              <span>📚</span>
              <span>学習教材を読む</span>
            </Link>
          </div>
        </header>

        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                全体の進捗
              </h2>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {totalProgress.correct} / {totalQuestions} 問正解
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-emerald-500">
                {overallPercent}%
              </span>
            </div>
          </div>
          <div className="mt-4 h-3 rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className="h-3 rounded-full bg-emerald-500 transition-all"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>

        <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          ジャンルを選択
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {genres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
      </div>
    </div>
  );
}
