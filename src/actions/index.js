import {
  ADD_ITEM,
  UPDATE_FIELD,
  SET_SIZE,
  SET_TEMPLATE,
  SET_COLOR,
  DELETE_ITEM,
  UPDATE_ITEM,
  REORDER,
  SAVE_PDF,
  DB_SAVE
} from "./constants";

export function addItem(collection, payload) {
  return { type: ADD_ITEM, collection, payload };
}

export function deleteItem(collection, index) {
  return { type: DELETE_ITEM, collection, index };
}

export function updateItem(collection, payload, index) {
  return { type: UPDATE_ITEM, collection, payload, index };
}

export function reOrder(collection, index, newIndex) {
  return { type: REORDER, collection, index, newIndex };
}

export function setSize(target, size) {
  return { type: SET_SIZE, target, size };
}

export function setTemplate(template) {
  return { type: SET_TEMPLATE, template };
}

export function setColor(color) {
  return { type: SET_COLOR, color };
}

export function updateField(field, value) {
  return { type: UPDATE_FIELD, field, value };
}

export function savePdf() {
  return { type: SAVE_PDF };
}

export function dbSave() {
  return { type: DB_SAVE };
}
