import { useAppSelector } from "../../hooks/reduxHooks";
import Car from "../../components/Car";
import Form, { FormTypes } from "../../components/UI/Form";

import styles from "./styles.module.scss";

export default function Garage() {
  const { garage, page } = useAppSelector((state) => state.garage);
  const totalPages = Math.ceil(garage.carsInGarage / page.limit) || 1;

  return (
    <main className={styles.garage}>
      <Form formType={FormTypes.create} />
      <Form formType={FormTypes.update} />
      <h1>Garage</h1>
      <div className={styles.garage__info}>
        <span>Cars {`${garage.carsInGarage}`}</span>
        <span>Page {`${page.number} / ${totalPages}`}</span>
      </div>
      {garage.cars.map((car) => (
        <Car key={car.id} name={car.name} color={car.color} id={car.id} />
      ))}
    </main>
  );
}
