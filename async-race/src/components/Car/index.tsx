import CarImg from "../CarImg";
import Finish from "../Finish";
import Button, { ButtonStyle } from "../UI/Button";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setCarToUpdate } from "../../redux/reducers/garageReducer";
import { getCars, deleteCar } from "../../redux/reducers/garageActions";
import styles from "./styles.module.scss";

interface CarProps {
  name: string;
  color: string;
  id: number;
}

export default function Car({ name, color, id }: CarProps) {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.car}>
      <div className={styles.car__controls}>
        <Button
          style={ButtonStyle.primary}
          type="button"
          onClickHandler={() => dispatch(setCarToUpdate({ id, name, color }))}
          isDisabled={false}
        >
          Select
        </Button>
        <Button
          style={ButtonStyle.primary}
          type="button"
          onClickHandler={async () => {
            await dispatch(deleteCar(id));
            await dispatch(getCars());
          }}
          isDisabled={false}
        >
          Remove
        </Button>
        <span className={styles.car__name}>{name}</span>
      </div>
      <div className={styles.car__track}>
        <div className={styles.car__engineControls}>
          <Button style={ButtonStyle.secondary} type="button" isDisabled>
            A
          </Button>
          <Button style={ButtonStyle.secondary} type="button" isDisabled>
            B
          </Button>
        </div>
        <div className={styles.car__track__inner}>
          <CarImg color={color} />
          <Finish />
        </div>
      </div>
    </div>
  );
}
