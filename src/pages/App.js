import React from "react";
import "cropperjs/dist/cropper.css";
import Dashboard from "../components/Dashboard";
import Editors from "../components/editors/index";
import Preview from "../components/Preview";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Dashboard />
        <div id="app-main">
          <Editors />
          <Preview />
        </div>
      </div>
    );
  }
}
