import React from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';
const SelectRole = () => {
    const roles = ['Company', 'Student', 'Alumni', 'Staff'];
    const location = useLocation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const handleRoleSelection = (role) => {
        // Handle role selection logic here
        console.log(`Selected role: ${role}`);
      
    };
    const getRoleIcon = (role) => {
        switch (role) {
            case 'Company':
                return <i className="fas fa-building fa-xl"></i>;
            case 'Student':
                return <i className="fas fa-user-graduate fa-xl"></i>;
            case 'Alumni':
                return <i className="fas fa-user-tie fa-xl"></i>;
            case 'Staff':
                return <i className="fas fa-user fa-xl"></i>;
            default:
                return null;
        }
    }
    
    return (
      <div className="flex flex-col items-center space-y-4">
  <h1 className="text-2xl font-bold text-white">Select a Role</h1>
  <div className="grid grid-cols-2 gap-4">
    {roles.map((role) => (
      <button
        key={role}
        className="p-7 flex flex-col items-center justify-between bg-white rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-red"
        onClick={() => handleRoleSelection(role)}
      >
     
            {getRoleIcon(role)}
            <span className="text-lg font-semibold mt-2">{role}</span>
      
      
       
      </button>
    ))}
  </div>
</div>

    );
};

export default SelectRole;