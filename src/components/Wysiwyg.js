import React from "react";
import Modal from "./CustomModal";
import Templates from "./templates/Templates";

export default class Wysiwyg extends React.Component {
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
      fontSize: 14,
      headerSize: 25,
      showTemplates: false
    };
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleHeaderChange = this.handleHeaderChange.bind(this);
    this.toggleTemplates = this.toggleTemplates.bind(this);
  }

  handleSizeChange(e) {
    const value = e.target.value;
    this.setState({
      fontSize: value
    });
  }

  handleHeaderChange(e) {
    const value = e.target.value;
    this.setState({
      headerSize: value
    });
  }

  toggleTemplates() {
    this.setState({
      showTemplates: !this.state.showTemplates
    });
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
                      onClick={this.props.setColor}
                      tabIndex="0"
                      key={i}
                    />
                  );
                })}
                <div id="color-input">
                  <div id="color-hash">#</div>
                  <input
                    maxLength="6"
                    onChange={this.props.setCustomColor}
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
                    onClick={e => this.props.setFont(e)}
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
          <span style={{ fontSize: 14 }}>
            <span className="font-size">{this.props.fontSize}</span>px
          </span>
          <input
            onChange={e => this.props.setFontSize(e)}
            value={this.props.fontSize}
            className="slider"
            id="volume"
            type="range"
            min="12"
            max="20"
          />
          <span className="font-label">Font Size</span>
        </div>
        <div className="tool-btn font-size-wrapper">
          <span style={{ fontSize: 14 }}>
            <span className="font-size">{this.props.headerSize}</span>px
          </span>
          <input
            onChange={e => this.props.setHeaderSize(e)}
            value={this.props.headerSize}
            className="slider"
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
        <Modal show={this.state.showTemplates} onClose={this.toggleTemplates}>
          <Templates
            setTemplate={this.props.setTemplate}
            onClose={this.toggleTemplates}
          />
        </Modal>
      </div>
    );
  }
}
