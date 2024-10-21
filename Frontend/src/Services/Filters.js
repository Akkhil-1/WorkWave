import React, { useState } from 'react';

const Filters = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        priceRange: '',
        location: '',
        businessType: '',
    });
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
        onFilterChange({ ...filters, [name]: value });
    };

    const toggleFilters = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="md:w-1/5 w-full p-4 rounded-lg shadow-lg mb-4 md:mb-0 bg-[#f7e8f9]">
            <button 
                className="block md:hidden bg-white text-black px-4 py-2 rounded hover:bg-gray-800 mb-4 flex items-center justify-between"
                onClick={toggleFilters}
            >
                {isOpen ? 'Hide Filters' : 'Show Filters'} 
                <span className={`ml-2 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>&#9662;</span>
            </button>
            <div className={`${isOpen ? 'block' : 'hidden'} md:block space-y-4`}>
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={filters.location}
                    onChange={handleChange}
                    className="p-2 w-full border border-gray-300 rounded  placeholder-gray bg-gray-100"
                />
                <input
                    type="text"
                    name="businessType"
                    placeholder="Business Type"
                    value={filters.businessType}
                    onChange={handleChange}
                    className="p-2 w-full border border-gray-300 rounded bg-gray-100 placeholder-gray"
                />
                <input
                    type="number"
                    name="priceRange"
                    placeholder="Max Price"
                    value={filters.priceRange}
                    onChange={handleChange}
                    className="p-2 w-full border border-gray-300 rounded bg-gray-100 placeholder-gray"
                />
            </div>
        </div>
    );
};

export default Filters;
