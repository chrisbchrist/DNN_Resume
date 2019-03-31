import React from "react";
import EditCard from "../EditCard";

export default class SkillsEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skill: "",
      editIndex: -1
    };
    this.resetSkills = this.resetSkills.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.editMode = this.editMode.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.update = this.update.bind(this);
  }

  resetSkills() {
    this.setState({
      skill: "",
      editIndex: -1
    });
  }

  handleChange(e) {
    const skill = e.target.value;
    this.setState({
      skill: skill
    });
  }

  add() {
    if (this.state.skill) {
      this.props.addItem("skills", this.state.skill);
      this.resetSkills();
    }
  }

  handleKeyDown(e) {
    if (event.keyCode === 13 && e.target.value != "") {
      e.preventDefault();
      if (this.state.editIndex < 0) {
        this.add();
      } else {
        this.update();
      }
    }
  }

  editMode(i) {
    this.setState({
      skill: this.props.skills[i],
      editIndex: i
    });
  }

  cancelEdit() {
    this.resetSkills();
  }

  update() {
    this.props.updateItem("skills", this.state.skill, this.state.editIndex);
    this.resetSkills();
  }

  render() {
    return (
      <div className="input-holder">
        {this.state.editIndex < 0 && this.props.skills.length > 0 && (
          <h6 className="edit-label">Current Skills</h6>
        )}
        {this.state.editIndex < 0 &&
          this.props.skills.map((skill, i) => {
            let showDownArrow =
              this.props.skills.length > 1 && i < this.props.skills.length - 1;
            return (
              <EditCard
                key={i}
                showDownArrow={showDownArrow}
                index={i}
                reOrder={this.props.reOrder}
                editMode={this.editMode}
                delete={this.props.deleteItem}
                collection="skills"
              >
                <p style={{ fontWeight: "bold" }}>{skill}</p>
              </EditCard>
            );
          })}
        <div className="form-group top-group">
          <label className="label-hidden">Skill</label>
          <input
            className="form-control"
            placeholder="Skill"
            type="text"
            value={this.state.skill}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        <div className="add-btn-wrapper">
          {this.state.editIndex < 0 && (
            <div className="add-btn-wrapper">
              <div className="add-btn" onClick={this.add}>
                <i className="fas fa-plus" /> Add Skill
              </div>
            </div>
          )}
          {this.state.editIndex >= 0 && (
            <div className="edit-controls">
              <div className="edit-control cancel" onClick={this.cancelEdit}>
                <i className="fas fa-times" /> Cancel
              </div>
              <div className="edit-control done" onClick={this.update}>
                <i className="fas fa-check" /> Update
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
