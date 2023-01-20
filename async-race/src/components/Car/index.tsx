import CarImg from "../CarImg";
import Finish from "../Finish";
import Button, { ButtonStyle } from "../UI/Button";
import styles from "./styles.module.scss";

interface CarProps {
  name: string;
  color: string;
}

export default function Car({ name, color }: CarProps) {
  return (
    <div className={styles.car}>
      <div className={styles.car__controls}>
        <Button style={ButtonStyle.primary} type="button" isDisabled>
          Select
        </Button>
        <Button style={ButtonStyle.primary} type="button" isDisabled={false}>
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
