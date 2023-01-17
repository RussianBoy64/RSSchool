import { createSlice } from "@reduxjs/toolkit";

export const garageSlice = createSlice({
  name: "garage",
  initialState: {
    cars: ["car1", "car2", "car3"],
  },
  reducers: {},
});

// export const {} = garageSlice.actions;

export default garageSlice.reducer;
