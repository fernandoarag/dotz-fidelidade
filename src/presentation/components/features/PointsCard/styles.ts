import { Card } from '@components/common/Card';
import styled from 'styled-components';

export const PointsCardStyled = styled(Card)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

export const PointsAmount = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xxlarge};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const PointsLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.regular};
`;
