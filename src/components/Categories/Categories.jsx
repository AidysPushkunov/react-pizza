import React from 'react';


const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(5);
  
  const catigories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ]

  const onClickCategory = (index) => {
    setActiveIndex(index)
  }

    return (
      <div className="categories">
        <ul>
          {
          catigories.map((values, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={activeIndex === i ? 'active' : ''}>{values}</li>
          ))
        }
        </ul>
      </div>
    );
  };


  export default Categories;