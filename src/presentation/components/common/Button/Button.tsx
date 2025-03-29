import type { ElementType } from "react";
import type { ButtonProps } from "./IButtonProps";
import * as S from "./styles";

export const Button = <C extends ElementType = "button">({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  as,
  ...rest
}: ButtonProps<C>) => {
  return (
    <S.ButtonStyled
      as={as as ElementType}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      {...rest}
    >
      {children}
    </S.ButtonStyled>
  );
};
