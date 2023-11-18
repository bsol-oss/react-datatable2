import React, { ReactNode } from 'react';
import { Avatar, Badge, Box, HStack, IconButton, Text } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import DataTable from './components/DataTable';
import Table from './components/Table';
import Header from './components/Header';
import TableTitle from './components/functionalcomponents/TableTitle';
import GlobalSearch from './components/functionalcomponents/GlobalSearch';
import Footer from './components/Footer';
import Pagination from './components/footercomponents/Pagination';
import SelectedNumber from './components/footercomponents/SelectedNumber';
import PageSizeControl from './components/footercomponents/PageSizeControl';
import TableHeader from './components/bodycomponents/TableHeader';
import TableBody from './components/bodycomponents/TableBody';

import IndeterminateCheckbox from './components/globalpartials/InterminateCheckbox';
import ColumnSearch from './components/bodycomponents/ColumnSearch';
import DropdownFilter from './components/bodycomponents/DropdownFilter';

const App = ({
  size = '400px',
  tableTitle = 'Member',
  columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
      size: 30,
    },
    {
      header: 'Name',
      accessorKey: 'name',
      id: 'name',
      cell: ({ row }) => (
        <HStack spacing="3">
          <Avatar name={row.original.name} boxSize="10" />
          <Box>
            <Text fontWeight="medium">{row.original.name}</Text>
          </Box>
        </HStack>
      ),
      size: 200,
      Filter: () => <ColumnSearch id={'name'} />,
    },
    {
      header: 'Status',
      accessorKey: 'is_active',
      id: 'is_active',
      cell: ({ row }) => (
        <Badge
          size="sm"
          colorScheme={row.original.is_active === 1 ? 'green' : 'red'}
        >
          {row.original.is_active === 1 ? 'Active' : 'Inactive'}
        </Badge>
      ),
      size: 200,
      Filter: () => (
        <DropdownFilter
          id="is_active"
          label="Is Active"
          options={[
            { value: '', label: 'All' },
            { value: 1, label: 'Active' },
            { value: 0, label: 'Inactive' },
          ]}
        />
      ),
    },
    {
      header: 'Description',
      accessorKey: 'description',
      id: 'description',
      cell: ({ row }) => (
        <Text color="fg.muted">
          {row.original.description === null ? '' : row.original.description}
        </Text>
      ),
      Filter: () => <ColumnSearch id={'description'} />,
      size: 200,
    },
    {
      header: 'Hub ID',
      accessorKey: 'hub_id',
      id: 'hub_id',
      cell: ({ row }) => <Text color="fg.muted">{row.original.hub_id}</Text>,
      size: 200,
      Filter: () => (
        <DropdownFilter
          id="hub_id"
          label="HUB ID"
          options={[
            { value: '', label: 'All' },
            { value: 'tester01', label: 'tester01' },
            { value: 'default', label: 'default' },
            { value: 'test01', label: 'test01' },
          ]}
        />
      ),
    },
    {
      header: 'BU ID',
      accessorKey: 'bu_id',
      id: 'bu_id',
      cell: ({ row }) => <Text color="fg.muted">{row.original.bu_id}</Text>,
      size: 400,
      Filter: () => <ColumnSearch id={'bu_id'} />,
    },
    {
      header: '',
      accessorKey: 'actions',
      id: 'actions',
      cell: () => (
        <HStack spacing="1">
          <IconButton
            icon={<FiTrash2 fontSize="1.25rem" />}
            variant="tertiary"
            aria-label="Delete Column"
          />
          <IconButton
            icon={<FiEdit2 fontSize="1.25rem" />}
            variant="tertiary"
            aria-label="Edit Column"
          />
        </HStack>
      ),
      size: 200,
    },
  ],
  globalSearchBarComponent = null,
  paginationComponent = null,
  apiUrl = 'http://localhost:8081/api/g/subaream/all',
  pageSizes = [5, 10, 15, 20, 25, 30],
  axios = null,
}: {
  size: string;
  tableTitle: string;
  columns: Array<any>;
  globalSearchBarComponent: ReactNode;
  paginationComponent: ReactNode;
  apiUrl: string;
  pageSizes: Array<number>;
  axios: any;
}) => {
  return (
    <Box>
      <DataTable>
        <Header>
          {tableTitle ? <TableTitle>{tableTitle}</TableTitle> : null}
          {globalSearchBarComponent ? (
            globalSearchBarComponent
          ) : (
            <GlobalSearch />
          )}
        </Header>
        <Table columns={columns} apiUrl={apiUrl} axios={axios}>
          <TableHeader />
          <TableBody size={size} />
        </Table>
        {paginationComponent ? (
          paginationComponent
        ) : (
          <Footer>
            <Pagination>
              <SelectedNumber />
              <PageSizeControl pages={pageSizes} />
            </Pagination>
          </Footer>
        )}
      </DataTable>
    </Box>
  );
};

export default App;
