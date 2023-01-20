import { ReactNode } from "react";
import Button, { ButtonStyle } from "../Button";
import styles from "./styles.module.scss";

export interface FormInputChangeHadler {
  (event: React.ChangeEvent<HTMLInputElement>): void;
}

interface FormProps {
  carNameChangeHandler: FormInputChangeHadler;
  carColorChangeHandler: FormInputChangeHadler;
  isDisabled: boolean;
  children: ReactNode;
}

export default function Form({
  carNameChangeHandler,
  carColorChangeHandler,
  isDisabled,
  children,
}: FormProps) {
  return (
    <form className={styles.form}>
      <input
        className={styles.form__inputText}
        type="text"
        onChange={carNameChangeHandler}
        disabled={isDisabled}
      />
      <input
        className={styles.form__inputColor}
        type="color"
        onChange={carColorChangeHandler}
        disabled={isDisabled}
      />
      <Button style={ButtonStyle.primary} type="submit" isDisabled={isDisabled}>
        {children}
      </Button>
    </form>
  );
}
