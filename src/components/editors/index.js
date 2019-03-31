import React from "react";
import ImageInput from "../ImageInput";
import ExperienceEditor from "./ExperienceEditor";
import EducationEditor from "./EducationEditor";
import SkillsEditor from "./SkillsEditor";

export default class Editors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      education: {
        school: "",
        degree: "",
        startYear: "",
        endYear: "",
        location: "",
        achievements: ""
      },
      expEditIndex: ""
    };
    this.preventSubmit = this.preventSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, field) {
    const value = e.target.value;
    this.props.update(field, value);
  }

  preventSubmit(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  render() {
    return (
      <div id="accordion">
        <div className="resume-card card">
          <div
            className="resume-card-header card-header"
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
                    <ImageInput setImage={this.props.setImage} />
                  </div>
                )}
                <div className="form-group top-group">
                  <label className="label-hidden">Name</label>
                  <input
                    onKeyDown={this.preventSubmit}
                    maxLength="50"
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={this.props.resume.name}
                    onChange={e => this.handleChange(e, "name")}
                  />
                </div>
                <div className="form-group">
                  <label className="label-hidden">Location</label>
                  <input
                    onKeyDown={this.preventSubmit}
                    maxLength="40"
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    value={this.props.resume.location}
                    onChange={e => this.handleChange(e, "location")}
                  />
                </div>
                <div className="form-group">
                  <label className="label-hidden">E-Mail</label>
                  <input
                    onKeyDown={this.preventSubmit}
                    maxLength="40"
                    type="email"
                    className="form-control"
                    placeholder="E-mail address"
                    type="text"
                    value={this.props.resume.email}
                    onChange={e => this.handleChange(e, "email")}
                  />
                </div>
                <div className="form-group">
                  <label className="label-hidden">Phone</label>
                  <input
                    onKeyDown={this.preventSubmit}
                    maxLength="20"
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    value={this.props.resume.phone}
                    onChange={e => this.handleChange(e, "phone")}
                  />
                </div>
                <div className="form-group">
                  <label className="label-hidden">Current Position</label>
                  <input
                    onKeyDown={this.preventSubmit}
                    maxLength="40"
                    type="text"
                    className="form-control"
                    placeholder="Current Position"
                    value={this.props.resume.currentPosition}
                    onChange={e => this.handleChange(e, "currentPosition")}
                  />
                </div>
                <div className="form-group">
                  <label className="label-hidden">Summary</label>
                  <textarea
                    spellCheck="true"
                    maxLength="244"
                    rows="6"
                    className="form-control"
                    placeholder="Summary"
                    type="text"
                    value={this.props.resume.summary}
                    onChange={e => this.handleChange(e, "summary")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="resume-card card">
          <div
            className="resume-card-header card-header"
            id="headingTwo"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            <h5 className="mb-0">
              <i className="fas fa-briefcase" />
              Experience
            </h5>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordion"
          >
            <div className="card-body">
              <div id="edit-container" />
              <ExperienceEditor
                experience={this.props.resume.experience}
                reOrder={this.props.reOrder}
                preventSubmit={this.preventSubmit}
                addItem={this.props.addItem}
                updateItem={this.props.updateItem}
                deleteItem={this.props.deleteItem}
              />
            </div>
          </div>
        </div>
        <div className="resume-card card">
          <div
            className="resume-card-header card-header"
            id="headingThree"
            data-toggle="collapse"
            data-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            <h5 className="mb-0">
              <i className="fas fa-graduation-cap" />
              Education/Training
            </h5>
          </div>
          <div
            id="collapseThree"
            className="collapse"
            aria-labelledby="headingThree"
            data-parent="#accordion"
          >
            <div className="card-body">
              <EducationEditor
                education={this.props.resume.education}
                reOrder={this.props.reOrder}
                preventSubmit={this.preventSubmit}
                addItem={this.props.addItem}
                updateItem={this.props.updateItem}
                deleteItem={this.props.deleteItem}
              />
            </div>
          </div>
        </div>

        <div className="resume-card card">
          <div
            className="resume-card-header card-header"
            id="headingFour"
            data-toggle="collapse"
            data-target="#collapseFour"
            aria-expanded="false"
            aria-controls="collapseFour"
          >
            <h5 className="mb-0">
              <i className="fas fa-code" />
              Skills
            </h5>
          </div>
          <div
            id="collapseFour"
            className="collapse"
            aria-labelledby="headingFour"
            data-parent="#accordion"
          >
            <div className="card-body">
              <SkillsEditor
                skills={this.props.resume.skills}
                reOrder={this.props.reOrder}
                addItem={this.props.addItem}
                updateItem={this.props.updateItem}
                deleteItem={this.props.deleteItem}
                preventSubmit={this.preventSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
