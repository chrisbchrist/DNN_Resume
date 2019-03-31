import React from "react";
import CreativeTemplate from "./templates/Creative";
import ClassicTemplate from "./templates/Classic";
import Wysiwyg from "./Wysiwyg";

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

export default Preview;
