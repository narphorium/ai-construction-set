
import { DocsContainer } from '@storybook/blocks';
import React, { ComponentType } from "react";
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { BaseProps } from '../src/components/Base';
import { DefaultBlockFactory } from '../src/components/BlockFactory';
import { withTheme } from '../src/components/withTheme';
import { BlockFactoryContext } from '../src/hooks';
import { DarkModeContext } from "../src/hooks/DarkModeProvider";
import { useStorybookDarkMode } from "../src/hooks/useStorybookDarkMode";

const GlobalStyles = createGlobalStyle`
    html,
    .sbdocs-preview .docs-story {
      background-color: ${(props) => props.theme.backgroundColor} !important;
    }
    `

const blockFactory = new DefaultBlockFactory()

const ExampleContainer = ({ children, context, ...props }) => {
  const [lightTheme, darkTheme] = blockFactory.getTheme('default')
  const [theme, setTheme] = React.useState(lightTheme)
  const [darkMode, setDarkMode] = useStorybookDarkMode(context)

  React.useEffect(() => {
    if (darkMode != null) {
      setTheme(darkMode ? darkTheme : lightTheme)
    }
  }, [darkMode])
  
  return <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
    <ThemeProvider theme={theme}>
    <BlockFactoryContext.Provider value={{ factory: blockFactory, setFactory: () => {} }}>
    <GlobalStyles />
    <DocsContainer context={context} {...props}>{children}</DocsContainer>
    </BlockFactoryContext.Provider>
    </ThemeProvider>
    </DarkModeContext.Provider>;
};

const withBackground = <TProps extends BaseProps>(Component: ComponentType<TProps>) => {
  return (props: TProps) => {
    return (
      <>
        <GlobalStyles />
        <Component {...props} />
      </>
    )
  }
}

const StoryDecorator = (Story, context) => {
  const [lightTheme, darkTheme] = blockFactory.getTheme('default')
  const [darkMode, setDarkMode] = useStorybookDarkMode(context)

  const StoryWithBackground = withBackground(Story)
  const StoryWithTheme = withTheme(StoryWithBackground, { lightTheme, darkTheme })

  return <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
    <BlockFactoryContext.Provider value={{ factory: blockFactory, setFactory: () => {} }}>
    <StoryWithTheme key="theme" />
    </BlockFactoryContext.Provider>
    </DarkModeContext.Provider>;
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
          {value: 'light', icon: 'sun', title: 'Light (default)'}, 
          {value: 'dark', icon: 'moon', title: 'Dark'}
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