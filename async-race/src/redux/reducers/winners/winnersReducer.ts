import { createSlice } from "@reduxjs/toolkit";
import { InitialWinnersState } from "../../../types";
import { getWinners, getWinnersCars } from "./winnersActions";

const initialState: InitialWinnersState = {
  winners: [],
  winnersCars: [],
  totalCountOfWinners: 0,
  page: { number: 1, limit: 10, sort: "time", order: "ASC" },
};

export const winnersSlice = createSlice({
  name: "winners",
  initialState,
  reducers: {
    setNextPage(state: InitialWinnersState): InitialWinnersState {
      return {
        ...state,
        page: {
          ...state.page,
          number: state.page.number + 1,
        },
      };
    },
    setPrevPage(state: InitialWinnersState): InitialWinnersState {
      return {
        ...state,
        page: {
          ...state.page,
          number: state.page.number - 1,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWinners.fulfilled, (state, action) => ({
      ...state,
      winners: action.payload.winners,
      totalCountOfWinners: action.payload.totalCountOfWinners,
    }));
    builder.addCase(getWinnersCars.fulfilled, (state, action) => ({
      ...state,
      winnersCars: action.payload,
    }));
  },
});

export const { setNextPage, setPrevPage } = winnersSlice.actions;

export default winnersSlice.reducer;
