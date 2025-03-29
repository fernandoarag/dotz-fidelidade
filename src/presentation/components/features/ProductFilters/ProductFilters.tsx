import { theme } from "@/presentation/theme/theme";
import { Button } from "@components/common/Button/Button";
import { Flex } from "@components/common/Flex/Flex";
import { Input } from "@components/common/Input/Input";
import type { Category } from "@core/domain/entities/Category";
import type React from "react";
import { useState } from "react";
import * as S from "./styles";

interface ProductFiltersProps {
  categories: Category[];
  onFilter: (filters: {
    categoryId?: string;
    search?: string;
    minPoints?: number;
    maxPoints?: number;
  }) => void;
  onReset: () => void;
  initialFilters?: {
    categoryId?: string;
    search?: string;
    minPoints?: number;
    maxPoints?: number;
  };
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  onFilter,
  onReset,
  initialFilters = {},
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    initialFilters.categoryId
  );
  const [search, setSearch] = useState(initialFilters.search || "");
  const [minPoints, setMinPoints] = useState<number | undefined>(
    initialFilters.minPoints
  );
  const [maxPoints, setMaxPoints] = useState<number | undefined>(
    initialFilters.maxPoints
  );

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(undefined);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const handleApplyFilters = () => {
    onFilter({
      categoryId: selectedCategory,
      search: search || undefined,
      minPoints,
      maxPoints,
    });
  };

  const handleResetFilters = () => {
    setSelectedCategory(undefined);
    setSearch("");
    setMinPoints(undefined);
    setMaxPoints(undefined);
    onReset();
  };

  return (
    <S.FiltersContainer>
      <S.FiltersTitle>Filtros</S.FiltersTitle>

      <Input
        label="Buscar produtos"
        placeholder="Digite para buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
      />

      <S.PriceRangeContainer>
        <h4>Faixa de pontos</h4>
        <S.RangeInputs>
          <Input
            type="number"
            placeholder="Mínimo"
            value={minPoints || ""}
            onChange={(e) => setMinPoints(Number(e.target.value) || undefined)}
          />
          <Input
            type="number"
            placeholder="Máximo"
            value={maxPoints || ""}
            onChange={(e) => setMaxPoints(Number(e.target.value) || undefined)}
          />
        </S.RangeInputs>
      </S.PriceRangeContainer>

      <div>
        <h4>Categorias</h4>
        <S.CategoryList>
          {categories.map((category) => (
            <S.CategoryButton
              key={category.id}
              active={selectedCategory === category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </S.CategoryButton>
          ))}
        </S.CategoryList>
      </div>

      <Flex gap={theme.spacing.md}>
        <Button onClick={handleApplyFilters} variant="primary">
          Aplicar filtros
        </Button>
        <Button onClick={handleResetFilters} variant="outline">
          Limpar filtros
        </Button>
      </Flex>
    </S.FiltersContainer>
  );
};
