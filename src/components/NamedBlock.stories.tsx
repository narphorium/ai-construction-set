import React from 'react';
import { NamedBlock, NamedBlockProps } from './NamedBlock';
import { nestedNamedContent, plainNamedContent } from './storyContent';

export default {
  component: NamedBlock,
  title: 'NamedBlock',
  tags: ['autodocs'],
};

const Template = (args: NamedBlockProps) => {
  const [collapsed, setCollapsed] = React.useState(false); // FIXME: Use args.collapsed

  const toggleCollapsed = React.useCallback((c: boolean) => {
    setCollapsed(!c)
  }, [collapsed])

  if (args.variant !== undefined) {
    args.content.variant = args.variant;
  }

  return (
    <>
      <NamedBlock content={args.content} collapsed={collapsed} onToggle={toggleCollapsed} variant={args.variant} key={args.key} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  content: plainNamedContent('Default'),
};

export const Selected = Template.bind({});
Selected.args = {
  content: plainNamedContent('Selected'),
  selected: true,
};

export const Nested = Template.bind({});
Nested.args = {
  content: nestedNamedContent('Nested'),
};

export const Blue = Template.bind({});
Blue.args = {
  content: nestedNamedContent('Nested'),
  variant: 'blue',
};
