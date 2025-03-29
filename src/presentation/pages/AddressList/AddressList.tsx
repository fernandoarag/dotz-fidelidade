import { Button } from "@components/common/Button/Button";
import { Flex } from "@components/common/Flex/Flex";
import type { Address } from "@core/domain/entities/Address";
import { useAddresses } from "@hooks/useAddresses";
import type React from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";

export const AddressList: React.FC = () => {
  const { addresses, loading, error, deleteAddress, updateAddress } =
    useAddresses();

  const handleDelete = async (addressId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este endereço?")) {
      await deleteAddress(addressId);
    }
  };

  const handleSetDefault = async (address: Address) => {
    // Atualiza o endereço atual como padrão
    const updatedAddress = { ...address, isDefault: true };
    await updateAddress(updatedAddress);
  };

  if (loading) {
    return <S.LoadingState>Carregando endereços...</S.LoadingState>;
  }

  return (
    <div>
      <S.PageTitle>Meus Endereços</S.PageTitle>

      <Flex justify="flex-end" style={{ marginBottom: "16px" }}>
        <Button as={Link} to="/addresses/new">
          Adicionar Novo Endereço
        </Button>
      </Flex>

      {error && <S.ErrorState>{error}</S.ErrorState>}

      {addresses.length === 0 ? (
        <S.EmptyState>
          <h3>Nenhum endereço cadastrado</h3>
          <p>Adicione um endereço para poder resgatar produtos.</p>
        </S.EmptyState>
      ) : (
        addresses.map((address) => (
          <S.AddressCard key={address.id}>
            {address.isDefault && <S.DefaultBadge>Padrão</S.DefaultBadge>}

            <S.AddressLine>
              <strong>
                {address.street}, {address.number}
              </strong>
              {address.complement && ` - ${address.complement}`}
            </S.AddressLine>

            <S.AddressLine>{address.neighborhood}</S.AddressLine>

            <S.AddressLine>
              {address.city} - {address.state}
            </S.AddressLine>

            <S.AddressLine>CEP: {address.zipCode}</S.AddressLine>

            <S.AddressActions>
              {!address.isDefault && (
                <Button
                  variant="text"
                  size="small"
                  onClick={() => handleSetDefault(address)}
                >
                  Definir como padrão
                </Button>
              )}

              <Button
                as={Link}
                to={`/addresses/edit/${address.id}`}
                variant="outline"
                size="small"
              >
                Editar
              </Button>

              {!address.isDefault && (
                <Button
                  onClick={() => handleDelete(address.id)}
                  variant="outline"
                  size="small"
                >
                  Excluir
                </Button>
              )}
            </S.AddressActions>
          </S.AddressCard>
        ))
      )}
    </div>
  );
};
