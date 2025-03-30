import type { Transaction } from "@core/domain/entities/Transaction";
import type React from "react";
import * as S from "./styles";

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
}) => {
  // Formatar data
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <S.Card>
      <S.TransactionInfo>
        <S.TransactionDescription>
          {transaction.description}
        </S.TransactionDescription>
        <S.TransactionDate>
          {formatDate(transaction.createdAt)}
        </S.TransactionDate>
      </S.TransactionInfo>
      <S.TransactionPoints type={transaction.type}>
        {transaction.type === "EARN" ? "+" : "-"}
        {transaction.points} pts
      </S.TransactionPoints>
    </S.Card>
  );
};
