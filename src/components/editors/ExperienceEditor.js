import React from "react";
import EditCard from "../EditCard";
import Modal from "../CustomModal";
import DescriptionWizard from "../DescriptionWizard";

export default class ExperienceEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExperience: {
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
        descList: [],
        listFormat: false
      },
      editIndex: -1,
      requiredFieldsPresent: true,
      jobWizard: false,
      currentlyEmployed: false
    };
    this.resetExperience = this.resetExperience.bind(this);
    this.handleExpChange = this.handleExpChange.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
    this.addExp = this.addExp.bind(this);
    this.editMode = this.editMode.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.updateExp = this.updateExp.bind(this);
    this.listMode = this.listMode.bind(this);
    this.paragraphMode = this.paragraphMode.bind(this);
    this.toggleWizard = this.toggleWizard.bind(this);
    this.setTasks = this.setTasks.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  resetExperience() {
    this.setState({
      currentExperience: {
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
        descList: [],
        listFormat: false
      },
      editIndex: -1,
      jobWizard: false,
      requiredFieldsPresent: true,
      currentlyEmployed: false
    });
  }

  handleExpChange(e, field) {
    const value = e.target.value;
    const currentExp = Object.assign({}, this.state.currentExperience);
    currentExp[field] = value;
    this.setState({
      currentExperience: currentExp
    });
  }

  handleListChange(e, i) {
    const value = e.target.value;
    const currentExp = Object.assign({}, this.state.currentExperience);
    if (value == "") {
      currentExp.descList.splice(i, 1);
    } else {
      currentExp.descList[i] = value;
    }

    this.setState({
      currentExperience: currentExp
    });
  }

  addExp() {
    if (
      this.state.currentExperience.title &&
      this.state.currentExperience.company
    ) {
      this.props.addItem("experience", this.state.currentExperience);
      this.resetExperience();
    } else {
      alert("Please enter a job title and employer.");
      this.setState({
        requiredFieldsPresent: false
      });
    }
  }

  editMode(i) {
    this.setState({
      currentExperience: this.props.experience[i],
      editIndex: i
    });
  }

  cancelEdit() {
    this.resetExperience();
  }

  updateExp() {
    if (
      this.state.currentExperience.title &&
      this.state.currentExperience.company
    ) {
      this.props.updateItem(
        "experience",
        this.state.currentExperience,
        this.state.editIndex
      );
      this.resetExperience();
    } else {
      this.setState({
        requiredFieldsPresent: false
      });
    }
  }

  listMode() {
    let currentExp = Object.assign({}, this.state.currentExperience);
    currentExp.listFormat = true;
    this.setState({
      currentExperience: currentExp
    });
  }

  paragraphMode() {
    let currentExp = Object.assign({}, this.state.currentExperience);
    currentExp.listFormat = false;
    this.setState({
      currentExperience: currentExp
    });
  }

  toggleWizard() {
    let currentExp = Object.assign({}, this.state.currentExperience);
    this.setState({
      jobWizard: !this.state.jobWizard
    });
  }

  setTasks(tasks) {
    const currentExp = Object.assign({}, this.state.currentExperience);
    currentExp.descList = tasks;
    currentExp.listFormat = true;
    this.setState({
      currentExperience: currentExp
    });
  }

  handleCheck(e) {
    const currentExp = Object.assign({}, this.state.currentExperience);
    currentExp.endDate = e.target.checked ? "Present" : "";
    this.setState({
      currentExperience: currentExp,
      currentlyEmployed: !this.state.currentlyEmployed
    });
  }

  render() {
    return (
      <div className="input-holder">
        {this.state.editIndex < 0 && this.props.experience.length > 0 && (
          <h6 className="edit-label">Current Experience</h6>
        )}
        {this.state.editIndex < 0 &&
          this.props.experience.map((job, i) => {
            let showDownArrow =
              this.props.experience.length > 1 &&
              i < this.props.experience.length - 1;
            return (
              <EditCard
                key={i}
                showDownArrow={showDownArrow}
                index={i}
                reOrder={this.props.reOrder}
                editMode={this.editMode}
                delete={this.props.deleteItem}
                collection="experience"
              >
                <p style={{ fontWeight: "bold" }}>{job.title}</p>
                <p>{job.company}</p>
              </EditCard>
            );
          })}
        <div className="form-group top-group">
          <label className="label-hidden">Title</label>
          <input
            onKeyDown={this.props.preventSubmit}
            className={
              this.state.requiredFieldsPresent ||
              this.state.currentExperience.title.length > 0
                ? "form-control"
                : "form-control invalid"
            }
            placeholder="Title"
            name="title"
            type="text"
            value={this.state.currentExperience.title}
            onChange={e => this.handleExpChange(e, "title")}
          />
        </div>
        <div className="form-group">
          <label className="label-hidden">Company</label>
          <input
            name="employer"
            onKeyDown={this.props.preventSubmit}
            className={
              this.state.requiredFieldsPresent ||
              this.state.currentExperience.company.length > 0
                ? "form-control"
                : "form-control invalid"
            }
            placeholder="Employer"
            type="text"
            value={this.state.currentExperience.company}
            onChange={e => this.handleExpChange(e, "company")}
          />
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="label-hidden" htmlFor="inputEmail4">
              Start Date
            </label>
            <input
              onKeyDown={this.props.preventSubmit}
              className="form-control"
              placeholder="Start Date"
              type="text"
              value={this.state.currentExperience.startDate}
              onChange={e => this.handleExpChange(e, "startDate")}
            />
          </div>

          <div className="form-group col-md-6">
            <label className="label-hidden" htmlFor="inputPassword4">
              End Date
            </label>
            <input
              onKeyDown={this.props.preventSubmit}
              className="form-control"
              placeholder="End Date"
              type="text"
              disabled={this.state.currentlyEmployed ? "disabled" : ""}
              value={this.state.currentExperience.endDate}
              onChange={e => this.handleExpChange(e, "endDate")}
            />
          </div>
        </div>
        <div className="check-wrapper">
          <label htmlFor="current-checkbox" className="check-label">
            <input
              id="current-checkbox"
              type="checkbox"
              checked={this.state.currentlyEmployed}
              onChange={this.handleCheck}
            />
            &nbsp;I currently work here
          </label>
        </div>
        <div className="form-group">
          <label className="label-hidden">Location</label>
          <input
            onKeyDown={this.props.preventSubmit}
            className="form-control"
            placeholder="Location"
            type="text"
            value={this.state.currentExperience.location}
            onChange={e => this.handleExpChange(e, "location")}
          />
        </div>

        <div className="form-group">
          <div className="experience-formats">
            <div
              className={
                !this.state.currentExperience.listFormat
                  ? "exp-format paragraph format-selected"
                  : "exp-format paragraph"
              }
              onClick={this.paragraphMode}
            >
              <i className="fas fa-paragraph" />
              &nbsp;Paragraph
            </div>
            <div
              className={
                this.state.currentExperience.listFormat
                  ? "exp-format list format-selected"
                  : "exp-format list"
              }
              onClick={this.listMode}
            >
              <i className="fas fa-list" />
              &nbsp;List
            </div>
          </div>
          <label className="label-hidden">Description</label>
          {!this.state.currentExperience.listFormat && (
            <textarea
              rows="6"
              className="form-control"
              placeholder="Job Description/Responsibilities"
              type="text"
              value={this.state.currentExperience.description}
              onChange={e => this.handleExpChange(e, "description")}
            />
          )}

          {this.state.currentExperience.listFormat && (
            <div className="list-input-wrapper">
              <textarea
                type="text"
                className="form-control list-input"
                placeholder="Job Duty/Accomplishment"
                value={this.state.currentExperience.descList[0]}
                onChange={e => this.handleListChange(e, 0)}
              />
            </div>
          )}

          {this.state.currentExperience.listFormat &&
            this.state.currentExperience.descList.map((item, i) => {
              return (
                <div className="list-input-wrapper">
                  <textarea
                    key={i}
                    id={i}
                    type="text"
                    className="form-control list-input"
                    placeholder="Job Duty/Accomplishment"
                    value={
                      this.state.currentExperience.descList[i + 1]
                        ? this.state.currentExperience.descList[i + 1]
                        : ""
                    }
                    onChange={e => this.handleListChange(e, i + 1)}
                  />
                </div>
              );
            })}
        </div>
        <div className="job-wizard-btn" onClick={this.toggleWizard}>
          <i className="fas fa-hat-wizard" />
          Job Description Wizard
        </div>

        {this.state.editIndex < 0 && (
          <div className="add-btn-wrapper">
            <div className="add-btn" onClick={this.addExp}>
              <i className="fas fa-plus" /> Add Experience
            </div>
          </div>
        )}
        {this.state.editIndex >= 0 && (
          <div className="edit-controls">
            <div className="edit-control cancel" onClick={this.cancelEdit}>
              <i className="fas fa-times" /> Cancel
            </div>
            <div className="edit-control done" onClick={this.updateExp}>
              <i className="fas fa-check" /> Update
            </div>
          </div>
        )}
        <Modal
          show={this.state.jobWizard}
          onClose={this.toggleWizard}
          customWidth={900}
        >
          <DescriptionWizard
            closeModal={this.toggleWizard}
            setTasks={this.setTasks}
          />
        </Modal>
      </div>
    );
  }
}
