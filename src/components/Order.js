import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../helpers';

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.shape({
      fish: PropTypes.shape({
        name: PropTypes.number,
        image: PropTypes.string,
        desc: PropTypes.string,
        status: PropTypes.string,
        price: PropTypes.number
      })
    }),
    order: PropTypes.shape({
      fish: PropTypes.number
    })
  }

  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available'
    if(!fish) return null;
    if(!isAvailable) {
      return (
        <li>Sorry {fish? fish.name : 'fish'} Is Not Available!</li>
      )
    }
    return (
      <li key={key}>
        {count} lbs {fish.name}
        {formatPrice(count * fish.price)}
        <button onClick={() => this.props.deleteOrder(key)}>&times;</button>
      </li>
    );
  }
  render() {
    const orders = Object.keys(this.props.order);
    const totalAmount = orders.reduce((sum, key) => { // key = "fish1", "fish2" etc.
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if(isAvailable) {
        return sum + (count * fish.price)
      }
      return sum;
    }, 0);

    return (
    <div className="order-wrap">
      <h2>Order</h2>
      <ul className="order ">
        {orders.map(this.renderOrder)}
      </ul>
      <div className="total">
      Total:
        <strong>{formatPrice(totalAmount)}</strong>
      </div>
    </div>
    );
  }
}

export default Order;