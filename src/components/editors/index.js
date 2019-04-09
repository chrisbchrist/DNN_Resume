import React from "react";
import ExperienceEditor from "./ExperienceEditor";
import EducationEditor from "./EducationEditor";
import SkillsEditor from "./SkillsEditor";
import GeneralEditor from "./GeneralEditor";

export default class Editors extends React.Component {
  constructor(props) {
    super(props);
    this.preventSubmit = this.preventSubmit.bind(this);
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
        <GeneralEditor preventSubmit={this.preventSubmit} />

        <ExperienceEditor preventSubmit={this.preventSubmit} />

        <EducationEditor preventSubmit={this.preventSubmit} />

        <div className="resume-card card">
          <div
            className="resume-card-header card-header card--purple"
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
