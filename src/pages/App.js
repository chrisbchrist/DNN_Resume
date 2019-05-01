import React from "react";
import "../../cropper.css";
import Dashboard from "../components/Dashboard";
import Editors from "../components/editors/index";
import Preview from "../components/Preview";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div>
          <Dashboard />
          <Route
            path="/"
            exact={true}
            render={() => (
              <div id="app-main">
                <Editors />
                <Preview />
              </div>
            )}
          />
        </div>
      </Router>
    );
  }
}
