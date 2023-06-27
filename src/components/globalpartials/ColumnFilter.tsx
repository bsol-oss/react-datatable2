import { Input, Select } from '@chakra-ui/react';
import React, { useState, ChangeEvent, useContext, KeyboardEvent } from 'react';
import { FilterContext } from './GlobalContext';
import { InputContext } from '../functionalcomponents/InputContext';

type FilterType = 'input' | 'dropdown' | 'range'; // Define possible filter types

interface ColumnFilterProps {
  filterType: FilterType; // Type of filter
  options?: string[]; // Options for dropdown filter
  placeholder?: any; // Placeholder text for input fields
}

const ColumnFilter = ({
  filterType,
  options,
  placeholder,
}: ColumnFilterProps) => {
  const [value, setValue] = useState<string | number>(''); // Current filter value
  const { filterTerm, setFilterTerm } = useContext(FilterContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const numericValue = Number(event.target.value);
    setValue(numericValue);
  };

  const handleSearch = () => {
    setFilterTerm({ ...filterTerm, searchTerm: value });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Render different filter components based on the filter type
  switch (filterType) {
    case 'input':
      return (
        <InputContext.Provider value={value}>
          <Input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            focusBorderColor="none"
          />
        </InputContext.Provider>
      );
    case 'dropdown':
      return (
        <InputContext.Provider value={value}>
          <Select value={value} onChange={handleSelectChange}>
            {options &&
              options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </Select>
        </InputContext.Provider>
      );
    case 'range':
      return (
        <InputContext.Provider value={value}>
          <Input
            type="range"
            value={value}
            onChange={handleRangeChange}
            min={0}
            max={100}
            onKeyDown={handleKeyDown}
            focusBorderColor="none"
          />
        </InputContext.Provider>
      );
    default:
      return null;
  }
};

export default ColumnFilter;