"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Components } from "react-markdown";

interface TextbookContentProps {
  content: string;
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mt-8 mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-12 mb-6 pb-3 text-xl font-bold text-zinc-900 dark:text-zinc-100 border-b-2 border-zinc-200 dark:border-zinc-700">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-6 mb-3 text-base font-bold text-zinc-900 dark:text-zinc-100">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-7 text-zinc-700 dark:text-zinc-300">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-zinc-700 dark:text-zinc-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-zinc-700 dark:text-zinc-300">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-7">{children}</li>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-zinc-100 dark:bg-zinc-800">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700 bg-white dark:bg-zinc-900">
      {children}
    </tbody>
  ),
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300">
      {children}
    </td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 pl-4 py-3 italic text-zinc-700 dark:text-zinc-300">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className={`${className} block`}>
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-sm font-mono text-zinc-800 dark:text-zinc-200">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-lg bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-blue-600 dark:text-blue-400 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-zinc-900 dark:text-zinc-100">
      {children}
    </strong>
  ),
  hr: () => (
    <hr className="my-10 border-zinc-200 dark:border-zinc-700" />
  ),
};

export function TextbookContent({ content }: TextbookContentProps) {
  return (
    <div className="textbook-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
