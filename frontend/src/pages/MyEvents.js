import React, { useEffect, useState } from 'react';
import authStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const MyEvents = () => {
  const store = authStore();
  useEffect(() => {
    store.fetchRegisteredEvents();
    store.fetchUserOrganizedEvents();
  }, []);

  const handleUnsubscribe = (event) => {
    console.log("event clicked is", event);
    console.log("logged in user info", store.loggedInUserInfo);
  }
  const navigate = useNavigate();
  const navigateToEvenDetails = (eventId) => {
      navigate(`/event-detail/${eventId}`);
  }
  return (
    <>
      {
        store.registeredEvents && (
          <>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Events Registered Details
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of All the Events Registered by this user at one place and the admin has the Authority to Approve or Reject any Event .</p>
              </caption>
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Event Name
                  </th>

                  <th scope="col" class="px-6 py-3">
                    Event Description
                  </th>

                  <th scope="col" class="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Date
                  </th>

                </tr>
              </thead>

              {store.registeredEvents.map((event, index) => (
                <tbody>
                  <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-950 whitespace-nowrap dark:text-white">
                      {event.eventName}
                    </th>

                    <td class="px-6 py-4" className="text-black">
                      {event.eventDescription}
                    </td>
                    <td class="px-6 py-4" className="text-black">
                      {event.location}
                    </td>
                    <td class="px-6 py-4" className="text-black">
                      {event.category}
                    </td>
                    <td class="px-6 py-4" className="text-black">
                      {new Date(event.date).toISOString().split('T')[0]}
                    </td>
                  </tr>
                </tbody>
              ))}

            </table>

          </>
        )
      }

{
        store.userOrganizedEvents && (
          <>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Organized Events Details
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">All Events organized by me.</p>
              </caption>
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Event Name
                  </th>

                  <th scope="col" class="px-6 py-3">
                    Event Description
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Approval Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>

                </tr>
              </thead>

              {store.userOrganizedEvents.map((event, index) => (
                <tbody>
                  <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-950 whitespace-nowrap dark:text-white">
                      {event.eventName}
                    </th>

                    <td class="px-6 py-4" className="text-black">
                      {event.eventDescription}
                    </td>
                    <td class="px-6 py-4" className="text-black">
                      {event.approvalStatus}
                    </td>
                    <td>
                      { event.approvalStatus === 'approved' &&  <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => navigateToEvenDetails(event._id)}>
                        Details
                      </button> }
                     
                    </td>
                  </tr>
                </tbody>
              ))}

            </table>

          </>
        )
      }
    </>
  );
};

export default MyEvents;
