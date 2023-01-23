// ======================== BASIC

export interface Page {
  number: number;
  limit: number;
  sort?: "id" | "wins" | "time";
  order?: "ASC" | "DESC";
}

// ========================  GARAGE

export interface Car {
  name: string;
  color: string;
  id: number;
  isDrive: boolean;
}

export interface InitialGarageState {
  garage: { cars: Car[]; carsInGarage: number };
  page: Page;
  create: CreateInput;
  carToUpdate: UpdateInput;
}

export interface CreateInput {
  name: string;
  color: string;
}

export interface UpdateInput {
  id: number;
  name: string;
  color: string;
}

export enum GarageActions {
  getCars = "GET_CARS",
  getCar = "GET_CAR",
  createCar = "CREATE_CAR",
  deleteCar = "DELETE_CAR",
  updateCar = "UPDATE_CAR",
}

export interface GetCarsPayload {
  carsData: Car[];
  carsInGarage: number;
}

// ========================  WINNERS

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface InitialWinnersState {
  winners: Winner[];
  totalCountOfWinners: number;
  page: Page;
}

export interface GetWinnersPayload {
  winners: Winner[];
  totalCountOfWinners: number;
}

export enum WinnersActions {
  getWinners = "GET_WINNERS",
}
