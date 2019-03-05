import React from "react";
import allJobs from "../components/jobs";
// const allJobs = require("../components/jobs.js");
import "cropperjs/dist/cropper.css";
import ImageCropper from "../components/ImageCropper";

//TODO: Redux away this enormous excess of state

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resume: {
        name: "James K. Polk",
        currentPosition: "11th President",
        location: "The White House, USA",
        summary:
          "I'm James K. Polk, and I was a U.S. President elected in 1844.  I served for only one term, and my wife and I were notorious workaholics.  I seized the whole Southwest from Mexico!",
        email: "jkpolk@imdead.com",
        phone: "123.456.7890",
        experience: [
          {
            title: "Not the President",
            company: "America",
            startDate: "1848",
            endDate: "Death",
            location: "Western Hemisphere",
            description:
              "I accomplished all my stated goals in a single term and fulfilled my promise not to seek a second."
          },
          {
            title: "11th President",
            company: "America",
            startDate: "1844",
            endDate: "1848",
            location: "Western Hemisphere",
            description: "",
            descList: [
              "Made sure the tariffs fell.",
              "Made sure the English sold the Oregon Territory.",
              "Built an independent Treasury."
            ],
            listFormat: true,
            image: ""
          }
        ],
        education: [
          {
            school: "Florida State University",
            degree: "Presidential Studies",
            startYear: "1832",
            endYear: "1836",
            location: "Florida",
            achievements: "Fulfilled our Manifest Destiny"
          }
        ],
        skills: ["Dazzling oratory", "Austerity", "Severity"]
      },
      color: "#16a0db",
      font: "Raleway",
      textSize: 14,
      headerSize: 15,
      template: "classic"
    };
    this.updateOneField = this.updateOneField.bind(this);
    this.addItem = this.addItem.bind(this);
    this.setColor = this.setColor.bind(this);
    this.setCustomColor = this.setCustomColor.bind(this);
    this.setFont = this.setFont.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.reOrder = this.reOrder.bind(this);
    this.setFontSize = this.setFontSize.bind(this);
    this.setHeaderSize = this.setHeaderSize.bind(this);
    this.setTemplate = this.setTemplate.bind(this);
    this.setImage = this.setImage.bind(this);
  }

  updateOneField(field, val) {
    const resumeState = Object.assign({}, this.state.resume);
    resumeState[field] = val;
    this.setState({
      resume: resumeState
    });
  }

  addItem(collection, item) {
    const resumeState = Object.assign({}, this.state.resume);
    resumeState[collection].push(item);
    this.setState({
      resume: resumeState
    });
  }

  setColor(e) {
    const color = e.target.getAttribute("data-color");
    this.setState({
      color: color
    });
  }

  setCustomColor(e) {
    const value = "#" + e.target.value;
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      this.setState({
        color: value
      });
    }
  }

  setFont(e) {
    const font = e.target.getAttribute("data-font");
    this.setState({
      font: font
    });
  }

  setFontSize(e) {
    const newVal = e.target.value;
    this.setState({
      textSize: newVal
    });
  }

  setHeaderSize(e) {
    const newVal = e.target.value;
    this.setState({
      headerSize: newVal
    });
  }

  updateItem(collection, item, index) {
    const resumeState = Object.assign({}, this.state.resume);
    resumeState[collection][index] = item;
    this.setState({
      resume: resumeState
    });
  }

  deleteItem(collection, index) {
    const resumeState = Object.assign({}, this.state.resume);
    resumeState[collection].splice(index, 1);
    this.setState({
      resume: resumeState
    });
  }

  reOrder(collection, index, direction) {
    const resumeState = Object.assign({}, this.state.resume);
    var temp = resumeState[collection][index];
    resumeState[collection][index] = resumeState[collection][index + direction];
    resumeState[collection][index + direction] = temp;
    this.setState({
      resume: resumeState
    });
  }

  setTemplate(template) {
    this.setState({
      template: template
    });
  }

  setImage(data) {
    const resumeState = Object.assign({}, this.state.resume);
    resumeState.image = data;
    this.setState(
      {
        resume: resumeState
      },
      () => console.log(this.state.resume.image)
    );
  }

  render() {
    return (
      <div>
        {/* Needs some Redux! */}
        <Dashboard
          resume={this.state.resume}
          color={this.state.color}
          font={this.state.font}
          fontSize={this.state.textSize}
          headerSize={this.state.headerSize}
        />
        <div id="app-main">
          <Editors
            update={this.updateOneField}
            resume={this.state.resume}
            reOrder={this.reOrder}
            addItem={this.addItem}
            updateItem={this.updateItem}
            deleteItem={this.deleteItem}
            template={this.state.template}
            setImage={this.setImage}
          />

          <Preview
            resume={this.state.resume}
            color={this.state.color}
            font={this.state.font}
            fontSize={this.state.textSize}
            headerSize={this.state.headerSize}
            setColor={this.setColor}
            setCustomColor={this.setCustomColor}
            setFont={this.setFont}
            setFontSize={this.setFontSize}
            setHeaderSize={this.setHeaderSize}
            template={this.state.template}
            setTemplate={this.setTemplate}
          />
        </div>
      </div>
    );
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      email: false,
      fileLink: ""
    };
    this.closeModal = this.closeModal.bind(this);
    this.emailModal = this.emailModal.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.savePdf = this.savePdf.bind(this);
  }

  closeModal() {
    this.setState({
      modalShow: false
    });
  }

  print() {
    window.print();
  }

  handleKeyPress(e) {
    if (e.keyCode == 13) {
      this.print();
    }
  }

  emailModal() {
    this.setState({
      modalShow: true,
      email: true
    });
  }

  savePdf() {
    let data = this.props.resume;
    data.color = this.props.color;
    data.font = this.props.font;
    data.textSize = this.props.fontSize;
    data.headerSize = this.props.headerSize;
    fetch("/DesktopModules/ResumeBuilder/API/Resume/Save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then(response => response.json()) // parses response to JSON
      .then(response => {
        console.log(response);
        this.setState({
          success: true,
          fileLink: response
        });
      });
  }

  render() {
    return (
      <nav
        className="navbar navbar-expand-sm navbar-dark flex-nowrap"
        id="resume-nav"
      >
        <button
          className="navbar-toggler mr-2"
          type="button"
          data-toggle="collapse"
          data-target="#resume-collapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div id="resume-brand" className="navbar-brand">
          <div id="logo-icon">
            <i className="fas fa-user-tie" />
          </div>{" "}
          <span
            style={{
              paddingRight: "3px",
              fontWeight: "bold",
              color: "#16a0db"
            }}
          >
            Resumé
          </span>
          <span style={{}}>Builder</span>
        </div>
        <div className="navbar-collapse collapse" id="resume-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="dropdown">
                <a
                  className="btn dropdown-toggle nav-link"
                  href="#"
                  role="button"
                  id="share-btn"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-share" />
                  Share
                </a>

                <div className="dropdown-menu">
                  <a
                    className="dropdown-item share-option"
                    tabIndex="0"
                    onKeyDown={this.handleKeyPress}
                    onClick={this.print}
                  >
                    <i className="fas fa-print" />
                    Print
                  </a>
                  <a
                    className="dropdown-item share-option"
                    tabIndex="0"
                    onClick={this.emailModal}
                  >
                    <i className="fas fa-envelope" />
                    E-mail
                  </a>
                  <a className="dropdown-item share-option" tabIndex="0">
                    <i className="fas fa-file-pdf" />
                    Download PDF
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <Modal show={this.state.modalShow} onClose={this.closeModal}>
          {this.state.email && (
            <EmailContent
              onClose={this.closeModal}
              resume={this.props.resume}
              color={this.props.color}
              font={this.props.font}
              fontSize={this.props.fontSize}
              headerSize={this.props.headerSize}
            />
          )}
        </Modal>
      </nav>
    );
  }
}

class Wysiwyg extends React.Component {
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

const Preview = props => {
  return (
    <div id="preview-wrapper">
      <Wysiwyg
        setColor={props.setColor}
        setCustomColor={props.setCustomColor}
        font={props.font}
        color={props.color}
        fontSize={props.fontSize}
        headerSize={props.headerSize}
        setFont={props.setFont}
        setFontSize={props.setFontSize}
        setHeaderSize={props.setHeaderSize}
        setTemplate={props.setTemplate}
      />
      {props.template === "classic" && <ClassicTemplate {...props} />}
      {props.template === "creative" && <CreativeTemplate {...props} />}
    </div>
  );
};

const ClassicTemplate = props => {
  return (
    <div
      className="preview preview-classic"
      style={{ fontFamily: props.font, fontSize: props.fontSize + "px" }}
    >
      <h1 id="name" style={{ color: props.color }}>
        {props.resume.name}
      </h1>
      <p id="contact">
        {props.resume.location}
        {props.resume.email != "" && (
          <span>
            <span style={{ color: props.color, opacity: 0.7 }}> | </span>
            <span style={{ fontWeight: "bold" }}>E: </span>
            {props.resume.email}
          </span>
        )}
        {props.resume.phone != "" && (
          <span>
            <span style={{ color: props.color, opacity: 0.7 }}> | </span>
            <span style={{ fontWeight: "bold" }}>C: </span>
            {props.resume.phone}
          </span>
        )}
      </p>
      <p id="current-position">{props.resume.currentPosition}</p>
      <div id="summary">{props.resume.summary}</div>

      {props.resume.skills.length > 0 && (
        <p
          className="exp-header"
          style={{ color: props.color, fontSize: props.headerSize + "px" }}
        >
          <i className="fas fa-cogs" /> Skills
        </p>
      )}
      <p className="secondary-text skills">
        {props.resume.skills.map((skill, i) => {
          return (
            <span key={i}>
              {skill}
              {i < props.resume.skills.length - 1 && ", "}
            </span>
          );
        })}
      </p>

      {props.resume.experience.length > 0 && (
        <section className="resume-section" id="section-exp">
          <p
            className="exp-header"
            style={{ color: props.color, fontSize: props.headerSize + "px" }}
          >
            <i className="fas fa-briefcase" /> Experience
          </p>
          {props.resume.experience.map((job, i) => {
            return (
              <div className="experience" key={"exp" + i}>
                <div className="exp-left">
                  <p className="exp-company primary-text">{job.company}</p>
                  <p className="exp-location secondary-text">{job.location}</p>
                  <p className="exp-dates secondary-text">
                    {job.startDate} - {job.endDate}
                  </p>
                </div>
                <div className="exp-right">
                  <p className="exp-title primary-text">{job.title}</p>
                  {!job.listFormat && (
                    <p className="exp-desc secondary-text">{job.description}</p>
                  )}
                  {job.listFormat && (
                    <ul className="exp-list">
                      {job.descList.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {props.resume.education.length > 0 && (
        <p
          className="exp-header"
          style={{ color: props.color, fontSize: props.headerSize + "px" }}
        >
          <i className="fas fa-university" /> Education
        </p>
      )}
      {props.resume.education.map((entry, i) => {
        return (
          <div className="experience" key={"edu" + i}>
            <div className="exp-left">
              <p className="exp-company primary-text">
                {entry.school}
                <span className="secondary-text">, {entry.location}</span>
              </p>
              <p className="exp-dates secondary-text">
                {entry.startYear} - {entry.endYear}
              </p>
            </div>
            <div className="exp-right">
              <p className="exp-title primary-text">{entry.degree}</p>
              <p className="exp-desc secondary-text">{entry.achievements}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CreativeTemplate = props => {
  let profileImage = "";
  if (props.resume.image) {
    profileImage = <img src={props.resume.image} id="profile-image" />;
  } else {
    profileImage = (
      <div className="image-placeholder">
        <i className="fas fa-user-tie" />
      </div>
    );
  }
  return (
    <div
      className="preview preview-creative"
      style={{ fontFamily: props.font, fontSize: props.fontSize + "px" }}
    >
      <div className="creative-sidebar" style={{ background: props.color }}>
        <div className="creative-profile">
          <div className="photo-edit">
            <i className="fas fa-pencil-alt" />
          </div>
          {profileImage}
        </div>
        <h3 className="creative-name">{props.resume.name}</h3>
        <p className="sidebar-current text-center">
          {props.resume.currentPosition}
        </p>
        <p className="sidebar-text text-center">{props.resume.location}</p>
        <p className="sidebar-text">{props.resume.summary}</p>
        {(props.resume.email || props.resume.phone) && (
          <div className="sidebar-contact">
            <h2 className="sidebar-header">Information</h2>
            <div className="sidebar-contact-group">
              <div className="sidebar-icon">
                <i className="fas fa-envelope" />
              </div>{" "}
              {props.resume.email}
            </div>
            <div className="sidebar-contact-group">
              <div className="sidebar-icon">
                <i className="fas fa-mobile-alt" />
              </div>{" "}
              {props.resume.phone}
            </div>
          </div>
        )}
      </div>
      <div className="creative-main">
        {props.resume.skills.length > 0 && (
          <div
            className="creative-header"
            style={{ color: props.color, fontSize: props.headerSize + "px" }}
          >
            <div className="creative-icon">
              <i className="fas fa-cogs" />
            </div>{" "}
            Skills
          </div>
        )}
        <p className="secondary-text skills">
          {props.resume.skills.map((skill, i) => {
            return (
              <span key={i}>
                {skill}
                {i < props.resume.skills.length - 1 && ", "}
              </span>
            );
          })}
        </p>

        {props.resume.experience.length > 0 && (
          <section className="resume-section" id="section-exp">
            <div
              className="creative-header"
              style={{ color: props.color, fontSize: props.headerSize + "px" }}
            >
              <div className="creative-icon">
                <i className="fas fa-briefcase" />
              </div>{" "}
              Experience
            </div>
            {props.resume.experience.map((job, i) => {
              return (
                <div className="experience" key={"exp" + i}>
                  <div className="exp-left">
                    <p className="exp-company primary-text">{job.company}</p>
                    <p className="exp-location secondary-text">
                      {job.location}
                    </p>
                    <p className="exp-dates secondary-text">
                      {job.startDate} - {job.endDate}
                    </p>
                  </div>
                  <div className="exp-right">
                    <p className="exp-title primary-text">{job.title}</p>
                    {!job.listFormat && (
                      <p className="exp-desc secondary-text">
                        {job.description}
                      </p>
                    )}
                    {job.listFormat && (
                      <ul className="exp-list">
                        {job.descList.map((task, i) => (
                          <li key={i}>{task}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {props.resume.education.length > 0 && (
          <div
            className="creative-header"
            style={{ color: props.color, fontSize: props.headerSize + "px" }}
          >
            <div className="creative-icon">
              <i className="fas fa-university" />
            </div>{" "}
            Education
          </div>
        )}
        {props.resume.education.map((entry, i) => {
          return (
            <div className="experience" key={"edu" + i}>
              <div className="exp-left">
                <p className="exp-company primary-text">
                  {entry.school}
                  <span className="secondary-text">, {entry.location}</span>
                </p>
                <p className="exp-dates secondary-text">
                  {entry.startYear} - {entry.endYear}
                </p>
              </div>
              <div className="exp-right">
                <p className="exp-title primary-text">{entry.degree}</p>
                <p className="exp-desc secondary-text">{entry.achievements}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// TODO: Break up this behemoth component
class Editors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      education: {
        school: "",
        degree: "",
        startYear: "",
        endYear: "",
        location: "",
        achievements: ""
      },
      expEditIndex: ""
    };
    this.preventSubmit = this.preventSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, field) {
    const value = e.target.value;
    this.props.update(field, value);
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
        <div className="resume-card card">
          <div
            className="resume-card-header card-header"
            id="headingOne"
            data-toggle="collapse"
            data-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <h5 className="mb-0">
              <i className="fas fa-address-card" />
              General
            </h5>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="card-body">
              <div className="input-holder">
                {this.props.template == "creative" && (
                  <div>
                    <h6 className="edit-label">Profile Photo</h6>
                    <ImageInput setImage={this.props.setImage} />
                  </div>
                )}
                <div className="form-group top-group">
                  <label className="label-hidden">Name</label>
                  <input
                    onKeyDown={this.preventSubmit}
                    maxLength="50"
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={this.props.resume.name}
                    onChange={e => this.handleChange(e, "name")}
                  />
                </div>
                <div className="form-group">
                  <label className="label-hidden">Location</label>
                  <input
                    onKeyDown={this.preventSubmit}
                    maxLength="40"
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    value={this.props.resume.location}
                    onChange={e => this.handleChange(e, "location")}
                  />
                </div>
                <div className="form-group">
                  <label className="label-hidden">E-Mail</label>
                  <input
                    onKeyDown={this.preventSubmit}
                    maxLength="40"
                    type="email"
                    className="form-control"
                    placeholder="E-mail address"
                    type="text"
                    value={this.props.resume.email}
                    onChange={e => this.handleChange(e, "email")}
                  />
                </div>
                <div className="form-group">
                  <label className="label-hidden">Phone</label>
                  <input
                    onKeyDown={this.preventSubmit}
                    maxLength="20"
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    value={this.props.resume.phone}
                    onChange={e => this.handleChange(e, "phone")}
                  />
                </div>
                <div className="form-group">
                  <label className="label-hidden">Current Position</label>
                  <input
                    onKeyDown={this.preventSubmit}
                    maxLength="40"
                    type="text"
                    className="form-control"
                    placeholder="Current Position"
                    value={this.props.resume.currentPosition}
                    onChange={e => this.handleChange(e, "currentPosition")}
                  />
                </div>
                <div className="form-group">
                  <label className="label-hidden">Summary</label>
                  <textarea
                    spellCheck="true"
                    maxLength="244"
                    rows="6"
                    className="form-control"
                    placeholder="Summary"
                    type="text"
                    value={this.props.resume.summary}
                    onChange={e => this.handleChange(e, "summary")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="resume-card card">
          <div
            className="resume-card-header card-header"
            id="headingTwo"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            <h5 className="mb-0">
              <i className="fas fa-briefcase" />
              Experience
            </h5>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordion"
          >
            <div className="card-body">
              <div id="edit-container" />
              <ExperienceEditor
                experience={this.props.resume.experience}
                reOrder={this.props.reOrder}
                preventSubmit={this.preventSubmit}
                addItem={this.props.addItem}
                updateItem={this.props.updateItem}
                deleteItem={this.props.deleteItem}
              />
            </div>
          </div>
        </div>
        <div className="resume-card card">
          <div
            className="resume-card-header card-header"
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
              <EducationEditor
                education={this.props.resume.education}
                reOrder={this.props.reOrder}
                preventSubmit={this.preventSubmit}
                addItem={this.props.addItem}
                updateItem={this.props.updateItem}
                deleteItem={this.props.deleteItem}
              />
            </div>
          </div>
        </div>

        <div className="resume-card card">
          <div
            className="resume-card-header card-header"
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

const EditCard = props => {
  return (
    <div
      className={
        props.collection == "skills" ? "edit-card skill-card" : "edit-card"
      }
    >
      <div className="order-wrapper">
        {props.index > 0 && (
          <div
            className="order order-up"
            onClick={() => props.reOrder(props.collection, props.index, -1)}
          >
            <i className="fas fa-caret-up" />
          </div>
        )}
        {props.showDownArrow && (
          <div
            className="order order-down"
            onClick={() => props.reOrder(props.collection, props.index, 1)}
          >
            <i className="fas fa-caret-down" />
          </div>
        )}
      </div>
      {props.children}
      <div
        data-index={props.index}
        className="edit-btn edit"
        onClick={() => props.editMode(props.index)}
      >
        <i className="fas fa-pencil-alt" />
      </div>
      <div
        data-index={props.index}
        className="edit-btn delete"
        onClick={() => props.delete(props.collection, props.index)}
      >
        <i className="fas fa-trash-alt" />
      </div>
    </div>
  );
};

class ExperienceEditor extends React.Component {
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

class EducationEditor extends React.Component {
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

class SkillsEditor extends React.Component {
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

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pdf: false
    };
    this.onClose = this.onClose.bind(this);
  }

  onClose(e) {
    if (e.target === e.currentTarget) {
      this.props.onClose && this.props.onClose(e);
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div
        className="custom-modal"
        id="modal"
        onClick={() => {
          if (!this.props.preventBackgroundClose) {
            this.onClose;
          }
        }}
      >
        <div
          className="window"
          style={{
            maxWidth: this.props.customWidth ? this.props.customWidth : 650
          }}
        >
          <div className="modal-close" onClick={this.onClose}>
            X
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const Loader = props => {
  return (
    <div className="loader">
      {/* <div id="loader-6">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>*/}
      <div id="anim-wrapper">
        <div id="anim-bg">
          <div id="env-wrapper">
            <div className="speedline line1" />
            <div className="speedline line2" />
            <div className="speedline line3" />
            <i id="env" className="fas fa-envelope" />
          </div>
        </div>

        <div id="check-container">
          <div className="check-stroke1" />
          <div className="check-stroke2" />
        </div>
      </div>
      {props.children}
    </div>
  );
};

class EmailContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
      success: false,
      error: false
    };
    this.sendMail = this.sendMail.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const val = e.target.value;
    this.setState({
      email: val
    });
  }

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  sendMail() {
    if (this.validateEmail(this.state.email)) {
      this.setState({
        loading: true
      });
      let data = this.props.resume;
      data.color = this.props.color;
      data.font = this.props.font;
      data.sendAddress = this.state.email;
      data.textSize = this.props.fontSize;
      data.headerSize = this.props.headerSize;
      fetch("/DesktopModules/ResumeBuilder/API/Resume/Email", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json"
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
        .then(response => response.json()) // parses response to JSON
        .then(response => {
          this.setState({
            success: true
          });
        });
    }
  }

  render() {
    if (this.state.success) {
      return (
        <div className="email-form">
          <img
            id="mail-sent"
            src="https://res.cloudinary.com/dgeb3iekh/image/upload/v1548162979/undraw_mail_aal6r1.svg"
          />
          <h2 className="email-msg">PDF e-mailed to {this.state.email}!</h2>
          <div id="email-buttons">
            <a className="btn btn-ok" id="btn-ok" onClick={this.props.onClose}>
              OK
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="email-form">
          {this.state.loading && (
            <Loader>
              <h2 className="load-msg">Generating e-mail . . .</h2>
              <p style={{ marginTop: 15 }}>
                Sorry, this doesn't work on Codepen :({" "}
              </p>
            </Loader>
          )}
          <img
            id="paper-plane"
            src="https://res.cloudinary.com/dgeb3iekh/image/upload/v1547954707/paper-plane_zyz7sb.svg"
          />
          <h2 className="text-center email-msg">
            Enter an e-mail address and we'll send your resumé as a PDF.
          </h2>
          <div className="form-group">
            <label className="sr-only" htmlFor="exampleInputEmail1">
              Email address
            </label>
            <div id="i-wrap">
              <input
                type="email"
                className="form-control"
                id="email-input"
                aria-describedby="emailHelp"
                placeholder="Enter e-mail"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <small id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div id="email-buttons">
            <a
              className="btn btn-primary"
              id="post-email"
              onClick={this.sendMail}
            >
              Submit
            </a>
            <a className="btn btn-secondary" onClick={this.props.onClose}>
              Cancel
            </a>
          </div>
        </div>
      );
    }
  }
}

class Templates extends React.Component {
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

const db = allJobs;

// const db = {
//   "Wellhead Pumpers": {
//     SOC: "53-7073.00"
//   },
//   "Refuse and Recyclable Material Collectors": {
//     SOC: "53-7081.00"
//   },
//   "Mine Shuttle Car Operators": {
//     SOC: "53-7111.00"
//   },
//   "Tank Car, Truck, and Ship Loaders": {
//     SOC: "53-7121.00"
//   },
//   "Material Moving Workers, All Other": {
//     SOC: "53-7199.00"
//   },
//   "Financial Managers": {
//     SOC: "11-3031.02"
//   },
//   "Industrial Production Managers": {
//     SOC: "11-3051.00"
//   },
//   "Purchasing Managers": {
//     SOC: "11-3061.00"
//   },
//   "Transportation, Storage, and Distribution Managers": {
//     SOC: "11-3071.00"
//   },
//   "Compensation and Benefits Managers": {
//     SOC: "11-3111.00"
//   },
//   "Human Resources Managers": {
//     SOC: "11-3121.00"
//   },
//   "Training and Development Managers": {
//     SOC: "11-3131.00"
//   },
//   "Farmers, Ranchers, and Other Agricultural Managers": {
//     SOC: "11-9013.00"
//   },
//   "Construction Managers": {
//     SOC: "11-9021.00"
//   },
//   "Education Administrators, Preschool and Childcare Center/Program": {
//     SOC: "11-9031.00"
//   },
//   "Education Administrators, Elementary and Secondary School": {
//     SOC: "11-9032.00"
//   },
//   "Education Administrators, Postsecondary": {
//     SOC: "11-9033.00"
//   },
//   "Education Administrators, All Other": {
//     SOC: "11-9039.00"
//   },
//   "Architectural and Engineering Managers": {
//     SOC: "11-9041.00"
//   },
//   "Food Service Managers": {
//     SOC: "11-9051.00"
//   },
//   "Funeral Service Managers": {
//     SOC: "11-9061.00"
//   },
//   "Gaming Managers": {
//     SOC: "11-9071.00"
//   },
//   "Lodging Managers": {
//     SOC: "11-9081.00"
//   }
// };

class JobAutocomplete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  // Event fired when the input value is changed
  onChange(e) {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  }

  onClick(e) {
    // Update the user input and reset the rest of the state
    this.props.getData(e.currentTarget.innerText);
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  }

  onKeyDown(e) {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.props.getData(filteredSuggestions[activeSuggestion]);
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, try a different title!</em>
          </div>
        );
      }
    }

    return (
      <div className="form-group autocomplete-wrapper">
        <label className="label-hidden">Job Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Job title"
          id="autocomplete"
          onChange={onChange}
          autoComplete="off"
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
      </div>
    );
  }
}

class DescriptionWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      suggestions: [],
      jobCode: "",
      tasks: "",
      selectedTasks: [],
      error: false
    };
    this.getData = this.getData.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.finish = this.finish.bind(this);
  }

  //Get job data for occupation selected from autocomplete
  getData(occupation) {
    const code = db[occupation].SOC + ".00";
    fetch(
      "https://services.onetcenter.org/ws/online/occupations/" +
        code +
        "/details/tasks?client=chris_blakely"
    )
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(response => {
        console.log(response);
        if (response.getElementsByTagName("error").length > 0) {
          throw Error("No data available for that job. Try again!");
        }
        let tasks = [];
        const taskNodes = response.getElementsByTagName("task");
        for (let i = 0; i < taskNodes.length; i++) {
          tasks.push({
            task: taskNodes[i].getElementsByTagName("statement")[0].textContent,
            show: true
          });
        }
        this.setState({
          title: occupation,
          jobCode: code,
          tasks: tasks
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: true
        });
      });
  }

  addTask(e, index) {
    const tasks = Array.from(this.state.tasks);
    tasks[index].show = false;
    const newTask = {
      task: this.state.tasks[index].task,
      index: index
    };
    const selectedTasks = Array.from(this.state.selectedTasks);
    selectedTasks.push(newTask);
    this.setState({
      tasks: tasks,
      selectedTasks: selectedTasks
    });
  }

  removeTask(e, index) {
    let selectedTasks = Array.from(this.state.selectedTasks);
    const originalIndex = selectedTasks[index].index;
    selectedTasks.splice(index, 1);
    let tasks = Array.from(this.state.tasks);
    tasks[originalIndex].show = true;
    this.setState({
      tasks: tasks,
      selectedTasks: selectedTasks
    });
  }

  editTask(e, i) {
    const value = e.target.value;
    let selectedTasks = Array.from(this.state.selectedTasks);
    selectedTasks[i].task = value;
    this.setState({
      selectedTasks: selectedTasks
    });
  }

  finish() {
    let taskText = this.state.selectedTasks.map(task => task.task);
    this.props.setTasks(taskText);
    this.props.closeModal();
  }

  componentDidMount() {
    let jobs = [];
    for (var job in db) {
      jobs.push(job);
    }
    this.setState({
      suggestions: jobs
    });
  }

  render() {
    if (!this.state.jobCode) {
      return (
        <div className="job-wizard">
          <div id="job-wizard-step1">
            <h2 className="custom-modal-title">
              <i className="fas fa-magic" /> Experience Wizard
            </h2>
            <img
              src="https://res.cloudinary.com/dgeb3iekh/image/upload/v1550812849/wizard_1_cp7wes.svg"
              id="sorcerer"
            />
            <p>
              Our experience wizard will help you write accurate, professional
              summaries of your previous work experience by allowing you to view
              and edit the tasks and skills most commonly associated with any
              occupation. Just enter the position you need help describing and
              select the closest match from the list of suggestions.
            </p>
            <JobAutocomplete
              getData={this.getData}
              suggestions={this.state.suggestions}
            />
            {this.state.error && (
              <p className="text-danger">
                Sorry, the Department of Labor does not have tasks on file for
                that occupation, try another title!
              </p>
            )}
          </div>
        </div>
      );
    } else if (this.state.jobCode) {
      return (
        <div className="job-wizard">
          <div id="job-wizard-step2">
            <h2 className="custom-modal-title">
              <i className="fas fa-magic" /> Experience Wizard
            </h2>
            <p>
              Click on relevant tasks below to edit and add them to your resumé.
              Note that these are only <strong>general suggestions</strong>, and
              we recommend customizing the entries to reflect your own personal
              experience and job duties.
            </p>
            <h5>{this.state.title}</h5>
            <div id="wizard-selector">
              <div id="wizard-inputs">
                {this.state.selectedTasks.length > 0 &&
                  this.state.selectedTasks.map((task, i) => {
                    return (
                      <div className="wizard-input" key={i}>
                        <div
                          className="wizard-delete"
                          onClick={e => this.removeTask(e, i)}
                        >
                          <i className="fas fa-times" />
                        </div>
                        <textarea
                          spellCheck="true"
                          className="form-control"
                          value={this.state.selectedTasks[i].task}
                          onChange={e => this.editTask(e, i)}
                        />
                      </div>
                    );
                  })}
              </div>
              <div id="wizard-arrows">
                <i className="fas fa-arrow-left" />
              </div>
              <div id="wizard-tasks">
                {this.state.tasks.map((task, i) => {
                  if (task.show) {
                    return (
                      <div
                        className="wizard-task"
                        onClick={e => this.addTask(e, i)}
                        key={i}
                      >
                        <p>{task.task}</p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div id="wizard-controls">
              <div className="add-btn cancel" onClick={this.props.closeModal}>
                <i className="fas fa-times" /> Cancel
              </div>
              <div className="add-btn" onClick={this.finish}>
                <i className="fas fa-check" /> Done
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

class ImageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imageUrl: "",
      cropper: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.closeCropper = this.closeCropper.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log("handle uploading-", this.state.file);
  }

  handleImage(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState(
        {
          file: file,
          imageUrl: reader.result,
          cropper: true
        },
        () => console.log(this.state.file)
      );
      // this.props.setImage(reader.result);
    };

    reader.readAsDataURL(file);
  }

  closeCropper() {
    this.setState({
      cropper: false
    });
  }

  render() {
    let { file, imageUrl } = this.state;
    let $imagePreview = null;
    let $uploadMsg = null;
    if (imageUrl) {
      $imagePreview = <img id="img-preview" src={imageUrl} />;
    } else {
      $imagePreview = <div className="previewText" />;
    }

    if (!file.name) {
      $uploadMsg = (
        <div className="upload-msg-wrapper">
          <i className="fas fa-image" />
          <span className="upload-msg">
            Click or drag & drop image to upload.
          </span>
        </div>
      );
    } else {
      console.log(file.name);
      $uploadMsg = (
        <div className="upload-msg-wrapper">
          <span style={{ fontWeight: "bold" }}>{file.name}</span>
          <span className="upload-msg">
            Click or drop file to change image.
          </span>
        </div>
      );
    }

    return (
      <div>
        <div className="img-input-wrapper">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label for="file-upload" id="upload-label">
              {$uploadMsg}
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={e => this.handleImage(e)}
              accept="image/x-png, image/gif, image/jpeg"
            />
          </form>
        </div>
        <Modal
          show={this.state.cropper}
          customWidth={750}
          onClose={this.closeCropper}
          preventBackgroundClose={true}
        >
          <ImageCropper
            src={this.state.imageUrl}
            setImage={this.props.setImage}
          />
        </Modal>
      </div>
    );
  }
}
