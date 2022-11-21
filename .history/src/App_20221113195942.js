import React from "react";
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';


export const SearchContext = React.createContext('');

function App() {


  return (
    <SearchContext.Provider >
      <div className="wrapper">
        <Header/>
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/home" element={<Home />}/>
              <Route path="/cart" element={<Cart />}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </SearchContext.Provider>
  )
}

export default App;
