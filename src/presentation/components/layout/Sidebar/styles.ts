import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const SidebarContainer = styled.div`
  height: calc(100vh - 68px);
  position: fixed;
  left: 0;
  top: 68px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  min-width: 250px;
  width: auto;
  z-index: 1;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const NavLinkStyled = styled(NavLink)`
  display: block;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  color: ${({ theme }) => theme.colors.gray.dark};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: ${({ theme }) => theme.transitions.default};
  border-left: 3px solid transparent;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray.light};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    border-left-color: ${({ theme }) => theme.colors.primary};
    background-color: rgba(255, 85, 0, 0.05);
  }
`;

export const SectionTitle = styled.h3`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  color: ${({ theme }) => theme.colors.gray.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;
