'use client';

interface DesktopIconProps {
  icon: string;
  label: string;
  onOpen?: () => void;
}

export default function DesktopIcon({ icon, label, onOpen }: DesktopIconProps) {
  return (
    <div
      onClick={onOpen}
      className="flex flex-col items-center text-white text-sm hover:opacity-80 cursor-pointer w-16"
    >
      <img src={icon} alt={label} className="w-10 h-10 mb-1" />
      <div className="text-center">{label}</div>
    </div>
  );
}
