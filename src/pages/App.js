import React from "react";
import "cropperjs/dist/cropper.css";
import Dashboard from "../components/Dashboard";
import Editors from "../components/editors/index";
import Preview from "../components/Preview";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

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
            title: "POOPOO",
            company: "America",
            startDate: "1848",
            endDate: "Death",
            location: "Western Hemisphere",
            description:
              "I accomplished all my stated goals in a single term and fulfilled my promise not to seek a second."
          },
          {
            title: "EAT DA POOPOO",
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
    this.updateItem = this.updateItem.bind(this);
    this.reOrder = this.reOrder.bind(this);
    this.setImage = this.setImage.bind(this);
  }

  updateItem(collection, item, index) {
    const resumeState = Object.assign({}, this.state.resume);
    resumeState[collection][index] = item;
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

  setImage(data) {
    const resumeState = Object.assign({}, this.state.resume);
    resumeState.image = data;
    this.setState({
      resume: resumeState
    });
  }

  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Dashboard resume={this.state.resume} />
        <div id="app-main">
          <Editors
            update={this.updateOneField}
            resume={this.state.resume}
            reOrder={this.reOrder}
            updateItem={this.updateItem}
            template={this.state.template}
          />

          <Preview resume={this.state.resume} />
        </div>
      </DragDropContextProvider>
    );
  }
}
