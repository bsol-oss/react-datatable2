import type { Preview } from '@storybook/react';
import theme from '../src/theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    themes: [
      { name: 'dark', ...theme, config: { ...theme.config, initialColorMode: 'dark'} }
    ]
  },
};

export default preview;
