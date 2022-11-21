import React from 'react';
import styles from './NotFoundBlock.module.scss';
console.log(styles);

const NotFoundBlock = () => {
  return (
    <div>
      <h1 className={styles.root}>
        <span>😕</span>
        <br/>
        Ничего не найдено
      </h1>
      <p>Данная страница отсутствуеь в наш</p>
    </div>
  )
}

export default NotFoundBlock;
