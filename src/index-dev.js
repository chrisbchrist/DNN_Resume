import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./pages/App";

// Load on Ready
document.onreadystatechange = function() {
  var state = document.readyState;
  if (state == "complete") {
    // var els = document.getElementsByClassName("dnnfree-app");
    // Array.prototype.forEach.call(els, function(el) {
    //   var moduleId = el.id.replace("module-", "");
    //   var service = {
    //     path: "DnnFree.Modules.SPA.React",
    //     framework: $.ServicesFramework(moduleId)
    //   };
    //   service.baseUrl = service.framework.getServiceRoot(service.path);
    //ReactDOM.render(<App mid={moduleId} />, document.getElementById("root"));
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
    // });
  }
};
