import { configureStore } from "@reduxjs/toolkit";
import garageReducer from "./reducers/garage/garageReducer";
import winnersReducer from "./reducers/winners/winnersReducer";
import { getCars } from "./reducers/garage/garageActions";
import { getWinners, getWinnersCars } from "./reducers/winners/winnersActions";

const store = configureStore({
  reducer: {
    garage: garageReducer,
    winners: winnersReducer,
  },
});

export async function getInitialState() {
  await store.dispatch(getCars());
  await store.dispatch(getWinners());
  await store.dispatch(getWinnersCars());
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
