const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Event = require('../models/eventModel');

async function signup(req, res){
    try {
        // get email and password from req body
        const {email, password, userType} = req.body;
        // hash the password before storing in the database
        var hashedPassword = bcrypt.hashSync(password, 8);
        // create new user using data
        const response = await User.create({
            email, 
            password:hashedPassword,
            userType: userType
        });
        // respond 
        res.sendStatus(200);
    } catch (error) {
        console.log("Error creating new user" , error);
        res.sendStatus(400);
    }

};

async function userUpdate (req, res) {
    try {
      // Get the id from the URL
      const userId = req.params.id;
  
      // Get the updates from the request body
      const { firstName, lastName, address, contactNumber , city, province , zipCode } = req.body;

      if (!firstName || !lastName || !address || !contactNumber || !city || !province || !zipCode) {
        return res.status(400).json({ error: 'All fields are required for update' });
      }
  
          // Update the user
        const updatedUser = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName , contactNumber , address , city, province , zipCode  },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Respond with the updated user
      res.json({ user: updatedUser });
    } catch (error) {
      // Handle any unexpected errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
}

async function login(req, res){
    try {
        // get the email and password from body 
    const {email, password} = req.body;
   
    // first get the user with the given email
    const user  = await User.findOne({email});
    // when user not found 
    if(!user) 
        return res.sendStatus(401); 

    // check the validity of password
    const validPassword = bcrypt.compareSync(password, user.password);
    if(!validPassword) 
        return res.sendStatus(401); 


    // to be added later 

    // create jwt token 
    // expiration time is 30 days from current time
    const exp = Date.now() + 1000 * 60 * 60 *24 *30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    // set cookie with the token, check cookie npm option for more details 
    res.cookie('Authorization' , token,  {
        expires: new Date(exp),
        //httpOnly: true,
        sameSite: 'lax',
        secure:  process.env.NODE_ENV === 'production'
    })
    res.cookie('userType' , user.userType,  {
        expires: new Date(exp),
        //httpOnly: true,
        sameSite: 'lax',
        secure:  process.env.NODE_ENV === 'production'
    })
    // send the created jwt token

    res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
    
 
};
const updateRegisteredEvents = async (req, res) => {
    try {
      // Get the id from the URL
      const userId = req.params.id;

      //get the eventid of registered event by user
      const { eventId } = req.body;

      const currentUser = await User.findById(userId);
      
      if (currentUser.registeredEvent.includes(eventId)) {
        // Event ID already exists in the registered events array
        return res.status(409).json({ error: 'Event already registered by the user' });
      }

      // Update the user's registered events with a specific id
      const updateResult = await User.findOneAndUpdate(
        { _id: userId },{
            $push: {
                // Append new data to the existing array
                registeredEvent: eventId
              },
        },
        { new: true } // To return the updated event
      );
  
      if (!updateResult) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Find the updated event
      const updatedUser = await User.findById(userId);
  
      // Respond with the updated event
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      // Handle any unexpected errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
function logout(req, res){
    try {
        res.clearCookie("Authorization");
        res.clearCookie("userType");
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
   
}; 

function checkAuth(req, res){
    // user we are getting from middleware after decoding it from cookie
    // console.log(req.user);
    try {
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
    
}
async function fetchRegisteredEvents(req, res) {
  try {
    // Get the user ID from the URL
    const userId = req.params.id;

    // Find the user with the given ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the IDs of events from the user's registeredEvent array
    const eventIds = user.registeredEvent;

    // Find all events with the retrieved IDs
    const events = await Event.find({ _id: { $in: eventIds } });

    // Respond with the details of events
    res.json({ events });
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }

}

const fetchLoggedUser =  async (req, res)=>{

  try {
    // Get the user ID from the URL
    const userId = req.params.id;

    // Find the user with the given ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Respond with the details of events
    return res.json({ user });
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
const fetchUserOrganziedEvents = async(req ,res) =>{
  try {
    const userId = req.params.id;
    const userEvents = await Event.find({ organizer: userId });

    if (userEvents.length === 0) {
      res.status(404).json({ error: 'No events found for the specified user ID' });
    } else {
      res.status(200).json({ events: userEvents });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}
module.exports = {
    signup,
    login,
    logout,
    checkAuth, 
    updateRegisteredEvents,
    userUpdate,
    fetchRegisteredEvents,
    fetchLoggedUser,
    fetchUserOrganziedEvents
}