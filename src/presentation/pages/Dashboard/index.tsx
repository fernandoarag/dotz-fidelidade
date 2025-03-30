import { TransactionCard } from "@/presentation/components/features/TransactionCard";
import { Button } from "@components/common/Button";
import { Flex } from "@components/common/Flex";
import { PointsCard } from "@components/features/PointsCard";
import { useTransactions } from "@hooks/useTransactions";
import type React from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";

export const Dashboard: React.FC = () => {
  const { transactions, pointsBalance, loading, error } = useTransactions();

  if (loading) {
    return <S.LoadingContainer>Carregando dashboard...</S.LoadingContainer>;
  }

  return (
    <div>
      <S.PageTitle>Dashboard</S.PageTitle>

      <S.DashboardSection>
        <PointsCard pointsBalance={pointsBalance} />
      </S.DashboardSection>

      <S.ActionsContainer>
        <S.ActionCard>
          <S.ActionTitle>Resgatar Produtos</S.ActionTitle>
          <S.ActionDescription>
            Explore nossa variedade de produtos disponíveis para resgate com
            seus pontos Dotz.
          </S.ActionDescription>
          <Button as={Link} to="/products">
            Ver Catálogo
          </Button>
        </S.ActionCard>

        <S.ActionCard>
          <S.ActionTitle>Seus Pedidos</S.ActionTitle>
          <S.ActionDescription>
            Acompanhe o status de entrega dos produtos que você já resgatou.
          </S.ActionDescription>
          <Button as={Link} to="/orders" variant="outline">
            Ver Pedidos
          </Button>
        </S.ActionCard>
      </S.ActionsContainer>

      <S.DashboardSection>
        <S.SectionTitle>Extrato de Pontos</S.SectionTitle>

        {error && (
          <div style={{ color: "red", marginBottom: "16px" }}>{error}</div>
        )}

        {transactions.length > 0 ? (
          transactions
            .slice(0, 5)
            .map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))
        ) : (
          <S.EmptyTransactions>
            <p>Nenhuma transação encontrada.</p>
          </S.EmptyTransactions>
        )}

        {transactions.length > 5 && (
          <Flex justify="center" style={{ marginTop: "16px" }}>
            <Button as={Link} to="/transactions" variant="text">
              Ver todas as transações
            </Button>
          </Flex>
        )}
      </S.DashboardSection>
    </div>
  );
};
