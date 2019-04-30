import React from "react";
import CustomModal from "./CustomModal";
import { connect } from "react-redux";
import { setSize, setColor, updateField } from "../actions/index";
import Templates from "./templates/Templates";

const mapStateToProps = state => {
  return {
    textSize: state.textSize,
    headerSize: state.headerSize,
    color: state.color,
    font: state.font
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSize: (type, size) => dispatch(setSize(type, size)),
    setColor: color => dispatch(updateField("color", color)),
    setFont: font => dispatch(updateField("font", font))
  };
};

class ConnectedWysiwyg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fonts: [
        "Raleway",
        "Roboto",
        "Ubuntu",
        "Open Sans Condensed",
        "Proxima Nova",
        "Domine",
        "EB Garamond"
      ],
      colors: [
        "#222",
        "#FCB900",
        "#7BDCB5",
        "#00D084",
        "#8ED1FC",
        "#0693E3",
        "#ABB8C3",
        "#EB144C",
        "#F78DA7",
        "#9900EF"
      ],
      textSize: 14,
      headerSize: 25,
      showTemplates: false
    };
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.toggleTemplates = this.toggleTemplates.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleFontChange = this.handleFontChange.bind(this);
  }

  // Update text or header size depending on input name.  Maybe not the most durable solution.
  handleSizeChange(e) {
    const value = e.target.value;
    const type = e.target.getAttribute("name");
    this.props.setSize(type, value);
  }

  toggleTemplates() {
    this.setState({
      showTemplates: !this.state.showTemplates
    });
  }

  //Handles colors both from presets and hex input
  handleColorChange(e) {
    const staticColor = e.target.getAttribute("data-color");
    const customColor = "#" + e.target.value;
    if (staticColor) {
      this.props.setColor(staticColor);
    } else if (customColor && /^#[0-9A-F]{6}$/i.test(customColor)) {
      this.props.setColor(customColor);
    }
  }

  handleFontChange(e) {
    const font = e.target.getAttribute("data-font");
    this.props.setFont(font);
  }

  render() {
    return (
      <div id="wysiwyg">
        <div className="tool-btn">
          <div className="dropdown">
            <div
              className="btn dropdown-toggle"
              href="#"
              role="button"
              id="color-dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span
                style={{ background: this.props.color }}
                id="color-indicator"
              />
              Color
            </div>

            <div
              className="dropdown-menu"
              id="colors"
              aria-labelledby="color-dropdown"
            >
              <div className="swatch-row">
                {this.state.colors.map((color, i) => {
                  return (
                    <div
                      data-color={color}
                      style={{ background: color }}
                      className="swatch"
                      onClick={this.handleColorChange}
                      tabIndex="0"
                      key={i}
                    />
                  );
                })}
                <div id="color-input">
                  <div id="color-hash">#</div>
                  <input
                    maxLength="6"
                    onChange={this.handleColorChange}
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tool-btn">
          <div className="dropdown">
            <div
              className="btn dropdown-toggle"
              href="#"
              role="button"
              id="font-dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ fontFamily: this.props.font }}
            >
              <i className="fas fa-font" />
              &nbsp;{this.props.font}
            </div>

            <div className="dropdown-menu">
              {this.state.fonts.map((font, i) => {
                return (
                  <a
                    key={"font" + i}
                    onClick={e => this.handleFontChange(e)}
                    className="dropdown-item font-option"
                    href="#"
                    data-font={font}
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="tool-btn font-size-wrapper">
          <span style={{ textSize: 14 }}>
            <span className="font-size">{this.props.textSize}</span>px
          </span>
          <input
            onChange={e => this.handleSizeChange(e)}
            value={this.props.textSize}
            className="slider"
            name="textSize"
            id="volume"
            type="range"
            min="12"
            max="20"
          />
          <span className="font-label">Font Size</span>
        </div>
        <div className="tool-btn font-size-wrapper">
          <span style={{ textSize: 14 }}>
            <span className="font-size">{this.props.headerSize}</span>px
          </span>
          <input
            onChange={e => this.handleSizeChange(e)}
            value={this.props.headerSize}
            className="slider"
            name="headerSize"
            id="volume"
            type="range"
            min="15"
            max="27"
          />
          <span className="font-label">Header Size</span>
        </div>
        <div className="tool-btn">
          <span id="template-btn" onClick={this.toggleTemplates}>
            <i className="far fa-file-alt" /> Templates
          </span>
        </div>
        <CustomModal show={this.state.showTemplates} onClose={this.toggleTemplates}>
          <Templates onClose={this.toggleTemplates} />
        </CustomModal>
      </div>
    );
  }
}

const Wysiwyg = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedWysiwyg);

export default Wysiwyg;
