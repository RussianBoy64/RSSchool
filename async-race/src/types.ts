// ======================== BASIC

export interface Page {
  number: number;
  limit: number;
  sort?: SortBy;
  order?: OrderBy;
}

export enum SortBy {
  wins = "wins",
  time = "time",
}

export enum OrderBy {
  asc = "ASC",
  desc = "DESC",
}

// ========================  GARAGE

export interface Car {
  name: string;
  color: string;
  id: number;
  engineStatus: EngineStatus;
  isDrive?: boolean;
  velocity?: number;
  distance?: number;
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
  startStopEngine = "START_STOP_ENGINE",
  switchEngineToDrive = "SWITCH_ENGINE_TO_DRIVE",
}

export interface GetCarsPayload {
  carsData: Car[];
  carsInGarage: number;
}

// ========================  ENGINE

export interface StartStopEngineArgs {
  id: number;
  engineStatus: EngineStatus;
}

export enum EngineStatus {
  started = "started",
  stopped = "stopped",
}

export type StartStopEnginePayload = Pick<Car, "velocity" | "distance">;

// ========================  WINNERS

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface InitialWinnersState {
  winners: Winner[];
  winnersCars: Car[];
  totalCountOfWinners: number;
  page: Page;
}

export interface GetWinnersPayload {
  winners: Winner[];
  totalCountOfWinners: number;
}

export enum WinnersActions {
  getWinners = "GET_WINNERS",
  getWinnersCars = "GET_WINNERSCARS",
  deleteWinner = "DELETE_WINNER",
}
