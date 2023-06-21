import React, { ReactNode, useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { InputContext } from './InputContext';
import { SearchContext } from '../globalpartials/GlobalContext';

interface Props {
  children: ReactNode;
}

const SearchButton = ({ children }: Props) => {
  const { t } = useTranslation();
  const inputValue = useContext(InputContext);
  const { setSearchKey } = useContext(SearchContext);

  const handleSearch = () => {
    setSearchKey(inputValue);
  };
  return (
    <Button colorScheme="gray" ml={2} onClick={handleSearch}>
      {t(`${children}`)}
    </Button>
  );
};

export default SearchButton;
