import React from "react";
import allJobs from "../components/jobs";
// const allJobs = require("../components/jobs.js");
import "cropperjs/dist/cropper.css";
import Dashboard from "../components/Dashboard";
import Editors from "../components/editors/index";
import Preview from "../components/Preview";

//TODO: Redux, Redux, REDUX!!!

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resume: {
        name: "James K. Polk",
        currentPosition: "11th President",
        location: "The White House, USA",
        summary:
          "I'm James K. Polk, and I was a U.S. President elected in 1844!  I served for only one term, and my wife and I were notorious workaholics.  I seized the whole Southwest from Mexico!",
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
