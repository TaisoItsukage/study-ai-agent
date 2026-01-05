interface OptionButtonProps {
  index: number;
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
  isRevealed: boolean;
  onClick: () => void;
  disabled: boolean;
}

const labels = ["A", "B", "C", "D"];

export function OptionButton({
  index,
  text,
  isSelected,
  isCorrect,
  isRevealed,
  onClick,
  disabled,
}: OptionButtonProps) {
  let bgColor = "bg-white dark:bg-zinc-900";
  let borderColor = "border-zinc-200 dark:border-zinc-700";
  let textColor = "text-zinc-900 dark:text-zinc-100";

  if (isRevealed) {
    if (isCorrect) {
      bgColor = "bg-emerald-50 dark:bg-emerald-900/30";
      borderColor = "border-emerald-500";
      textColor = "text-emerald-700 dark:text-emerald-300";
    } else if (isSelected && !isCorrect) {
      bgColor = "bg-red-50 dark:bg-red-900/30";
      borderColor = "border-red-500";
      textColor = "text-red-700 dark:text-red-300";
    }
  } else if (isSelected) {
    borderColor = "border-blue-500";
    bgColor = "bg-blue-50 dark:bg-blue-900/30";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-lg border-2 p-4 text-left transition-all ${bgColor} ${borderColor} ${textColor} ${
        !disabled && "hover:border-blue-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
      } ${disabled && "cursor-default"}`}
    >
      <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold dark:bg-zinc-800">
        {labels[index]}
      </span>
      {text}
    </button>
  );
}
