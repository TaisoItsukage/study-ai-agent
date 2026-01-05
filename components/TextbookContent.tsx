"use client";

import ReactMarkdown from "react-markdown";

interface TextbookContentProps {
  content: string;
}

export function TextbookContent({ content }: TextbookContentProps) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h2:border-b prose-h2:border-zinc-200 prose-h2:pb-2 prose-h2:dark:border-zinc-700 prose-h3:text-lg prose-h4:text-base prose-p:text-zinc-700 prose-p:dark:text-zinc-300 prose-a:text-blue-600 prose-a:dark:text-blue-400 prose-strong:text-zinc-900 prose-strong:dark:text-zinc-100 prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-zinc-800 prose-code:dark:bg-zinc-800 prose-code:dark:text-zinc-200 prose-pre:bg-zinc-900 prose-pre:dark:bg-zinc-950 prose-table:text-sm prose-th:bg-zinc-100 prose-th:dark:bg-zinc-800 prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2 prose-td:border-zinc-200 prose-td:dark:border-zinc-700 prose-tr:border-zinc-200 prose-tr:dark:border-zinc-700 prose-ul:text-zinc-700 prose-ul:dark:text-zinc-300 prose-ol:text-zinc-700 prose-ol:dark:text-zinc-300 prose-li:marker:text-zinc-400">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
