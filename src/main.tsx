import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/hooks/queries/common/queryClient.ts';
import App from './App.tsx';
import './index.css';
import { enableMapSet } from 'immer';

enableMapSet();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
