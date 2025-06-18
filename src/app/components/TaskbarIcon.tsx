interface TaskbarIconProps {
  icon: string;
  alt?: string;
  label?: string;
  status: "off" | "focused" | "minimized" | "running";
  pinned: boolean;
  onClick?: () => void;
}

const taskbarStyle = {
  off: "bg-transparent hover:bg-white/10 justify-center",
  focused: "bg-blue-500 justify-start",
  minimized: "opacity-60 italic justify-start hover:bg-blue-600",
  running: "bg-blue-900 hover:bg-blue-600 justify-start",
};

export default function TaskbarIcon({
  icon,
  alt,
  label,
  status,
  pinned,
  onClick,
}: TaskbarIconProps) {
  
  const style = pinned && status === "off" ? taskbarStyle.off : taskbarStyle[status] || taskbarStyle.running;

  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-3 text-md text-white rounded-md h-full min-w-[40px] select-none transition-colors ${style}`}
      type="button"
      aria-label={alt ?? "App"}
    >
      <img src={icon} alt={alt ?? "App"} className="w-5 h-5" />
      {(!pinned || status !== "off") && <span>{label}</span>}
    </button>
  );
}
