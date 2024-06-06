import React from 'react';
import Navbar from './Components/Navbar'; 
import './Components/Navbar/Home.css';

function Home() {
  return (
    <div>
      <Navbar />
      <main className="Home-main">
        <div className="main-content">
          <h1>The next generation of care for heart health</h1>
          <p>Track your heart health and prevent strokes effectively.</p>
          <button className="main-button">Learn More</button>
        </div>
      </main>
    </div>
  );
}

export default Home
