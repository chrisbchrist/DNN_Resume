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

        <SkillsEditor preventSubmit={this.preventSubmit} />
      </div>
    );
  }
}
