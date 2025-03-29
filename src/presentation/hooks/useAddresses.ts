import { useEffect, useState } from 'react';
import type { Address } from '../../core/domain/entities/Address';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userRepository = new UserRepository();

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const addressesData = await userRepository.getAddresses();
      setAddresses(addressesData);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar endereços');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const addAddress = async (address: Omit<Address, 'id'>) => {
    try {
      setLoading(true);
      await userRepository.addAddress(address);
      // Recarregar a lista após adicionar
      await fetchAddresses();
      return true;
    } catch (err) {
      setError('Erro ao adicionar endereço');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (address: Address) => {
    try {
      setLoading(true);
      await userRepository.updateAddress(address);
      // Recarregar a lista após atualizar
      await fetchAddresses();
      return true;
    } catch (err) {
      setError('Erro ao atualizar endereço');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (addressId: string) => {
    try {
      setLoading(true);
      await userRepository.deleteAddress(addressId);
      // Recarregar a lista após deletar
      await fetchAddresses();
      return true;
    } catch (err) {
      setError('Erro ao excluir endereço');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    addresses,
    loading,
    error,
    addAddress,
    updateAddress,
    deleteAddress,
  };
};
