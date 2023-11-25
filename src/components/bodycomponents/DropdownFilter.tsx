import React, { useContext, useState } from 'react';
import { Select } from 'chakra-react-select';

import {
  FilterContext,
  TableStatusContext,
} from '../globalpartials/GlobalContext';
import { Option } from '../../const/types';

export interface DropOption {
  key: string;
  value: string;
}

const DropdownFilter = ({
  column: {
    id,
    columnDef: { header },
  },
  dropOptions,
}: {
  column: { id: string | number; columnDef: { header: string } };
  dropOptions: DropOption[];
}) => {
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

  const requiredOption = dropOptions.find((drop) => drop.key === id);

  return (
    <Select
      isDisabled={isLoading}
      focusBorderColor="none"
      name="options"
      options={(requiredOption && requiredOption.value) || []}
      placeholder={header}
      defaultValue={optionValue}
      onChange={handleChange}
      size="sm"
    />
  );
};

export default DropdownFilter;
