import { createAsyncThunk } from "@reduxjs/toolkit";
import ENDPOINT, { FetchMethods } from "../../endpoint";
import { Car, CarProps } from "../../classes/Car";

export enum GarageActions {
  getCars = "GET_CARS",
  getCar = "GET_CAR",
  createCar = "CREATE_CAR",
  deleteCar = "DELETE_CAR",
  updateCar = "UPDATE_CAR",
}

interface GetCarsPayload {
  carsData: CarProps[];
  carsInGarage: number;
}

interface CreateInput {
  name: string;
  color: string;
}

interface ThunkAPI {
  state: {
    garage: {
      garage: { cars: Car[]; carsInGarage: number };
      page: {
        number: number;
        limit: number;
      };
      create: CreateInput;
      carToUpdate: Car;
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
    const carsData: CarProps[] = await responce.json();
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
    await fetch(`${ENDPOINT}/garage/${id}`, {
      method: FetchMethods.put,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, color }),
    });
  },
);
