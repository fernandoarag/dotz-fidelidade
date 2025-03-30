// src/presentation/hooks/useProfile.ts
import { useState } from 'react';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { useAuth } from '../contexts/AuthContext';

type ProfileFormData = {
  name: string;
  phone: string;
};

export const useProfile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (data: ProfileFormData) => {
    try {
      setLoading(true);
      setSuccess(false);
      setError(null);

      const userRepository = new UserRepository();
      const updatedUser = await userRepository.updateProfile(data);

      // Atualizar o usuário no contexto de autenticação
      updateUser(updatedUser);

      setSuccess(true);
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      setError(err instanceof Error ? err.message : 'Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    success,
    error,
    updateProfile,
  };
};
