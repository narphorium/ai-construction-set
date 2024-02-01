import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { DocsContainer } from '@storybook/blocks';
import React, { useEffect, useState } from "react";
import { withReactContext } from 'storybook-react-context';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { DefaultBlockFactory } from '../src/components/BlockFactory';
import { BlockFactoryContext } from '../src/hooks';
import { DarkModeContext } from "../src/stories/DarkModeProvider";
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

const blockFactory = new DefaultBlockFactory()

const ExampleContainer = ({ children, context, ...props }) => {
  // TODO: Do I still need a theme provider here or is dark mode enough?
  const [lightTheme, darkTheme] = blockFactory.getTheme('default')
  let theme = lightTheme
  const [mode, setMode] = useState('light')

  useEffect(() => {
    if (context.store.globals.globals.theme === 'dark') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }, [context.store.globals.globals.theme])

  return <ThemeProvider theme={theme}>
    <DarkModeContext.Provider value={{ mode: mode, setMode: (mode: string) => { setMode(mode) } }}>
    <BlockFactoryContext.Provider value={{ factory: blockFactory, setFactory: () => {} }}>
    <DocsContainer context={context} {...props}>{children}</DocsContainer>
    </BlockFactoryContext.Provider> 
    </DarkModeContext.Provider>
  </ThemeProvider>;
};

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