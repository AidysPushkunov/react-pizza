import React from 'react';

type CategoriesProps = {
  categoryItem: number;
  onChangeCategory: (i: number) => void;
}

const catigories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые'
];

const Categories: React.FC<CategoriesProps> = React.memo(({ categoryItem, onChangeCategory }) => {

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
})


export default Categories;