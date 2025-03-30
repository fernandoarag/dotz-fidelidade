import { Button } from "@components/common/Button";
import { Flex } from "@components/common/Flex";
import { Input } from "@components/common/Input";
import { useAuth } from "@contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddresses } from "@hooks/useAddresses";
import { theme } from "@presentation/theme/theme";
import type React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import * as S from "./styles";

// Schema de validação
const schema = yup.object().shape({
  street: yup.string().required("Rua é obrigatória"),
  number: yup.string().required("Número é obrigatório"),
  complement: yup.string(),
  neighborhood: yup.string().required("Bairro é obrigatório"),
  city: yup.string().required("Cidade é obrigatória"),
  state: yup
    .string()
    .required("Estado é obrigatório")
    .length(2, "Use a sigla do estado"),
  zipCode: yup
    .string()
    .required("CEP é obrigatório")
    .matches(/^\d{5}-\d{3}$/, "Formato inválido. Use 00000-000"),
  isDefault: yup.boolean(),
});

type AddressFormData = {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
};

export const AddressForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addresses, addAddress, updateAddress } = useAddresses();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!id;

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      isDefault: false,
    },
  });

  // Preencher o formulário para edição
  useEffect(() => {
    if (isEditing && addresses.length > 0) {
      const addressToEdit = addresses.find((addr) => addr.id === id);

      if (addressToEdit) {
        reset({
          street: addressToEdit.street,
          number: addressToEdit.number,
          complement: addressToEdit.complement,
          neighborhood: addressToEdit.neighborhood,
          city: addressToEdit.city,
          state: addressToEdit.state,
          zipCode: addressToEdit.zipCode,
          isDefault: addressToEdit.isDefault,
        });
      } else {
        // Endereço não encontrado
        navigate("/addresses");
      }
    }
  }, [isEditing, addresses, id, reset, navigate]);

  const onSubmit = async (data: AddressFormData) => {
    if (!user) return;

    setIsSubmitting(true);
    setError(null);

    try {
      if (isEditing) {
        const addressToEdit = addresses.find((addr) => addr.id === id);

        if (addressToEdit) {
          const success = await updateAddress({
            ...addressToEdit,
            ...data,
          });

          if (success) {
            navigate("/addresses");
          }
        }
      } else {
        const success = await addAddress({
          ...data,
          isDefault: data.isDefault ?? false, // Ensure isDefault is always defined
          userId: user.id,
        });

        if (success) {
          navigate("/addresses");
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro ao salvar o endereço");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <S.PageTitle>
        {isEditing ? "Editar Endereço" : "Novo Endereço"}
      </S.PageTitle>

      <S.FormContainer>
        {error && <S.ErrorAlert>{error}</S.ErrorAlert>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormRow>
            <S.FormGroup>
              <Input
                label="Rua"
                placeholder="Informe a rua"
                {...register("street")}
                error={errors.street?.message}
                fullWidth
              />
            </S.FormGroup>

            <S.FormGroup>
              <Input
                label="Número"
                placeholder="Informe o número"
                {...register("number")}
                error={errors.number?.message}
                fullWidth
              />
            </S.FormGroup>
          </S.FormRow>

          <S.FormGroup>
            <Input
              label="Complemento (opcional)"
              placeholder="Apt., Bloco, etc."
              {...register("complement")}
              error={errors.complement?.message}
              fullWidth
            />
          </S.FormGroup>

          <S.FormGroup>
            <Input
              label="Bairro"
              placeholder="Informe o bairro"
              {...register("neighborhood")}
              error={errors.neighborhood?.message}
              fullWidth
            />
          </S.FormGroup>

          <S.FormRow>
            <S.FormGroup>
              <Input
                label="Cidade"
                placeholder="Informe a cidade"
                {...register("city")}
                error={errors.city?.message}
                fullWidth
              />
            </S.FormGroup>

            <S.FormGroup>
              <Input
                label="Estado (UF)"
                placeholder="UF"
                maxLength={2}
                {...register("state")}
                error={errors.state?.message}
                fullWidth
              />
            </S.FormGroup>
          </S.FormRow>

          <S.FormGroup>
            <Input
              label="CEP"
              placeholder="00000-000"
              {...register("zipCode")}
              error={errors.zipCode?.message}
              fullWidth
            />
          </S.FormGroup>

          <S.CheckboxContainer>
            <input type="checkbox" id="isDefault" {...register("isDefault")} />
            <S.CheckboxLabel htmlFor="isDefault">
              Definir como endereço padrão
            </S.CheckboxLabel>
          </S.CheckboxContainer>

          <Flex gap={theme.spacing.md}>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar Endereço"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/addresses")}
            >
              Cancelar
            </Button>
          </Flex>
        </form>
      </S.FormContainer>
    </div>
  );
};
