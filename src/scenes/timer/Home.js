import React from 'react';

function Home({ onNavigate }) {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Focus App</h1>
        <button 
          className="pomodoro-button"
          onClick={() => onNavigate('pomodoro')}
        >
          Start Pomodoro Timer
        </button>
      </div>
    </div>
  );
}

export default Home; 