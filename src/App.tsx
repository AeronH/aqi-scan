import './App.css';
import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import InfoPage from './pages/Info/InfoPage';
import NavBar from './components/NavBar';

function App() {
  
  return (
    <Router>
      <NavBar />
      
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/InfoPage/'>
          <Route path=':uid' element={<InfoPage/>} /> 
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
