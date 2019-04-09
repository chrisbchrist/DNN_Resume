import React from "react";
import CreativeTemplate from "./templates/Creative";
import ClassicTemplate from "./templates/Classic";
import Wysiwyg from "./Wysiwyg";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return state;
};

const ConnectedPreview = props => {
  return (
    <div id="preview-wrapper">
      <Wysiwyg />
      {props.template === "classic" && <ClassicTemplate {...props} />}
      {props.template === "creative" && <CreativeTemplate {...props} />}
    </div>
  );
};

const Preview = connect(mapStateToProps)(ConnectedPreview);

export default Preview;
