import React, { KeyboardEvent, useContext, useEffect, useState } from 'react';
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
  Input,
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

import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

import { getFilteredData } from '../Data/Api';
import { InputContext } from './functionalcomponents/InputContext';
import ColumnFilter from './globalpartials/ColumnFilter';

const BodyWrapper = ({ columns }: { columns: any }) => {
  const { filterTerm, setFilterTerm } = useContext(FilterContext);
  const { setTableWidth, setTotalCount, setSelectedRecords } =
    useContext(TableStatusContext);

  const [rowSelection, setRowSelection] = React.useState({});
  const columnResizeMode: ColumnResizeMode = 'onChange';
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

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
        className="hahaha"
      >
        <Thead>
          {tableInstance
            .getHeaderGroups()
            .map((headerGroup: HeaderGroup<DataInterface>) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
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
                    {header.column.columnDef.header !== '' && (
                      <ColumnFilter
                        filterType="input"
                        placeholder={
                          index === 0
                            ? 'Name'
                            : `${header.column.columnDef.header}`
                        }
                      />
                    )}
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
