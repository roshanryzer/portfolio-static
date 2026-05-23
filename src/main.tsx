import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { PortfolioDataProvider } from './contexts/PortfolioDataContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PortfolioDataProvider>
          <App />
        </PortfolioDataProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
