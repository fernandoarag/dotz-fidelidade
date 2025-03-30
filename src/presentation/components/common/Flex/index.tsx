import styled, { css } from "styled-components";

export interface FlexProps {
  direction?: "row" | "column";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: string;
  padding?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  justify-content: ${({ justify }) => justify || "flex-start"};
  align-items: ${({ align }) => align || "flex-start"};
  flex-wrap: ${({ wrap }) => wrap || "nowrap"};
  padding: ${({ padding }) => padding || "0"};

  ${({ gap }) =>
    gap &&
    css`
      gap: ${gap};
    `}
`;
