import React from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";


import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slice/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slice/pizzaSlice";


import Categories from "../components/Categories/Categories";
import { Sort, sortList } from "../components/Sort/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useAppDispatch } from "../redux/store";
import { SearchPizzaParams } from "../redux/slice/pizzaSlice";



const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryItem, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const sortType = sort.sortProperty.replace("-", "");
  const orderType = sort.sortProperty.includes("-") ? "asc" : "desc";
  const categoryType = categoryItem > 0 ? `category=${categoryItem}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const onClickCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        sortType,
        orderType,
        categoryType,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sort: sort.sortProperty,
  //       categoryItem,
  //       currentPage,
  //     });

  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryItem, sort.sortProperty, searchValue, currentPage]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

  //     // if (sort) {
  //     // params.sort = sort;
  //     // }

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryItem: Number(params.categoryType),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       })
  //     );
  //   }
  //   isSearch.current = true;
  // }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryItem, sort, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            categoryItem={categoryItem}
            onChangeCategory={onClickCategory}
          />
          <Sort value={sort} />
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
