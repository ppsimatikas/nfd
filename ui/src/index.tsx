import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ButtonProps, createTheme, MantineProvider, MantineTheme} from "@mantine/core";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import './ui-theme-styles'
import {Notifications} from "@mantine/notifications";

const queryClient = new QueryClient();
const theme = createTheme({
    black: '#040307',
    fontFamily: 'ABCDiatype-Medium, sans-serif',
    fontFamilyMonospace: 'ABCDiatypeSemi-Mono-Medium, monospace',
    headings: {fontFamily: 'ABCDiatype-Medium, sans-serif'},
    // colors: {
    //     brand: violet,
    //     green,
    //     violet,
    // },
    components: {
        Button: {
            styles: ({radius}: MantineTheme, {variant}: ButtonProps) => ({
                root: {
                    borderRadius: radius.lg,
                    border: 'none',
                    background: !variant && 'linear-gradient(90deg, #C766EF 0%, #7928D2 51%, #2B0C52 100%)',
                },
            }),
        },
    },
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <MantineProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Notifications/>
                    <App/>
                </QueryClientProvider>
            </MantineProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
