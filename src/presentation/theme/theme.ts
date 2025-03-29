export const theme = {
  colors: {
    primary: '#FF5500', // Cor principal da Dotz
    secondary: '#003366',
    background: '#F5F5F5',
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      light: '#E0E0E0',
      medium: '#9E9E9E',
      dark: '#616161',
    },
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    info: '#2196F3',
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: {
      small: '0.875rem', // 14px
      regular: '1rem', // 16px
      large: '1.25rem', // 20px
      xlarge: '1.5rem', // 24px
      xxlarge: '2rem', // 32px
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    xxl: '3rem', // 48px
  },
  borderRadius: {
    small: '0.25rem', // 4px
    medium: '0.5rem', // 8px
    large: '1rem', // 16px
    full: '9999px',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
  },
  transitions: {
    default: '0.3s ease',
  },
};

export type Theme = typeof theme;
