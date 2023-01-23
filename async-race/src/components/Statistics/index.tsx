import { useAppSelector } from "../../hooks/reduxHooks";
import Winner from "../Winner";

import styles from "./styles.module.scss";

export default function Statistics() {
  const { winners, winnersCars, page } = useAppSelector(
    (state) => state.winners,
  );
  const firstPositionAtPage = (page.number - 1) * page.limit;

  return (
    <div className={styles.statistics}>
      <div
        className={[styles.statistics__row, styles.statistics__header].join(
          " ",
        )}
      >
        <span>Number</span>
        <span>Car</span>
        <span>Name</span>
        <span>Wins</span>
        <span>BestTime (sec)</span>
      </div>
      {winners.map((winner, index) => {
        const position = firstPositionAtPage + index + 1;
        const winnerCar = winnersCars.find((car) => winner.id === car.id);
        return (
          <div className={styles.statistics__row} key={winner.id}>
            <Winner
              position={position}
              color={winnerCar!.color}
              name={winnerCar!.name}
              wins={winner.wins}
              time={winner.time}
            />
          </div>
        );
      })}
    </div>
  );
}
