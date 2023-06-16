import { SubareaInterface } from '../types';

//Function to get all data from server
export const getAllSubarea = async (): Promise<SubareaInterface> => {
  const response = await fetch('http://5.78.97.128:8081/api/g/subarea/all');
  const data = await response.json();
  return data;
};
