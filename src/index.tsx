import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';
import App from './app/App';
import '@/app/styles/index.scss';
import '@/shared/config/i18n/i18n';
// Импортируем полифилл
import '@/shared/lib/polyfills/objectHasOwn';

const container = document.getElementById('root');

if (!container) {
  throw new Error(
    'The root container was not found. Failed to install react application.',
  );
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
);
export { Theme } from '@/shared/const/theme';
