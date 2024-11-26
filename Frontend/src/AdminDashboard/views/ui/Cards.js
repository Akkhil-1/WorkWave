import React, { useState } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import { Row } from "reactstrap";

const Cards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Axios request to add service
      const response = await axios.post(
        "http://localhost:3001/services/addservice",
        formData,
        {
          withCredentials: true,  // This sends cookies with the request
        }
      );
      console.log("Service added successfully:", response.data);
      setIsModalOpen(false); // Close modal on success
    } catch (error) {
      console.error("Error adding service:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="container mx-auto p-6 relative">
      {/* Modal Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={toggleModal}
          className="bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-yellow-600"
        >
          +
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md transition-opacity duration-300">
          <div className="relative bg-white rounded-2xl shadow-2xl w-11/12 sm:w-3/4 lg:w-1/2 p-8 max-h-[95vh] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="flex flex-col space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 text-center">
                Add Service
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name of the service"
                  className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none text-lg"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none text-lg resize-none h-32"
                ></textarea>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none text-lg"
                />
                <button
                  type="submit"
                  className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition duration-300 text-lg"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Other Card Content */}
      <Row className="mb-6">
        <h5 className="mb-3 mt-3 text-xl font-semibold">Alignment Text</h5>
        <div className="flex gap-6 flex-wrap">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h5 className="text-xl font-semibold">Special Title Treatment</h5>
                <p className="text-gray-500 mt-2">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <div className="mt-4">
                  <Button
                    color="light-danger"
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                  >
                    Go somewhere
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Row>
    </div>
  );
};

export default Cards;
