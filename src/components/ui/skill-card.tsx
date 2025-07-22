interface SkillCardProps {
  name: string;
  category: 'strong' | 'learning';
  icon?: string;
}

export default function SkillCard({ name, category, icon }: SkillCardProps) {
  const isStrong = category === 'strong';
  
  return (
    <div className={`
      relative flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg
      ${isStrong 
        ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300' 
        : 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300'
      }
      min-w-fit whitespace-nowrap
    `}>
      {icon && (
        <span className="text-2xl" role="img" aria-label={name}>
          {icon}
        </span>
      )}
      <div className="flex flex-col">
        <span className="font-semibold text-sm">{name}</span>
        <span className={`text-xs ${isStrong ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
          {isStrong ? 'Strong Foundation' : 'Learning & Exploring'}
        </span>
      </div>
      <div className={`
        w-2 h-2 rounded-full
        ${isStrong ? 'bg-green-500' : 'bg-blue-500'}
      `} />
    </div>
  );
} 