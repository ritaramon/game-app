import { createStore, Store } from "redux";
import { combinedReducer } from "./reducers";

const store: Store = createStore(combinedReducer);

export default store;
