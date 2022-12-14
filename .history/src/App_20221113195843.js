import React from "react";
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

export const SearchContext = React.createContext('');

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
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
