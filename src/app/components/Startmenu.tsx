"use client";

import { useEffect, useRef, useState } from "react";

interface StartMenuProps {
  onLaunchApp?: (appId: string) => void;
}

export default function StartMenu({ onLaunchApp }: StartMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      id: "computer",
      label: "My Computer",
      icon: "/icons/my_computer.png",
    },
    {
      id: "explorer",
      label: "Internet Explorer",
      icon: "/icons/internet_explorer.png",
    },
    {
      id: "projects",
      label: "Projects",
      icon: "/icons/folder_open.png",
    },
  ];

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center bg-green-600 hover:bg-green-500 active:bg-green-700 h-full px-6 shadow-inner"
        style={{ minWidth: "100px" }}
      >
        <img src="/icons/start.png" alt="Start" className="w-6 h-6 mr-2" />
        <span className="text-white text-xl font-bold">start</span>
      </button>

      {open && (
        <div
          ref={menuRef}
          className="absolute bottom-12 left-0 w-80 h-[400px] flex bg-gradient-to-br from-[#3a6ea5] to-[#b0d0f0] rounded-tr-lg border-t border-l border-white shadow-2xl overflow-hidden font-sans text-sm z-50"
        >
          {/* Left user/profile panel */}
          <div className="w-24 bg-[#245edb] text-white flex flex-col items-center justify-start py-4 border-r border-white">
            <img
              src="/icons/user.png"
              alt="User"
              className="w-12 h-12 mb-2 rounded-full border border-white"
            />
            <span className="text-xs font-bold">User</span>
          </div>

          {/* Right program list panel */}
          <div className="flex-1 bg-white/90 text-black overflow-y-auto">
            <div className="px-4 py-2 text-blue-800 font-bold border-b border-gray-300">
              Programs
            </div>
            <ul className="divide-y divide-gray-200">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    setOpen(false);
                    onLaunchApp?.(item.id);
                  }}
                >
                  <img src={item.icon} alt={item.label} className="w-5 h-5" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
