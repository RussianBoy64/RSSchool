import { createAsyncThunk } from "@reduxjs/toolkit";
import ENDPOINT, { FetchMethods } from "../../endpoint";
import { CarProps } from "../../classes/Car";

export enum GarageActions {
  getCars = "GET_CARS",
  getCar = "GET_CAR",
  createCar = "CREATE_CAR",
  deleteCar = "DELETE_CAR",
  updateCar = "UPDATE_CAR",
}

export const getCars = createAsyncThunk(GarageActions.getCars, async () => {
  const responce = await fetch(`${ENDPOINT}/garage`, {
    method: FetchMethods.get,
  });
  const carsData: CarProps[] = await responce.json();
  return carsData;
});

export const createCar = createAsyncThunk(
  GarageActions.createCar,
  async (carData: { name: string; color: string }) => {
    const responce = await fetch(`${ENDPOINT}/garage`, {
      method: FetchMethods.post,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });
    const newCar = await responce.json();
    return newCar;
  },
);
