import { configureStore } from "@reduxjs/toolkit";
import garageReducer from "./reducers/garage/garageReducer";
import winnersReducer from "./reducers/winners/winnersReducer";

const store = configureStore({
  reducer: {
    garage: garageReducer,
    winners: winnersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
