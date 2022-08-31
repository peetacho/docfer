import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes';
import { ColorModeScript, ChakraProvider } from '@chakra-ui/react'
import theme from './lib/theme'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  </React.StrictMode>
);