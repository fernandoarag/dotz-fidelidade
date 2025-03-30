import { Card } from '@components/common/Card';
import styled from 'styled-components';

export const FiltersContainer = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`;

export const FiltersTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.large};
`;

export const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CategoryButton = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border: 1px solid
    ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.gray.light)};
  background-color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.white)};
  color: ${({ theme, active }) => (active ? theme.colors.white : theme.colors.gray.dark)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme, active }) =>
      active ? theme.colors.primary : theme.colors.gray.light};
  }
`;

export const PriceRangeContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const RangeInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
`;
