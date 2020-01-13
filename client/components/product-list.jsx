import React from 'react';
import ProductListItem from './product-list-item';

const ProductList = () => {
  const [products, setProducts] = React.useState([]);

  const getProducts = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(res => setProducts(res));
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  const createProductList = () => {
    return (
      products.map(item => <ProductListItem key={item.productId} product={item} />)
    );
  };

  return (
    <div className="container overflow-hidden">
      <div className="row">
        {createProductList()}
      </div>
    </div>
  );
};

export default ProductList;
