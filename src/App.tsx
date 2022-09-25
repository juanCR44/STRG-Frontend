import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/home';
import RegisterUser from './pages/registerUser';
import LoginUser from './pages/loginUser';
import Procamera from './pages/proCamera';
import Yolo from './pages/yolo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=
          {<LoginUser
          />
          } />
        <Route path="/login" element=
          {<LoginUser
          />
          } />
        <Route path="/register" element=
          {<RegisterUser
          />
          } />
        <Route path="/dashboard" element=
          {<Home
          />
          } />
        <Route path="/camera" element=
          {<Procamera
          />
          } />
        <Route path="/deteccion-yolo" element=
          {<Yolo
            
          />
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
