interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
        <span>問題 {current} / {total}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div
          className="h-2 rounded-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
