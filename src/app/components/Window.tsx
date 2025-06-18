"use client";

import { useRef, useState, useEffect } from "react";

interface WindowProps {
  title: string;
  onClose: () => void;
  onMinimize?: () => void;
  isFocused?: boolean;
  children: React.ReactNode;
  position?: { x: number; y: number };
  onDragEnd?: (pos: { x: number; y: number }) => void;
}

export default function Window({
  title,
  onClose,
  onMinimize,
  isFocused,
  children,
  position,
  onDragEnd,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(position || { x: 300, y: 300 });
  const [_, forceUpdate] = useState({});
  const offsetRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingRef.current || !windowRef.current) return;

      const newX = e.clientX - offsetRef.current.x;
      const newY = e.clientY - offsetRef.current.y;

      positionRef.current = { x: newX, y: newY };
      windowRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    };

    const handleMouseUp = () => {
      if (draggingRef.current) {
        draggingRef.current = false;
        if (onDragEnd) {
          onDragEnd(positionRef.current);
        }
        forceUpdate({});
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!windowRef.current) return;

    const rect = windowRef.current.getBoundingClientRect();

    offsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    draggingRef.current = true;
  };

  useEffect(() => {
    if (position) {
      positionRef.current = position;
      if (windowRef.current) {
        windowRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
      }
    }
  }, [position]);

  return (
    <div
      ref={windowRef}
      className={`absolute w-[400px] h-[300px] bg-white rounded shadow-lg border ${
        isFocused ? "z-50" : "z-30"
      }`}
      style={{
        transform: `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`,
      }}
    >
      {/* Title Bar */}
      <div
        className="bg-gray-800 text-white flex items-center justify-between px-2 py-1 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm">{title}</span>
        <div className="flex items-center gap-2">
          {onMinimize && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              className="w-5 h-5 text-xs bg-yellow-500 hover:bg-yellow-400 text-white rounded flex items-center justify-center"
              title="Minimize"
            >
              &ndash;
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-5 h-5 text-xs bg-red-600 hover:bg-red-500 text-white rounded flex items-center justify-center"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 h-[calc(100%-2.5rem)] overflow-auto">{children}</div>
    </div>
  );
}
