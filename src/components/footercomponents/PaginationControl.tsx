import { useContext, useEffect, useState } from 'react';
import { Box, Select } from '@chakra-ui/react';
import columns from '../ProvideByConsumer/Columns';
import {
  ColumnResizeMode,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FilterContext } from '../globalpartials/GlobalContext';
import { DataInterface } from '../../const/types';
import { useTranslation } from 'react-i18next';

const PaginationControl = () => {
  const { t } = useTranslation();
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
    <Box display="flex" gap="5px" justifyContent="center" alignItems="center">
      <Box>{t('Results per page')}</Box>
      <Select
        focusBorderColor="none"
        width="75px"
        value={tableInstance.getState().pagination.pageSize}
        onChange={(e) => {
          tableInstance.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default PaginationControl;
