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
    
    // reinstate localstorage
    const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
    console.log(localStorageRef)
    if(localStorageRef) {
      this.setState({order: JSON.parse(localStorageRef)})
    }
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`,{
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
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

  updateFish = (key, updatedFish) => {
    // copy of the state.
    const fishes = {...this.state.fishes}
    // update that state.
    fishes[key] = updatedFish;
    // Set that to state.
    this.setState({fishes});
  }

  deleteFish = (key) => {
    // take a copy of the state.
    const fishes = {...this.state.fishes}
    // Update the state.
    fishes[key] = null;
    // set that to state.
    this.setState({fishes})
  }

  deleteOrder = (key) => {
    // take a copy of the state.
    const order = {...this.state.order}
    // Update the state.
    delete order[key]
    // Set the state.
    this.setState({order})
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
         <Order fishes={this.state.fishes} order={this.state.order} deleteOrder={this.deleteOrder}/>
         <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes} updateFish={this.updateFish} deleteFish={this.deleteFish} storeId={this.props.match.params.storeId}/>
      </div>
    )
  }
}

export default App