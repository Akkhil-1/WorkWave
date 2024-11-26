import axios from "axios";

const API_BASE_URL = "http://localhost:3001" // Replace with your actual API base URL

export const fetchBusinessDetails = async (id) => {

 
  try {
    console.log("Frontend: Fetching details for id:", id);
    const response = await axios.get(`${API_BASE_URL}/business/getBusines/${id}`);
    return response.data; // Returns the data from the API
  } catch (error) {
    console.error("Error fetching business details:", error);
    throw error; // Throw the error to be handled by the calling function
  }
};
// export const fetchBusinessDetails = async () => {
//   try {
//     const response = await axios.get('/api/business-details');
//     console.log(response.data); // Log response for debugging
//   } catch (error) {
//     if (error.response) {
//       // Server responded with a status other than 2xx
//       console.error('Server Error:', error.response.data);
//     } else if (error.request) {
//       // Request was made but no response received
//       console.error('Network Error:', error.request);
//     } else {
//       // Something else happened
//       console.error('Error:', error.message);
//     }
//   }
// };
