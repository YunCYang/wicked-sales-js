import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-detail';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      },
      cart: this.state.cart
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(res => this.setState({
        view: this.state.view,
        cart: res
      }));
  }

  addToCart(product) {
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.productId })
    };
    fetch('/api/cart', init)
      .then(res => res.json())
      .then(res => this.setState({
        view: this.state.view,
        cart: [...this.state.cart, res]
      }));
  }

  renderListOrDetail() {
    if (this.state.view.name === 'catalog') {
      return <ProductList setView={this.setView} />;
    } else {
      return <ProductDetails id={this.state.view.params} setView={this.setView}
        addToCart={this.addToCart}/>;
    }
  }

  render() {
    return (
      <>
        <Header cartItemCount={this.state.cart.length}/>
        {this.renderListOrDetail()}
      </>
    );
  }
}
