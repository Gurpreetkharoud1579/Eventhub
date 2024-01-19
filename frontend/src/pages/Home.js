import React, { useState, useEffect } from 'react';
import './Home.css'
import EventCard from "./EventCard";
import axios from 'axios';
import authStore from '../store/authStore';

const Home = () => {
  const [events, setEvents] = useState([]);
  const store = authStore();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:2300/events');
        const allEvents = response.data.events;
        const approvedEvents = allEvents.filter((event) => event.approvalStatus === "approved");
        const firstThreeApprovedEvents = approvedEvents.slice(0, 3);

        setEvents(firstThreeApprovedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
    console.log(store.userId);
  }, []);

  return (
    <>
      <div className='flex flex-col gap-16'>
        <section class="text-white body-font">
          <div class="container mx-auto flex md:flex-row flex-col items-center">
            <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Events Portal
                <br class="hidden lg:inline-block" />KWC region
              </h1>
              <p class="mb-8 leading-relaxed">Welcome to EventHub, your one-stop solution for event planning and organization. Whether you're hosting a corporate conference, a wedding, a birthday party, or any special occasion, EventHub is here to simplify the entire process for you. Our platform connects you with expert event planners, venues, vendors, and resources to make your event a memorable success.</p>
              {/* <div class="flex justify-center">
                <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Event Cards</button>

              </div> */}
            </div>
            <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img class="object-cover object-center rounded" alt="hero" src="./homeBanner.jpg" />
            </div>
          </div>

        </section>


        <section className='max-w-[70vw] border'>
          <div class="flex flex-col py-8 ">
            <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-8">
              <h1 className="text-4xl font-bold">Popular Events </h1>
            </header>
            <div
              class="flex overflow-x-scroll  hide-scroll-bar py-8"
            >
              <div
                class="grid grid-cols-2 md:grid-cols-3 gap-4"
              >

                {events.map((event, index) => (
                  <>

                    <div class="inline-block px-3">
                      <EventCard event={event} />
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <style>

          </style>
        </section>
      </div>
    </>
  )
}

export default Home;