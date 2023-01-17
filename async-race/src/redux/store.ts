import { configureStore } from "@reduxjs/toolkit";
import garageReducer from "./reducers/garageReducer";

export default configureStore({
  reducer: {
    garageReducer,
  },
});
