"use client";

import Link from "next/link";
import { textbooks } from "@/data/textbooks";

export default function TextbooksPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← トップに戻る
        </Link>

        <header className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            学習教材
          </h1>
          <p className="mx-auto max-w-xl text-zinc-600 dark:text-zinc-400">
            各ジャンルの体系的な教材です。クイズに挑戦する前に読むと効果的です。
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {textbooks.map((textbook) => (
            <Link key={textbook.id} href={`/textbooks/${textbook.id}`}>
              <div className="group h-full rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
                <div className="mb-4 text-4xl">{textbook.icon}</div>
                <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {textbook.title}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                  {textbook.description}
                </p>
                <div className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400">
                  教材を読む →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
