import React from "react";
import CustomModal from "./CustomModal";
import EmailContent from "./EmailContent";
import { connect } from "react-redux";
import { savePdf } from "../actions/index";

const mapDispatchToProps = dispatch => {
  return {
    savePdf: () => dispatch(savePdf())
  };
};

class ConnectedDashboard extends React.Component {
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
                  <a
                    onClick={this.props.savePdf}
                    className="dropdown-item share-option"
                    tabIndex="0"
                  >
                    <i className="fas fa-file-pdf" />
                    Download PDF
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <CustomModal show={this.state.modalShow} onClose={this.closeModal}>
          {this.state.email && <EmailContent onClose={this.closeModal} />}
        </CustomModal>
      </nav>
    );
  }
}

const Dashboard = connect(
  null,
  mapDispatchToProps
)(ConnectedDashboard);

export default Dashboard;
