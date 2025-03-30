import { forwardRef } from "react";
import type { InputProps } from "./IInputProps";
import * as S from "./styles";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, ...rest }, ref) => {
    return (
      <S.InputContainer fullWidth={fullWidth}>
        {label && <S.InputLabel>{label}</S.InputLabel>}
        <S.InputStyled ref={ref} hasError={!!error} {...rest} />
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.InputContainer>
    );
  }
);
