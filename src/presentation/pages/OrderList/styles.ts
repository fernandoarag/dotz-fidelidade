import { Card } from '@components/common/Card/Card';
import styled from 'styled-components';

export const PageTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
`;

export const OrderCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  position: relative;
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const OrderNumber = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
`;

export const OrderDate = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.gray.medium};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const OrderPoints = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const ProductList = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProductQuantity = styled.span`
  margin-right: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.gray.dark};
`;

export const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const ErrorState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;
