import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Board from "./Components/Board/Board";
import NavBar from "./Components/Navbar/Navbar";
import EditTask from "./Components/Task/EditTask";
import TasksView from "./Components/Task/TasksView";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="214317005297-d3erptcl9p5ar90kibnsc1b10upidn9n.apps.googleusercontent.com">
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/board" element={<Board />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
