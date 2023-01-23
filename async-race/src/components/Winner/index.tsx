import CarImg from "../CarImg";

import styles from "./styles.module.scss";

interface WinnerProps {
  position: number;
  color: string;
  name: string;
  wins: number;
  time: number;
}

export default function Winner({
  position,
  color,
  name,
  wins,
  time,
}: WinnerProps) {
  return (
    <>
      <span className={styles.winnerInfo}>{position}</span>
      <span className={styles.winnerInfo__carWrapper}>
        <CarImg color={color} />
      </span>
      <span className={styles.winnerInfo}>{name}</span>
      <span className={styles.winnerInfo}>{wins}</span>
      <span className={styles.winnerInfo}>{time}</span>
    </>
  );
}
