import React from 'react';


const Categories = ( { categoryItem, onClickCategory } ) => {
 
  
  const catigories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ]



    return (
      <div className="categories">
        <ul>
          {
          catigories.map((values, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={categoryItem === i ? 'active' : ''}>{values}</li>
          ))
        }
        </ul>
      </div>
    );
  };


  export default Categories;