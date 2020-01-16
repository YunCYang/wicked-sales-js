import React from 'react';
import CartSummaryItem from './cartSummaryItem';

const CartSummary = props => {
  const cartItemList = props.cart.map(item => <CartSummaryItem key={item.cartItemId}
    item={item}/>);

  const priceTotal = props.cart.length === 0
    ? []
    : props.cart.map(item => item.price).reduce((sum, acc) => sum + acc);

  return (
    <div className="container">
      <div className="back-button-container mb-3" onClick={
        () => props.setView('catalog', {})
      }>
        <span className="button"> &lt; Back to catalog</span>
      </div>
      <div className="cart-title-container container">
        <span>My Cart</span>
      </div>
      {cartItemList}
      <div className="cart-price-container container">
        <span>Item Total $ {(priceTotal / 100).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;
