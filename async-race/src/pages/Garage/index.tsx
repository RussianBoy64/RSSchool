import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setCarName, setCarColor } from "../../redux/reducers/garageReducer";
import Car from "../../components/Car";
import Form, { FormInputChangeHadler } from "../../components/UI/Form";
import styles from "./styles.module.scss";

export default function Garage() {
  const { cars, page } = useAppSelector((state) => state.garage);
  const dispatch = useAppDispatch();

  const carNameChangeHandler: FormInputChangeHadler = (event) => {
    dispatch(setCarName(event.target.value));
  };

  const carColorChangeHandler: FormInputChangeHadler = (event) => {
    dispatch(setCarColor(event.target.value));
  };

  return (
    <main className={styles.garage}>
      <Form
        carNameChangeHandler={carNameChangeHandler}
        carColorChangeHandler={carColorChangeHandler}
        isDisabled={false}
      >
        Create
      </Form>
      <Form
        carNameChangeHandler={carNameChangeHandler}
        carColorChangeHandler={carColorChangeHandler}
        isDisabled
      >
        Update
      </Form>
      <h1>Garage</h1>
      <div className={styles.garage__info}>
        <span>Cars {`${cars.length}`}</span>
        <span>Page {`${page}`}</span>
      </div>
      {cars.map((car) => (
        <Car key={car.id} name={car.name} color={car.color} />
      ))}
    </main>
  );
}
