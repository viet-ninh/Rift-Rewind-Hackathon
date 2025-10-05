"use client"; // <-- ADD THIS DIRECTIVE
import React, { useState } from 'react';

// LoL-inspired color palette
const COLORS = {
  DARK_BG: '#0A141A', // Deep background
  ACCENT_GOLD: '#C8AA6E', // Primary gold accent
  ACCENT_BLUE: '#03B3FF', // Primary magic blue
  DARK_PANEL: 'rgba(10, 20, 26, 0.8)', // Semi-transparent panel
};

// Custom CSS for LoL aesthetic animations (Pulsating button and glow)
const LoLCSS = `
  /* Keyframes for the Pulsating Glow */
  @keyframes glow {
    0% { box-shadow: 0 0 5px ${COLORS.ACCENT_BLUE}, 0 0 10px ${COLORS.ACCENT_BLUE}; }
    50% { box-shadow: 0 0 15px ${COLORS.ACCENT_BLUE}, 0 0 30px ${COLORS.ACCENT_BLUE}, 0 0 45px ${COLORS.ACCENT_BLUE}; }
    100% { box-shadow: 0 0 5px ${COLORS.ACCENT_BLUE}, 0 0 10px ${COLORS.ACCENT_BLUE}; }
  }

  /* Keyframes for the Subtle Shimmer on Card Hover */
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .glow-text {
    text-shadow: 0 0 5px ${COLORS.ACCENT_BLUE};
  }

  .glow-button {
    animation: glow 3s infinite alternate;
    transition: all 0.3s ease;
  }

  .glow-button:hover {
    box-shadow: 0 0 20px ${COLORS.ACCENT_GOLD}, 0 0 40px ${COLORS.ACCENT_GOLD};
    transform: translateY(-2px);
  }

  .angled-border {
    position: relative;
    padding: 1px; /* Required to offset the border */
    background: linear-gradient(to right, ${COLORS.DARK_BG}, ${COLORS.DARK_BG});
    clip-path: polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%);
  }

  .angled-border::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, ${COLORS.ACCENT_GOLD}, ${COLORS.ACCENT_BLUE});
    z-index: -1;
    clip-path: polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%);
    transition: all 0.3s ease;
    opacity: 0.5;
  }

  .angled-border:hover::before {
    opacity: 1;
    transform: scale(1.01);
  }

  /* LoL Font Simulation */
  .lol-font {
    font-family: 'Inter', sans-serif; /* Fallback */
    letter-spacing: 0.05em;
  }

  .lol-bg {
    background-color: ${COLORS.DARK_BG};
    /* Optional: Adding a subtle background texture simulation */
    background-image: radial-gradient(circle at 50% 10%, rgba(3, 179, 255, 0.05) 0%, transparent 70%);
  }
`;

// Helper component for the feature cards
const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="angled-border w-full md:w-1/3 p-4">
      <div className={`bg-[${COLORS.DARK_PANEL}] rounded-md p-6 h-full flex flex-col justify-between lol-font`}>
        <div className="text-4xl text-yellow-300 mb-4">{icon}</div>
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
      {/* Inject custom CSS for animations */}
      <style>{LoLCSS}</style>

      <div className={`lol-bg min-h-screen w-full flex flex-col items-center justify-center p-4 text-white lol-font`}>
        <header className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-black bg-opacity-50 border-b border-gray-800">
          <div className={`text-3xl font-extrabold text-[${COLORS.ACCENT_GOLD}] glow-text`}>
            LEAGUE OF LEGENDS
          </div>
          <nav className="space-x-6 text-sm">
            {['Champions', 'Lore', 'Esports', 'Support'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className={`text-gray-400 hover:text-[${COLORS.ACCENT_GOLD}] transition duration-300 uppercase relative 
                            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] 
                            after:bg-[${COLORS.ACCENT_GOLD}] after:scale-x-0 after:hover:scale-x-100 after:transition after:origin-left`}
              >
                {item}
              </a>
            ))}
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex flex-col items-center justify-center pt-24 pb-12 w-full max-w-6xl">
          <h1 className="text-6xl md:text-8xl font-black mb-4 uppercase text-center lol-font tracking-wider">
            <span className={`text-[${COLORS.ACCENT_GOLD}]`} style={{ textShadow: `0 0 10px ${COLORS.ACCENT_GOLD}` }}>
              The Rift
            </span>
            <span className={`text-[${COLORS.ACCENT_BLUE}]`} style={{ textShadow: `0 0 10px ${COLORS.ACCENT_BLUE}` }}>
              Awaits
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 text-center max-w-2xl glow-text">
            Forge your legend in the world of Runeterra. Master unique champions, dominate the lanes, and ascend to glory.
          </p>

          {/* Pulsating Play Button */}
          <button
            className={`glow-button bg-[${COLORS.ACCENT_BLUE}] text-black font-extrabold text-xl py-4 px-12 rounded-lg 
                        shadow-2xl uppercase tracking-widest mb-20 transform hover:scale-[1.02] transition duration-300`}
            style={{ 
              backgroundColor: COLORS.ACCENT_BLUE,
              borderColor: COLORS.ACCENT_GOLD,
              borderWidth: '2px',
            }}
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

