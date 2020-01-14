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
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  renderListOrDetail() {
    if (this.state.view.name === 'catalog') {
      return <ProductList setView={this.setView} />;
    } else {
      return <ProductDetails id={this.state.view.params} setView={this.setView}/>;
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderListOrDetail()}
      </>
    );
  }
}
