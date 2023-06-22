import React, { useContext, useEffect, useState } from 'react';
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
  PaginationContext,
  SearchContext,
  SelectedRecordsContext,
} from './globalpartials/GlobalContext';
import styled from '@emotion/styled';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

import { getAllSubarea, getSubareaBySearechKey } from '../Data/Api';

const Wrapper = styled(Box)`
  * {
    box-sizing: border-box;
  }
  html {
    font-family: sans-serif;
    font-size: 14px;
  }
  table,
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
    width: ;
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

const BodyWrapper = ({ columns }: { columns: any }) => {
  const { searchKey } = useContext(SearchContext);
  const { setSelectedRecords } = useContext(SelectedRecordsContext);
  const { setTotalCount } = useContext(PaginationContext);

  const [rowSelection, setRowSelection] = React.useState({});
  const columnResizeMode: ColumnResizeMode = 'onChange';
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [data, setData] = useState<DataInterface[]>([]);

  useEffect(() => {
    const fetchSubareas = async (searchKey: string) => {
      setIsLoading(true);
      if (searchKey === '') {
        const res = await getAllSubarea();
        setIsLoading(false);
        setData(res.results);
      } else {
        const res = await getSubareaBySearechKey(searchKey);
        setIsLoading(false);
        if (res) {
          setData(
            res.results.filter(
              (item) =>
                item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
                item.description
                  ?.toLowerCase()
                  .includes(searchKey.toLowerCase()) ||
                item.hub_id
                  ?.toString()
                  .toLowerCase()
                  .includes(searchKey.toLowerCase()) ||
                item.bu_id?.toLowerCase().includes(searchKey.toLowerCase())
            )
          );
        }
      }
    };
    fetchSubareas(searchKey);
  }, [searchKey]);

  useEffect(() => {
    setTotalCount(data.length);
  }, [data]);

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

  return (
    <Wrapper marginTop="10px" overflow="auto">
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
    </Wrapper>
  );
};

export default BodyWrapper;
