import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TodoAppContent from './App.jsx';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './styles/theme';

function App() {
    return (
        <>
            <TodoAppContent />
        </>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <App />
        </ThemeProvider>
    </StrictMode>
);
