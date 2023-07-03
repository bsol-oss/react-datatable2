import React, { useContext, useState } from 'react';
import {
  Spinner,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
} from '@chakra-ui/react';

import {
  FilterContext,
  TableStatusContext,
} from '../globalpartials/GlobalContext';

import { FiSearch } from 'react-icons/fi';
import { t } from 'i18next';

const ColumnSearch = ({ id }: { id: string }) => {
  const { filterTerm, setFilterTerm } = useContext(FilterContext);
  const { isLoading } = useContext(TableStatusContext);

  const placeholder = t('Search') || 'Search';

  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      setFilterTerm({ ...filterTerm, individualSearchTerm: inputValues });
    }
  };
  const handleSearchOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string | undefined
  ) => {
    if (id) {
      const value = (event.target as HTMLInputElement).value;
      if (!value) {
        const temp = inputValues;
        delete temp[id];
        setInputValues(temp);
      } else {
        setInputValues({
          ...inputValues,
          [id]: value,
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
            onClick={() =>
              setFilterTerm({
                ...filterTerm,
                individualSearchTerm: inputValues,
              })
            }
          />
        ) : (
          <Spinner size="sm" />
        )}
      </InputLeftElement>
      <Input
        placeholder={placeholder}
        onKeyDown={(event) => {
          handleSearchKeyDown(event);
        }}
        disabled={isLoading}
        onChange={(event) => {
          handleSearchOnChange(event, id);
        }}
      />
    </InputGroup>
  );
};

export default ColumnSearch;
