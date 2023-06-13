import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Checkbox,
  HStack,
  Icon,
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
import { IoArrowDown } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { DataType, SubareaType } from '../types';
import { useTable, Column } from 'react-table';

interface Props {
  tabledata: SubareaType | undefined;
}

const BodyWrapper = (props: Props) => {
  const { t } = useTranslation();


  const data = React.useMemo(() => {
    if (props.tabledata) {
      return props.tabledata.results;
    }
    return [];
  }, [props]);

  const columns: Column<DataType>[] = React.useMemo(
    () => [
      {
        Header: String(t('name')),
        accessor: 'name',
        Cell: ({ row }: any) => (
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
        Header: String(t('Status')),
        accessor: 'is_active',
        Cell: ({ row }: any) => (
          <Badge
            size="sm"
            colorScheme={row.original.is_active === 1 ? 'green' : 'red'}
          >
            {row.original.is_active === 1 ? 'Active' : 'In-active'}
          </Badge>
        ),
      },
      {
        Header: String(t('description')),
        accessor: 'description',
        Cell: ({ row }) => (
          <Text color="fg.muted">
            {row.original.description === null ? '' : row.original.description}
          </Text>
        ),
      },
      {
        Header: String(t('Hub ID')),
        accessor: 'hub_id',
        Cell: ({ row }) => <Text color="fg.muted">{row.original.hub_id}</Text>,
      },
      {
        Header: String(t('BU ID')),
        accessor: 'bu_id',
        Cell: ({ row }) => <Text color="fg.muted">{row.original.bu_id}</Text>,
      },
      {
        Header: '',
        accessor: 'actions',
        Cell: ({ row }: any) => (
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
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default BodyWrapper;
