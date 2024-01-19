import { create } from 'zustand';
import axios from 'axios';

const EventStore = create((set) => ({
    // states
    events: null,
    eventFormData:{
        eventName: '',
        location: '',
        eventDescription: '',
        category: '',
        date: ''
    },
    // noteUpdateFormData: {
    //     title: '',
    //     body: '',
    //     _id: null
    // },
     // functions
     fetchEvents: async () => {
        // get notes from api
        try {
            const response = await axios.get('http://localhost:2300/events');
            if( response.status === 200  ){
            const events = response.data.events;
            set({
                events: events
            })
        }else{
            alert("Error getting events");
            console.error('Error fetching the data');
        }
        } catch (error) {
            console.error('Error fetching the data',error);
        }
    },
    setFormData: (e) => {
        const { name, value } = e.target;
        set((state) => {
            return {
                eventFormData: {
                    ...state.eventFormData,
                    [name]: value
                }
            }
        })
    },
    fetchEventById: async (eventId) => {
      // get notes from api
      try {
          const response = await axios.get(`http://localhost:2300/events/${eventId}`);
          if( response.status === 200  ){
          const event = response.data.event;
         return event;
      }else{
          alert("Error getting event");
          return null;
          console.error('Error fetching the data');
      }
      } catch (error) {
        return null;
          console.error('Error fetching the data',error);
      }
  },
  setFormData: (e) => {
      const { name, value } = e.target;
      set((state) => {
          return {
              eventFormData: {
                  ...state.eventFormData,
                  [name]: value
              }
          }
      })
  },
    createEvent: async (e) => {
        try {
            // get state EventFormDate
            const { eventFormData, events } = EventStore.getState();
            // create new event
            const res = await axios.post('http://localhost:2300/events', eventFormData);
            // clear form fields and
            // set notes with addition of new events with status == 200
            if(res.status === 200 ){
                set({
                    eventFormData:{
                        eventName: '',
                        location: '',
                        eventDescription: '',
                        category: '',
                        date: ''
                    },
                    events: [...events, res.data.event]
                });
                return 200;
            }else{
                return res.status;
            }
            
        } catch (error) {
            return 404;
        }
    },
    handleApproval: async (eventId, status) => {
        try {
          const requestData = {
            approvalStatus: status,
          };
          const { events, fetchEvents } = EventStore.getState();
      
          const response = await axios.put(`http://localhost:2300/events/eventStatus/${eventId}`, requestData);
      
          if (response.status === 200) {
            const updatedEvent = response.data.event;
            const updatedEvents = events.map((event) => {
              if (event.id === eventId) {
                return updatedEvent;
              }
              return event;
            });
      
            set({
              events: updatedEvents,
            });
            fetchEvents();
            return 200;
            // alert(`Event ${status}!!!`);
          } else {
            return 0;
          }
        } catch (error) {
          console.log(error);
         return 0;
        }
      },      
    // deleteNote: async (_id) => {
    //     try {
    //         // get notes from state
    //         const { notes } = EventStore.getState();
    //         // delete the note
    //         await axios.delete(`/notes/${_id}`);
    //         // update state
    //         set({
    //             notes: notes.filter((note) => { return note._id !== _id })
    //         })
    //     } catch (error) {
    //         alert('Error deleting note');
    //         console.log('Error deleting note', error);
    //     }

    // },
    // toggle update form, handle onClick update button to set initial values of update form 
    // toggleUpdateForm: (note) => {
    //     const { title, body, _id } = note;
    //     // set update Form data state
    //     set({
    //         noteUpdateFormData: { title, body, _id }
    //     })
    // },
    //handle changes in update form and setupdateForm state 
    // setUpdateFormData: (e) => {
    //     const { name, value } = e.target;
    //     const { noteUpdateFormData } = EventStore.getState();
    //     set({
    //         noteUpdateFormData: {
    //             ...noteUpdateFormData,
    //             [name]: value
    //         }
    //     });
    // },
    // updateNote: async (e) => {
    //     e.preventDefault();
    //     const { noteUpdateFormData, notes } = EventStore.getState();
    //     const { title, _id, body } = noteUpdateFormData;
    //     try {
    //         // update note 
    //         await axios.put(`/notes/${_id}`, { title: title, body: body });

    //         // update state
    //         const newNotes = [...notes];
    //         const noteIndex = notes.findIndex((note) => { return note._id === _id });
    //         newNotes[noteIndex] = noteUpdateFormData;
    //         // set updated notes and clear update form fields
    //         set({
    //             notes: newNotes,
    //             noteUpdateFormData: { title: '', body: '', _id: null }
    //         })

    //     } catch (error) {

    //     }
    // },
    // canceUpdateNote: () => {
    //     set({
    //         noteUpdateFormData: { title: '', body: '', _id: null }
    //     })
    // }


}))

export default EventStore;