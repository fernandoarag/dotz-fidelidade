import { Button } from "@components/common/Button";
import { Flex } from "@components/common/Flex";
import { Input } from "@components/common/Input";
import { useAuth } from "@contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import * as S from "./styles";

// Schema de validação
const schema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

type LoginFormData = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      await login(data.email, data.password);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro ao realizar login. Verifique suas credenciais.");
      }
    }
  };

  return (
    <S.PageContainer>
      <S.FormContainer>
        <S.Logo>DOTZ</S.Logo>
        <S.Title>Login</S.Title>

        {error && <S.ErrorAlert>{error}</S.ErrorAlert>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormGroup>
            <Input
              type="email"
              label="E-mail"
              placeholder="Digite seu e-mail"
              {...register("email")}
              error={errors.email?.message}
              fullWidth
            />
          </S.FormGroup>

          <S.FormGroup>
            <Input
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
              {...register("password")}
              error={errors.password?.message}
              fullWidth
            />
          </S.FormGroup>

          <Button type="submit" disabled={isSubmitting} fullWidth>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>

          <Flex justify="center" style={{ marginTop: "16px" }}>
            <span>Ainda não tem uma conta? </span>
            <S.StyledLink to="/register" style={{ marginLeft: "8px" }}>
              Cadastre-se
            </S.StyledLink>
          </Flex>
        </form>
      </S.FormContainer>
    </S.PageContainer>
  );
};
