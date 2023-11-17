import React, { useContext, useState } from 'react';
import { Select } from 'chakra-react-select';

import {
  FilterContext,
  TableStatusContext,
} from '../globalpartials/GlobalContext';
import { DropDownProps, Option } from '../../const/types';

const DropdownFilter = ({ id, label, options }: DropDownProps) => {
  const [optionValue, setOptionValue] = useState<Option | null>(null);
  const { filterTerm, setFilterTerm } = useContext(FilterContext);
  const { isLoading } = useContext(TableStatusContext);

  const handleChange = (selectedOption: Option | null) => {
    setOptionValue(selectedOption);
    if (selectedOption && selectedOption.value === '') {
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
          [id]: selectedOption ? selectedOption.value : '',
        },
      });
    }
  };

  return (
    <Select
      isDisabled={isLoading}
      focusBorderColor="none"
      name="options"
      options={options}
      placeholder={label}
      defaultValue={optionValue}
      onChange={handleChange}
      size="sm"
    />
  );
};

export default DropdownFilter;
