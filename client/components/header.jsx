import React from 'react';

const Header = () => {
  return (
    <header className='container-fluid'>
      <div className="row">
        <div className="col-3">
          <img src="/images/favicon.png" alt="store icon" />
        </div>
        <div className='col-9'>
          <span>Wicked Sales</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
