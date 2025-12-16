import axios from "axios";

const API_BASE_URL = "https://workwave-aage.onrender.com";

export const fetchServiceDetails = async (id) => {
  try {
    console.log("Frontend: Fetching details for id:", id);
    const response = await axios.get(`${API_BASE_URL}/services/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn("Service not found, continuing app flow");
      return null;
    }

    console.error("Unexpected error fetching service details:", error);
    return null;
  }
};
