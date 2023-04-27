import React from 'react'

import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setisLoading] = React.useState(true);

    React.useEffect(() => {
      fetch('https://64457ab8914c816083cfb742.mockapi.io/items')
        .then((res) => res.json())
        .then((json) => {
          setItems(json);
          setisLoading(false);
        });
    }, []);
  
  return (
    <>
        <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : items.map((pizza) =>
                  isLoading ? <Skeleton /> : <PizzaBlock key={pizza.id} {...pizza} />,
                )}
          </div>
    </>
  )
}


export default Home;