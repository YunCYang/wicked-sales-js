import React from 'react';

const ProductDetails = props => {
  const [product, setProduct] = React.useState(null);

  React.useEffect(
    () => {
      fetch(`/api/products/${props.id}`)
        .then(res => res.json())
        .then(res => setProduct(res));
    }, []
  );

  if (product) {
    return (
      <div className="list-item container">
        <div className="back-button-container mb-3" onClick={
          () => props.setView('catalog', {})
        }>
          <span className="button"> &lt; Back to catalog</span>
        </div>
        <div className="row mb-5">
          <div className="img-container col-4">
            <img src={product.image} alt="" />
          </div>
          <div className="col-6">
            <div className="product-desc-container">
              <div className="product-name-container container mb-3">
                <span className="product_name">{product.name}</span>
              </div>
              <div className="product-price-container container mb-3">
                <span className="product_price"> $ {(product.price / 100).toFixed(2)}</span>
              </div>
              <div className="product-detail-container container">
                <span>{product.shortDescription}</span>
              </div>
              <div className="add-cart-button-container container mt-4">
                <button className="btn btn-primary" onClick={() => {
                  props.addToCart(product);
                }}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="product-detail-container">
          <span>{product.longDescription}</span>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ProductDetails;
