import React, { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { DataInterface, RowInterface, SubareaInterface } from '../types';
import {
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getSortedRowModel,
  HeaderGroup,
  SortingState,
} from '@tanstack/react-table';

import { PaginationContext, SearchContext } from './partials/GlobalContext';
import styled from '@emotion/styled';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

interface Props {
  tabledata: SubareaInterface | undefined;
}

const Wrapper = styled(Box)`
  * {
    box-sizing: border-box;
  }
  html {
    font-family: sans-serif;
    font-size: 14px;
  }
  table {
    border: 1px solid lightgray;
  }
  .divTable {
    border: 1px solid lightgray;
    width: fit-content;
  }
  .tr {
    display: flex;
  }
  tr,
  .tr {
    width: fit-content;
    height: 30px;
  }
  th,
  .th {
    padding: 2px 4px;
    position: relative;
    font-weight: bold;
    text-align: center;
    height: 30px;
  }
  td,
  .td {
    height: 30px;
  }
  .resizer {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background: rgba(0, 0, 0, 0.5);
    cursor: col-resize;
    user-select: none;
    touch-action: none;
  }
  .resizer.isResizing {
    background: blue;
    opacity: 1;
  }
  @media (hover: hover) {
    .resizer {
      opacity: 0;
    }
    *:hover > .resizer {
      opacity: 1;
    }
  }
`;

const BodyWrapper = (props: Props) => {
  const { t } = useTranslation();
  const { searchKey } = useContext(SearchContext);
  const { setTotalCount } = useContext(PaginationContext);
  const columnResizeMode: ColumnResizeMode = 'onChange';
  const [sorting, setSorting] = useState<SortingState>([]);

  const data = React.useMemo(() => {
    if (props.tabledata) {
      return props.tabledata.results.filter(
        (item) =>
          item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.hub_id
            ?.toString()
            .toLowerCase()
            .includes(searchKey.toLowerCase()) ||
          item.bu_id?.toLowerCase().includes(searchKey.toLowerCase())
      );
    }
    return [];
  }, [props, searchKey]);

  useEffect(() => {
    setTotalCount(data.length);
  }, [data]);

  const defaultColumns: ColumnDef<DataInterface>[] = [
    {
      header: String(t('name')),
      accessorKey: 'name',
      cell: ({ row }: { row: RowInterface }) => (
        <HStack spacing="3">
          <Checkbox />
          <Avatar name={row.original.name} boxSize="10" />
          <Box>
            <Text fontWeight="medium">{row.original.name}</Text>
          </Box>
        </HStack>
      ),
    },
    {
      header: String(t('Status')),
      accessorKey: 'is_active',
      cell: ({ row }: { row: RowInterface }) => (
        <Badge
          size="sm"
          colorScheme={row.original.is_active === 1 ? 'green' : 'red'}
        >
          {row.original.is_active === 1 ? 'Active' : 'In-active'}
        </Badge>
      ),
    },
    {
      header: String(t('description')),
      accessorKey: 'description',
      cell: ({ row }: { row: RowInterface }) => (
        <Text color="fg.muted">
          {row.original.description === null ? '' : row.original.description}
        </Text>
      ),
    },
    {
      header: String(t('Hub ID')),
      accessorKey: 'hub_id',
      cell: ({ row }: { row: RowInterface }) => (
        <Text color="fg.muted">{row.original.hub_id}</Text>
      ),
    },
    {
      header: String(t('BU ID')),
      accessorKey: 'bu_id',
      cell: ({ row }: { row: RowInterface }) => (
        <Text color="fg.muted">{row.original.bu_id}</Text>
      ),
    },
    {
      header: '',
      accessorKey: 'actions',
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
    },
  ];

  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ]);

  const tableInstance = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableMultiSort: true,
  });

  return (
    <Wrapper marginTop="10px">
      <Table size="md" className="w-full" colorScheme="gray" variant="striped">
        <Thead>
          {tableInstance
            .getHeaderGroups()
            .map((headerGroup: HeaderGroup<DataInterface>) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    {...{
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Flex
                      direction="row"
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                      _hover={{ cursor: 'pointer' }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.columnDef.header !== '' &&
                        ((header.column.getIsSorted() as string) ? (
                          (header.column.getIsSorted() as string) === 'asc' ? (
                            <Box ml={1} alignItems="center" display="flex">
                              <FaSortDown />
                            </Box>
                          ) : (
                            <Box ml={1} alignItems="center" display="flex">
                              <FaSortUp />
                            </Box>
                          )
                        ) : (
                          <Box ml={1} alignItems="center" display="flex">
                            <FaSort />
                          </Box>
                        ))}
                    </Flex>
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                          header.column.getIsResizing() ? 'isResizing' : ''
                        }`,
                      }}
                    />
                  </Th>
                ))}
              </Tr>
            ))}
        </Thead>
        <Tbody>
          {tableInstance.getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td
                    key={cell.id}
                    {...{
                      style: {
                        width: cell.column.getSize(),
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Wrapper>
  );
};

export default BodyWrapper;
