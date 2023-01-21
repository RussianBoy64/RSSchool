import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import { setCarName, setCarColor } from "../../../redux/reducers/garageReducer";
import { createCar } from "../../../redux/reducers/garageActions";
import Button, { ButtonStyle } from "../Button";
import styles from "./styles.module.scss";

interface FormProps {
  formType: FormTypes;
}

export enum FormTypes {
  create = "Create",
  update = "Update",
}

interface FormInputChangeHadler {
  (event: React.ChangeEvent<HTMLInputElement>): void;
}

interface FormSubmitHandler {
  (event: React.FormEvent): void;
}

interface FormSettings {
  carNameChangeHandler: FormInputChangeHadler | undefined;
  carNameValue: string;
  carColorChangeHandler: FormInputChangeHadler | undefined;
  carColorValue: string;
  buttonText: FormTypes;
  isDisabled: boolean;
  submitHadler: FormSubmitHandler | undefined;
}

export default function Form({ formType }: FormProps) {
  const { cars, create, carToUpdate } = useAppSelector((state) => state.garage);
  const dispatch = useAppDispatch();
  const carData = cars.find((car) => car.id === carToUpdate) || {
    name: "",
    color: "#ffffff",
  };
  const formSettings: FormSettings = {
    carNameChangeHandler: undefined,
    carNameValue: carData.name,
    carColorChangeHandler: undefined,
    carColorValue: carData.color,
    buttonText: FormTypes.create,
    isDisabled: false,
    submitHadler: undefined,
  };

  switch (formType) {
    case FormTypes.create:
      formSettings.carNameChangeHandler = (event) => {
        dispatch(setCarName(event.target.value));
      };
      formSettings.carNameValue = create.name;
      formSettings.carColorChangeHandler = (event) => {
        dispatch(setCarColor(event.target.value));
      };
      formSettings.carColorValue = create.color;
      formSettings.buttonText = FormTypes.create;
      formSettings.isDisabled = false;
      formSettings.submitHadler = (event) => {
        event.preventDefault();
        dispatch(createCar(create));
      };
      break;
    case FormTypes.update:
      formSettings.carNameChangeHandler = (event) => {
        dispatch(setCarName(event.target.value));
      };
      formSettings.carNameValue = carData.name;
      formSettings.carColorChangeHandler = (event) => {
        dispatch(setCarColor(event.target.value));
      };
      formSettings.carColorValue = carData.color;
      formSettings.buttonText = FormTypes.update;
      formSettings.isDisabled = carToUpdate === 0;
      break;
    default:
      break;
  }

  return (
    <form className={styles.form} onSubmit={formSettings.submitHadler}>
      <input
        className={styles.form__inputText}
        type="text"
        value={formSettings.carNameValue}
        onChange={formSettings.carNameChangeHandler}
        disabled={formSettings.isDisabled}
      />
      <input
        className={styles.form__inputColor}
        type="color"
        value={formSettings.carColorValue}
        onChange={formSettings.carColorChangeHandler}
        disabled={formSettings.isDisabled}
      />
      <Button
        style={ButtonStyle.primary}
        type="submit"
        isDisabled={formSettings.isDisabled}
      >
        {formSettings.buttonText}
      </Button>
    </form>
  );
}
