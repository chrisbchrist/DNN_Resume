//immutable
const collection = Array.from(state[action.collection]);
collection.splice(action.index, 1);
return Object.assign({}, state, { [action.collection]: collection });

//mutable
const currentState = Object.assign({}, state);
currentState[action.collection].splice(action.index, 1);
return currentState;
