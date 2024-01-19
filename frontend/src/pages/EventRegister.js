import React from 'react';
import './EventRegister.css'
import EventStore from '../store/eventStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EventRegister() {
  const store = EventStore();

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      //create Event
      const response = await store.createEvent();
      if (response == 200) {
        // show toast before navigating to new page
        toast.success("Event created Successfull, sent for approval!!", {
        });
      } else {
        toast.error("Event creation failed!! Try Again", {
        });
      }
    } catch (error) {
      toast.error("Unsuccessfull!! Try Again", {
      });
    }
  }
  return (
    <div className='border rounded-lg p-6 w-[90%] m-auto'>
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-8">
        <h1 className="text-4xl font-bold">Event Registration</h1>
      </header>
      {/* <h2 className='text-center text-3xl text-white font-bold'>Event Registration</h2> */}
      <form class="max-w-sm mx-auto" onSubmit={(e) => createEvent(e)}>
        <div class="my-5">
          <input type="text" name="eventName"
            value={store.eventFormData.eventName}
            onChange={store.setFormData}
            class="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-4"
            placeholder="Enter the Event Name" required />
          <input type="text" name="location"
            value={store.eventFormData.location}
            onChange={store.setFormData} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-4" placeholder="Enter the Event Location" required />
          <input type="text" name="eventDescription"
            value={store.eventFormData.eventDescription}
            onChange={store.setFormData} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-4" placeholder="Enter the Event Description" required />
          <input type="text" name="category"
            value={store.eventFormData.category}
            onChange={store.setFormData} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-4" placeholder="Enter the Event Category" required />
          <input type="date"
            name="date"
            value={store.eventFormData.date}
            onChange={store.setFormData} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-4" placeholder="Enter the Event Date" required />
        </div>

        <button type="submit" class="text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>


    </div>
  );
}

export default EventRegister;