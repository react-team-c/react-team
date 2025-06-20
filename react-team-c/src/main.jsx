import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './components/shared/contexts';
import { GlobalStyle, AppLayout } from './components';

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <ThemeProvider>
            <GlobalStyle />
            <AppLayout />
        </ThemeProvider>
    </StrictMode>
);
