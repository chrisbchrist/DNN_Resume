import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { items: state.items };
};

const ConnectedList = ({ items }) => (
  <ul className="list-group list-group-flush">
    {items.map(el => (
      <li className="list-group-item" key={el.id}>
        {el.title}
      </li>
    ))}
  </ul>
);
const List = connect(mapStateToProps)(ConnectedList);
export default List;
