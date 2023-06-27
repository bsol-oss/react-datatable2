import { Input, Select, Checkbox, VStack } from '@chakra-ui/react';
import React, {
  useState,
  ChangeEvent,
  useContext,
  KeyboardEvent,
  useEffect,
} from 'react';
import { FilterContext } from './GlobalContext';
import { InputContext } from '../functionalcomponents/InputContext';

type FilterType = 'input' | 'dropdown' | 'range' | 'checkbox';

interface ColumnFilterProps {
  filterType: FilterType;
  options?: string[];
  placeholder?: any;
}

const ColumnFilter = ({
  filterType,
  options,
  placeholder,
}: ColumnFilterProps) => {
  const [value, setValue] = useState<string | number | boolean | Array<string>>(
    ''
  );
  const { filterTerm, setFilterTerm } = useContext(FilterContext);

  const handleSearch = () => {
    setFilterTerm({ ...filterTerm, searchTerm: value });
  };

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

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setValue((prevValue) => {
        if (Array.isArray(prevValue)) {
          return [...prevValue, option];
        } else {
          return [option];
        }
      });
    } else {
      setValue((prevValue) => {
        if (Array.isArray(prevValue)) {
          return prevValue.filter((item) => item !== option);
        } else {
          return '';
        }
      });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (value === '') {
      handleSearch();
    }
  }, [value]);

  switch (filterType) {
    case 'input':
      return (
        <InputContext.Provider value={value}>
          <Input
            type="text"
            value={value as string}
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
          <Select
            value={value as number}
            onChange={(event) => {
              handleSearch();
              handleSelectChange(event);
            }}
            focusBorderColor="none"
          >
            {options &&
              options.map((option, index) => (
                <option key={option} value={index}>
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
            value={value as number}
            onChange={handleRangeChange}
            min={0}
            max={100}
            onKeyDown={handleKeyDown}
            focusBorderColor="none"
          />
        </InputContext.Provider>
      );
    case 'checkbox':
      return (
        <InputContext.Provider value={value}>
          <VStack>
            {options &&
              options.map((option, index) => (
                <Checkbox
                  key={index}
                  isChecked={(value as Array<string>).includes(option)}
                  value={option}
                  onChange={handleCheckboxChange}
                >
                  {option}
                </Checkbox>
              ))}
          </VStack>
        </InputContext.Provider>
      );
    default:
      return (
        <InputContext.Provider value={value}>
          <Input
            type="text"
            value={value as string}
            placeholder={placeholder}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            focusBorderColor="none"
          />
        </InputContext.Provider>
      );
  }
};

export default ColumnFilter;
