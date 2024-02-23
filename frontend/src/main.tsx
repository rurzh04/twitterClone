import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store/store.ts';

import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from './theme.ts';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);
