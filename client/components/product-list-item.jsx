import React from 'react';

const ProductListItem = props => {
  return (
    <div className="list-item col-6 col-sm-4 button" onClick={() => {
      props.setView('detail', props.product.productId);
    }}>
      <div className="img-container">
        <img src={props.product.image} alt="" />
      </div>
      <div className="product-desc-container">
        <div className="product-name-container">
          <span className="product-name">{props.product.name}</span>
        </div>
        <div className="product-price-container">
          <span className="product-price">$ {(props.product.price / 100).toFixed(2)}</span>
        </div>
        <div className="product-detail-container">
          <span>{props.product.shortDescription}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
