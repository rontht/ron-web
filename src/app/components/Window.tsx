'use client';

interface WindowProps {
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Window({ title, onClose, children }: WindowProps) {
  return (
    <div className="fixed top-20 left-20 w-96 bg-gray-900 text-white border border-gray-700 rounded shadow-lg z-50">
      {/* Title bar */}
      <div className="flex justify-between items-center bg-gray-800 px-4 py-2 select-none">
        <div className="font-semibold">{title}</div>
        <button
          onClick={onClose}
          className="text-white hover:text-red-500 font-bold"
          aria-label="Close window"
        >
          ×
        </button>
      </div>
      {/* Content */}
      <div className="p-4">{children ?? <p>This is {title} app window.</p>}</div>
    </div>
  );
}
