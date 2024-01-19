import React, { useEffect, useState } from 'react';
import './profile.css'
import authStore from '../store/authStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = () => {
  const store = authStore();

  useEffect(() => {
    // Check if loggedInUserInfo is not null before updating userUpdateForm
    if (store.loggedInUserInfo !== null) {
      // Loop through the keys of loggedInUserInfo and update userUpdateForm
      Object.keys(store.loggedInUserInfo).forEach((key) => {
        store.updateUserUpdateForm({
          target: { name: key, value: store.loggedInUserInfo[key] || '' },
        });
      });
    }
  }, [store.loggedInUserInfo, store.updateUserUpdateForm]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      //create Event
      const response = await store.userUpdate();
      if (response == 200) {
        // show toast before navigating to new page
        toast.success("User info updated Successfull!!", {
        });
      } else {
        toast.error("User info updatation failed!! Try Again", {
        });
      }
    } catch (error) {
      toast.error("Unsuccessfull!! Try Again", {
      });
    }
  }
  return (

    <>

      {store && store.loggedInUserInfo && (
        <div>
          <div class="profile-container">
            <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-8">
              <h1 className="text-4xl font-bold">Update User Info </h1>
            </header>
            <form id="updateForm" onSubmit={(e) => updateUser(e)} className="max-w-md mx-auto mt-8">
              <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="firstName">
                  First Name:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={store.userUpdateForm.firstName}
                  onChange={store.updateUserUpdateForm}
                />
              </div>

              <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="lastName">
                  Last Name:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={store.userUpdateForm.lastName}
                  onChange={store.updateUserUpdateForm}
                />
              </div>

              <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="address">
                  Address:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="address"
                  name="address"
                  value={store.userUpdateForm.address}
                  onChange={store.updateUserUpdateForm}
                />
              </div>

              <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="contactNumber">
                  Contact Number:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={store.userUpdateForm.contactNumber}
                  onChange={store.updateUserUpdateForm}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="city">
                  City:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="city"
                  name="city"
                  value={store.userUpdateForm.city}
                  onChange={store.updateUserUpdateForm}
                />
              </div>

              <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="province">
                  Province:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="province"
                  name="province"
                  value={store.userUpdateForm.province}
                  onChange={store.updateUserUpdateForm}
                />
              </div>

              <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="zipCode">
                  Zip Code:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={store.userUpdateForm.zipCode}
                  onChange={store.updateUserUpdateForm}
                />
              </div>
              <div className="p-4 mx-8 mt-2">
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update Info
                </button>
              </div>
            </form>

          </div>

        </div>
      )}


    </>
  );
};

export default Profile;
