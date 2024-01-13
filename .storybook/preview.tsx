import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { DocsContainer } from '@storybook/blocks';
import React from "react";
import { withReactContext } from 'storybook-react-context';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { DefaultBlockFactory } from '../src/components/BlockFactory';
import { BlockFactoryContext } from '../src/hooks';
import { darkTheme as darkBlueTheme } from "../src/themes/blue/darkTheme";
import { lightTheme as lightBlueTheme } from "../src/themes/blue/lightTheme";
import { darkTheme } from "../src/themes/default/darkTheme";
import { lightTheme } from "../src/themes/default/lightTheme";

const GlobalStyles = createGlobalStyle`
html,
.sbdocs-preview .docs-story {
  background-color: ${(props) => props.theme.backgroundColor} !important;
}
`

const ThemeProviderDecorator = withThemeFromJSXProvider({
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  defaultTheme: "light",
  Provider: ThemeProvider,
  GlobalStyles,
})

const ExampleContainer = ({ children, context, ...props }) => {
  return <ThemeProvider theme={lightTheme}>
    <DocsContainer context={context} {...props}>{children}</DocsContainer>
  </ThemeProvider>;
};

const blockFactory = new DefaultBlockFactory();
blockFactory.registerTheme('default', lightTheme, darkTheme)
blockFactory.registerTheme('blue', lightBlueTheme, darkBlueTheme)

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    backgrounds: { disable: true },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      container: ExampleContainer,
    },
  },
  decorators: [
    withReactContext({
      Context: BlockFactoryContext,
      initialState: { factory: blockFactory },
    }),
    ThemeProviderDecorator,
  ],
};
  
export default preview;