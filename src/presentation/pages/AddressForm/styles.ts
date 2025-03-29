import styled from 'styled-components';
import { Card } from '../../components/common/Card/Card';

export const PageTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
`;

export const FormContainer = styled(Card)`
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CheckboxLabel = styled.label`
  margin-left: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
`;

export const ErrorAlert = styled.div`
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;
