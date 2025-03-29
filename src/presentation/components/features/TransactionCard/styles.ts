import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const TransactionInfo = styled.div`
  flex: 1;
`;

export const TransactionDescription = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const TransactionDate = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  color: ${({ theme }) => theme.colors.gray.medium};
`;

export const TransactionPoints = styled.div<{ type: 'EARN' | 'REDEEM' }>`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme, type }) => (type === 'EARN' ? theme.colors.success : theme.colors.error)};
`;
