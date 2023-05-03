import React from 'react'
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slice/filterSlice';

import Categories from '../components/Categories/Categories';
import Sort, { list } from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';



const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);


    const { categoryItem, sort, currentPage } = useSelector(state => state.filter);
 

    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setisLoading] = React.useState(true);


    const sortType = sort.sortProperty.replace('-', '');
    const orderType = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const categoryType = categoryItem > 0 ? `category=${categoryItem}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';


    const onClickCategory = (id) => {
      dispatch(setCategoryId(id))
    }
      

    const onChangePage = (page) => {
      dispatch(setCurrentPage(page))
    }

    const fetchPizzas = () => {
      setisLoading(true)
      axios.get(
        `https://64457ab8914c816083cfb742.mockapi.io/items?page=${currentPage}&limit=4&${categoryType}&sortBy=${sortType}&order=${orderType}${search}`
        )
        .then(res => {
          setItems(res.data);
          setisLoading(false);
        })
        window.scrollTo(0, 0);
    }


    React.useEffect(() => {
      if (window.location.search) {
        const params = qs.parse(window.location.search.substring(1));
        const sort = list.find(obj => obj.sortProperty === params.sort);
        
        dispatch(
          setFilters({
            ...params,  
            sort,
          })
        );
      }
      isSearch.current = true;
    }, []);

    React.useEffect(() => {
      window.scrollTo(0, 0);

      if (!isSearch.current) {
        fetchPizzas();
      }

      isSearch.current = false; 
    }, [categoryItem,  sort, searchValue, currentPage]);

    React.useEffect(() => {
      if (isMounted.current) {
        const queryString = qs.stringify({
          sort: sort.sortProperty,
          categoryItem,
          currentPage
        });
  
        navigate(`?${queryString}`)
      }
      isMounted.current = true;
    }, [categoryItem, sort, currentPage]);

    const pizzas = items.map((obj) =><PizzaBlock key={obj.id} {...obj} />)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  
  return (
  <>
    <div className='container'>
        <div className="content__top">
            <Categories categoryItem={categoryItem} onClickCategory={onClickCategory} />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? skeletons
              :  pizzas
              }
          </div>
          <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
          </div>
    </>
  )
}


export default Home;