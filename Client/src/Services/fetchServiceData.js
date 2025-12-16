import axios from "axios";

const API_BASE_URL = "https://workwave-aage.onrender.com";

export const fetchServiceDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error("Failed to fetch service details:", error);
    return null;
  }
};
