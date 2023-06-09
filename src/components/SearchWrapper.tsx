import React, { useState } from 'react';

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
import { useTranslation } from 'react-i18next';

const SearchWrapper = () => {
  const { t } = useTranslation();
  const [searchKey, setSearchKey] = useState<string>('');
  const placeholder = t('Search') || 'Search';
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
          <Input
            placeholder={placeholder}
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </InputGroup>
      </Stack>
    </Box>
  );
};

export default SearchWrapper;
