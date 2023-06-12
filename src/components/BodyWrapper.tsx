import { useEffect, useState } from 'react';
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
import { ColumnType, SubareaType } from '../types';

interface Props {
  tabledata: SubareaType | undefined;
}

const BodyWrapper = (props: Props) => {
  const { t } = useTranslation();
  const [data, setData] = useState<ColumnType[]>([]);

  useEffect(() => {
    if (props.tabledata) {
      setData(props.tabledata.results);
    }
  }, [props]);

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
          <Th> {t('description')} </Th>
          <Th> {t('Hub ID')} </Th>
          <Th> {t('BU ID')} </Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.length > 0 ? (
          data.map((column) => (
            <Tr key={column.id}>
              <Td>
                <HStack spacing="3">
                  <Checkbox />
                  <Avatar name={column.name} boxSize="10" />
                  <Box>
                    <Text fontWeight="medium">{column.name}</Text>
                  </Box>
                </HStack>
              </Td>
              <Td>
                <Badge
                  size="sm"
                  colorScheme={column.is_active === 1 ? 'green' : 'red'}
                >
                  {column.is_active === 1 ? 'Active' : 'In-active'}
                </Badge>
              </Td>
              <Td>
                <Text color="fg.muted">
                  {column.description === null ? '' : column.description}
                </Text>
              </Td>
              <Td>
                <Text color="fg.muted">{column.hub_id}</Text>
              </Td>
              <Td>
                <Text color="fg.muted">{column.bu_id}</Text>
              </Td>
              <Td>
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
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td textAlign="center" colSpan={12}>
              <h2>No Data...</h2>
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default BodyWrapper;
