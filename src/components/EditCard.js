import React from "react";
import { connect } from "react-redux";
import { deleteItem, reOrder } from "../actions/index";
import { SortableElement } from "react-sortable-hoc";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    delete: () => dispatch(deleteItem(ownProps.collection, ownProps.index)),
    reOrder: direction =>
      dispatch(reOrder(ownProps.collection, ownProps.index, direction))
  };
};

const ConnectedEditCard = SortableElement(props => {
  return (
    <li
      className={
        props.collection == "skills" ? "edit-card skill-card" : "edit-card"
      }
    >
      {/* <div className="order-wrapper">
        {props.index > 0 && (
          <div className="order order-up" onClick={() => props.reOrder(-1)}>
            <i className="fas fa-caret-up" />
          </div>
        )}
        {props.showDownArrow && (
          <div className="order order-down" onClick={() => props.reOrder(1)}>
            <i className="fas fa-caret-down" />
          </div>
        )}
      </div> */}
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
        onClick={props.delete}
      >
        <i className="fas fa-trash-alt" />
      </div>
    </li>
  );
});

const EditCard = connect(
  null,
  mapDispatchToProps
)(ConnectedEditCard);

export default EditCard;
