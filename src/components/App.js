import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state={
    fishes: {},
    order: {}
  };
  componentDidMount() {
    const {params} = this.props.match;
    this.ref = base.syncState(`${params.storeId}/fishes`,{
      context: this,
      state: "fishes"
    });
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  addFish = (fish) => {
    const fishes = {...this.state.fishes} // copy of the existing state
    fishes[`fish${Date.now()}`] = fish;
    this.setState({ fishes: fishes })
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes})
  }

  addToOrder = (fish) => {
    const orderFish = {...this.state.order} // copy of the existing state
    orderFish[fish] = orderFish[fish] + 1 || 1 // add or update fish to the order state.
    this.setState({order: orderFish})
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header TagLine={"Fresh Daily"}/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} index={key} addToOrder={this.addToOrder}/>)}
          </ul>
        </div>
         <Order fishes={this.state.fishes} order={this.state.order}/>
         <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    )
  }
}

export default App