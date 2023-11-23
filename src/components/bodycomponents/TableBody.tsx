import React, { useContext } from 'react';
import { Tbody, Box, Td, Tr, Spinner } from '@chakra-ui/react';
import { flexRender, Table } from '@tanstack/react-table';

import { TableStatusContext } from '../globalpartials/GlobalContext';
import { DataInterface } from '../../const/types';

const TableBody = ({
  tableInstance,
  size = '400px',
}: {
  tableInstance?: Table<DataInterface>;
  size: string;
}) => {
  const { isLoading } = useContext(TableStatusContext);
  return (
    <Tbody height={size}>
      {tableInstance ? (
        isLoading ? (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            );
          })
        )
      ) : (
        ''
      )}
    </Tbody>
  );
};

export default TableBody;
