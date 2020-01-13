import React from 'react';

const Header = () => {
  return (
    <header className='container mb-3'>
      <div className="row">
        <div className="col-1">
          <img src="/images/favicon.png" alt="store icon" />
        </div>
        <div className='col-11'>
          <span>Wicked Sales</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
