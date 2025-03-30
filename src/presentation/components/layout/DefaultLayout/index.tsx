import { Container } from "@components/common/Container";
import { Header } from "@components/layout/Header";
import { Sidebar } from "@components/layout/Sidebar";
import type React from "react";
import { Outlet } from "react-router-dom";
import * as S from "./styles";

export const DefaultLayout: React.FC = () => {
  return (
    <S.LayoutContainer>
      <Header />
      <S.MainContent>
        <S.SidebarContainer>
          <Sidebar />
        </S.SidebarContainer>
        <S.ContentContainer>
          <Container>
            <Outlet />
          </Container>
        </S.ContentContainer>
      </S.MainContent>
    </S.LayoutContainer>
  );
};
