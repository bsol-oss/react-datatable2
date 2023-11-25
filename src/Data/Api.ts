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
  filterTerm: FilterInterface,
  apiUrl: string,
  extraSortFilters: Array<any>,
  extraFieldFilters: Array<any>,
  axios: any
): Promise<SubareaInterface> => {
  let paramStr = '';
  const offset =
    filterTerm.offset === 0 ? 0 : (filterTerm.offset - 1) * filterTerm.rows;

  if (filterTerm.field?.length || extraSortFilters.length) {
    const field = filterTerm.field ? filterTerm.field.split(',') : [];
    const sortyByDir = filterTerm.sort ? filterTerm.sort.split(',') : [];
    if (extraSortFilters.length)
      extraSortFilters.forEach((srt) => {
        field.push(srt.id);
        sortyByDir.push(srt.desc ? 'desc' : 'asc');
      });
    paramStr = `&sorting={"field":"${field}","sort":"${sortyByDir}"}`;
  }

  if (filterTerm.searchTerm?.trim?.().length) {
    paramStr = `${paramStr}&searching=${encodeURIComponent(
      filterTerm.searchTerm
    )}`;
  }

  if (
    Object.keys({ ...filterTerm.individualSearchTerm, ...extraFieldFilters })
      .length > 0
  ) {
    paramStr = `${paramStr}&where=${JSON.stringify({
      ...filterTerm.individualSearchTerm,
      ...extraFieldFilters,
    })}`;
  }

  try {
    const url = `${apiUrl}?pagination={"offset":${offset},"rows":${filterTerm.rows}}${paramStr}`;
    const response = await axios.get(url);
    const data = response.data;
    return {
      ...data,
      data,
      ok: true,
      status: response.status,
    };
  } catch (error: any) {
    console.log(
      'DataTableServer Error: ',
      error?.response?.data,
      error?.response?.status
    );
    return {
      count: 0,
      filterCount: 0,
      dropOptions: [],
      results: [],
      ok: false,
      status: error?.response?.status || error?.message,
      message: error?.response?.data || error?.message,
    };
  }
};
