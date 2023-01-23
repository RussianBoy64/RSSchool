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
  async () => {
    const responce = await fetch(`${ENDPOINT}/garage`, {
      method: FetchMethods.get,
    });
    const winnersCars: Car[] = await responce.json();

    return winnersCars;
  },
);

export const deleteWinner = createAsyncThunk<void, number, ThunkAPI>(
  WinnersActions.deleteWinner,
  async (id) => {
    await fetch(`${ENDPOINT}/winners/${id}`, {
      method: FetchMethods.delete,
    });
  },
);
