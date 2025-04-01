import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: ${({ theme }) => theme.spacing.md} 0;
  width: 100%;
  z-index: 2;
`;

export const Logo = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xlarge};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.md};
`;

export const UserName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export const Points = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
`;
