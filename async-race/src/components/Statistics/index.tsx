import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Winner from "../Winner";
import Button, { ButtonStyle } from "../UI/Button";
import {
  toggleWinsSort,
  toggleTimeSort,
} from "../../redux/reducers/winners/winnersReducer";
import { getWinners } from "../../redux/reducers/winners/winnersActions";
import { OrderBy, SortBy } from "../../types";

import styles from "./styles.module.scss";

export default function Statistics() {
  const { winners, winnersCars, page } = useAppSelector(
    (state) => state.winners,
  );
  const dispatch = useAppDispatch();
  const firstPositionAtPage = (page.number - 1) * page.limit;
  const toggleWinsSortHadnler = async () => {
    dispatch(toggleWinsSort());
    await dispatch(getWinners());
  };
  const toggleTimeSortHadnler = async () => {
    dispatch(toggleTimeSort());
    await dispatch(getWinners());
  };

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
        <Button
          style={ButtonStyle.none}
          type="button"
          onClickHandler={toggleWinsSortHadnler}
          isDisabled={false}
        >
          Wins
          {(page.sort === SortBy.wins && page.order === OrderBy.asc && (
            <i className="fa-solid fa-sort-up" />
          )) ||
            (page.sort === SortBy.wins && page.order === OrderBy.desc && (
              <i className="fa-solid fa-sort-down" />
            ))}
        </Button>
        <Button
          style={ButtonStyle.none}
          type="button"
          onClickHandler={toggleTimeSortHadnler}
          isDisabled={false}
        >
          BestTime (sec)
          {(page.sort === SortBy.time && page.order === OrderBy.asc && (
            <i className="fa-solid fa-sort-up" />
          )) ||
            (page.sort === SortBy.time && page.order === OrderBy.desc && (
              <i className="fa-solid fa-sort-down" />
            ))}
        </Button>
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
