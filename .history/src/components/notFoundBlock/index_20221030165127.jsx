import React from 'react';
import styles from './NotFoundBlock.module.scss';
console.log(styles);

const NotFoundBlock = () => {
  return (
    <div>
      <h1 >
        <span>😕</span>
        <br/>
        Ничего не найдено
      </h1>
      <p>Данная страница отсутствуеь в нашем интернет магазине</p>
    </div>
  )
}

export default NotFoundBlock;
