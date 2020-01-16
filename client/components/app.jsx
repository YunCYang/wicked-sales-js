import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-detail';
import CartSummary from './cartSummary';
import CheckoutForm from './checkoutForm';

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
    this.placeOrder = this.placeOrder.bind(this);
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

  placeOrder(info) {
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: info.name,
        creditCard: info.creditCard,
        shippingAddress: info.shippingAddress
      })
    };
    fetch('/api/orders', init)
      .then(res => res.json())
      .then(res => this.setState({
        view: { name: 'catalog', params: {} },
        cart: []
      }));
  }

  renderListOrDetail() {
    if (this.state.view.name === 'catalog') {
      return <ProductList setView={this.setView} />;
    } else if (this.state.view.name === 'cart') {
      return <CartSummary setView={this.setView} cart={this.state.cart}/>;
    } else if (this.state.view.name === 'checkout') {
      return <CheckoutForm setView={this.setView} placeOrder={this.placeOrder} />;
    } else {
      return <ProductDetails id={this.state.view.params} setView={this.setView}
        addToCart={this.addToCart}/>;
    }
  }

  render() {
    return (
      <>
        <Header setView={this.setView} cartItemCount={this.state.cart.length}/>
        {this.renderListOrDetail()}
      </>
    );
  }
}
