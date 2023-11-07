import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { withReactContext } from 'storybook-react-context';
import { ThemeProvider } from 'styled-components';
import { DefaultBlockFactory } from '../src/components/BlockFactory';
import { BlockFactoryContext } from '../src/hooks';
import { darkTheme, lightTheme } from "../src/themes/theme";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#f0f0f0',
        },
        {
          name: 'dark',
          value: '#2f3237',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    withReactContext({
      Context: BlockFactoryContext,
      initialState: { factory: new DefaultBlockFactory() },
    }),
    withThemeFromJSXProvider({
      themes: {
        light: lightTheme,
        dark: darkTheme,
      },
      defaultTheme: "light",
      Provider: ThemeProvider,
    }),
  ],
};
  
export default preview;