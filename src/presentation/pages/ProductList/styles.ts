import styled from 'styled-components';

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
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
`;

export const PageTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
`;
