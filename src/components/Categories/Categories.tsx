import React from 'react';

type CategoriesProps = {
  categoryItem: number;
  onChangeCategory: (i: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({ categoryItem, onChangeCategory }) => {

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
            <li key={i} onClick={() => onChangeCategory(i)} className={categoryItem === i ? 'active' : ''}>{values}</li>
          ))
        }
      </ul>
    </div>
  );
};


export default Categories;