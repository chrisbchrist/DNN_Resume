import React from "react";
import Modal from "./CustomModal";
import EmailContent from "./EmailContent";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      email: false,
      fileLink: ""
    };
    this.closeModal = this.closeModal.bind(this);
    this.emailModal = this.emailModal.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.savePdf = this.savePdf.bind(this);
  }

  closeModal() {
    this.setState({
      modalShow: false
    });
  }

  print() {
    window.print();
  }

  handleKeyPress(e) {
    if (e.keyCode == 13) {
      this.print();
    }
  }

  emailModal() {
    this.setState({
      modalShow: true,
      email: true
    });
  }

  savePdf() {
    let data = this.props.resume;
    data.color = this.props.color;
    data.font = this.props.font;
    data.textSize = this.props.fontSize;
    data.headerSize = this.props.headerSize;
    fetch("/DesktopModules/ResumeBuilder/API/Resume/Save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then(response => response.json()) // parses response to JSON
      .then(response => {
        console.log(response);
        this.setState({
          success: true,
          fileLink: response
        });
      });
  }

  render() {
    return (
      <nav
        className="navbar navbar-expand-sm navbar-dark flex-nowrap"
        id="resume-nav"
      >
        <button
          className="navbar-toggler mr-2"
          type="button"
          data-toggle="collapse"
          data-target="#resume-collapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div id="resume-brand" className="navbar-brand">
          <div id="logo-icon">
            <i className="fas fa-user-tie" />
          </div>{" "}
          <span
            style={{
              paddingRight: "3px",
              fontWeight: "bold",
              color: "#16a0db"
            }}
          >
            Resumé
          </span>
          <span style={{}}>Builder</span>
        </div>
        <div className="navbar-collapse collapse" id="resume-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="dropdown">
                <a
                  className="btn dropdown-toggle nav-link"
                  href="#"
                  role="button"
                  id="share-btn"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-share" />
                  Share
                </a>

                <div className="dropdown-menu">
                  <a
                    className="dropdown-item share-option"
                    tabIndex="0"
                    onKeyDown={this.handleKeyPress}
                    onClick={this.print}
                  >
                    <i className="fas fa-print" />
                    Print
                  </a>
                  <a
                    className="dropdown-item share-option"
                    tabIndex="0"
                    onClick={this.emailModal}
                  >
                    <i className="fas fa-envelope" />
                    E-mail
                  </a>
                  <a className="dropdown-item share-option" tabIndex="0">
                    <i className="fas fa-file-pdf" />
                    Download PDF
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <Modal show={this.state.modalShow} onClose={this.closeModal}>
          {this.state.email && (
            <EmailContent
              onClose={this.closeModal}
              resume={this.props.resume}
              color={this.props.color}
              font={this.props.font}
              fontSize={this.props.fontSize}
              headerSize={this.props.headerSize}
            />
          )}
        </Modal>
      </nav>
    );
  }
}
