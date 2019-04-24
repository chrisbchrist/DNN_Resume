import React from "react";
import Loader from "./Loader";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    resume: state
  };
};

class ConnectedEmailContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      success: false,
      error: false
    };
    this.sendMail = this.sendMail.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const val = e.target.value;
    this.setState({
      email: val
    });
  }

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  sendMail() {
    if (this.validateEmail(this.state.email)) {
      this.setState({
        loading: true
      });
      let data = this.props.resume;
      console.log(data);
      console.log(this.props);
      data.sendAddress = this.state.email;
      data.textSize = this.props.resume.fontSize;
      fetch("/DesktopModules/ResumeBuilder/API/Resume/Email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(response => {
          this.setState({
            success: true
          });
        });
    }
  }

  render() {
    if (this.state.success) {
      return (
        <div className="email-form">
          <img
            id="mail-sent"
            src="https://res.cloudinary.com/dgeb3iekh/image/upload/v1548162979/undraw_mail_aal6r1.svg"
          />
          <h2 className="email-msg">PDF e-mailed to {this.state.email}!</h2>
          <div id="email-buttons">
            <a className="btn btn-ok" id="btn-ok" onClick={this.props.onClose}>
              OK
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="email-form">
          {this.state.loading && (
            <Loader>
              <h2 className="load-msg">Generating e-mail . . .</h2>
            </Loader>
          )}
          <img
            id="paper-plane"
            src="https://res.cloudinary.com/dgeb3iekh/image/upload/v1547954707/paper-plane_zyz7sb.svg"
          />
          <h2 className="text-center email-msg">
            Enter your e-mail address and we'll send your resumé as a PDF.
          </h2>
          <div className="form-group">
            <label className="sr-only" htmlFor="exampleInputEmail1">
              Email address
            </label>
            <div id="i-wrap">
              <input
                type="email"
                className="form-control"
                id="email-input"
                aria-describedby="emailHelp"
                placeholder="Enter e-mail"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <small id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div id="email-buttons">
            <a
              className="btn btn-primary"
              id="post-email"
              onClick={this.sendMail}
            >
              Submit
            </a>
            <a className="btn btn-secondary" onClick={this.props.onClose}>
              Cancel
            </a>
          </div>
        </div>
      );
    }
  }
}

const EmailContent = connect(mapStateToProps)(ConnectedEmailContent);

export default EmailContent;
