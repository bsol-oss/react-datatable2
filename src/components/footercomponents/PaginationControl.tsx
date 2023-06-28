import { Select } from '@chakra-ui/react';
import {
  ColumnResizeMode,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useContext, useEffect, useState } from 'react';
import { DataInterface } from '../../const/types';
import {
  FilterContext,
  PaginationContext,
  SelectedRecordsContext,
} from '../globalpartials/GlobalContext';
import { getFilteredData } from '../../Data/Api';

const PaginationControl = ({ columns }: { columns: any }) => {
  const [data, setData] = useState<DataInterface[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setTotalCount } = useContext(PaginationContext);
  const columnResizeMode: ColumnResizeMode = 'onChange';
  const { filterTerm, setFilterTerm } = useContext(FilterContext);
  const [rowSelection, setRowSelection] = useState({});
  const { setSelectedRecords } = useContext(SelectedRecordsContext);
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
    const fetchSubareas = async () => {
      setIsLoading(true);
      const res = await getFilteredData(filterTerm);
      console.log('Results', res);
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
