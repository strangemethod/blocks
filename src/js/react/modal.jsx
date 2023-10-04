import React from "react";
import DialogPage from "./dialog-page.jsx";


export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialog: null,
      error: false,
      field: null,
    };
  }

  openDialog = (dialog) => {
    this.setState({
      dialog: dialog,
      field: this.props.field,
    });
  }

  render() {
    const props = {
      openDialog: this.openDialog,
      ...this.props
    }
    let buttonSet;
    switch (this.props.dialog) {
      case 'page-add':
        buttonSet = <button onClick={() => (this.openDialog(this.props.dialog))}
            className="button button-primary">+ Add Page</button>;
      break;

    }

    let dialog;
    switch (this.props.dialog) {
      case 'page-add':
        dialog = <DialogPage {...props} />;
      break;
    }

    return (
      <React.Fragment>
        {buttonSet}
        {this.state.dialog &&
          <section className="modal">
            <div className="modal__content">
              <div className="close" onClick={() => (this.openDialog(null, null))}>
                <img src="/assets/icon-cancel.svg" />
              </div>
              {dialog}
            </div>
          </section>
        }
      </React.Fragment>
    );
  }
}