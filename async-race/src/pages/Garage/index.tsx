import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Car from "../../components/Car";
import Form, { FormTypes } from "../../components/UI/Form";
import Button, { ButtonStyle } from "../../components/UI/Button";
import RaceResult from "../../components/RaceResult";
import {
  setPrevPage,
  setNextPage,
  toggleRaceStarted,
} from "../../redux/reducers/garage/garageReducer";
import {
  getCars,
  createCar,
  startStopEngine,
  switchEngineToDrive,
} from "../../redux/reducers/garage/garageActions";
import generate100Cars from "../../carNames";

import styles from "./styles.module.scss";

export default function Garage() {
  const { garage, page, isRaceStarted, raceWinner } = useAppSelector(
    (state) => state.garage,
  );
  const dispatch = useAppDispatch();
  const totalPages = Math.ceil(garage.carsInGarage / page.limit) || 1;
  const controller = useRef<AbortController>();
  const createCarsHandler = () => {
    const carsTocreate = generate100Cars();
    Promise.all(
      carsTocreate.map((car) => {
        return dispatch(createCar(car));
      }),
    ).then(() => dispatch(getCars()));
  };

  return (
    <main className={styles.garage}>
      {raceWinner.id !== 0 && <RaceResult />}
      <header className={styles.garage__header}>
        <div>
          <h1>Garage</h1>
          <div className={styles.garage__info}>
            <span>Cars {`${garage.carsInGarage}`}</span>
            <span>Page {`${page.number} / ${totalPages}`}</span>
          </div>
          <div>
            <Button
              style={ButtonStyle.secondary}
              type="button"
              onClickHandler={() => {
                dispatch(setPrevPage());
                dispatch(getCars());
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
                dispatch(getCars());
              }}
              isDisabled={totalPages === page.number}
            >
              Next
            </Button>
          </div>
        </div>
        <div>
          <Form formType={FormTypes.create} />
          <Form formType={FormTypes.update} />
          <div className={styles.garage__raceControls}>
            <Button
              style={ButtonStyle.secondary}
              type="button"
              onClickHandler={async () => {
                controller.current = new AbortController();
                const { signal } = controller.current;
                const startEnginePromisesArr = garage.cars.map((car) => {
                  const { id, engineStatus } = car;
                  return dispatch(startStopEngine({ id, engineStatus }));
                });

                dispatch(toggleRaceStarted());

                Promise.all(startEnginePromisesArr).then(async () => {
                  const switchEngineToDrivePromisesArr = garage.cars.map(
                    (car) => {
                      const { id } = car;
                      return dispatch(switchEngineToDrive({ id, signal }));
                    },
                  );
                  Promise.any(switchEngineToDrivePromisesArr);
                });
              }}
              isDisabled={isRaceStarted}
            >
              Race
            </Button>
            <Button
              style={ButtonStyle.secondary}
              type="button"
              onClickHandler={async () => {
                const startEnginePromisesArr = garage.cars.map((car) => {
                  const { id, engineStatus } = car;
                  return dispatch(startStopEngine({ id, engineStatus }));
                });
                dispatch(toggleRaceStarted());
                controller.current?.abort();
                await Promise.all(startEnginePromisesArr);
              }}
              isDisabled={!isRaceStarted}
            >
              Reset
            </Button>
            <Button
              style={ButtonStyle.secondary}
              type="button"
              onClickHandler={createCarsHandler}
              isDisabled={isRaceStarted}
            >
              Generate Cars
            </Button>
          </div>
        </div>
      </header>

      <div className={styles.garage__cars}>
        {garage.cars.map((car) => (
          <Car key={car.id} id={car.id} />
        ))}
      </div>
    </main>
  );
}
