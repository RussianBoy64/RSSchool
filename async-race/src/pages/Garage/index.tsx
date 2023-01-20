import { useAppSelector } from "../../hooks/reduxHooks";
import Car from "../../components/Car";
import Form, { FormTypes } from "../../components/UI/Form";

import styles from "./styles.module.scss";

export default function Garage() {
  const { cars, page } = useAppSelector((state) => state.garage);

  return (
    <main className={styles.garage}>
      <Form formType={FormTypes.create} />
      <Form formType={FormTypes.update} />
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
