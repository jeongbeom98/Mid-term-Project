import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Todo from './Todo'; // Assuming Todo.js is in the same directory and handles sequence building
// Import Poses component if it's in the same directory
import Poses from './Poses';

function App() {

  useEffect(() => {
    document.title = "Yeogi, Yoga"; // Change the title
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="search-header"> 
          <h1>Yeogi, Yoga</h1>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">Explore Yoga Poses</Link>
        </li>
        <li className="nav-item">
          {/* Ensure only one space on each side without adding extra bars */}
          <span> | </span>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/sequence-builder">Sequence Builder</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

        <div className="navbar-bar"></div>

        <Routes>
          <Route path="/" element={<Poses />} />
          <Route path="/sequence-builder" element={<Todo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
