import React, { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import type { Meta } from '@storybook/react';

import DefaultDataTable from './DefaultDataTable';
import DataTable from '../components/DataTable';
import BodyWrapper from '../components/BodyWrapper';
import FunctionalWrapper from '../components/FunctionalWrapper';
import TableTitle from '../components/functionalcomponents/TableTitle';
import GlobalSearch from '../components/functionalcomponents/GlobalSearch';
import FooterWrapper from '../components/FooterWrapper';
import PaginationWrapper from '../components/footercomponents/PaginationWrapper';
import SelectedNumber from '../components/footercomponents/SelectedNumber';
import columns from '../components/ProvideByConsumer/Columns';
import PageSizeControl from '../components/footercomponents/PageSizeControl';
import theme from '../theme';
import TableHeader from '../components/bodycomponents/TableHeader';
import TableBody from '../components/bodycomponents/TableBody';

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

export const DefaultTable = () => (
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <DataTable>
      <FunctionalWrapper>
        <TableTitle>Default DataTable</TableTitle>
        <GlobalSearch />
      </FunctionalWrapper>
      <BodyWrapper columns={columns}>
        <TableHeader />
        <TableBody />
      </BodyWrapper>
      <FooterWrapper>
        <PaginationWrapper>
          <SelectedNumber />
          <PageSizeControl pages={[5, 10, 25, 50, 100]} />
        </PaginationWrapper>
      </FooterWrapper>
    </DataTable>
  </ChakraProvider>
);

export const WithoutGlobalSearch = () => (
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <DataTable>
      <FunctionalWrapper>
        <TableTitle>DataTable without Global search</TableTitle>
      </FunctionalWrapper>
      <BodyWrapper columns={columns}>
        <TableHeader />
        <TableBody />
      </BodyWrapper>
      <FooterWrapper>
        <PaginationWrapper>
          <SelectedNumber />
          <PageSizeControl pages={[5, 10, 25, 50, 100]} />
        </PaginationWrapper>
      </FooterWrapper>
    </DataTable>
  </ChakraProvider>
);

export const WithoutPageSelection = () => (
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <DataTable>
      <FunctionalWrapper>
        <TableTitle>DataTable without page selection</TableTitle>
      </FunctionalWrapper>
      <BodyWrapper columns={columns}>
        <TableHeader />
        <TableBody />
      </BodyWrapper>
      <FooterWrapper>
        <PaginationWrapper>
          <SelectedNumber />
        </PaginationWrapper>
      </FooterWrapper>
    </DataTable>
  </ChakraProvider>
);

export const WithoutTableHeader = () => (
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <DataTable>
      <FunctionalWrapper>
        <TableTitle>DataTable without tableheader</TableTitle>
        <GlobalSearch />
      </FunctionalWrapper>
      <BodyWrapper columns={columns}>
        <TableBody />
      </BodyWrapper>
      <FooterWrapper>
        <PaginationWrapper>
          <SelectedNumber />
          <PageSizeControl pages={[5, 10, 25, 50, 100]} />
        </PaginationWrapper>
      </FooterWrapper>
    </DataTable>
  </ChakraProvider>
);

export const WithoutFooter = () => (
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <DataTable>
      <FunctionalWrapper>
        <TableTitle>DataTable without footer</TableTitle>
        <GlobalSearch />
      </FunctionalWrapper>
      <BodyWrapper columns={columns}>
        <TableHeader />
        <TableBody />
      </BodyWrapper>
    </DataTable>
  </ChakraProvider>
);
