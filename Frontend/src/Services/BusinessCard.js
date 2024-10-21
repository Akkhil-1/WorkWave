import React from 'react';
import { NavLink } from 'react-router-dom';

const BusinessCard = ({ business }) => {
    return (
        <div
            className="business-card bg-white shadow-md rounded-lg p-4 hover:bg-gray-50 transform hover:scale-105 transition-transform duration-200"
        >
            <NavLink to={`/business/${business._id}`}>
                <img 
                    src={business.businessLogo || 'https://via.placeholder.com/150?text=Placeholder'} 
                    alt={business.businessName} 
                    className="rounded-lg w-full h-40 object-cover" 
                />
                <h2 className="text-xl font-bold mt-4 text-black">{business.businessName}</h2>
                <p className="text-gray-600">{business.services.serviceName}</p>
                <p className="text-gray-600">{business.city}</p>
                <p className="text-gray-600">{business.businessType}</p>
                <p className="mt-2 text-gray-700">{business.services.serviceDescription}</p>
                <p className="mt-2 font-semibold text-black">{`$${business.services.servicePrice}`}</p>
            </NavLink>
        </div>
    );
};

export default BusinessCard;
