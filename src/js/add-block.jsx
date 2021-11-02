import React from "react";

export default class AddBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
				<h2>Add a new Block</h2>
				<label for="blockType">Block Type</label>
				<select id="blockType">
					<option value="text-image">Text and Image</option>
					<option value="three-up-image">Three-up Image</option>
					<option value="two-up-image">Two-Up Image</option>
				</select>
        <button class="submit" onClick={this.props.closeDialog}>Submit</button>
      </React.Fragment>
    );
  }
}