import React from "react";
import logo from "./logo.svg";
import { Login } from "./features/user/Login";
import { Register } from "./features/user/Register";
import { Discussions } from "./features/content/Discussions";
import { Comments } from "./features/content/Comments";

import { Routes, Route, Redirect } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Routes>
          <Route path="/" element={<Discussions />} />
          <Route path="/:id" element={<Comments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
