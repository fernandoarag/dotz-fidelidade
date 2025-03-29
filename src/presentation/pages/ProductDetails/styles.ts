import { Card } from '@components/common/Card/Card';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const ProductImageContainer = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 40%;
    margin-bottom: 0;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

export const ProductInfoContainer = styled.div`
  flex: 1;
`;

export const ProductName = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ProductDescription = styled.div`
  color: ${({ theme }) => theme.colors.gray.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.6;
`;

export const PointsCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

export const PointsPrice = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xxlarge};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const PointsLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
`;

export const BalanceInfo = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const UnavailableMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.gray.light};
  color: ${({ theme }) => theme.colors.gray.dark};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const StatusMessage = styled.div<{ type: 'success' | 'error' | 'warning' }>`
  background-color: ${({ theme, type }) =>
    type === 'success'
      ? theme.colors.success
      : type === 'error'
        ? theme.colors.error
        : theme.colors.warning};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const LoadingContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;
