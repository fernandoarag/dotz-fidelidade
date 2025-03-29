import styled, { css } from 'styled-components';

export const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;

export const InputLabel = styled.label`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.gray.dark};
`;

export const InputStyled = styled.input<{ hasError?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? theme.colors.error : theme.colors.gray.medium)};
  font-size: ${({ theme }) => theme.typography.fontSize.regular};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 1px
      ${({ theme, hasError }) => (hasError ? theme.colors.error : theme.colors.primary)};
  }
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;
