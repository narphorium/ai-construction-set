
import { DocsContainer } from '@storybook/blocks';
import React, { ComponentType } from "react";
import { createGlobalStyle } from 'styled-components';
import { DefaultThemeRegistry } from '../src/themes/ThemeRegistry';
import { BlockRegistryProvider, BlockRendererProvider, BlockStoreProvider, DocumentProvider, ThemeProvider } from '../src/state/context';
import { useStorybookDarkMode } from '../src/hooks/useStorybookDarkMode';
import { DefaultBlockRenderer } from '../src/components/DefaultBlockRenderer';

const GlobalStyles = createGlobalStyle`
    html,
    .sbdocs-preview .docs-story {
      background-color: ${(props) => props.theme.backgroundColor} !important;
    }
    `

const themeRegistry = new DefaultThemeRegistry()
const renderer = new DefaultBlockRenderer()

const ExampleContainer = ({ children, context, ...props }) => {
  const [theme, setTheme] = React.useState('default')
  const [darkMode, setDarkMode] = useStorybookDarkMode(context)

  return <ThemeProvider theme={theme} darkMode={darkMode} registry={themeRegistry} setTheme={setTheme} setDarkMode={setDarkMode}>
    <BlockRegistryProvider>
      <BlockStoreProvider>
        <BlockRendererProvider renderer={renderer}>
          <DocumentProvider>
            <GlobalStyles />
            <DocsContainer context={context} {...props}>{children}</DocsContainer>
          </DocumentProvider>
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
        <BlockRendererProvider renderer={renderer}>
          <DocumentProvider>
            <StoryWithBackground />
          </DocumentProvider>
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