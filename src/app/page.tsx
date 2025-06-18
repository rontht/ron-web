"use client";

import { initialApps } from "./data/apps";
import { useApps } from "./hooks/useApps";
import Window from "./components/Window";

import DesktopIcon from "./components/DesktopIcon";
import TaskbarIcon from "./components/TaskbarIcon";

import { renderAppComponent } from "./components/apps/renderAppComponent";

export default function Home() {
  const { apps, openApp, closeApp, minimizeApp, focusApp, updatePosition } = useApps(initialApps);
  
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
            onOpen={() => openApp(app)}
          />
        ))}
      </div>

      {/* Render Windows for running apps */}
      {apps
        .filter((app) => app.status === "running" || app.status === "focused")
        .map((app) => {
          const AppComponent = renderAppComponent(app.id);

          return (
            <Window
              key={app.id}
              title={app.label}
              position={app.position}
              onDragEnd={(pos) => updatePosition(app.id, pos)}
              onClose={() => closeApp(app)}
              onMinimize={() => minimizeApp(app)}
              isFocused={app.status === "focused"}
            >
              {AppComponent ? (
                <AppComponent />
              ) : (
                <p>{app.label} is not ready yet.</p>
              )}
            </Window>
          );
        })}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 w-full h-12 bg-gradient-to-b from-blue-600 to-blue-800 flex items-center select-none">
        {/* Start Button */}
        <button
          className="flex items-center justify-center bg-green-600 hover:bg-green-500 active:bg-green-700 h-full px-6 shadow-inner"
          style={{ minWidth: "100px" }}
        >
          <img src="/icons/start.png" alt="Start" className="w-6 h-6 mr-2" />
          <span className="text-white text-xl font-bold">start</span>
        </button>

        {/* Taskbar buttons container */}
        <div className="flex flex-1 overflow-x-auto h-full items-center px-4">
          {[...apps]
            .filter(
              (app) =>
                app.pinned ||
                ["running", "focused", "minimized"].includes(app.status)
            )
            .sort((a, b) => {
              // Pinned apps stay first
              if (a.pinned && b.pinned) return 0;
              if (a.pinned) return -1;
              if (b.pinned) return 1;

              // Non-pinned apps sorted by open order
              return (a.order ?? 0) - (b.order ?? 0);
            })
            .map((app) => (
              <TaskbarIcon
                key={app.id}
                icon={app.icon}
                alt={app.label}
                label={app.label}
                status={app.status}
                pinned={app.pinned}
                onClick={() => focusApp(app)}
              />
            ))}
        </div>

        {/* Clock */}
        <div className="ml-auto h-full px-4 bg-blue-500 text-white text-md font-mono select-none flex items-center rounded-l-sm">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </main>
  );
}
