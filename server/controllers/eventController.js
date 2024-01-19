// import dependecies
const Event = require('../models/eventModel');

const fetchEvent = async (req, res) => {
    try {
      // Find all events
      const events = await Event.find();
  
      // Respond with all events
      res.status(200).json({ events: events });
    } catch (error) {
      // Handle any unexpected errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };

  const fetchEventById = async (req, res) => {
    try {
      // Get the id from the URL
      const eventId = req.params.id;
  
      // Find an event by its ID
      const event = await Event.findOne({ _id: eventId });
  
      if (!event) {
        // If the event with the given ID is not found, return a 404 status
        res.status(404).json({ error: 'Event not found' });
      } else {
        // Respond with the found event
        res.status(200).json({ event: event });
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  

const createEvent = async (req, res) => {
    try {
      // Get the data from the request body
      const { eventName, location , eventDescription , category ,date } = req.body;
  
      // Validate input data
      if (!eventName || !location || !eventDescription || !category  || !date ) {
        return res.status(400).json({ error: 'All inputs are required' });
      }
  
      // Create a new note
      const event = await Event.create({
        eventName, 
        location , 
        eventDescription , 
        category ,
        date, 
        organizer: req.user._id,
        approvalStatus: 'pending'
      });
  
      // Fetch the created note
      const createdEvent = await Event.findById(event._id);
  
      // Respond with the created event
      res.json({ event: createdEvent});
    } catch (error) {
      // Handle any unexpected errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };

  const updateEventStatus = async (req, res) => {
    try {
      // Get the id from the URL
      const eventId = req.params.id;
      // Get the new approvalStatus value from the request body
      const { approvalStatus } = req.body;
  
      // Update the event with a specific id
      const updateResult = await Event.findOneAndUpdate(
        { _id: eventId },
        { $set: { approvalStatus: approvalStatus } }, // Use $set to update only the approvalStatus field
        { new: true } // To return the updated event
      );
  
      if (!updateResult) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      // Find the updated event
      const updatedEvent = await Event.findById(eventId);
  
      // Respond with the updated event
      res.json({ event: updatedEvent });
    } catch (error) {
      // Handle any unexpected errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  

  const updateEvent = async (req, res) => {
    try {
      // Get the id from the URL
      const eventId = req.params.id;
  
      // Get new fields from the request body
      const { eventName, location, eventDescription, category, date } = req.body;
  
      // Validate input data
      if (!eventName || !location || !eventDescription || !category || !date) {
        return res.status(400).json({ error: 'All event fields are required' });
      }
  
      // Update the event with a specific id
      const updateResult = await Event.findOneAndUpdate(
        { _id: eventId , organizer: req.user._id },
        {
          eventName: eventName,
          location: location,
          eventDescription: eventDescription,
          category: category,
          date: date,
        },
        { new: true } // To return the updated event
      );
  
      if (!updateResult) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      // Find the updated event
      const updatedEvent = await Event.findById(eventId);
  
      // Respond with the updated event
      res.json({ event: updatedEvent });
    } catch (error) {
      // Handle any unexpected errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  
  

  const deleteEvent = async (req, res) => {
    try {
      // Get the id from the URL
      const eventId = req.params.id;
    
    //   needed to be checked if the user logged in is creator of event or not

      // Delete the event with the specific id
      const deletionResult = await Event.deleteOne({ _id: eventId, organizer: req.user._id});
  
      if (deletionResult.deletedCount === 1) {
        // Event was successfully deleted
        return res.json({ success: 'Event deleted successfully' });
      } else {
        return res.status(404).json({ error: 'Event not found' });
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  

module.exports  = {fetchEvent , createEvent ,fetchEventById ,updateEvent ,deleteEvent , updateEventStatus};