import React from 'react';
import { formatPrice } from '../helpers';

class EditFishForm extends React.Component {
  handleChange = (event) => {
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    }
    this.props.updateFish(this.props.index, updatedFish)
  }

  render() {
    return (
    <div className="fish-edit">
        <input name="name" type="text" placeholder="name" onChange={this.handleChange} value={this.props.fish.name}/>
        <input name="price" type="text" placeholder="price" onChange={this.handleChange} value={formatPrice(this.props.fish.price)}/>
        <select name="status" onChange={this.handleChange} value={this.props.fish.status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea name="desc" placeholder="Desc" onChange={this.handleChange} value={this.props.fish.desc}/>
        <input type="text" name="image" placeholder="image" onChange={this.handleChange} value={this.props.fish.image}/>
        <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </div>
    )
  }
}

export default EditFishForm;