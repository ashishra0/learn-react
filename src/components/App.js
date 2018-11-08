import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  state={tagline: "Fresh Daily "}
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header TagLine={this.state.tagline}/>
        </div>
         <Order />
         <Inventory />
      </div>
    )
  }
}

export default App