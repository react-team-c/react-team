import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './design-system/shared/contexts';
import { GlobalStyle, AppLayout } from './design-system';

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <ThemeProvider>
            <GlobalStyle />
            <AppLayout />
        </ThemeProvider>
    </StrictMode>
);
