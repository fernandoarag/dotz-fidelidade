import { Button } from "@components/common/Button";
import { Container } from "@components/common/Container";
import { Flex } from "@components/common/Flex";
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
      {/* <Container> */}
      <Flex justify="space-between" align="center" padding="0 1.5rem">
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
      {/* </Container> */}
    </S.HeaderContainer>
  );
};
