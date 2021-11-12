import React from "react";

export default class AddBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blockType: 'centered-image',
      error: false,
    };
  }

  setBlockType = () => {
    this.setState({blockType: event.target.value});
  }  

  submitData = () => {
    if (this.state.blockType) {
      this.props.addBlock(this.state.blockType);
      this.props.closeDialog();
    } else {
      this.setState({error: true});
    }
  }  
  render() {
    return (
      <React.Fragment>
				<h2>Add a new Block</h2>
				<label>Block Type</label>
				<select className={`${this.state.error ? "error" : ""}`}  
            onChange={this.setBlockType}>
          <option value="centered-image" selected>Centered Image</option>
          <option value="centered-text">Centered Text</option>
          <option value="hero">Hero</option>
					<option value="text-image">Text and Image</option>
					<option value="three-up-image">Three-up Image</option>
					<option value="two-up-image">Two-Up Image</option>
				</select>
        <button class="submit" onClick={this.submitData}>Submit</button>
      </React.Fragment>
    );
  }
}