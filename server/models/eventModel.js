const mongoose = require('mongoose')
const eventSchema = mongoose.Schema({
    eventName : String,
    location : String,
    date : Date,
    eventStatus : String,
    eventDescription : String,
    isPaid : Boolean,
    category : String,
    attendeeCount : Number,
    isLimited : Boolean,
    organizer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
      },
    ticketFee: Number,
    isFull: Boolean,
    // check if is approved by admin or not
    // values: approved, pending, blocked
    approvalStatus: String,
});


const eventModel = mongoose.model('event', eventSchema); 

module.exports = eventModel;