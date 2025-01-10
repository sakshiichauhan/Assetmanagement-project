import axios from 'axios';

const API_URL =  'http://localhost:3030/api/';

export const fetchEmployeeByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/employee/getemp/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employee data:', error);
    throw error;
  }
};
