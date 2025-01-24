import React from 'react';
import ReactDOM from 'react-dom/client'; // Используем ReactDOM для рендеринга приложения
import App from './App'; // Импортируем главный компонент App
import './index.css'; // Импортируем глобальные стили (если есть)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
