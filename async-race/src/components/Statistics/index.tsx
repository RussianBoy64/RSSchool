import { useAppSelector } from "../../hooks/reduxHooks";
import Winner from "../Winner";

import styles from "./styles.module.scss";

export default function Statistics() {
  const { winners } = useAppSelector((state) => state.winners);
  return (
    <div className={styles.statistics}>
      <div
        className={[styles.statistics__row, styles.statistics__header].join(
          " ",
        )}
      >
        <span className={styles.statistics__head}>Number</span>
        <span className={styles.statistics__head}>Car</span>
        <span className={styles.statistics__head}>Name</span>
        <span className={styles.statistics__head}>Wins</span>
        <span className={styles.statistics__head}>BestTime (sec)</span>
      </div>
      {winners.map((winner) => {
        return (
          <div className={styles.statistics__row} key={winner.id}>
            <Winner
              position={1}
              color="red"
              name="Ferrary"
              wins={winner.wins}
              time={winner.time}
            />
          </div>
        );
      })}
    </div>
  );
}
