import type React from "react";
import * as S from "./styles";

interface PointsCardProps {
  pointsBalance: number;
}

export const PointsCard: React.FC<PointsCardProps> = ({ pointsBalance }) => {
  return (
    <S.PointsCardStyled>
      <S.PointsLabel>Seu saldo</S.PointsLabel>
      <S.PointsAmount>{pointsBalance} pts</S.PointsAmount>
    </S.PointsCardStyled>
  );
};
