import { createGlobalStyle } from 'styled-components';
import type { Theme } from './theme';

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.regular};
    line-height: 1.5;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
