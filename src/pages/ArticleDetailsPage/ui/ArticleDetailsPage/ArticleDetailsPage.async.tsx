import { lazy } from 'react';

export const ArticlesPage = lazy(() => new Promise((resolve) => {
  // @ts-ignore
  setTimeout(() => resolve(import('./ArticlesPage')), 1000);
}));
