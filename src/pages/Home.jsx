import React from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slice/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slice/pizzaSlice";

import Categories from "../components/Categories/Categories";
import Sort, { list } from "../components/Sort/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryItem, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  // const [items, setItems] = React.useState([]);
  // const [isLoading, setisLoading] = React.useState(true);

  const sortType = sort.sortProperty.replace("-", "");
  const orderType = sort.sortProperty.includes("-") ? "asc" : "desc";
  const categoryType = categoryItem > 0 ? `category=${categoryItem}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        sortType,
        orderType,
        categoryType,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sort);

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
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryItem, sort, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sortProperty,
        categoryItem,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryItem, sort, currentPage]);

  const pizzas = items.map((obj) => <Link to={`/pizza/${obj.id}`}><PizzaBlock key={obj.id} {...obj} /></Link>);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            categoryItem={categoryItem}
            onClickCategory={onClickCategory}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>

        {status === "error" ? (
          <div className="content__error-info">
            <h2>Произошла ошибка</h2>
            <p>
              К сожалению, не удалось получить пиццы. Попробуйте повторить
              попытку позже
            </p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </div>
        )}

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
