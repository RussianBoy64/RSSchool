import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Car from "../../components/Car";
import Form, { FormTypes } from "../../components/UI/Form";
import Button, { ButtonStyle } from "../../components/UI/Button";
import { setPrevPage, setNextPage } from "../../redux/reducers/garageReducer";
import { getCars } from "../../redux/reducers/garageActions";

import styles from "./styles.module.scss";

export default function Garage() {
  const { garage, page } = useAppSelector((state) => state.garage);
  const dispatch = useAppDispatch();
  const totalPages = Math.ceil(garage.carsInGarage / page.limit) || 1;

  return (
    <main className={styles.garage}>
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
        </div>
      </header>

      <div className={styles.garage__cars}>
        {garage.cars.map((car) => (
          <Car key={car.id} name={car.name} color={car.color} id={car.id} />
        ))}
      </div>
    </main>
  );
}
