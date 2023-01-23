import { createAsyncThunk } from "@reduxjs/toolkit";
import ENDPOINT, { FetchMethods } from "../../../endpoint";
import {
  Car,
  GarageActions,
  CreateInput,
  UpdateInput,
  GetCarsPayload,
  StartStopEngineArgs,
  StartStopEnginePayload,
  EngineStatus,
} from "../../../types";

interface ThunkAPI {
  state: {
    garage: {
      garage: { cars: Car[]; carsInGarage: number };
      page: {
        number: number;
        limit: number;
      };
      create: CreateInput;
      carToUpdate: UpdateInput;
    };
  };
}

export const getCars = createAsyncThunk<GetCarsPayload, void, ThunkAPI>(
  GarageActions.getCars,
  async (_, thunkAPI) => {
    const {
      garage: { page },
    } = thunkAPI.getState();
    const responce = await fetch(
      `${ENDPOINT}/garage?_page=${page.number}&_limit=${page.limit}`,
      {
        method: FetchMethods.get,
      },
    );
    const carsInGarage = Number(responce.headers.get("X-Total-Count"));
    const data: Car[] = await responce.json();
    const carsData = data.map((itemData) => ({
      ...itemData,
      engineStatus: EngineStatus.stopped,
    }));
    return { carsData, carsInGarage };
  },
);

export const createCar = createAsyncThunk<void, CreateInput, ThunkAPI>(
  GarageActions.createCar,
  async (carData) => {
    await fetch(`${ENDPOINT}/garage`, {
      method: FetchMethods.post,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });
  },
);

export const deleteCar = createAsyncThunk<void, number, ThunkAPI>(
  GarageActions.deleteCar,
  async (id) => {
    await fetch(`${ENDPOINT}/garage/${id}`, {
      method: FetchMethods.delete,
    });
  },
);

export const updateCar = createAsyncThunk<void, void, ThunkAPI>(
  GarageActions.updateCar,
  async (_, thunkAPI) => {
    const { garage } = thunkAPI.getState();
    const { id, name, color } = garage.carToUpdate;
    await fetch(`${ENDPOINT}/engine/${id}`, {
      method: FetchMethods.put,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, color }),
    });
  },
);

export const startStopEngine = createAsyncThunk<
  Car[],
  StartStopEngineArgs,
  ThunkAPI
>(GarageActions.startStopEngine, async ({ id, engineStatus }, thunkAPI) => {
  const { garage } = thunkAPI.getState();
  const cars = [...garage.garage.cars];
  const newEngineStatus =
    engineStatus === EngineStatus.started
      ? EngineStatus.stopped
      : EngineStatus.started;
  const carToUpdateIndex = cars.findIndex((car) => car.id === id);
  const responce = await fetch(
    `${ENDPOINT}/engine?id=${id}&status=${engineStatus}`,
    {
      method: FetchMethods.patch,
    },
  );
  const engineData: StartStopEnginePayload = await responce.json();
  cars[carToUpdateIndex] = {
    ...cars[carToUpdateIndex],
    engineStatus: newEngineStatus,
    velocity: engineData.velocity,
    distance: engineData.distance,
  };

  return cars;
});
