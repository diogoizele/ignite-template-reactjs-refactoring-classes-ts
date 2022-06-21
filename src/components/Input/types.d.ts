import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import type { IconType } from "react-icons";

export interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  icon?: IconType;
}

export interface InputContainerStyleProps {
  isFilled: boolean;
  isFocused: boolean;
}
