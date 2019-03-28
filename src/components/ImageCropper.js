import React, { Component } from "react";
import ReactCropper from "react-cropper/dist/react-cropper";

export default class ImageCropper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "",
      cropResult: null
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === "undefined") {
      return;
    }
    this.setState(
      {
        cropResult: this.cropper.getCroppedCanvas().toDataURL()
      },
      () => {
        this.props.setImage(this.state.cropResult);
        this.props.closeCropper();
      }
    );
  }

  componentDidMount() {
    this.setState({
      src: this.props.src
    });
  }

  render() {
    return (
      <div>
        <div style={{ width: "100%" }}>
          <ReactCropper
            style={{ height: 600, width: "100%" }}
            aspectRatio={1}
            dragMode={"crop"}
            preview=".crop-preview"
            guides={false}
            src={this.state.src}
            ref={cropper => {
              this.cropper = cropper;
            }}
          />
        </div>
        <div>
          <div id="crop-btn" onClick={this.cropImage}>
            <i className="fas fa-crop-alt" /> Crop Image
          </div>
        </div>
        <br style={{ clear: "both" }} />
      </div>
    );
  }
}
