import React, {useEffect} from 'react';
import './App.css';
import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import NavBar from './components/NavBar';

function App() {

  const API_TOKEN = process.env.REACT_APP_AQI_API_KEY;
  
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://api.waqi.info/feed/here/?token=ecc63754ee6b39686aa5ecfd2c6e6d1e417c9790');
      const data = await response.json();
      console.log(data);
      
    }
    getData();
  }, []);

  

  return (
    <Router>
      <NavBar />
      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/InfoPage/:uid' element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
