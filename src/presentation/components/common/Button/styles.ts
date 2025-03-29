import styled, { css } from 'styled-components';
import type { ButtonProps } from './IButtonProps';

export const ButtonStyled = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: ${({ theme }) => theme.transitions.default};
  white-space: nowrap;
  cursor: pointer;
  border: none;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  ${({ variant, theme }) =>
    variant === 'primary' &&
    css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};

      &:hover:not(:disabled) {
        background-color: darken(${theme.colors.primary}, 10%);
      }
    `}

  ${({ variant, theme }) =>
    variant === 'secondary' &&
    css`
      background-color: ${theme.colors.secondary};
      color: ${theme.colors.white};

      &:hover:not(:disabled) {
        background-color: darken(${theme.colors.secondary}, 10%);
      }
    `}

  ${({ variant, theme }) =>
    variant === 'outline' &&
    css`
      background-color: transparent;
      color: ${theme.colors.primary};
      border: 1px solid ${theme.colors.primary};

      &:hover:not(:disabled) {
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
      }
    `}

  ${({ variant, theme }) =>
    variant === 'text' &&
    css`
      background-color: transparent;
      color: ${theme.colors.primary};

      &:hover:not(:disabled) {
        background-color: rgba(255, 85, 0, 0.1);
      }
    `}

  ${({ size, theme }) =>
    size === 'small' &&
    css`
      padding: ${theme.spacing.xs} ${theme.spacing.md};
      font-size: ${theme.typography.fontSize.small};
    `}

  ${({ size, theme }) =>
    size === 'medium' &&
    css`
      padding: ${theme.spacing.sm} ${theme.spacing.lg};
      font-size: ${theme.typography.fontSize.regular};
    `}

  ${({ size, theme }) =>
    size === 'large' &&
    css`
      padding: ${theme.spacing.md} ${theme.spacing.xl};
      font-size: ${theme.typography.fontSize.large};
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
