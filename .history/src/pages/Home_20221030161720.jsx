import React from 'react';

import Sort from '../components/Sort';
import '../scss/app.scss';
import Skeleton from '../components/pizzaBlock/Skeleton';
import PizzaBlock from "../components/pizzaBlock";
import Categories from '../components/Categories';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://6338bf62383946bc7febc8c5.mockapi.io/items')
    .then((res) => res.json())
    .then((json)=> {
      setItems(json);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="content">
      <div className="container">
   
      </div>
    </div>
  )
}

export default Home;
