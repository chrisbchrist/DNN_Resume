import React from "react";
import { connect } from "react-redux";
import { addItem, updateItem, reOrder } from "../../actions/index";
import CardContainer from "../CardContainer";
import EditCard from "../EditCard";

const mapStateToProps = state => {
  return {
    skills: state.skills
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addSkill: payload => dispatch(addItem("skills", payload)),
    updateSkill: (payload, index) =>
      dispatch(updateItem("skills", payload, index)),
    reOrder: (index, direction) => dispatch(reOrder("skills", index, direction))
  };
};

class ConnectedSkillsEditor extends React.Component {
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
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  resetSkills() {
    this.setState({
      skill: "",
      editIndex: -1
    });
  }

  onSortEnd({ oldIndex, newIndex, collection }) {
    this.props.reOrder(oldIndex, newIndex);
  }

  handleChange(e) {
    const skill = e.target.value;
    this.setState({
      skill: skill
    });
  }

  add() {
    if (this.state.skill) {
      this.props.addSkill(this.state.skill);
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
    this.props.updateSkill(this.state.skill, this.state.editIndex);
    this.resetSkills();
  }

  render() {
    return (
      <div className="input-holder">
        {this.state.editIndex < 0 && this.props.skills.length > 0 && (
          <h6 className="edit-label">Current Skills</h6>
        )}
        <div className="edit-card-wrapper">
          {this.state.editIndex < 0 && (
            <CardContainer
              editMode={this.editMode}
              onSortEnd={this.onSortEnd}
              transitionDuration={400}
              helperClass={"edit-card--dragging"}
            >
              {this.props.skills.map((skill, index) => (
                <EditCard
                  key={index}
                  index={index}
                  editMode={this.editMode}
                  collection={"skills"}
                >
                  <p>
                    <strong>{skill}</strong>
                  </p>
                </EditCard>
              ))}
            </CardContainer>
          )}
        </div>
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

const SkillsEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSkillsEditor);

export default SkillsEditor;
