import "./App.css";
import Home from "./components/Home";

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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
