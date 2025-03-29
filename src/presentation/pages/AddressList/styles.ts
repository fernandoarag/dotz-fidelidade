import { Card } from '@components/common/Card/Card';
import styled from 'styled-components';

export const PageTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
`;

export const AddressCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  position: relative;
`;

export const DefaultBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

export const AddressLine = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const AddressActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
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
