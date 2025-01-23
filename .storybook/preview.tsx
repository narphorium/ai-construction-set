import { DocsContainer } from "@storybook/blocks";
import React, { useState } from "react";
import "react-material-symbols/rounded";
import { createGlobalStyle } from "styled-components";
import {
  BlockRegistryProvider,
  BlockRendererProvider,
  BlockStoreProvider,
  DocumentProvider,
} from "../src/context";
import { StorybookThemeProvider } from "../src/context/StorybookThemeProvider";
import { BlockRenderer } from "../src/core";
import { DefaultBlockRegistry } from "../src/core/BlockRegistry";
import { createBlockStore } from "../src/core/BlockStore";
import { DefaultBlockRenderer } from "../src/core/DefaultBlockRenderer";
import { useStorybookDarkMode } from "../src/hooks/useStorybookDarkMode";
import "../src/styles/default-theme.css";
import "../src/styles/index.css";
import { createDocument } from "../src/types";

const GlobalStyles = createGlobalStyle`
    body,
    .sbdocs-preview .docs-story {
      background-color: hsl(var(--background)) !important;
    }
    `;

const blockRegistry = new DefaultBlockRegistry();

const ExampleContainer = ({
  children,
  context,
  ...props
}: {
  children: React.ReactNode;
  context: any;
}) => {
  // const { darkMode, setDarkMode } = useStorybookDarkMode();
  const [darkMode, setDarkMode] = useState(false);
  const theme = "default";
  const blockStore = createBlockStore(undefined, blockRegistry);
  const renderer: BlockRenderer = new DefaultBlockRenderer(
    blockRegistry,
    blockStore,
  );
  const [document, setDocument] = React.useState(
    createDocument("storybook-document"),
  );

  return (
    <StorybookThemeProvider theme={theme} darkMode={darkMode}>
      <BlockRegistryProvider registry={blockRegistry}>
        <BlockStoreProvider store={blockStore}>
          <BlockRendererProvider renderer={renderer}>
            <DocumentProvider document={document}>
              <GlobalStyles />
              <DocsContainer context={context} {...props}>
                {children}
              </DocsContainer>
            </DocumentProvider>
          </BlockRendererProvider>
        </BlockStoreProvider>
      </BlockRegistryProvider>
    </StorybookThemeProvider>
  );
};

const StoryDecorator = (Story: any, context: any) => {
  const { darkMode, setDarkMode } = useStorybookDarkMode();
  const theme = "default";
  const blockStore = React.useMemo(() => createBlockStore(), []);
  const renderer = new DefaultBlockRenderer(blockRegistry, blockStore);
  const [document] = React.useState(() => createDocument("storybook-document"));

  return (
    <StorybookThemeProvider theme={theme} darkMode={darkMode}>
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
    </StorybookThemeProvider>
  );
};

/** @type { import('@storybook/react').Preview } */
const preview = {
  globalTypes: {
    theme: {
      description: "Global setting for dark mode",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        items: [
          { value: "light", icon: "sun", title: "Light (default)" },
          { value: "dark", icon: "moon", title: "Dark" },
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
  decorators: [StoryDecorator],
};

export default preview;
