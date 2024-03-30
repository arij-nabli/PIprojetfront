import React, { useState } from 'react';
import axios from 'axios';

const AddOffer = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [provider, setProvider] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [benefits, setBenefits] = useState([]);
    const [isActive, setIsActive] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const offerData = {
            title,
            description,
            provider,
            salary_range: { min: minSalary, max: maxSalary },
            start_date: startDate,
            end_date: endDate,
            location,
            type,
            category,
            benefits,
            is_active: isActive,
        };

        try {
            const response = await axios.post('/api/offers', offerData);
            console.log(response.data);
            // Handle success or redirect to another page
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <div>
            <h1>Add Offer</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <label htmlFor="provider">Provider:</label>
                <input
                    type="text"
                    id="provider"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                />

                <label htmlFor="minSalary">Minimum Salary:</label>
                <input
                    type="number"
                    id="minSalary"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                />

                <label htmlFor="maxSalary">Maximum Salary:</label>
                <input
                    type="number"
                    id="maxSalary"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                />

                <label htmlFor="startDate">Start Date:</label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <label htmlFor="endDate">End Date:</label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />

                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <label htmlFor="type">Type:</label>
                <input
                    type="text"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />

                <label htmlFor="category">Category:</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <label htmlFor="benefits">Benefits:</label>
                <input
                    type="text"
                    id="benefits"
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value.split(','))}
                />

                <label htmlFor="isActive">Is Active:</label>
                <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddOffer;