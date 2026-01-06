"use client";

import { Question } from "@/data/types";

type QuestionStatus = "unanswered" | "correct" | "incorrect";

interface QuestionListItemProps {
  question: Question;
  status: QuestionStatus;
  isExpanded: boolean;
  onToggle: () => void;
}

const statusConfig = {
  unanswered: {
    icon: "○",
    bgColor: "bg-zinc-100 dark:bg-zinc-800",
    borderColor: "border-zinc-300 dark:border-zinc-600",
    textColor: "text-zinc-500 dark:text-zinc-400",
  },
  correct: {
    icon: "✓",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    borderColor: "border-emerald-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  incorrect: {
    icon: "✗",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-red-500",
    textColor: "text-red-600 dark:text-red-400",
  },
};

export function QuestionListItem({
  question,
  status,
  isExpanded,
  onToggle,
}: QuestionListItemProps) {
  const config = statusConfig[status];

  return (
    <div
      className={`rounded-lg border ${config.borderColor} ${config.bgColor} overflow-hidden transition-all`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 p-3 text-left"
        aria-expanded={isExpanded}
      >
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${config.borderColor} ${config.textColor} text-sm font-bold`}
        >
          {config.icon}
        </span>
        <span className="flex-1 truncate text-sm text-zinc-700 dark:text-zinc-300">
          {question.question}
        </span>
        <span
          className={`shrink-0 text-zinc-400 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isExpanded && (
        <div className="border-t border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="mb-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {question.question}
          </p>
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`rounded-lg p-3 text-sm ${
                  index === question.correctIndex
                    ? "border border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                    : "bg-zinc-50 dark:bg-zinc-800"
                }`}
              >
                <span className="mr-2 font-medium text-zinc-500">
                  {["A", "B", "C", "D"][index]}.
                </span>
                <span className="text-zinc-700 dark:text-zinc-300">
                  {option}
                </span>
                {index === question.correctIndex && (
                  <span className="ml-2 text-emerald-600 dark:text-emerald-400">
                    ← 正解
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-medium text-blue-600 dark:text-blue-400">
                解説:
              </span>{" "}
              {question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
