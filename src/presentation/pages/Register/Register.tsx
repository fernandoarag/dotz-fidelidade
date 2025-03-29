import { Button } from "@components/common/Button/Button";

import { Flex } from "@components/common/Flex/Flex";
import { Input } from "@components/common/Input/Input";
import { useAuth } from "@contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import type React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";

import * as yup from "yup";

// Schema de validação
const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não conferem")
    .required("Confirmação de senha é obrigatória"),
  phone: yup
    .string()
    .matches(
      /^\([1-9]{2}\) [9]{0,1}[0-9]{4}-[0-9]{4}$/,
      "Formato inválido. Use (99) 99999-9999"
    )
    .required("Telefone é obrigatório"),
});

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

export const Register: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro ao realizar cadastro. Tente novamente.");
      }
    }
  };

  return (
    <S.PageContainer>
      <S.FormContainer>
        <S.Logo>DOTZ</S.Logo>
        <S.Title>Cadastre-se</S.Title>

        {error && <S.ErrorAlert>{error}</S.ErrorAlert>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormGroup>
            <Input
              type="text"
              label="Nome completo"
              placeholder="Digite seu nome"
              {...register("name")}
              error={errors.name?.message}
              fullWidth
            />
          </S.FormGroup>

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

          <S.FormGroup>
            <Input
              type="password"
              label="Confirmar senha"
              placeholder="Confirme sua senha"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              fullWidth
            />
          </S.FormGroup>

          <S.FormGroup>
            <Input
              type="tel"
              label="Telefone"
              placeholder="(99) 99999-9999"
              {...register("phone")}
              error={errors.phone?.message}
              fullWidth
            />
          </S.FormGroup>

          <Button type="submit" disabled={isSubmitting} fullWidth>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <Flex justify="center" style={{ marginTop: "16px" }}>
            <span>Já tem uma conta? </span>
            <S.StyledLink to="/login" style={{ marginLeft: "8px" }}>
              Faça login
            </S.StyledLink>
          </Flex>
        </form>
      </S.FormContainer>
    </S.PageContainer>
  );
};
