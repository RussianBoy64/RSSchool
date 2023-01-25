import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setRaceRecorded } from "../../redux/reducers/garage/garageReducer";
import {
  updateWinner,
  createWinner,
  getWinners,
  getWinnersCars,
} from "../../redux/reducers/winners/winnersActions";
import styles from "./styles.module.scss";

export default function RaceResult() {
  const { raceWinner } = useAppSelector((state) => state.garage);
  const { winners } = useAppSelector((state) => state.winners);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (!raceWinner.isRecorded) {
        dispatch(setRaceRecorded());
        const isWinnerInScore = winners.find(
          (winner) => winner.id === raceWinner.id,
        );

        if (isWinnerInScore) {
          const wins = isWinnerInScore.wins + 1;
          const time =
            isWinnerInScore.time > raceWinner.time
              ? raceWinner.time
              : isWinnerInScore.time;

          await dispatch(updateWinner({ id: raceWinner.id, wins, time }));
        } else {
          await dispatch(
            createWinner({ id: raceWinner.id, time: raceWinner.time, wins: 1 }),
          );
        }
        await dispatch(getWinners());
        await dispatch(getWinnersCars());
      }
    })();
  });

  return (
    <div className={styles.raceResult}>
      <span
        className={styles.raceResult__result}
      >{`${raceWinner.name} went first (${raceWinner.time} sec)`}</span>
      <span>'Press "Reset" button'</span>
    </div>
  );
}
