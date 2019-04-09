import React from "react";
import { connect } from "react-redux";
import { updateField } from "../../actions/index";
import ImageInput from "../ImageInput";

const mapStateToProps = state => {
  return {
    name: state.name,
    location: state.location,
    email: state.email,
    phone: state.phone,
    currentPosition: state.currentPosition,
    summary: state.summary,
    template: state.template
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateField: (field, value) => dispatch(updateField(field, value))
  };
};

class ConnectedGeneralEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, field) {
    const value = e.target.value;
    this.props.updateField(field, value);
  }

  render() {
    return (
      <div className="resume-card card">
        <div
          className="resume-card-header card-header card--yellow"
          id="headingOne"
          data-toggle="collapse"
          data-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          <h5 className="mb-0">
            <i className="fas fa-address-card" />
            General
          </h5>
        </div>

        <div
          id="collapseOne"
          className="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div className="card-body">
            <div className="input-holder">
              {this.props.template == "creative" && (
                <div>
                  <h6 className="edit-label">Profile Photo</h6>
                  <ImageInput />
                </div>
              )}
              <div className="form-group">
                <label className="label-hidden">Name</label>
                <input
                  onKeyDown={this.props.preventSubmit}
                  maxLength="50"
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={this.props.name}
                  onChange={e => this.handleChange(e, "name")}
                />
              </div>
              <div className="form-group">
                <label className="label-hidden">Location</label>
                <input
                  onKeyDown={this.props.preventSubmit}
                  maxLength="40"
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  value={this.props.location}
                  onChange={e => this.handleChange(e, "location")}
                />
              </div>
              <div className="form-group">
                <label className="label-hidden">E-Mail</label>
                <input
                  onKeyDown={this.props.preventSubmit}
                  maxLength="40"
                  type="email"
                  className="form-control"
                  placeholder="E-mail address"
                  type="text"
                  value={this.props.email}
                  onChange={e => this.handleChange(e, "email")}
                />
              </div>
              <div className="form-group">
                <label className="label-hidden">Phone</label>
                <input
                  onKeyDown={this.props.preventSubmit}
                  maxLength="20"
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                  value={this.props.phone}
                  onChange={e => this.handleChange(e, "phone")}
                />
              </div>
              <div className="form-group">
                <label className="label-hidden">Current Position</label>
                <input
                  onKeyDown={this.props.preventSubmit}
                  maxLength="40"
                  type="text"
                  className="form-control"
                  placeholder="Current Position"
                  value={this.props.currentPosition}
                  onChange={e => this.handleChange(e, "currentPosition")}
                />
              </div>
              <div className="form-group">
                <label className="label-hidden">Summary</label>
                <textarea
                  spellCheck="true"
                  maxLength="288"
                  rows="6"
                  className="form-control"
                  placeholder="Summary"
                  type="text"
                  value={this.props.summary}
                  onChange={e => this.handleChange(e, "summary")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const GeneralEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedGeneralEditor);

export default GeneralEditor;
