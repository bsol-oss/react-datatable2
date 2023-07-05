import { useContext, useState } from 'react';
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
  const groupedOptions = {
    id: id,
    label: label,
    options: options,
  };

  const handleChange = (selectedOption: Option | null) => {
    setOptionValue(selectedOption);
    setFilterTerm({
      ...filterTerm,
      individualSearchTerm: {
        [groupedOptions.id]: selectedOption ? selectedOption.value : '',
      },
    });
  };

  return (
    <Select
      isDisabled={isLoading}
      focusBorderColor="none"
      name="colors"
      options={groupedOptions.options}
      placeholder={label}
      defaultValue={optionValue}
      onChange={handleChange}
    />
  );
};

export default DropdownFilter;
