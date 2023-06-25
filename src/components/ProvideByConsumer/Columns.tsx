import React from 'react';

import { Avatar, Badge, Box, HStack, IconButton, Text } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

import IndeterminateCheckbox from '../globalpartials/InterminateCheckbox';
import { DataInterface } from '../../const/types';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<DataInterface>[] = [
  {
    header: ({ table }) => (
      <HStack spacing="3">
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
        <Text>Name</Text>
      </HStack>
    ),
    accessorKey: 'name',
    cell: ({ row }) => (
      <HStack spacing="3">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
        <Avatar name={row.original.name} boxSize="10" />
        <Box>
          <Text fontWeight="medium">{row.original.name}</Text>
        </Box>
      </HStack>
    ),
    size: 200,
  },
  {
    header: 'Status',
    accessorKey: 'is_active',
    cell: ({ row }) => (
      <Badge
        size="sm"
        colorScheme={row.original.is_active === 1 ? 'green' : 'red'}
      >
        {row.original.is_active === 1 ? 'Active' : 'Inactive'}
      </Badge>
    ),
    size: 200,
  },
  {
    header: 'Description',
    accessorKey: 'description',
    cell: ({ row }) => (
      <Text color="fg.muted">
        {row.original.description === null ? '' : row.original.description}
      </Text>
    ),
    size: 200,
  },
  {
    header: 'Hub ID',
    accessorKey: 'hub_id',
    cell: ({ row }) => <Text color="fg.muted">{row.original.hub_id}</Text>,
    size: 200,
  },
  {
    header: 'BU ID',
    accessorKey: 'bu_id',
    cell: ({ row }) => <Text color="fg.muted">{row.original.bu_id}</Text>,
    size: 400,
  },
  {
    header: '',
    accessorKey: 'actions',
    cell: () => (
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
    size: 200,
  },
];

export default columns;
