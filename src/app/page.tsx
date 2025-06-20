"use client";

import { initialApps } from "./data/apps";
import { useApps } from "./hooks/useApps";
import Window from "./components/Window";

import DesktopIcon from "./components/DesktopIcon";
import TaskbarIcon from "./components/TaskbarIcon";
import StartMenu from "./components/Startmenu";

import { renderAppComponent } from "./components/apps/renderAppComponent";

export default function Home() {
  const {
    apps,
    openApp,
    closeApp,
    minimizeApp,
    focusApp,
    updatePosition,
    changeFocusApp,
  } = useApps(initialApps);

  return (
    <main
      className="h-screen w-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url('/images/wallpaper.jpg')` }}
    >
      {/* _________________________________________ Desktop Icons */}
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

      {/* _________________________________________ Render Windows for running apps */}
      {apps
        .filter((app) => app.status === "running" || app.status === "focused")
        .map((app) => {
          // const AppComponent = renderAppComponent(app.id);
          const appDef = renderAppComponent(app.id);
          if (!appDef) return null;
          const { Component: AppComponent, width, height } = appDef;

          return (
            <Window
              key={app.id}
              id={app.id}
              title={app.label}
              position={app.position}
              onDragEnd={(pos) => updatePosition(app.id, pos)}
              onClose={() => closeApp(app)}
              onMinimize={() => minimizeApp(app)}
              isFocused={app.status === "focused"}
              width={width}
              height={height}
              onFocus={() => changeFocusApp(app)}
            >
              {AppComponent ? (
                <AppComponent />
              ) : (
                <p>{app.label} is not ready yet.</p>
              )}
            </Window>
          );
        })}

      {/* _________________________________________ Taskbar */}
      <div className="fixed bottom-0 left-0 w-full h-12 bg-gradient-to-b from-blue-600 to-blue-800 flex items-center select-none">
        {/* Start Button */}
        <StartMenu
          onLaunchApp={(id) => openApp(apps.find((a) => a.id === id)!)}
        />

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
