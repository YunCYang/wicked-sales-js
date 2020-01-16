import React from 'react';

const CartSummaryItem = props => {

  return (
    <div className="cart-item-container container mb-3 mt-3 border rounded">
      <div className="row">
        <div className="col-3 container img-container">
          <img src={props.item.image} alt="props.item.name"/>
        </div>
        <div className="col-9">
          <div className="mb-3">
            <span className="product-name">{props.item.name}</span>
          </div>
          <div className="mb-3">
            <span className="product-price">$ {(props.item.price / 100).toFixed(2)}</span>
          </div>
          <div>
            <span>{props.item.shortDescription}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummaryItem;
