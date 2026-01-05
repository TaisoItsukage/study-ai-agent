interface ExplanationProps {
  isCorrect: boolean;
  explanation: string;
}

export function Explanation({ isCorrect, explanation }: ExplanationProps) {
  return (
    <div
      className={`rounded-lg p-4 ${
        isCorrect
          ? "bg-emerald-50 dark:bg-emerald-900/20"
          : "bg-amber-50 dark:bg-amber-900/20"
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="text-2xl">{isCorrect ? "🎉" : "📝"}</span>
        <span
          className={`font-bold ${
            isCorrect
              ? "text-emerald-700 dark:text-emerald-300"
              : "text-amber-700 dark:text-amber-300"
          }`}
        >
          {isCorrect ? "正解！" : "不正解..."}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {explanation}
      </p>
    </div>
  );
}
