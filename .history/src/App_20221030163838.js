import React from "react";
import Header from './components/Header';
import HeaderHome from './pages/Home';
import { NotFound } from './pages/NotFound';


function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <NotFound />
        </div>
      </div>
    </div>
  )
}

export default App;
