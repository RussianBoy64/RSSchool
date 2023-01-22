import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car } from "../../classes/Car";
import { getCars, createCar, deleteCar, updateCar } from "./garageActions";

export interface InitialState {
  garage: { cars: Car[]; carsInGarage: number };
  page: Page;
  create: CreateInput;
  carToUpdate: Car;
}

export interface CreateInput {
  name: string;
  color: string;
}

export interface Page {
  number: number;
  limit: number;
}

const initialState: InitialState = {
  garage: { cars: [], carsInGarage: 0 },
  page: { number: 1, limit: 7 },
  create: {
    name: "",
    color: "#ffffff",
  },
  carToUpdate: {
    id: 0,
    name: "",
    color: "#ffffff",
  },
};

export const garageSlice = createSlice({
  name: "garage",
  initialState,
  reducers: {
    setCarName(
      state: InitialState,
      action: PayloadAction<string>,
    ): InitialState {
      return {
        ...state,
        create: {
          ...state.create,
          name: action.payload,
        },
      };
    },
    setCarColor(
      state: InitialState,
      action: PayloadAction<string>,
    ): InitialState {
      return {
        ...state,
        create: {
          ...state.create,
          color: action.payload,
        },
      };
    },
    setCarToUpdate(
      state: InitialState,
      action: PayloadAction<Car>,
    ): InitialState {
      return {
        ...state,
        carToUpdate: action.payload,
      };
    },
    setUpdatedCarName(
      state: InitialState,
      action: PayloadAction<string>,
    ): InitialState {
      return {
        ...state,
        carToUpdate: {
          ...state.carToUpdate,
          name: action.payload,
        },
      };
    },
    setUpdatedCarColor(
      state: InitialState,
      action: PayloadAction<string>,
    ): InitialState {
      return {
        ...state,
        carToUpdate: {
          ...state.carToUpdate,
          color: action.payload,
        },
      };
    },
    setNextPage(state: InitialState): InitialState {
      return {
        ...state,
        page: {
          ...state.page,
          number: state.page.number + 1,
        },
      };
    },
    setPrevPage(state: InitialState): InitialState {
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
    builder.addCase(getCars.fulfilled, (state, action) => {
      return {
        ...state,
        garage: {
          cars: action.payload.carsData,
          carsInGarage: action.payload.carsInGarage,
        },
      };
    });
    builder.addCase(createCar.fulfilled, (state) => ({
      ...state,
      create: {
        ...state.create,
        name: "",
      },
    }));
    builder.addCase(deleteCar.fulfilled, (state) => ({
      ...state,
      page: {
        ...state.page,
        number:
          ((state.page.number - 1) * state.page.limit ===
          state.garage.carsInGarage - 1
            ? state.page.number - 1
            : state.page.number) || 1,
      },
    }));
    builder.addCase(updateCar.fulfilled, (state) => ({
      ...state,
      carToUpdate: {
        id: 0,
        name: "",
        color: "#ffffff",
      },
    }));
  },
});

export const {
  setCarName,
  setCarColor,
  setCarToUpdate,
  setUpdatedCarName,
  setUpdatedCarColor,
  setNextPage,
  setPrevPage,
} = garageSlice.actions;

export default garageSlice.reducer;
