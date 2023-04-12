import React from "react";

export default class ResizeGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };
  }

  useEffect() {

  }

  handleMouseDown() {
    console.log('down!');
    this.setState({dragging: true});

  }

  handleMouseMove() {
    if (this.state.dragging) {
      console.log('move!');
    }
  }

  handleMouseUp() {
    console.log('up');
    this.setState({dragging: false});
  }


  render() {
    return null;
    // return (
    //     <div 
    //         onMouseDown={() => {this.handleMouseDown()}}
    //         onMouseMove={() => {this.handleMouseMove()}}
    //         onMouseUp={() => {this.handleMouseUp()}}
    //     >
    //     </div>
    // );
  }
}