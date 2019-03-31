import React from "react";
import ImageCropper from "./ImageCropper";
import Modal from "./CustomModal";

export default class ImageInput extends React.Component {
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
          <span style={{ fontWeight: "bold", maxWidth: "100%" }}>
            {file.name}
          </span>
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
              ref="upload-ref"
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
            closeCropper={this.closeCropper}
          />
        </Modal>
      </div>
    );
  }
}
