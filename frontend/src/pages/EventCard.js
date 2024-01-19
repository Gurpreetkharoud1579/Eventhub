import React from 'react';
import './EventCard.css';
import { useNavigate } from 'react-router-dom';

const EventCard = (props) => {
    const navigate = useNavigate();
    const navigateToRegister = () => {
        let eventId = props.event._id;
        navigate(`/event-detail/${eventId}`);
    }

    return (
        <>
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{props.event.eventName}</h5>
                <p class="mb-3 font-normal text-white">{props.event.category}</p>
                <p class="mb-3 font-normal text-white">{props.event.eventDescription}.</p>
                <p class="mb-3 font-normal text-white">At: {props.event.location}</p>
                <p class="mb-3 font-normal text-white">When: {new Date(props.event.date).toISOString().split('T')[0]}</p>
                <button onClick={navigateToRegister} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    View Event
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
            {/* <div class="p-2">
                <div class="h-full bg-gray-100 bg-opacity-75 px-8  pb-6 rounded-lg overflow-hidden text-center relative">
                    <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{props.event.category}</h2>
                    <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{props.event.eventName}</h1>
                    <p class="leading-relaxed mb-3">{props.event.eventDescription}</p>
                    <p class="leading-relaxed mb-3">{props.event.location}</p>
                    <p class="leading-relaxed mb-3">{props.event.date}</p>
                    <button className="custom-button" onClick={navigateToRegister}>View Event </button>

                </div>
            </div> */}
        </>
    )
}

export default EventCard;