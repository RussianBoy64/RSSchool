import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialGarageState, UpdateInput, EngineStatus } from "../../../types";
import {
  getCars,
  createCar,
  deleteCar,
  updateCar,
  startStopEngine,
  switchEngineToDrive,
} from "./garageActions";

const initialState: InitialGarageState = {
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
  isRaceStarted: false,
  raceWinner: { id: 0, name: "", color: "", time: 0, isRecorded: false },
};

export const garageSlice = createSlice({
  name: "garage",
  initialState,
  reducers: {
    setCarName(
      state: InitialGarageState,
      action: PayloadAction<string>,
    ): InitialGarageState {
      return {
        ...state,
        create: {
          ...state.create,
          name: action.payload,
        },
      };
    },
    setCarColor(
      state: InitialGarageState,
      action: PayloadAction<string>,
    ): InitialGarageState {
      return {
        ...state,
        create: {
          ...state.create,
          color: action.payload,
        },
      };
    },
    setCarToUpdate(
      state: InitialGarageState,
      action: PayloadAction<UpdateInput>,
    ): InitialGarageState {
      return {
        ...state,
        carToUpdate: action.payload,
      };
    },
    setUpdatedCarName(
      state: InitialGarageState,
      action: PayloadAction<string>,
    ): InitialGarageState {
      return {
        ...state,
        carToUpdate: {
          ...state.carToUpdate,
          name: action.payload,
        },
      };
    },
    setUpdatedCarColor(
      state: InitialGarageState,
      action: PayloadAction<string>,
    ): InitialGarageState {
      return {
        ...state,
        carToUpdate: {
          ...state.carToUpdate,
          color: action.payload,
        },
      };
    },
    setNextPage(state: InitialGarageState): InitialGarageState {
      return {
        ...state,
        page: {
          ...state.page,
          number: state.page.number + 1,
        },
      };
    },
    setPrevPage(state: InitialGarageState): InitialGarageState {
      return {
        ...state,
        page: {
          ...state.page,
          number: state.page.number - 1,
        },
      };
    },
    toggleRaceStarted(state: InitialGarageState): InitialGarageState {
      return {
        ...state,
        isRaceStarted: !state.isRaceStarted,
        raceWinner: { id: 0, name: "", color: "", time: 0, isRecorded: false },
      };
    },
    setRaceRecorded(state: InitialGarageState): InitialGarageState {
      return {
        ...state,
        raceWinner: { ...state.raceWinner, isRecorded: true },
      };
    },
    resetCars(state: InitialGarageState): InitialGarageState {
      const cars = state.garage.cars.map((car) => ({
        ...car,
        isDrive: false,
        engineStatus: EngineStatus.stopped,
      }));

      return {
        ...state,
        garage: {
          ...state.garage,
          cars: [...cars],
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
    builder.addCase(startStopEngine.fulfilled, (state, action) => {
      const carToUpdate = state.garage.cars.find(
        (car) => car.id === action.payload.id,
      )!;

      carToUpdate.engineStatus = action.payload.engineStatus;
      carToUpdate.velocity = action.payload.velocity;
      carToUpdate.distance = action.payload.distance;
    });
    builder.addCase(switchEngineToDrive.pending, (state, action) => {
      const carToUpdate = state.garage.cars.find(
        (car) => car.id === action.meta.arg.id,
      )!;

      carToUpdate.isDrive = true;
    });
    builder.addCase(switchEngineToDrive.rejected, (state, action) => {
      const carToUpdate = state.garage.cars.find(
        (car) => car.id === action.meta.arg.id,
      )!;

      carToUpdate.isDrive = false;
    });
    builder.addCase(switchEngineToDrive.fulfilled, (state, action) => {
      const carToUpdate = state.garage.cars.find(
        (car) => car.id === action.payload,
      )!;
      const { raceWinner, isRaceStarted } = state;
      const time = Number(
        (carToUpdate.distance! / carToUpdate.velocity! / 1000).toFixed(2),
      );

      if (raceWinner.id === 0 && isRaceStarted) {
        raceWinner.id = action.payload;
        raceWinner.name = carToUpdate.name;
        raceWinner.color = carToUpdate.color;
        raceWinner.time = time;
      }

      carToUpdate.isDrive = false;
    });
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
  toggleRaceStarted,
  setRaceRecorded,
  resetCars,
} = garageSlice.actions;

export default garageSlice.reducer;
