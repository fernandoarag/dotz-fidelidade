import { Container } from "@components/common/Container";
import { Header } from "@components/layout/Header";
import { Sidebar } from "@components/layout/Sidebar";
import { useState } from "react";
import type React from "react";
import { Outlet } from "react-router-dom";
import * as S from "./styles";

export const DefaultLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <S.LayoutContainer>
      <Header>
        <S.HamburgerButton onClick={toggleSidebar}>
          <S.HamburgerIcon isOpen={isSidebarOpen}>
            <span />
            <span />
            <span />
          </S.HamburgerIcon>
        </S.HamburgerButton>
      </Header>
      <S.MainContent>
        <S.SidebarContainer isOpen={isSidebarOpen}>
          <Sidebar />
        </S.SidebarContainer>
        <S.Overlay
          isOpen={isSidebarOpen}
          onClick={() => setIsSidebarOpen(false)}
        />
        <S.ContentContainer>
          <Container>
            <Outlet />
          </Container>
        </S.ContentContainer>
      </S.MainContent>
    </S.LayoutContainer>
  );
};
