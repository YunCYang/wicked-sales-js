import React from 'react';
// import ProductListItem from './product-list-item';

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

  return (
    <div className="product-list-container">
      {products}
    </div>
  );
};

export default ProductList;
