import { createSlice } from "@reduxjs/toolkit";
import { Car } from "../../classes/Car";
import { getCars } from "./garageActions";

interface InitialState {
  cars: Car[];
  page: number;
  limit: number;
}

const initialState: InitialState = {
  cars: [],
  page: 1,
  limit: 7,
};

export const garageSlice = createSlice({
  name: "garage",
  initialState,
  reducers: {
    // garageReducer(
    //   state: InitialState,
    //   action: PayloadAction<{ payload: Car[]; type: GarageActions }>,
    // ): InitialState {
    //   console.log(action.payload.type);
    //   switch (action.type) {
    //     case GarageActions.getCars:
    //       return { ...state, cars: [...action.payload.payload] };
    //     default:
    //       return state;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getCars.fulfilled, (state, action) => ({
      ...state,
      cars: action.payload,
    }));
  },
});

// export const { garageReducer } = garageSlice.actions;

export default garageSlice.reducer;
