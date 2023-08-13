import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Explore from "./components/Explore";
import Contact from "./components/Contact";
import Branch from "./components/Branch";
import Batch from "./components/Batch";
import ProfileEdit from "./components/ProfileEdit";
import Navbar from "./components/Navbar";
import PublicUserProfile from "./components/PublicUserProfile";
import {UserContext} from './UserContext'
import { useState } from "react";



function App() {
  const [isLogedIn,setLogedIn]=useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{isLogedIn,setLogedIn}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Explore />}></Route>
          <Route path="/batch" element={<Batch />}></Route>
          <Route path="/branch" element={<Branch />}></Route>
          <Route path="/pedit/:id" element={<ProfileEdit />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/userProfile/:id" element={<PublicUserProfile />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
