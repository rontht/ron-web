"use client";

import { useState } from "react";
import DesktopIcon from "./components/DesktopIcon";
import TaskbarIcon from "./components/TaskbarIcon";
import Window from "./components/Window";
import { initialApps, AppInfo } from "./data/apps";

export default function Home() {
  const [apps, setApps] = useState<AppInfo[]>(initialApps);

  const handleOpenApp = (app: AppInfo) => {
    setApps((prev) =>
      prev.map((a) => (a.id === app.id ? { ...a, type: "running" } : a))
    );
  };
  const handleCloseApp = (app: AppInfo) => {
    setApps((prev) =>
      prev.map((a) => (a.id === app.id ? { ...a, type: "off" } : a))
    );
  };

  return (
    <main
      className="h-screen w-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url('/images/wallpaper.jpg')` }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 space-y-4">
        {apps.map((app) => (
          <DesktopIcon
            key={app.id}
            icon={app.icon}
            label={app.label}
            onOpen={() => handleOpenApp(app)}
          />
        ))}
      </div>

      {/* Render Windows for running apps */}
      {apps
        .filter((app) => app.type === "running")
        .map((app) => (
          <Window
            key={app.id}
            title={app.label}
            onClose={() => handleCloseApp(app)}
          >
          </Window>
        ))}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 w-full bg-black/70 h-12 flex items-center px-4">
        {/* Start Button */}
        <div className="text-white text-sm font-semibold mr-4 cursor-pointer">
          <img
            src="/icons/start.png"
            alt="Start"
            className="inline w-6 h-6 mr-2"
          />
          Start
        </div>

        {/* Taskbar Icons */}
        <div className="flex gap-2 ml-4">
          {apps
            .filter((app) => app.pinned || app.type === "running")
            .map((app) => (
              <TaskbarIcon key={app.id} icon={app.icon} alt={app.label} />
            ))}
        </div>

        {/* Clock */}
        <div className="ml-auto text-white text-xs">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </main>
  );
}
