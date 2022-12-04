import React from 'react';
import empty from '../assets/images/empty-cart.png'

const CartEmpty = () => {
  return (
    <div class="content">
      <div class="container container--cart">
        <div class="cart cart--empty">
          <h2>Корзина пустая <icon>😕</icon></h2>
          <p>
            Вероятней всего, вы не заказывали ещё пиццу.<br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
          </p>
          <img src={empty} alt="Empty cart" />
          <Lin class="button button--black">
            <span>Вернуться назад</span>
          </Lin>
        </div>
      </div>
    </div>
  )
}

export default CartEmpty;