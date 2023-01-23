import { createAsyncThunk } from "@reduxjs/toolkit";
import ENDPOINT, { FetchMethods } from "../../../endpoint";
import {
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
      `${ENDPOINT}/winners?_page=${page.number}&_limit=${page.limit}`,
      {
        method: FetchMethods.get,
      },
    );

    const totalCountOfWinners = Number(
      responceWinners.headers.get("X-Total-Count"),
    );
    const winners: Winner[] = await responceWinners.json();

    // const winners: Winner[] = [];
    // // winnersData.map((winnerItem) => ({
    // //   ...winnerItem,
    // //   name: "",
    // //   color: "",
    // // }));

    // console.log(winners);

    // winnersData.forEach(async (winnersItem) => {
    //   const reponceCar = await fetch(`${ENDPOINT}/garage/${winnersItem.id}`, {
    //     method: FetchMethods.get,
    //   });
    //   const carData = await reponceCar.json();
    //   console.log(carData);
    //   const win: Winner = {
    //     ...winnersItem,
    //     name: carData.name,
    //     color: carData.color,
    //   };

    //   winners.push(win);
    // });

    return { winners, totalCountOfWinners };
  },
);
