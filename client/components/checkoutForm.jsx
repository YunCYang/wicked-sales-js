import React from 'react';

const CheckoutForm = props => {
  const [info, setInfo] = React.useState({
    name: '',
    creditCard: '',
    shippingAddress: ''
  });

  return (
    <>
      <form className="container was-validated">
        <label>Name</label>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Name"
            value={info.name} required onChange={e => {
              setInfo({
                name: e.target.value,
                creditCard: info.creditCard,
                shippingAddress: info.shippingAddress
              });
            }} />
        </div>
        <div className="form-group">
          <label>Credit Card</label>
          <input type="text" className="form-control" value={info.creditCard}
            required onChange={e => {
              setInfo({
                name: info.name,
                creditCard: e.target.value,
                shippingAddress: info.shippingAddress
              });
            }}/>
        </div>
        <div className="form-group">
          <label>Shipping Address</label>
          <textarea className="form-control" cols="30" rows="10" placeholder="Address"
            value={info.shippingAddress} required onChange={e => {
              setInfo({
                name: info.name,
                creditCard: info.creditCard,
                shippingAddress: e.target.value
              });
            }}></textarea>
        </div>
        <div className="container">
          <div className="row">
            <div className="back-button-container col-10" onClick={
              () => props.setView('catalog', {})
            }>
              <span className="button"> &lt; Continue shopping</span>
            </div>
            <div className="col-2">
              <button type="submit" className="btn btn-primary" onClick={
                e => {
                  e.preventDefault();
                  e.stopPropagation();
                  props.placeOrder(info);
                }
              }>Place Order</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
