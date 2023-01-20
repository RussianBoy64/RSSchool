import { createAsyncThunk } from "@reduxjs/toolkit";
import ENDPOINT from "../../endpoint";
import { CarProps } from "../../classes/Car";

export enum GarageActions {
  getCars = "GET_CARS",
  getCar = "GET_CAR",
  createCar = "CREATE_CAR",
  deleteCar = "DELETE_CAR",
  updateCar = "UPDATE_CAR",
}

export const getCars = createAsyncThunk(GarageActions.getCars, async () => {
  const responce = await fetch(`${ENDPOINT}/garage`);
  const carsData: CarProps[] = await responce.json();
  return carsData;
});
