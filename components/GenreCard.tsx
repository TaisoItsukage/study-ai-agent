"use client";

import Link from "next/link";
import { Genre } from "@/data/types";
import { useEffect, useState } from "react";
import { getGenreProgress } from "@/lib/storage";

interface GenreCardProps {
  genre: Genre;
}

export function GenreCard({ genre }: GenreCardProps) {
  const [progress, setProgress] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    setProgress(getGenreProgress(genre.id));
  }, [genre.id]);

  const totalQuestions = genre.questions.length;
  const progressPercent = totalQuestions > 0
    ? Math.round((progress.correct / totalQuestions) * 100)
    : 0;

  return (
    <Link href={`/genres/${genre.id}`}>
      <div className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
        <div className="mb-4 text-4xl">{genre.icon}</div>
        <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {genre.name}
        </h2>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {genre.description}
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>正解: {progress.correct}/{totalQuestions}問</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className="h-2 rounded-full bg-emerald-500 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
