import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Button, { ButtonStyle } from "../../components/UI/Button";
import Statistics from "../../components/Statistics";
import {
  setPrevPage,
  setNextPage,
} from "../../redux/reducers/winners/winnersReducer";
import {
  getWinners,
  getWinnersCars,
} from "../../redux/reducers/winners/winnersActions";

import styles from "./styles.module.scss";

export default function Winners() {
  const { totalCountOfWinners, page } = useAppSelector(
    (state) => state.winners,
  );
  const dispatch = useAppDispatch();
  const totalPages = Math.ceil(totalCountOfWinners / page.limit) || 1;

  return (
    <main className={styles.winners}>
      <h1>Winners</h1>
      <div className={styles.winners__info}>
        <span>Winners {`${totalCountOfWinners}`}</span>
        <span>Page {`${page.number} / ${totalPages}`}</span>
      </div>
      <div>
        <Button
          style={ButtonStyle.secondary}
          type="button"
          onClickHandler={async () => {
            dispatch(setPrevPage());
            await dispatch(getWinners());
          }}
          isDisabled={!(page.number > 1)}
        >
          Prev
        </Button>
        <Button
          style={ButtonStyle.secondary}
          type="button"
          onClickHandler={async () => {
            dispatch(setNextPage());
            await dispatch(getWinners());
            await dispatch(getWinnersCars());
          }}
          isDisabled={totalPages === page.number}
        >
          Next
        </Button>
      </div>
      <Statistics />
    </main>
  );
}
