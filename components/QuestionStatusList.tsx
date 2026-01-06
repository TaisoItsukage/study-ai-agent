"use client";

import { useState } from "react";
import { Question } from "@/data/types";
import { QuestionListItem } from "./QuestionListItem";

interface QuestionStatusListProps {
  questions: Question[];
  answeredQuestions: Record<string, boolean>;
}

type CategoryKey = "unanswered" | "correct" | "incorrect";

interface Category {
  key: CategoryKey;
  label: string;
  icon: string;
  questions: Question[];
  headerBg: string;
  headerText: string;
  countBg: string;
}

export function QuestionStatusList({
  questions,
  answeredQuestions,
}: QuestionStatusListProps) {
  const [expandedSections, setExpandedSections] = useState<Set<CategoryKey>>(
    new Set(["unanswered", "correct", "incorrect"])
  );
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(
    new Set()
  );

  const unanswered = questions.filter((q) => !(q.id in answeredQuestions));
  const correct = questions.filter((q) => answeredQuestions[q.id] === true);
  const incorrect = questions.filter((q) => answeredQuestions[q.id] === false);

  const categories: Category[] = [
    {
      key: "unanswered",
      label: "未解答",
      icon: "○",
      questions: unanswered,
      headerBg: "bg-zinc-100 dark:bg-zinc-800",
      headerText: "text-zinc-700 dark:text-zinc-300",
      countBg: "bg-zinc-200 dark:bg-zinc-700",
    },
    {
      key: "correct",
      label: "正解済み",
      icon: "✓",
      questions: correct,
      headerBg: "bg-emerald-50 dark:bg-emerald-900/20",
      headerText: "text-emerald-700 dark:text-emerald-300",
      countBg: "bg-emerald-200 dark:bg-emerald-800",
    },
    {
      key: "incorrect",
      label: "不正解",
      icon: "✗",
      questions: incorrect,
      headerBg: "bg-red-50 dark:bg-red-900/20",
      headerText: "text-red-700 dark:text-red-300",
      countBg: "bg-red-200 dark:bg-red-800",
    },
  ];

  const toggleSection = (key: CategoryKey) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.key} className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
          <button
            onClick={() => toggleSection(category.key)}
            className={`flex w-full items-center justify-between p-4 ${category.headerBg} ${category.headerText}`}
            aria-expanded={expandedSections.has(category.key)}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-sm font-medium ${category.countBg}`}
              >
                {category.questions.length}問
              </span>
              <span
                className={`transition-transform ${
                  expandedSections.has(category.key) ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </div>
          </button>

          {expandedSections.has(category.key) && (
            <div className="border-t border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900">
              {category.questions.length === 0 ? (
                <p className="py-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  該当する問題はありません
                </p>
              ) : (
                <div className="space-y-2">
                  {category.questions.map((question) => (
                    <QuestionListItem
                      key={question.id}
                      question={question}
                      status={category.key}
                      isExpanded={expandedQuestions.has(question.id)}
                      onToggle={() => toggleQuestion(question.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
