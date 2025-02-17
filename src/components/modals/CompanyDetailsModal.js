import React from 'react';

const CompanyDetailsModal = ({ isOpen, closeModal, company, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
            <div className="mt-5 text-center sm:mt-0 sm:ml-4 sm:text-left">
  <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-4">
    Company Information
  </h3>
  <div className="mt-2">
    <p className="text-sm text-gray-500 mb-2">
      <span className="font-semibold">Name:</span> {company.name}
    </p>
    <p className="text-sm text-gray-500 mb-2">
      <span className="font-semibold">Industry:</span> {company.industry}
    </p>
    <p className="text-sm text-gray-500 mb-2">
      <span className="font-semibold">Description:</span> {company.description}
    </p>
    <p className="text-sm text-gray-500 mb-2">
      <span className="font-semibold">Status:</span> {company.company_status}
    </p>
    <p className="text-sm text-gray-500 mb-2">
      <span className="font-semibold">Email:</span> {user.email}
    </p>
    <p className="text-sm text-gray-500 mb-2">
      <span className="font-semibold">Username:</span> {user.username}
    </p>
    <p className="text-sm text-gray-500 mb-2">
      <span className="font-semibold">Country:</span> {company.country}
    </p>
    <p className="text-sm text-gray-500 mb-2">
      <span className="font-semibold">Account Status:</span> {user.account_status}
    </p>
    <p className="text-sm text-gray-500 mb-2">
      <span className="font-semibold">Website:</span> {company.website}
    </p>
  </div>
</div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsModal;