import { getSkillIcon } from '../lib/skillIcons';

type SkillChipProps = {
  label: string;
  className?: string;
};

export default function SkillChip({ label, className }: SkillChipProps) {
  return (
    <span
      className={
        className ??
        'inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 dark:bg-navy border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
      }
    >
      <img src={getSkillIcon(label)} alt={label} className="w-4 h-4 object-contain mr-1.5" loading="lazy" />
      {label}
    </span>
  );
}
