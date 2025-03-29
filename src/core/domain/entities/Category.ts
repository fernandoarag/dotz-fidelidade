export interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string; // Para subcategorias
  imageUrl?: string;
}
