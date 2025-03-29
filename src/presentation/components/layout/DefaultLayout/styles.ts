import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MainContent = styled.main`
  display: flex;
  flex: 1;
`;

export const SidebarContainer = styled.div`
  width: 250px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.small};
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;
