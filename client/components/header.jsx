import React from 'react';

const Header = props => {
  return (
    <header className='container-fluid mb-5'>
      <div className="row">
        <div className="col-2">
          <img className="float-right" src="/images/favicon.png" alt="store icon" />
        </div>
        <div className='title-container col-7'>
          <span>Wicked Sales</span>
        </div>
        <div className="cart-container col-3 mt-3">
          <span className="button">{props.cartItemCount} items  </span>
          <i className="fas fa-shopping-cart button"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
