import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './presentation/contexts/AuthContext';
import { AppRoutes } from './presentation/routes/Routes';
import { GlobalStyle } from './presentation/theme/GlobalStyle';
import { theme } from './presentation/theme/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle theme={theme} />
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
