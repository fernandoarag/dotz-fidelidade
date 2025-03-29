import styled from 'styled-components';

export const Badge = styled.span<{
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
}>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  ${({ theme, status }) => {
    switch (status) {
      case 'PENDING':
        return `
          background-color: ${theme.colors.gray.light};
          color: ${theme.colors.gray.dark};
        `;
      case 'PROCESSING':
        return `
          background-color: ${theme.colors.warning};
          color: ${theme.colors.white};
        `;
      case 'SHIPPED':
        return `
          background-color: ${theme.colors.info};
          color: ${theme.colors.white};
        `;
      case 'DELIVERED':
        return `
          background-color: ${theme.colors.success};
          color: ${theme.colors.white};
        `;
      default:
        return '';
    }
  }}
`;
