import { ReactNode } from "react";

import styles from "./styles.module.scss";

export enum ButtonStyle {
  primary,
  secondary,
  none,
}

interface ButtonProps {
  style: ButtonStyle;
  type: "button" | "submit";
  onClickHandler?: () => void;
  isDisabled: boolean;
  children: ReactNode;
}

export default function Button({
  style,
  type = "button",
  onClickHandler = undefined,
  isDisabled = false,
  children,
}: ButtonProps) {
  const buttonStyle = [styles.button];

  switch (style) {
    case ButtonStyle.primary:
      buttonStyle.push(styles.button_primary);
      break;
    case ButtonStyle.secondary:
      buttonStyle.push(styles.button_secondary);
      break;
    case ButtonStyle.none:
      buttonStyle.push(styles.button_none);
      break;
    default:
      break;
  }

  return (
    <button
      className={buttonStyle.join(" ")}
      onClick={onClickHandler}
      disabled={isDisabled}
      type={type === "button" ? "button" : "submit"}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  onClickHandler: undefined,
};
