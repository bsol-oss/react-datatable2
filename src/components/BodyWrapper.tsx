import React, { useContext } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Checkbox,
  Flex,
  HStack,
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
import { useTranslation } from 'react-i18next';
import { DataInterface, RowInterface, SubareaInterface } from '../types';
import { useTable, Column, useSortBy } from 'react-table';
import { SearchContext } from './partials/SearchContext';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

interface Props {
  tabledata: SubareaInterface | undefined;
}

const BodyWrapper = (props: Props) => {
  const { t } = useTranslation();
  const { searchKey } = useContext(SearchContext);

  const data = React.useMemo(() => {
    if (props.tabledata) {
      return props.tabledata.results.filter(
        (item) =>
          item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.hub_id
            ?.toString()
            .toLowerCase()
            .includes(searchKey.toLowerCase()) ||
          item.bu_id?.toLowerCase().includes(searchKey.toLowerCase())
      );
    }
    return [];
  }, [props, searchKey]);

  const columns: Column<DataInterface>[] = React.useMemo(
    () => [
      {
        Header: String(t('name')),
        accessor: 'name',
        sortType: 'basic',
        Cell: ({ row }: { row: RowInterface }) => (
          <HStack spacing="3">
            <Checkbox />
            <Avatar name={row.original.name} boxSize="10" />
            <Box>
              <Text fontWeight="medium">{row.original.name}</Text>
            </Box>
          </HStack>
        ),
        sortDescFirst: true,
      },
      {
        Header: String(t('Status')),
        accessor: 'is_active',
        Cell: ({ row }: { row: RowInterface }) => (
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
        Cell: ({ row }: { row: RowInterface }) => (
          <Text color="fg.muted">
            {row.original.description === null ? '' : row.original.description}
          </Text>
        ),
      },
      {
        Header: String(t('Hub ID')),
        accessor: 'hub_id',
        Cell: ({ row }: { row: RowInterface }) => (
          <Text color="fg.muted">{row.original.hub_id}</Text>
        ),
        sortDescFirst: true,
      },
      {
        Header: String(t('BU ID')),
        accessor: 'bu_id',
        Cell: ({ row }: { row: RowInterface }) => (
          <Text color="fg.muted">{row.original.bu_id}</Text>
        ),
        sortDescFirst: true,
      },
      {
        Header: '',
        accessor: 'actions',
        Cell: () => (
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
        disableSortBy: true,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Table {...getTableProps()} size="md" colorScheme="gray" variant="striped">
      <Thead>
        {headerGroups.map((headerGroup, trIndex) => (
          <Tr {...headerGroup.getHeaderGroupProps()} key={trIndex}>
            {headerGroup.headers.map((column: any, tdIndex: number) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={tdIndex}
              >
                <Flex direction="row">
                  {column.render('Header')}
                  {column.Header !== '' &&
                    (column.isSorted ? (
                      column.isSortedDesc ? (
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
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, trIndex) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()} key={trIndex}>
              {row.cells.map((cell, tdIndex) => (
                <Td {...cell.getCellProps()} key={tdIndex}>
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default BodyWrapper;
