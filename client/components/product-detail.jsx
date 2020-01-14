import React from 'react';

const ProductDetails = props => {
  const [product, setProduct] = React.useState(null);

  React.useEffect(
    () => {
      fetch(`/api/products/${props.id}`)
        .then(res => res.json())
        .then(res => setProduct(res));
    }, [product]
  );

  if (product) {
    return (
      <div className="list-item container">
        <div className="back-button-container" onClick={
          () => props.setView('catalog', {})
        }>
          <button>Back to catalog</button>
        </div>
        <div className="img-container">
          <img src={product.image} alt="" />
        </div>
        <div className="product-desc-container">
          <div className="product-name-container">
            <span>{product.name}</span>
          </div>
          <div className="product-price-container">
            <span> $ {product.price}</span>
          </div>
          <div className="product-detail-container">
            <span>{product.longDescription}</span>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ProductDetails;
