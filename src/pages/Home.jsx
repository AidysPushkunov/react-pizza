import React from 'react'

import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setisLoading] = React.useState(true);
    const [categoryItem, onClickCategory] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);

    const [sort, setSort] = React.useState({
      name: 'Популярности',
      sortProperty: 'rating'
    });

    const sortType = sort.sortProperty.replace('-', '');
    const orderType = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const categoryType = categoryItem > 0 ? `category=${categoryItem}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

      

    React.useEffect(() => {
      setisLoading(true)
      fetch(`https://64457ab8914c816083cfb742.mockapi.io/items?page=${currentPage}&limit=4&${categoryType}&sortBy=${sortType}&order=${orderType}${search}`)
        .then((res) => res.json())
        .then((json) => {
          setItems(json);
          setisLoading(false);
        });
        window.scrollTo(0, 0);
    }, [categoryItem, sort, searchValue, currentPage]);

    const pizzas = items.map((obj) =><PizzaBlock key={obj.id} {...obj} />)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  
  return (
  <>
    <div className='container'>
        <div className="content__top">
            <Categories categoryItem={categoryItem} onClickCategory={(i) => {onClickCategory(i)}} />
            <Sort sort={sort} setSort={(i) => {setSort(i)}} />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? skeletons
              :  pizzas
              }
          </div>
          <Pagination onChangePage={(number) => setCurrentPage(number)}/>
          </div>
    </>
  )
}


export default Home;