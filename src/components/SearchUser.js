import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UserSearch = () => {
    const [usernameInput, setUsernameInput] = useState('');
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [SuggestUsersImages, setSuggestUsersImages] = useState({});
    const navigate = useNavigate();
    const handleUsernameInputChange = async (event) => {
        setUsernameInput(event.target.value);
        if (event.target.value.length > 0) {
            const response = await fetch(
                `esprit-compass-backend.vercel.app/user/searchUser?start=${event.target.value}`
            );
            console.log(response);
            const users = await response.json();
            setSuggestedUsers(users.map((user) => user));
            users.map((user) => {
                getUserImage(user._id);
            });
        } else {
            setSuggestedUsers([]); // Clear the suggestions when the input is empty
        }
    };

    const getUserImage = async (id) => {
        let images = []
        try {
            const response = await axios.get(
                `esprit-compass-backend.vercel.app/user/get-image?id=${id}`,
                { responseType: 'blob' }
            );
            const imageUrl = URL.createObjectURL(response.data);
            setSuggestUsersImages(prevImages => ({
                ...prevImages,
                [id]: imageUrl
              }));
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    const clickUser = (event,user) => {
        console.log(user);
        navigate(`/profile/${user._id}`);
    }   
    return (
        <div className=' ml-5'>
            <input
                type="text"
                value={usernameInput}
                className=' text-black active:border-gray-700 bg-gray-100 border-gray-300  rounded-lg p-2 w-80'
                onChange={handleUsernameInputChange}
                placeholder="Search users..."
            />
            {suggestedUsers.length > 0 && (
                <ul className='absolute bg-white w-80 px-1 z-50'>
                    {suggestedUsers.map((user) => (
                        <li key={user._id} onClick={(e)=>clickUser(e,user)} className='my-1 px-2 flex items-center hover:cursor-pointer hover:bg-gray-200'>
                           {SuggestUsersImages[user._id] ? <img alt='profile-img' width={40} className='rounded-full mr-5' src={SuggestUsersImages[user._id]}/>:<img alt='profile-img' width={40} className='rounded-full mr-5' src='https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'/>}
                            <span className='text-back font-bold'> {user.username}</span>
                            <i className='fas fa-user ml-2 right-3 text-gray-500 absolute'></i>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserSearch;