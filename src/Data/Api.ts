import { FilterInterface, SubareaInterface } from '../const/types';

const API_URL = 'http://5.78.97.128:8081';

//Function to get all data from server
export const getAllSubarea = async (): Promise<SubareaInterface> => {
  try {
    const response = await fetch(`${API_URL}/api/g/subarea/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching subareas');
  }
};

//Function to get data by searchKey from server
export const getSubareaBySearechKey = async (
  searchTerm: string
): Promise<SubareaInterface> => {
  try {
    const url = `${API_URL}/api/g/subarea/all?searching=${searchTerm}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching subarea by search key');
  }
};

//Function to get filtered data by several filter
export const getFilteredData = async (
  filterTerm: FilterInterface
): Promise<SubareaInterface> => {
  console.log('Triggred', filterTerm.searchTerm);
  try {
    const url = `${API_URL}/api/g/subarea/all?pagination={"offset":${
      filterTerm.offset === 0 ? 0 : filterTerm.offset - 1
    },"rows":${filterTerm.rows}}&sorting={"field":"${
      filterTerm.field
    }","sort":"${filterTerm.sort}"}&searching=${
      filterTerm.searchTerm
    }&where={"is_active": ${filterTerm.searchTerm || 1}}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching subarea by filter keys');
  }
};
