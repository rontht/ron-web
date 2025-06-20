"use client";

export default function Game_1App() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <iframe
        // src="https://volkowo.github.io/very-cool-pirate-game/"
        src="https://rontht.github.io/blast_you/"
        className="absolute inset-0 w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
        title="Blast You"
      />
    </div>
  );
}