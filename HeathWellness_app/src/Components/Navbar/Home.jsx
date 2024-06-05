import React from 'react';
import Navbar from './Navbar';
import './Home.css';
//import backgroundImage from '../../assets/HeartStroke.png';

function Home() {
  return (
    <div>
      <Navbar />
    <main>
        <div className="main-content">
          <h1>The next generation of care for heart health</h1>
          <p>Track your heart health and prevent strokes effectively.</p>
          <button className="main-button">Learn More</button>
        </div>
      </main>
    </div>
  );
}

export default Home;

