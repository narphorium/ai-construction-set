import { DocsContainer } from "@storybook/blocks";
import React, { useState } from "react";
import "react-material-symbols/rounded";
import {
  BlockRegistryProvider,
  BlockRendererProvider,
  BlockStoreProvider,
  DocumentProvider,
  StorybookThemeProvider,
} from "../src/context";
import {
  createBlockRenderer,
  createBlockStore,
  DefaultBlockRegistry,
} from "../src/core";
import { useStorybookDarkMode } from "../src/hooks";
import "../src/styles/default-theme.css";
import "../src/styles/index.css";
import "../src/styles/storybook.css";
import { createDocument } from "../src/types";

const blockRegistry = new DefaultBlockRegistry();
const blockStore = createBlockStore(undefined, blockRegistry);
const renderer = createBlockRenderer(blockRegistry, blockStore.getState());

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

  const [document, setDocument] = React.useState(
    createDocument("storybook-document"),
  );

  return (
    <StorybookThemeProvider theme={theme} darkMode={darkMode}>
      <BlockRegistryProvider registry={blockRegistry}>
        <BlockStoreProvider store={blockStore}>
          <BlockRendererProvider renderer={renderer}>
            <DocumentProvider document={document}>
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
  const [document] = React.useState(() => createDocument("storybook-document"));

  return (
    <StorybookThemeProvider theme={theme} darkMode={darkMode}>
      <BlockRegistryProvider registry={blockRegistry}>
        <BlockStoreProvider store={blockStore}>
          <BlockRendererProvider renderer={renderer}>
            <DocumentProvider document={document}>
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
