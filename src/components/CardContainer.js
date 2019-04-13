import React from "react";
import { connect } from "react-redux";
import { SortableContainer } from "react-sortable-hoc";

const mapStateToProps = (state, ownProps) => {
  return {
    experience: state.experience,
    collection: ownProps.collection
  };
};

const ConnectedCardContainer = SortableContainer(props => {
  return (
    <ul className="edit-card-wrapper">
      {props.experience.map((job, index) => (
        <EditCard
          key={i}
          // showDownArrow={showDownArrow}
          index={index}
          editMode={this.editMode}
          collection="experience"
        >
          <p>
            <strong>{job.title}</strong>
          </p>
          <p>{job.company}</p>
        </EditCard>
      ))}
    </ul>
  );
});

const CardContainer = connect(mapStateToProps)(ConnectedCardContainer);

export default CardContainer;
