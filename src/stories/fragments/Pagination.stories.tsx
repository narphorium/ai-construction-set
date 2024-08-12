import React, { useState } from 'react';
import { Pagination } from '../../components/fragments/Pagination';

export default {
  component: Pagination,
  title: 'Fragments/Pagination',
  tags: ['autodocs'],
};

const Template = (args: any) => {
  const [page, setPage] = useState<number>(args.page)

  return (
    <Pagination
      {...args}
      page={page}
      setPage={setPage} />
  );
};



export const Default = Template.bind({});
Default.args = {
  page: 1,
  numPages: 10,
  showEnds: true,
};

export const Compact = Template.bind({});
Compact.args = {
  page: 1,
  numPages: 10,
  showEnds: false,
};

