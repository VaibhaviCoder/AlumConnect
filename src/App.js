
import './App.css';
import Home from './components/Home'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Explore from './components/Explore';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/explore" element={<Explore/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
