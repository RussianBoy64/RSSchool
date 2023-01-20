import { ReactNode } from "react";
import Button, { ButtonStyle } from "../Button";
import styles from "./styles.module.scss";

interface FormProps {
  children: ReactNode;
}

export default function Form({ children }: FormProps) {
  return (
    <form className={styles.form}>
      <input className={styles.form__inputText} type="text" />
      <input className={styles.form__inputColor} type="color" />
      <Button style={ButtonStyle.primary} isDisabled={false}>
        {children}
      </Button>
    </form>
  );
}
