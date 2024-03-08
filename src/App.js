// Filename - App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateCook from "./Components/CreateCook";
import EditCook from "./Components/EditCook";
import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
      <h1 className="cook">Cook Management System </h1>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createcook" element={<CreateCook />} />

          <Route path="/editcook/:id" element={<EditCook />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
