import React, {useState} from 'react';
import './App.css';
import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import InfoPage from './pages/Info/InfoPage';
import NavBar from './components/NavBar';
import axios from 'axios';

function App() {

  const API_TOKEN = process.env.REACT_APP_AQI_API_KEY;
  const [selectedStation, setSelectedStation] = useState<any>();
  
  return (
    <Router>
      <NavBar />
      
      <Routes>
        <Route path='/' element={<HomePage setSelectedStation={setSelectedStation}/>} />
        <Route path='/InfoPage/:uid' element={<InfoPage selectedStation={selectedStation}/>} />
      </Routes>
    </Router>
  );
}

export default App;
