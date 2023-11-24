import React, { useContext } from 'react';
import { BlockFactoryContext } from '../hooks';
import { BlockStream, BlockStreamProps } from './BlockStream';
import { nestedStream, paginatedStream, plainStream } from './storyContent';

export default {
  component: BlockStream,
  title: 'BlockStream',
  tags: ['autodocs'],
};

const Template = (args: BlockStreamProps) => {
  const { factory } = useContext(BlockFactoryContext)

  return (
    <>
      { factory?.build(args.stream) }
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  stream: plainStream(),
};

export const Paginated = Template.bind({});
Paginated.args = {
  stream: paginatedStream(),
};

export const Nested = Template.bind({});
Nested.args = {
  stream: nestedStream(),
};

