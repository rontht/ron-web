"use client";

export default function Game_2App() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <iframe
        // src="https://volkowo.github.io/very-cool-pirate-game/"
        src="https://volkowo.github.io/very-cool-pirate-game/"
        className="absolute inset-0 w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
        title="Very Cool Pirate Game"
      />
    </div>
  );
}