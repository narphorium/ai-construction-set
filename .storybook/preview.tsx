import { DocsContainer } from '@storybook/blocks';
import React from "react";
import { createGlobalStyle } from 'styled-components';
import { DefaultThemeRegistry } from '../src/themes/ThemeRegistry';
import { BlockRegistryProvider, BlockRendererProvider, BlockStoreProvider, DocumentProvider, ThemeProvider } from '../src/context';
import { DefaultBlockRenderer } from '../src/core/DefaultBlockRenderer';
import { createDocument } from '../src/types';
import { createBlockStore } from '../src/core/BlockStore';
import { DefaultBlockRegistry } from '../src/core/BlockRegistry';
import { useGlobals } from 'storybook/internal/preview-api';

const GlobalStyles = createGlobalStyle`
    html,
    .sbdocs-preview .docs-story {
      background-color: ${(props) => props.theme.backgroundColor} !important;
    }
    `

const blockRegistry = new DefaultBlockRegistry()
const themeRegistry = new DefaultThemeRegistry()
const renderer = new DefaultBlockRenderer()

const ExampleContainer = ({ children, context, ...props }: { children: React.ReactNode, context: any }) => {
  const [theme, setTheme] = React.useState('default')
  const [darkMode, setDarkMode] = React.useState(false)
  const blockStore = createBlockStore(undefined, blockRegistry)
  const [document, setDocument] = React.useState(createDocument('storybook-document'))

  return <ThemeProvider theme={theme} darkMode={darkMode} registry={themeRegistry} setTheme={setTheme} setDarkMode={setDarkMode}>
    <BlockRegistryProvider registry={blockRegistry}>
      <BlockStoreProvider store={blockStore}>
        <BlockRendererProvider renderer={renderer}>
          <DocumentProvider document={document}>
            <GlobalStyles />
            <DocsContainer context={context} {...props}>{children}</DocsContainer>
          </DocumentProvider>
        </BlockRendererProvider>
      </BlockStoreProvider>
    </BlockRegistryProvider>
  </ThemeProvider>;
};

const StoryDecorator = (Story: any, context: any) => {
  const [{ theme: themeName }] = useGlobals();
  const [theme, setTheme] = React.useState('default')
  const [darkMode, setDarkMode] = React.useState(themeName === 'dark')
  const blockStore = React.useMemo(() => createBlockStore(), [])
  const [document] = React.useState(() => createDocument('storybook-document'))

  return <ThemeProvider theme={theme} darkMode={darkMode} registry={themeRegistry} setTheme={setTheme} setDarkMode={setDarkMode}>
    <BlockRegistryProvider registry={blockRegistry}>
      <BlockStoreProvider store={blockStore}>
        <BlockRendererProvider renderer={renderer}>
          <DocumentProvider document={document}>
            <GlobalStyles />
            <Story />
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