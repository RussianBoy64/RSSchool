import { ReactNode } from "react";

import styles from "./styles.module.scss";

export enum ButtonStyle {
  primary,
  secondary,
  engine,
}

interface ButtonProps {
  style: ButtonStyle;
  isDisabled: boolean;
  children: ReactNode;
}

export default function Button({
  style,
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
    default:
      break;
  }

  return (
    <button
      className={buttonStyle.join(" ")}
      disabled={isDisabled}
      type="button"
    >
      {children}
    </button>
  );
}
