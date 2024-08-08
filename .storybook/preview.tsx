
import { DocsContainer } from '@storybook/blocks';
import React, { ComponentType } from "react";
import { createGlobalStyle } from 'styled-components';
import { DefaultThemeRegistry } from '../src/state/ThemeRegistry';
import { BlockRegistryProvider, BlockRendererProvider, BlockStoreProvider, ThemeProvider, useStorybookDarkMode } from '../src/state/hooks';

const GlobalStyles = createGlobalStyle`
    html,
    .sbdocs-preview .docs-story {
      background-color: ${(props) => props.theme.backgroundColor} !important;
    }
    `

const themeRegistry = new DefaultThemeRegistry()

const ExampleContainer = ({ children, context, ...props }) => {
  const [lightTheme, darkTheme] = themeRegistry.getTheme('default')
  const [theme, setTheme] = React.useState(lightTheme)
  const [darkMode, setDarkMode] = useStorybookDarkMode(context)

  React.useEffect(() => {
    if (darkMode != null) {
      setTheme(darkMode ? darkTheme : lightTheme)
    }
  }, [darkMode])

  return <ThemeProvider theme={theme} darkMode={darkMode} registry={themeRegistry} setTheme={setTheme} setDarkMode={setDarkMode}>
    <BlockRegistryProvider>
      <BlockStoreProvider>
        <BlockRendererProvider>
          <GlobalStyles />
          <DocsContainer context={context} {...props}>{children}</DocsContainer>
        </BlockRendererProvider>
      </BlockStoreProvider>
    </BlockRegistryProvider>
  </ThemeProvider>;
};

const withBackground = (Component: ComponentType<any>) => {
  return (props: any) => {
    return (
      <>
        <GlobalStyles />
        <Component {...props} />
      </>
    )
  }
}

const StoryDecorator = (Story, context) => {
  const [theme, setTheme] = React.useState('default')
  const [darkMode, setDarkMode] = useStorybookDarkMode(context)

  const StoryWithBackground = withBackground(Story)
  return <ThemeProvider theme={theme} darkMode={darkMode} registry={themeRegistry} setTheme={setTheme} setDarkMode={setDarkMode}>
    <BlockRegistryProvider>
      <BlockStoreProvider>
        <BlockRendererProvider>
          <StoryWithBackground />
        </BlockRendererProvider>
      </BlockStoreProvider>
    </BlockRegistryProvider>
  </ThemeProvider>;
};

/** @type { import('@storybook/react').Preview } */
const preview = {
  globalTypes: {
    theme: {
      description: 'Global setting for dark mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        items: [
          { value: 'light', icon: 'sun', title: 'Light (default)' },
          { value: 'dark', icon: 'moon', title: 'Dark' }
        ],
        dynamicTitle: true,
      },
    },
  },
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
    StoryDecorator
  ],
};

export default preview;