import React, { ReactNode, useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { InputContext } from './InputContext';
import { FilterContext } from '../globalpartials/GlobalContext';

interface Props {
  children: ReactNode;
}

const SearchButton = ({ children }: Props) => {
  const { t } = useTranslation();
  const inputValue = useContext(InputContext);
  const { filterTerm, setFilterTerm } = useContext(FilterContext);

  const handleSearch = () => {
    setFilterTerm({ ...filterTerm, searchTerm: inputValue });
  };
  return (
    <Button colorScheme="gray" ml={2} onClick={handleSearch}>
      {t(`${children}`)}
    </Button>
  );
};

export default SearchButton;
