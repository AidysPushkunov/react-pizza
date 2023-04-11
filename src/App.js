import './scss/app.scss';
import Header from './components/Header/Header';
import Categories from './components/Categories/Categories';
import Sort from './components/Sort/Sort';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock title="Мексиканская" price="500" />
            <PizzaBlock title="Алтайская" price="1500" />
            <PizzaBlock title="Теленгитская" price="1200" />
            <PizzaBlock title="Русская" price="1000" />
            <PizzaBlock title="Китайская" price="499" />
            <PizzaBlock title="Кыргызская" price="1499" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
