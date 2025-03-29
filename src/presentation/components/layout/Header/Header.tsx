import { Button } from "@components/common/Button/Button";
import { Container } from "@components/common/Container/Container";
import { Flex } from "@components/common/Flex/Flex";
import { useAuth } from "@contexts/AuthContext";
import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./styles";

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <S.HeaderContainer>
      <Container>
        <Flex justify="space-between" align="center">
          <Link to="/">
            <S.Logo>DOTZ</S.Logo>
          </Link>
          <S.Nav>
            {user && (
              <S.UserInfo>
                <S.UserName>{user.name}</S.UserName>
                <S.Points>{user.pointsBalance} pts</S.Points>
              </S.UserInfo>
            )}
            <Button variant="text" size="small" onClick={handleLogout}>
              Sair
            </Button>
          </S.Nav>
        </Flex>
      </Container>
    </S.HeaderContainer>
  );
};
