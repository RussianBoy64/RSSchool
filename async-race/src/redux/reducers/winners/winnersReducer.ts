import { createSlice } from "@reduxjs/toolkit";
import { InitialWinnersState } from "../../../types";
import { getWinners } from "./winnersActions";

const initialState: InitialWinnersState = {
  winners: [],
  totalCountOfWinners: 0,
  page: { number: 1, limit: 10, sort: "id", order: "ASC" },
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
    builder.addCase(getWinners.fulfilled, (state, action) => {
      console.log(...action.payload.winners);
      return {
        ...state,
        winners: action.payload.winners,
        totalCountOfWinners: action.payload.totalCountOfWinners,
      };
    });
  },
});

export const { setNextPage, setPrevPage } = winnersSlice.actions;

export default winnersSlice.reducer;
