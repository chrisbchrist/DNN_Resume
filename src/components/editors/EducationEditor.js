import React from "react";
import EditCard from "../EditCard";

export default class EducationEditor extends React.Component {
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
    this.addEdu = this.addEdu.bind(this);
    this.editMode = this.editMode.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.updateEdu = this.updateEdu.bind(this);
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

  addEdu() {
    if (
      this.state.currentEducation.school &&
      this.state.currentEducation.degree
    ) {
      this.props.addItem("education", this.state.currentEducation);
    }
  }

  editMode(i) {
    this.setState({
      currentEducation: this.props.education[i],
      editIndex: i
    });
  }

  cancelEdit() {
    this.resetEducation();
  }

  updateEdu() {
    this.props.updateItem(
      "education",
      this.state.currentEducation,
      this.state.editIndex
    );
    this.resetEducation();
  }

  render() {
    return (
      <div className="input-holder">
        {this.state.editIndex < 0 && this.props.education.length > 0 && (
          <h6 className="edit-label">Current Education</h6>
        )}
        {this.state.editIndex < 0 &&
          this.props.education.map((entry, i) => {
            let showDownArrow =
              this.props.education.length > 1 &&
              i < this.props.education.length - 1;
            return (
              <EditCard
                key={i}
                showDownArrow={showDownArrow}
                index={i}
                reOrder={this.props.reOrder}
                editMode={this.editMode}
                delete={this.props.deleteItem}
                collection="education"
              >
                <p style={{ fontWeight: "bold" }}>{entry.school}</p>
                <p>{entry.degree}</p>
              </EditCard>
            );
          })}
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
            <div className="add-btn" onClick={this.addEdu}>
              <i className="fas fa-plus" /> Add Education
            </div>
          </div>
        )}
        {this.state.editIndex >= 0 && (
          <div className="edit-controls">
            <div className="edit-control cancel" onClick={this.cancelEdit}>
              <i className="fas fa-times" /> Cancel
            </div>
            <div className="edit-control done" onClick={this.updateEdu}>
              <i className="fas fa-check" /> Update
            </div>
          </div>
        )}
      </div>
    );
  }
}
