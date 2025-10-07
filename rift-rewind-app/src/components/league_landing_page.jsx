"use client"; // <-- ADD THIS DIRECTIVE
import React, { useState } from 'react';

// Helper component for the feature cards
const FeatureCard = ({ title, description, icon }) => {
  return (
    // The class names (.angled-border, .lol-font) now come from lol-theme.css
    // Note: You should still use Tailwind classes for structure (w-full, p-4, etc.)
    <div className="angled-border w-full md:w-1/3 p-4">
      <div className={`bg-lol-panel rounded-md p-6 h-full flex flex-col justify-between lol-font`}>
        {/* You'll need to use standard Tailwind classes for text color, 
            which you should set up in tailwind.config.js as "lol-gold" */}
        <div className="text-4xl text-lol-gold mb-4">{icon}</div> 
        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wider">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

// Main App Component (Next.js page equivalent)
const App = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
       <div className={`lol-bg min-h-screen w-full flex flex-col items-center justify-center p-4 text-white lol-font`}>
        <header className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-black bg-opacity-50 border-b border-gray-800">
          {/* FIX 1: Use the configured Tailwind class for color */}
          <div className="text-3xl font-extrabold text-lol-gold glow-text">
            LEAGUE OF LEGENDS
          </div>
          <nav className="space-x-6 text-sm">
            {['Champions', 'Lore', 'Esports', 'Support'].map((item) => (
              <a 
                key={item} 
                href="#" 
                // FIX 2 & 3: Use the configured Tailwind classes for hover and after background color
                className={`text-gray-400 hover:text-lol-gold transition duration-300 uppercase relative 
                            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] 
                            after:bg-lol-gold after:scale-x-0 after:hover:scale-x-100 after:transition after:origin-left`}
              >
                {item}
              </a>
            ))}
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex flex-col items-center justify-center pt-24 pb-12 w-full max-w-6xl">
          <h1 className="text-6xl md:text-8xl font-black mb-4 uppercase text-center lol-font tracking-wider">
            <span className={`text-lol-gold`} style={{ textShadow: `0 0 10px var(--lol-gold)` }}>
              The Rift
            </span>
            <span className={`text-lol-blue`} style={{ textShadow: `0 0 10px var(--lol-blue)` }}>
              Awaits
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 text-center max-w-2xl glow-text">
            Forge your legend in the world of Runeterra. Master unique champions, dominate the lanes, and ascend to glory.
          </p>

          {/* Pulsating Play Button */}
          <button
            className={`glow-button bg-lol-blue text-white font-extrabold text-xl py-4 px-12 rounded-lg 
                    shadow-2xl uppercase tracking-widest mb-20 transform hover:scale-[1.02] 
                    transition duration-300 border-2 border-lol-gold`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? 'PREPARE FOR BATTLE' : 'ENTER THE RIFT'}
          </button>

          {/* Feature Cards Section */}
          <div className="w-full flex flex-col md:flex-row gap-8 justify-center">
            <FeatureCard 
              title="Champion Mastery" 
              description="Discover, unlock, and master over 160 unique champions, each with their own complex strategies and playstyles."
              icon="⚔️"
            />
            <FeatureCard 
              title="Ranked Ladder" 
              description="Climb the global ladder to prove your skill. Start in Iron and fight your way to the top tier: Challenger."
              icon="🏆"
            />
            <FeatureCard 
              title="Esports & Lore" 
              description="Dive into the deep lore of Runeterra and watch the world's best teams compete for the Summoner's Cup."
              icon="🔮"
            />
          </div>
        </main>

        <footer className="w-full mt-12 py-4 text-center text-xs text-gray-600 border-t border-gray-800 lol-font">
            A Mockup inspired by the Riot Games/League of Legends aesthetic. All rights reserved to their respective owners.
        </footer>
      </div>
    </>
  );
};

export default App;

