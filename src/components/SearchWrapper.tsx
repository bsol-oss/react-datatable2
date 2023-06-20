import React, { KeyboardEvent, useContext, useState } from 'react';

import { SearchContext } from './partials/GlobalContext';

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
  const [inputValue, setInputValue] = useState<string>('');
  const placeholder = t('Search') || 'Search';
  const { setSearchKey } = useContext(SearchContext);

  const handleSearch = () => {
    setSearchKey(inputValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box px={{ base: '4', md: '6' }} pt="5">
      <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
        <Text fontSize="lg" fontWeight="medium">
          Members
        </Text>
        <InputGroup maxW="xs">
          <InputLeftElement>
            <Icon
              as={FiSearch}
              color="fg.muted"
              boxSize="5"
              cursor="pointer"
              onClick={handleSearch}
            />
          </InputLeftElement>
          <Input
            placeholder={placeholder}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </InputGroup>
      </Stack>
    </Box>
  );
};

export default SearchWrapper;
