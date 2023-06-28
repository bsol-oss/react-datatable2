import React, { ReactNode, useContext, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { DataInterface } from '../const/types';
import {
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  HeaderGroup,
  SortingState,
} from '@tanstack/react-table';
import {
  FilterContext,
  TableStatusContext,
} from './globalpartials/GlobalContext';
import { UpDownIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

import { getFilteredData } from '../Data/Api';
import ColumnSearch from './bodycomponents/ColumnSearch';

const BodyWrapper = ({
  columns,
  children,
}: {
  columns: any;
  children: ReactNode;
}) => {
  const { filterTerm, setFilterTerm } = useContext(FilterContext);
  const {
    setTableWidth,
    setTotalCount,
    setSelectedRecords,
    isLoading,
    setIsLoading,
  } = useContext(TableStatusContext);
  const isChildComponentPresent = React.Children.toArray(children).some(
    (child) => React.isValidElement(child)
  );

  const [rowSelection, setRowSelection] = React.useState({});
  const columnResizeMode: ColumnResizeMode = 'onChange';
  const [sorting, setSorting] = useState<SortingState>([]);

  const [data, setData] = useState<DataInterface[]>([]);

  useEffect(() => {
    const fields: string[] = [];
    const sort: string[] = [];
    sorting.map((column) => {
      fields.push(column.id);
      sort.push(column.desc ? 'desc' : 'asc');
    });
    setFilterTerm({
      ...filterTerm,
      field: fields.join(','),
      sort: sort.join(','),
    });
  }, [sorting]);

  useEffect(() => {
    const fetchSubareas = async () => {
      setIsLoading(true);
      const res = await getFilteredData(filterTerm);
      setIsLoading(false);
      if (res) {
        setTotalCount(res.filterCount);
        setData(res.results);
      }
    };
    fetchSubareas();
  }, [filterTerm]);

  useEffect(() => {
    setSelectedRecords(Object.keys(rowSelection).length);
  }, [rowSelection]);

  const tableInstance = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableMultiSort: true,
  });

  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (tableInstance.getCenterTotalSize() <= windowWidth - 64) {
      setTableWidth(tableInstance.getCenterTotalSize());
    } else {
      setTableWidth(window.innerWidth - 94);
    }
  }, [tableInstance.getCenterTotalSize(), window.innerWidth]);

  return (
    <Box marginTop="10px" overflow="auto" className="TableContainer">
      <Table
        {...{
          style: {
            width: tableInstance.getCenterTotalSize(),
          },
        }}
        size="md"
        colorScheme="gray"
        variant="striped"
      >
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
                    position="relative"
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Flex flexDirection="column" gap={4}>
                      <Box>
                        <Flex
                          direction="row"
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: !isLoading
                              ? header.column.getToggleSortingHandler()
                              : undefined,
                          }}
                          _hover={{ cursor: 'pointer' }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.columnDef.header !== '' &&
                            (!isLoading ? (
                              (header.column.getIsSorted() as string) ? (
                                (header.column.getIsSorted() as string) ===
                                'asc' ? (
                                  <ChevronDownIcon ml={1} w={5} h={5} />
                                ) : (
                                  <ChevronUpIcon ml={1} w={5} h={5} />
                                )
                              ) : (
                                <Box ml={1} alignItems="center" display="flex">
                                  <UpDownIcon w={3} h={3} />
                                </Box>
                              )
                            ) : (
                              <Box ml={1} alignItems="center" display="flex">
                                <Spinner size="xs" />
                              </Box>
                            ))}
                        </Flex>
                        <Box
                          {...{
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            background: ` ${
                              header.column.getIsResizing()
                                ? 'blue;'
                                : 'rgba(0, 0, 0, 0.5)'
                            }`,
                            opacity: ` ${header.column.getIsResizing() && '1'}`,
                          }}
                          position="absolute"
                          right={0}
                          top={0}
                          height="100%"
                          width="5px"
                          cursor="col-resize"
                          _hover={{ opacity: 1 }}
                          opacity="0"
                        />
                      </Box>
                      {isChildComponentPresent &&
                        header.column.columnDef.header !== '' &&
                        header.column.columnDef.id && (
                          <ColumnSearch id={header.column.columnDef.id} />
                        )}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
        </Thead>
        <Tbody>
          {isLoading ? (
            <Tr>
              <Td colSpan={tableInstance.getHeaderGroups()[0].headers.length}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Spinner size="xl" color="gray.500" />
                </Box>
              </Td>
            </Tr>
          ) : (
            tableInstance.getRowModel().rows.map((row) => {
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default BodyWrapper;
