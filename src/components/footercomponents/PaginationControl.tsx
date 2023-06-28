import { useContext, useEffect, useState } from 'react';
import { Select } from '@chakra-ui/react';
import columns from '../ProvideByConsumer/Columns';
import {
  ColumnResizeMode,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  FilterContext,
} from '../globalpartials/GlobalContext';
import { DataInterface } from '../../const/types';

const PaginationControl = () => {
  const [data, setData] = useState<DataInterface[]>([]);
  const { filterTerm, setFilterTerm } = useContext(FilterContext);

  const columnResizeMode: ColumnResizeMode = 'onChange';

  const tableInstance = useReactTable({
    data,
    columns,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    setFilterTerm({
      ...filterTerm,
      rows: tableInstance.getState().pagination.pageSize,
    });
  }, [tableInstance.getState().pagination.pageSize]);

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
