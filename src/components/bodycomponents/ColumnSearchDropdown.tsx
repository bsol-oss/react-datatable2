import { Select } from 'chakra-react-select';
import { useContext, useState } from 'react';
import {
  FilterContext,
  TableStatusContext,
} from '../globalpartials/GlobalContext';

const dropDownOption = [
  { value: '', label: 'All' },
  { value: 'testsubareaHub', label: 'testsubareaHub' },
  { value: 'hkmtr_subarea', label: 'hkmtr_subarea' },
  { value: 'NEW_SUBAREA_HUB', label: 'NEW_SUBAREA_HUB' },
  { value: 'testHub6', label: 'testHub6' },
  { value: 'testHub4', label: 'testHub4' },
  { value: 'testHub12', label: 'testHub12' },
];

const groupedOptions = [
  {
    label: 'HUB ID',
    options: dropDownOption,
  },
];

const Dropdown = () => {
  const [optionValues, setOptionValues] = useState<string[]>([]);
  const { filterTerm, setFilterTerm } = useContext(FilterContext);
  const { isLoading } = useContext(TableStatusContext);

  const handleSelect = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setOptionValues(selectedValues);
    setFilterTerm({
      ...filterTerm,
      individualSearchTerm: { hub_id: selectedValues },
    });
  };

  return (
    <Select
      isMulti={true}
      isDisabled={isLoading}
      focusBorderColor="none"
      name="colors"
      options={groupedOptions}
      placeholder="HUB ID"
      value={optionValues.map((value) => ({ value, label: value }))}
      onChange={handleSelect}
      selectedOptionStyle="check"
    />
  );
};

export default Dropdown;
