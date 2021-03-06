import React from "react";
import { connect } from "react-redux";
import { addItem, updateItem, reOrder } from "../../actions/index";
import CardContainer from "../CardContainer";
import EditCard from "../EditCard";

const mapStateToProps = state => {
  return {
    education: state.education
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addEdu: payload => dispatch(addItem("education", payload)),
    updateEdu: (payload, index) =>
      dispatch(updateItem("education", payload, index)),
    reOrder: (index, direction) =>
      dispatch(reOrder("education", index, direction))
  };
};

class ConnectedEducationEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEducation: {
        school: "",
        degree: "",
        startYear: "",
        endYear: "",
        location: "",
        achievements: ""
      },
      editIndex: -1
    };
    this.resetEducation = this.resetEducation.bind(this);
    this.handleEduChange = this.handleEduChange.bind(this);
    this.add = this.add.bind(this);
    this.editMode = this.editMode.bind(this);
    this.update = this.update.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  resetEducation() {
    this.setState({
      currentEducation: {
        school: "",
        degree: "",
        startYear: "",
        endYear: "",
        location: "",
        achievements: ""
      },
      editIndex: -1,
      invalidInput: false
    });
  }

  handleEduChange(e, field) {
    const value = e.target.value;
    const currentEdu = Object.assign({}, this.state.currentEducation);
    currentEdu[field] = value;
    this.setState({
      currentEducation: currentEdu
    });
  }

  onSortEnd({ oldIndex, newIndex, collection }) {
    this.props.reOrder(oldIndex, newIndex);
  }

  add() {
    if (
      this.state.currentEducation.school &&
      this.state.currentEducation.degree
    ) {
      this.props.addEdu(this.state.currentEducation);
      this.resetEducation();
    }
  }

  editMode(i) {
    this.setState({
      currentEducation: this.props.education[i],
      editIndex: i
    });
  }

  update() {
    this.props.updateEdu(this.state.currentEducation, this.state.editIndex);
    this.resetEducation();
  }

  render() {
    return (
      <div className="resume-card card">
        <div
          className="resume-card-header card-header card--blue"
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
            <div className="input-holder">
              {this.state.editIndex < 0 && this.props.education.length > 0 && (
                <h6 className="edit-label">Current Education</h6>
              )}
              <div className="edit-card-wrapper">
                {this.state.editIndex < 0 && (
                  <CardContainer
                    editMode={this.editMode}
                    onSortEnd={this.onSortEnd}
                    transitionDuration={400}
                    helperClass={"edit-card--dragging"}
                  >
                    {this.props.education.map((school, index) => (
                      <EditCard
                        key={index}
                        index={index}
                        editMode={this.editMode}
                        collection={"education"}
                      >
                        <p>
                          <strong>{school.school}</strong>
                        </p>
                        <p>{school.degree}</p>
                      </EditCard>
                    ))}
                  </CardContainer>
                )}
              </div>
              <div className="form-group top-group">
                <label className="label-hidden">School</label>
                <input
                  className="form-control"
                  placeholder="School"
                  type="text"
                  value={this.state.currentEducation.school}
                  onChange={e => this.handleEduChange(e, "school")}
                  onKeyDown={this.props.preventSubmit}
                />
              </div>
              <div className="form-group">
                <label className="label-hidden">Degree</label>
                <input
                  className="form-control"
                  placeholder="Degree"
                  type="text"
                  value={this.state.currentEducation.degree}
                  onChange={e => this.handleEduChange(e, "degree")}
                  onKeyDown={this.props.preventSubmit}
                />
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className="label-hidden" htmlFor="inputEmail4">
                    Start Year
                  </label>
                  <input
                    className="form-control"
                    placeholder="Start Year"
                    type="text"
                    value={this.state.currentEducation.startYear}
                    onChange={e => this.handleEduChange(e, "startYear")}
                    onKeyDown={this.props.preventSubmit}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="label-hidden" htmlFor="inputPassword4">
                    End Year
                  </label>
                  <input
                    className="form-control"
                    placeholder="End Year"
                    type="text"
                    value={this.state.currentEducation.endYear}
                    onChange={e => this.handleEduChange(e, "endYear")}
                    onKeyDown={this.props.preventSubmit}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label-hidden">Location</label>
                <input
                  className="form-control"
                  placeholder="Location"
                  type="text"
                  value={this.state.currentEducation.location}
                  onChange={e => this.handleEduChange(e, "location")}
                  onKeyDown={this.props.preventSubmit}
                />
              </div>
              <div className="form-group">
                <label className="label-hidden">Achievements</label>
                <textarea
                  rows="6"
                  className="form-control"
                  placeholder="Achievements"
                  type="text"
                  value={this.state.currentEducation.achievements}
                  onChange={e => this.handleEduChange(e, "achievements")}
                  onKeyDown={this.props.preventSubmit}
                />
              </div>
              {this.state.editIndex < 0 && (
                <div className="add-btn-wrapper">
                  <div className="add-btn" onClick={this.add}>
                    <i className="fas fa-plus" /> Add Education
                  </div>
                </div>
              )}
              {this.state.editIndex >= 0 && (
                <div className="edit-controls">
                  <div
                    className="edit-control cancel"
                    onClick={this.resetEducation}
                  >
                    <i className="fas fa-times" /> Cancel
                  </div>
                  <div className="edit-control done" onClick={this.update}>
                    <i className="fas fa-check" /> Update
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const EducationEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedEducationEditor);

export default EducationEditor;
