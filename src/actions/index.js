import { ADD_ITEM } from "./constants";

export function addItem(payload) {
  return { type: ADD_ITEM, payload };
}
