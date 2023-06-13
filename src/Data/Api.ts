
import { SubareaType } from '../types';

//Function to get all data from server
export const getAllSubarea = async (): Promise<SubareaType> => {
  const response = await fetch('http://5.78.97.128:8081/api/g/subarea/all');
  const data = await response.json();
  console.log('data', data);
  return data;
};
