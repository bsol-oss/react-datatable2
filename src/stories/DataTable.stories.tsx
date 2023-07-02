import React from 'react';
import type { Meta } from '@storybook/react';
import DefaultDataTable from './DefaultDataTable';
import DataTableWithoutGlobalSearch from './DataTableWithoutGlobalSearch';
import DataTableWithoutPageSelection from './DataTableWithoutPageSelection';

// import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DefaultDataTable> = {
  title: 'Example/DataTable',
  component: DefaultDataTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;

export const DefaultTable = () => {
  return <DefaultDataTable />;
};

export const WithoutGlobalSearch = () => {
  return <DataTableWithoutGlobalSearch />;
};

export const WithoutPageSelection = () => {
  return <DataTableWithoutPageSelection />;
};
