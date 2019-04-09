import React from "react";
import { connect } from "react-redux";
import { updateField } from "../../actions/index";

const mapStateToProps = state => {
  return {
    template: state.template
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTemplate: template => dispatch(updateField("template", template))
  };
};

class ConnectedTemplates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTemplate: ""
    };
    this.handleTemplateChange = this.handleTemplateChange.bind(this);
    this.set = this.set.bind(this);
  }

  handleTemplateChange(e) {
    const template = e.target.value;
    this.setState({
      selectedTemplate: template
    });
  }

  set() {
    if (this.state.selectedTemplate) {
      this.props.setTemplate(this.state.selectedTemplate);
      this.props.onClose();
    } else {
      alert("Please choose a template or cancel.");
    }
  }

  render() {
    return (
      <div id="templates-wrapper">
        <h2 className="custom-modal-title">Choose a Template</h2>
        <div id="template-options">
          <label className="template-radio" htmlFor="classic">
            <input
              type="radio"
              id="classic"
              name="drone"
              value="classic"
              checked={this.state.selectedTemplate == "classic"}
              onChange={this.handleTemplateChange}
            />
            <img
              className="template-thumb"
              src="https://res.cloudinary.com/dgeb3iekh/image/upload/c_thumb,w_200,g_face/v1551386087/classic_amwyyq.png"
            />
            <i className="fas fa-check-circle" />
            <p className="template-option-label">Classic</p>
          </label>

          <label className="template-radio" htmlFor="creative">
            <input
              type="radio"
              id="creative"
              name="drone"
              value="creative"
              checked={this.state.selectedTemplate == "creative"}
              onChange={this.handleTemplateChange}
            />
            <img
              className="template-thumb"
              src="https://res.cloudinary.com/dgeb3iekh/image/upload/c_thumb,w_200,g_face/v1551386089/creative_jicolo.png"
            />
            <i className="fas fa-check-circle" />
            <p className="template-option-label">Creative</p>
          </label>
        </div>

        <div id="email-buttons">
          <a className="btn btn-primary" onClick={this.set}>
            Select
          </a>
          <a className="btn btn-secondary" onClick={this.props.onClose}>
            Cancel
          </a>
        </div>
      </div>
    );
  }
}

const Templates = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedTemplates);

export default Templates;
