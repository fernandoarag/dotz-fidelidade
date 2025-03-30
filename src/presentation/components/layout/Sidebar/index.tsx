import type React from "react";
import * as S from "./styles";

export const Sidebar: React.FC = () => {
  return (
    <S.SidebarContainer>
      <S.NavList>
        <S.NavItem>
          <S.NavLinkStyled to="/">Dashboard</S.NavLinkStyled>
        </S.NavItem>

        <S.SectionTitle>Minha Conta</S.SectionTitle>
        <S.NavItem>
          <S.NavLinkStyled to="/profile">Perfil</S.NavLinkStyled>
        </S.NavItem>
        <S.NavItem>
          <S.NavLinkStyled to="/addresses">Endereços</S.NavLinkStyled>
        </S.NavItem>

        <S.SectionTitle>Produtos</S.SectionTitle>
        <S.NavItem>
          <S.NavLinkStyled to="/products">Catálogo</S.NavLinkStyled>
        </S.NavItem>

        <S.SectionTitle>Pedidos</S.SectionTitle>
        <S.NavItem>
          <S.NavLinkStyled to="/orders">Meus Pedidos</S.NavLinkStyled>
        </S.NavItem>
      </S.NavList>
    </S.SidebarContainer>
  );
};
