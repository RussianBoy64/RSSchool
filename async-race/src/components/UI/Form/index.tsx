import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import {
  setCarName,
  setCarColor,
  setUpdatedCarName,
  setUpdatedCarColor,
} from "../../../redux/reducers/garageReducer";
import {
  getCars,
  createCar,
  updateCar,
} from "../../../redux/reducers/garageActions";
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
  const { garage, create, carToUpdate } = useAppSelector(
    (state) => state.garage,
  );
  const dispatch = useAppDispatch();
  const carData = garage.cars.find((car) => car.id === carToUpdate.id) || {
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
      formSettings.submitHadler = async (event) => {
        event.preventDefault();
        await dispatch(createCar(create));
        await dispatch(getCars());
      };
      break;
    case FormTypes.update:
      formSettings.carNameChangeHandler = (event) => {
        dispatch(setUpdatedCarName(event.target.value));
      };
      formSettings.carNameValue = carToUpdate.name;
      formSettings.carColorChangeHandler = (event) => {
        dispatch(setUpdatedCarColor(event.target.value));
      };
      formSettings.carColorValue = carToUpdate.color;
      formSettings.buttonText = FormTypes.update;
      formSettings.isDisabled = carToUpdate.id === 0;
      formSettings.submitHadler = async (event) => {
        event.preventDefault();
        await dispatch(updateCar());
        await dispatch(getCars());
      };
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
