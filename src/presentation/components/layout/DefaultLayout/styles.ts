import styled, { css } from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MainContent = styled.main`
  display: flex;
  flex: 1;
  position: relative;
  padding-top: 5rem;
`;

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: 250px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.small};
  height: 100%;
  
  /* Mobile: posicionamento absoluto */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
    transition: transform 0.3s ease-in-out;
    padding-top: 60px; /* Espaço para o header */
  }

  /* Desktop: sempre visível */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    transform: none;
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

export const HamburgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const HamburgerIcon = styled.div<{ isOpen: boolean }>`
  width: 24px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
    transition: all 0.3s ease-in-out;
    
    ${({ isOpen }) =>
      isOpen &&
      css`
      &:first-child {
        transform: translateY(8.5px) rotate(45deg);
      }
      
      &:nth-child(2) {
        opacity: 0;
      }
      
      &:last-child {
        transform: translateY(-8.5px) rotate(-45deg);
      }
    `}
  }
`;

export const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
