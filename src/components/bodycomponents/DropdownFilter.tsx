import { useContext, useState } from 'react';
import { Select } from 'chakra-react-select';
import {
  FilterContext,
  TableStatusContext,
} from '../globalpartials/GlobalContext';
import { DropDownProps } from '../../const/types';

const DropdownFilter = ({ id, label, options }: DropDownProps) => {
  const [optionValues, setOptionValues] = useState<string[]>([]);
  const { filterTerm, setFilterTerm } = useContext(FilterContext);
  const { isLoading } = useContext(TableStatusContext);
  const groupedOptions = [
    {
      id: id,
      label: label,
      options: options,
    },
  ];

  const handleSelect = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setOptionValues(selectedValues);
    setFilterTerm({
      ...filterTerm,
      individualSearchTerm: { [groupedOptions[0].id]: selectedValues },
    });
  };
  return (
    <Select
      isMulti={true}
      isDisabled={isLoading}
      focusBorderColor="none"
      name="colors"
      options={groupedOptions}
      placeholder={label}
      value={optionValues.map((value) => ({ value, label: value }))}
      onChange={handleSelect}
      selectedOptionStyle="check"
    />
  );
};

export default DropdownFilter;
