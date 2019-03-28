import React from "react";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pdf: false
    };
    this.onClose = this.onClose.bind(this);
  }

  onClose(e) {
    if (e.target === e.currentTarget) {
      this.props.onClose && this.props.onClose(e);
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div
        className="custom-modal"
        id="modal"
        onClick={() => {
          if (!this.props.preventBackgroundClose) {
            this.onClose;
          }
        }}
      >
        <div
          className="window"
          style={{
            maxWidth: this.props.customWidth ? this.props.customWidth : 650
          }}
        >
          <div className="modal-close" onClick={this.onClose}>
            X
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
