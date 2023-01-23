import { createAsyncThunk } from "@reduxjs/toolkit";
import ENDPOINT, { FetchMethods } from "../../../endpoint";
import {
  Car,
  Page,
  GetWinnersPayload,
  WinnersActions,
  Winner,
} from "../../../types";

export interface ThunkAPI {
  state: {
    winners: {
      winners: Winner[];
      page: Page;
      totalCountOfWinners: number;
    };
  };
}

export const getWinners = createAsyncThunk<GetWinnersPayload, void, ThunkAPI>(
  WinnersActions.getWinners,
  async (_, thunkAPI) => {
    const {
      winners: { page },
    } = thunkAPI.getState();
    const responceWinners = await fetch(
      `${ENDPOINT}/winners?_page=${page.number}&_limit=${page.limit}&_sort=${page.sort}&_order=${page.order}`,
      {
        method: FetchMethods.get,
      },
    );

    const totalCountOfWinners = Number(
      responceWinners.headers.get("X-Total-Count"),
    );
    const winners: Winner[] = await responceWinners.json();

    return { winners, totalCountOfWinners };
  },
);

export const getWinnersCars = createAsyncThunk<Car[], void, ThunkAPI>(
  WinnersActions.getWinnersCars,
  async (_, thunkAPI) => {
    const {
      winners: { winners },
    } = thunkAPI.getState();
    const responce = await fetch(`${ENDPOINT}/garage`, {
      method: FetchMethods.get,
    });
    const cars: Car[] = await responce.json();
    const winnersIds = winners.map((winner) => winner.id);
    const winnersCars = cars.filter((car) => winnersIds.includes(car.id));
    return winnersCars;
  },
);
