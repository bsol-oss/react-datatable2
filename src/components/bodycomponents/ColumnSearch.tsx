import React, { useContext, useState } from 'react';
import {
  Spinner,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';

import {
  FilterContext,
  TableStatusContext,
} from '../globalpartials/GlobalContext';

const ColumnSearch = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const { filterTerm, setFilterTerm } = useContext(FilterContext);
  const { isLoading } = useContext(TableStatusContext);

  const placeholder = t('Search') || 'Search';

  const [inputValues, setInputValues] = useState<string>('');

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      if (inputValues === '') {
        const getObj = filterTerm.individualSearchTerm;
        delete getObj[id];
        setFilterTerm({
          ...filterTerm,
          individualSearchTerm: getObj,
        });
      } else {
        setFilterTerm({
          ...filterTerm,
          individualSearchTerm: {
            ...filterTerm.individualSearchTerm,
            [id]: inputValues,
          },
        });
      }
    }
  };

  return (
    <InputGroup maxW="sm">
      <InputLeftElement>
        {!isLoading ? (
          <Icon
            as={FiSearch}
            color="fg.muted"
            boxSize="5"
            cursor="pointer"
            onClick={() => {
              if (inputValues === '') {
                const getObj = filterTerm.individualSearchTerm;
                delete getObj[id];
                setFilterTerm({
                  ...filterTerm,
                  individualSearchTerm: getObj,
                });
              } else {
                setFilterTerm({
                  ...filterTerm,
                  individualSearchTerm: {
                    ...filterTerm.individualSearchTerm,
                    [id]: inputValues,
                  },
                });
              }
            }}
          />
        ) : (
          <Spinner size="sm" />
        )}
      </InputLeftElement>
      <Input
        placeholder={placeholder}
        onKeyDown={(e) => {
          handleSearchKeyDown(e);
        }}
        disabled={isLoading}
        onChange={(e) => {
          setInputValues(e.target.value);
        }}
      />
    </InputGroup>
  );
};

export default ColumnSearch;
