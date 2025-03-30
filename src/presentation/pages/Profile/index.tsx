import { Button } from "@components/common/Button";
import { Flex } from "@components/common/Flex";
import { Input } from "@components/common/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useProfile } from "@hooks/useProfile";
import type React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import * as S from "./styles";

// Schema de validação
const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  phone: yup
    .string()
    .matches(
      /^\([1-9]{2}\) [9]{0,1}[0-9]{4}-[0-9]{4}$/,
      "Formato inválido. Use (99) 99999-9999"
    )
    .required("Telefone é obrigatório"),
});

type ProfileFormData = {
  name: string;
  phone: string;
};

export const Profile: React.FC = () => {
  const { user, loading, success, error, updateProfile } = useProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
    },
  });

  // Atualizar o formulário quando o usuário mudar
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        phone: user.phone,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    await updateProfile(data);
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <S.PageTitle>Meu Perfil</S.PageTitle>

      <S.PointsInfo>
        <S.PointsLabel>Seu saldo de pontos Dotz</S.PointsLabel>
        <S.PointsAmount>
          {user.pointsBalance.toLocaleString()} pts
        </S.PointsAmount>
      </S.PointsInfo>

      <S.ProfileSection>
        <S.SectionTitle>Informações Pessoais</S.SectionTitle>

        <S.UserEmail>
          <strong>E-mail:</strong> {user.email}
        </S.UserEmail>

        {success && (
          <S.SuccessMessage>Perfil atualizado com sucesso!</S.SuccessMessage>
        )}

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormGroup>
            <Input
              label="Nome completo"
              placeholder="Digite seu nome"
              {...register("name")}
              error={errors.name?.message}
              fullWidth
            />
          </S.FormGroup>

          <S.FormGroup>
            <Input
              label="Telefone"
              placeholder="(99) 99999-9999"
              {...register("phone")}
              error={errors.phone?.message}
              fullWidth
            />
          </S.FormGroup>

          <Flex justify="flex-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </Flex>
        </form>
      </S.ProfileSection>

      <S.ProfileSection>
        <S.SectionTitle>Segurança</S.SectionTitle>

        <p>
          Por questões de segurança, não é possível alterar seu e-mail. Se
          precisar fazer isso, entre em contato com nosso suporte.
        </p>

        {/* Aqui poderia adicionar um formulário para alterar senha, mas não implementamos isso no backend */}
      </S.ProfileSection>
    </div>
  );
};
