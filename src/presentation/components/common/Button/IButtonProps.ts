import type { ButtonHTMLAttributes, ElementType } from 'react';

export interface ButtonProps<C extends ElementType = 'button'>
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  as?: C;
  to?: string;
  // [x: string]: any;
}
