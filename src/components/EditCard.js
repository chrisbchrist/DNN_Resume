import React from "react";

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

export default EditCard;
