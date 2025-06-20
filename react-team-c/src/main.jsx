import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './conponents/shared/contexts';
import { GlobalStyle, AppLayout } from './conponents';

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <ThemeProvider>
            <GlobalStyle />
            <AppLayout />
        </ThemeProvider>
    </StrictMode>
);
