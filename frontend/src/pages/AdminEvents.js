import React, { useState, useEffect } from 'react';
import './AdminEvents.css'
import EventStore from '../store/eventStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminEvents() {
    // using zustand store 
    const store = EventStore();
    // fetch all events once the app is loaded
    useEffect(() => {
        store.fetchEvents();
    }, [])

    const handleApproval = async (eventId, status) => {
        try {

            const response = await store.handleApproval(eventId, status);
            if (response == 200) {
                if (status === 'approved')
                    toast.success("Event approved Successfull!!");
                else
                    toast.success("Event rejected Successfull!!");
            } else {
                toast.error("Event approved/reject failed!! Try Again", {
                });
            }
        } catch (error) {
            toast.error("Unsuccessfull!! Try Again", {
            });
        }

    }
    return (

        <div>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        Registered Events
                        <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of All the Events at one place and the admin has the Authority to Approve or Reject any Event .</p>
                    </caption>
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Event Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Event Description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>

                    {store.events && store.events.map((event, index) => (
                        <tbody>
                            <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-950 whitespace-nowrap dark:text-white">
                                    {event.eventName}
                                </th>
                                <td class="px-6 py-4" className="text-black">
                                    {event.location}
                                </td>
                                <td class="px-6 py-4" className="text-black">
                                    {event.eventDescription}
                                </td>
                                <td class="px-6 py-4" className="text-black">
                                    {event.category}
                                </td>
                                <td class="px-6 py-4" className="text-black">
                                    {new Date(event.date).toISOString().split('T')[0]}
                                </td>
                                <td class="px-6 py-4" className="text-black">
                                    {event.approvalStatus}
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleApproval(event._id, 'approved')}>Approve</button>
                                    <button class="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleApproval(event._id, 'rejected')}>Reject</button>
                                </td>
                            </tr>
                        </tbody>
                    ))}

                </table>
            </div>

        </div>
    );
}

export default AdminEvents;
