import React, { KeyboardEvent, ReactNode, useContext, useState } from 'react';
import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { SearchContext } from '../globalpartials/GlobalContext';
import { InputContext } from './InputContext';

interface Props {
  children: ReactNode;
}

const GlobalSearch = ({ children }: Props) => {
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
    <InputContext.Provider value={inputValue}>
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
        {children}
      </InputGroup>
    </InputContext.Provider>
  );
};

export default GlobalSearch;
