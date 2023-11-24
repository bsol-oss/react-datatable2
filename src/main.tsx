import React from 'react';
import { createRoot } from 'react-dom/client';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import App from './App';
import theme from './theme';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App height="400px" tableTitle="Member" isColumnResizable={false} />
      </ChakraProvider>
    </React.StrictMode>
  );
}
