import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Button, { ButtonStyle } from "../../components/UI/Button";
import Statistics from "../../components/Statistics";
import {
  setPrevPage,
  setNextPage,
} from "../../redux/reducers/garage/garageReducer";

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
          onClickHandler={() => {
            dispatch(setPrevPage());
            // dispatch(getCars());
          }}
          isDisabled={!(page.number > 1)}
        >
          Prev
        </Button>
        <Button
          style={ButtonStyle.secondary}
          type="button"
          onClickHandler={() => {
            dispatch(setNextPage());
            // dispatch(getCars());
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
