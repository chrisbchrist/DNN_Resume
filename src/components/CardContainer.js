import React from "react";
import { connect } from "react-redux";
import { SortableContainer } from "react-sortable-hoc";
import EditCard from "./EditCard";

// const mapStateToProps = (state, ownProps) => {
//   return {
//     collection: state[ownProps.collectionName]
//   };
// };

const CardContainer = SortableContainer(props => {
  return (
    <ul className="edit-card-wrapper">
      {/* {props.collection.map((payload, index) => (
        <EditCard
          key={index}
          // showDownArrow={showDownArrow}
          index={index}
          editMode={props.editMode}
          collection={props.collectionName}
        />
      ))} */}
      {props.children}
    </ul>
  );
});

export default CardContainer;
