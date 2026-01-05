import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTextbookById, textbooks } from "@/data/textbooks";
import { TextbookContent } from "@/components/TextbookContent";

interface TextbookPageProps {
  params: Promise<{ textbookId: string }>;
}

export async function generateStaticParams() {
  return textbooks.map((textbook) => ({
    textbookId: textbook.id,
  }));
}

export default async function TextbookPage({ params }: TextbookPageProps) {
  const { textbookId } = await params;
  const textbook = getTextbookById(textbookId);

  if (!textbook) {
    notFound();
  }

  const filePath = path.join(
    process.cwd(),
    "docs",
    "textbooks",
    textbook.filename
  );

  let content = "";
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/textbooks"
            className="inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            ← 教材一覧に戻る
          </Link>
          <Link
            href={`/genres/${textbook.genreId}`}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            クイズに挑戦 →
          </Link>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-sm dark:bg-zinc-900">
          <div className="mb-6 border-b border-zinc-200 pb-6 dark:border-zinc-800">
            <div className="mb-2 text-4xl">{textbook.icon}</div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {textbook.title}
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {textbook.description}
            </p>
          </div>

          <TextbookContent content={content} />
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={`/genres/${textbook.genreId}`}
            className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            このジャンルのクイズに挑戦する
          </Link>
        </div>
      </div>
    </div>
  );
}
