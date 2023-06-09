import React from 'react';
import {
  Avatar,
  Badge,
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Table,
  TableProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { IoArrowDown } from 'react-icons/io5';
import Rating from './Partials/Rating';
import members from '../data';
import { useTranslation } from 'react-i18next';

const BodyWrapper = (props: TableProps) => {
  const { t } = useTranslation();
  return (
    <Table {...props}>
      <Thead>
        <Tr>
          <Th>
            <HStack spacing="3">
              <Checkbox />
              <HStack spacing="1">
                <Text> {t('Name')} </Text>
                <Icon as={IoArrowDown} color="fg.muted" boxSize="4" />
              </HStack>
            </HStack>
          </Th>
          <Th> {t('Status')} </Th>
          <Th> {t('Email')} </Th>
          <Th> {t('Role')} </Th>
          <Th> {t('Rating')} </Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {members.map((member) => (
          <Tr key={member.id}>
            <Td>
              <HStack spacing="3">
                <Checkbox />
                <Avatar
                  name={member.name}
                  src={member.avatarUrl}
                  boxSize="10"
                />
                <Box>
                  <Text fontWeight="medium">{member.name}</Text>
                  <Text color="fg.muted">{member.handle}</Text>
                </Box>
              </HStack>
            </Td>
            <Td>
              <Badge
                size="sm"
                colorScheme={member.status === 'active' ? 'green' : 'red'}
              >
                {member.status}
              </Badge>
            </Td>
            <Td>
              <Text color="fg.muted">{member.email}</Text>
            </Td>
            <Td>
              <Text color="fg.muted">{member.role}</Text>
            </Td>
            <Td>
              <div color="fg.muted">
                <Rating defaultValue={member.rating} size="xl" />
              </div>
            </Td>
            <Td>
              <HStack spacing="1">
                <IconButton
                  icon={<FiTrash2 fontSize="1.25rem" />}
                  variant="tertiary"
                  aria-label="Delete member"
                />
                <IconButton
                  icon={<FiEdit2 fontSize="1.25rem" />}
                  variant="tertiary"
                  aria-label="Edit member"
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default BodyWrapper;
