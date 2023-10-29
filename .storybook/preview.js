/** @type { import('@storybook/react').Preview } */
const preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Platform Theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light Theme' },
          { value: 'dark', title: 'Dark Theme' },
        ],
      },
    },
  },
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
  };
  
  export default preview;