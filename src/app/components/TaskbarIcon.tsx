'use client';

interface TaskbarIconProps {
  icon: string;
  alt?: string;
  onClick?: () => void;
}

export default function TaskbarIcon({ icon, alt, onClick }: TaskbarIconProps) {
  return (
    <button
      onClick={onClick}
      className="p-1 hover:bg-white/20 rounded cursor-pointer"
      type="button"
      aria-label={alt ?? "App"}
    >
      <img src={icon} alt={alt ?? "App"} className="w-7 h-7" />
    </button>
  );
}
