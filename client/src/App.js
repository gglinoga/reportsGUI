import React from 'react';
import Home from "../src/components/pages/home.js";
import Chart from "../src/components/pages/chart.js";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/chart" component={Chart}/>
      </div>
    </Router>
  )
}

export default App;
