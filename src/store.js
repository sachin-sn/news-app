import { createStore } from "redux";
import reducer from "./reducer/index";

function configureStore(state) {
  return createStore(reducer, state);
}

export default configureStore;
