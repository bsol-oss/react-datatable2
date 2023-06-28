import { useContext, useEffect, useState } from 'react';
import { Select } from '@chakra-ui/react';
import columns from '../ProvideByConsumer/Columns';
import {
  ColumnResizeMode,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  FilterContext,
  PaginationContext,
} from '../globalpartials/GlobalContext';
import { getFilteredData } from '../../Data/Api';
import { DataInterface } from '../../const/types';

const PaginationControl = () => {
  const [data, setData] = useState<DataInterface[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setTotalCount } = useContext(PaginationContext);
  const { filterTerm, setFilterTerm } = useContext(FilterContext);
  const [rowSelection, setRowSelection] = useState({});
  const columnResizeMode: ColumnResizeMode = 'onChange';

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
    setFilterTerm({
      ...filterTerm,
      rows: tableInstance.getState().pagination.pageSize,
    });
  }, [tableInstance.getState().pagination.pageSize]);

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
  }, [filterTerm, tableInstance.getState().pagination.pageSize]);

  return (
    <Select
      focusBorderColor="none"
      width="150px"
      value={tableInstance.getState().pagination.pageSize}
      onChange={(e) => {
        tableInstance.setPageSize(Number(e.target.value));
      }}
    >
      {[10, 20, 30, 40, 50].map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          Show {pageSize}
        </option>
      ))}
    </Select>
  );
};

export default PaginationControl;
