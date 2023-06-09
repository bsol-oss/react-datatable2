import React from 'react';

import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

const SearchWrapper = () => {
  return (
    <Box px={{ base: '4', md: '6' }} pt="5">
      <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
        <Text fontSize="lg" fontWeight="medium">
          Members
        </Text>
        <InputGroup maxW="xs">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="fg.muted" boxSize="5" />
          </InputLeftElement>
          <Input placeholder="Search" />
        </InputGroup>
      </Stack>
    </Box>
  );
};

export default SearchWrapper;
