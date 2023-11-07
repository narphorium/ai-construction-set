import React from 'react';
import { BlockStream, BlockStreamProps } from './BlockStream';
import { paginatedStream, plainStream } from './storyContent';

export default {
  component: BlockStream,
  title: 'BlockStream',
  tags: ['autodocs'],
};

const Template = (args: BlockStreamProps) => {
  const [page, setPage] = React.useState(1);

  return (
    <>
      <BlockStream stream={args.stream} page={page} setPage={setPage} variant={args.variant} key={args.key} />
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

