import { Card } from '@components/common/Card';
import styled from 'styled-components';

export const PageTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
`;

export const OrderSection = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;
export const OrderInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
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

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

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

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.black};
`;

export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  color: ${({ theme }) => theme.colors.gray.dark};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
`;

export const TotalRow = styled.tr`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const AddressCard = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const AddressLine = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const OrderTracker = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${({ theme }) => `${theme.spacing.lg} 0`};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 22px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.gray.light};
    transform: translateY(-50%);
    z-index: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};

    &::before {
      width: 2px;
      height: 100%;
      top: 0;
      left: 20px;
      transform: translateX(0);
    }
  }
`;

export const TrackerStep = styled.div<{ active: boolean; completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;

  ${({ theme, active, completed }) => {
    if (completed) {
      return `
        color: ${theme.colors.success};
      `;
    }
    if (active) {
      return ` color: ${theme.colors.primary};`;
    }
    return `
      color: ${theme.colors.gray.medium};
    `;
  }}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const StepIcon = styled.div<{ active: boolean; completed: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme, active, completed }) =>
    completed ? theme.colors.success : active ? theme.colors.primary : theme.colors.white};
  color: ${({ theme, active, completed }) =>
    active || completed ? theme.colors.white : theme.colors.gray.medium};
  border: 2px solid
    ${({ theme, active, completed }) =>
      completed ? theme.colors.success : active ? theme.colors.primary : theme.colors.gray.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-right: ${({ theme }) => theme.spacing.md};
    margin-bottom: 0;
  }
`;

export const StepLabel = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: left;
  }
`;
