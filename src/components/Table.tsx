import React, { useContext, useEffect, useState } from 'react';
import { Box, Table as TableControl } from '@chakra-ui/react';
import {
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';

import {
  FilterContext,
  TableStatusContext,
} from './globalpartials/GlobalContext';
import { ColumnType, DataInterface } from '../const/types';
import { getFilteredData } from '../Data/Api';

const Table = ({
  columns,
  apiUrl,
  extraSortFilters,
  extraFieldFilters,
  axios,
  children,
}: {
  columns: ColumnType<DataInterface>[];
  apiUrl: string;
  extraSortFilters: Array<any>;
  extraFieldFilters: Array<any>;
  axios: any;
  children: React.ReactElement | React.ReactElement[];
}) => {
  const { filterTerm, setFilterTerm } = useContext(FilterContext);
  const {
    setTableWidth,
    setTotalCount,
    selectedRows,
    setSelectedRows,
    setIsLoading,
  } = useContext(TableStatusContext);

  const saveSeletedRows = (
    obj: Record<string, boolean>
  ): Record<string, boolean> => {
    const newObj: Record<string, boolean> = {};
    if (filterTerm.offset !== 0) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const newKey =
            parseInt(key) + filterTerm.rows * (filterTerm.offset - 1);
          newObj[newKey] = obj[key];
        }
      }
      return newObj;
    }
    return obj;
  };

  const readSelectedRows = (
    obj: Record<string, boolean>
  ): Record<string, boolean> => {
    const newObj: Record<string, boolean> = {};
    if (filterTerm.offset !== 0) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const newKey =
            parseInt(key) - filterTerm.rows * (filterTerm.offset - 1);
          newObj[newKey] = obj[key];
        }
      }
      return newObj;
    }
    return obj;
  };

  const [rowSelection, setRowSelection] = React.useState(
    readSelectedRows(selectedRows)
  );

  useEffect(() => {
    setSelectedRows(saveSeletedRows(rowSelection));
  }, [rowSelection]);

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
      const res = await getFilteredData(
        filterTerm,
        apiUrl,
        extraSortFilters,
        extraFieldFilters,
        axios
      );
      setIsLoading(false);
      if (res) {
        setTotalCount(res.filterCount);
        setData(res.results);
      }
    };
    fetchSubareas();
    setRowSelection(readSelectedRows(selectedRows));
  }, [filterTerm]);

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
      <TableControl
        {...{
          style: {
            width: tableInstance.getCenterTotalSize(),
          },
        }}
        size="md"
        colorScheme="gray"
        variant="striped"
      >
        {Array.isArray(children)
          ? React.Children.map(children, (child: React.ReactElement) => {
              return React.cloneElement(child, { tableInstance });
            })
          : React.cloneElement(children, { tableInstance })}
      </TableControl>
    </Box>
  );
};

export default Table;
