import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './Contexts/AuthProvider';
import { ChakraProvider, theme } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ChakraProvider>
        <AuthProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
        </AuthProvider>
    </ChakraProvider>
);

