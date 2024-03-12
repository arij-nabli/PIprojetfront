import React, { useState } from 'react';
import CardSettings from 'components/Cards/CardSettings.js';
import CardTable from "components/Cards/CardTable.js";

const AllUsersTable = () => {
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleAddUserClick = () => {
        setShowForm(!showForm);
    };

    const handleAdminAdded = () => {
        // Handle admin added logic here
    };

    return (
        <div className="md:ml-12 pl-6 w-11/12">
            
            {showForm ? (
                <button
                    className="bg-red-500 text-white p-2 mb-3 rounded-md"
                    onClick={handleAddUserClick}
                >
                    Return
                </button>
            ) : (
                <button
                    className="bg-green-500 text-white p-2 mb-3 rounded-md"
                    onClick={handleAddUserClick}
                >
                    Add Admin
                </button>
            )}
            {showForm ? (
                <CardSettings onAdminAdded={handleAdminAdded}  />
            ) : (
                <CardTable searchQuery={searchQuery}  className="mb-5"/>
            )}
        </div>
    );
};

export default AllUsersTable;