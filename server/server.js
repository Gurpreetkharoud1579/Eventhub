// load local variables
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

// import dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectToDB = require('./config/dbConfig');
const usersController = require('./controllers/userController');
const requireAuth = require('./middleware/requireAuth');
const { fetchEvent, createEvent, fetchEventById, updateEvent, deleteEvent, updateEventStatus } = require('./controllers/eventController');
const adminAuth = require('./middleware/adminAuth');

 // app using express
const app = express();

// configure express
// by default express dont understand json so used this
app.use(express.json());
// to enable request from other origin i.e. otherthan this port
app.use(cors(
    {
        origin: true,
        credentials: true
    }
));
 // to get data out of request as an object
 app.use(bodyParser.urlencoded({extended:true})); 
// enable express to use cookie as default express cant read it 
app.use(cookieParser());

// connect to database
connectToDB();

// Routing 

app.post('/signup', usersController.signup);
app.post('/login', usersController.login);
app.get('/logout', usersController.logout);

app.get('/check-auth', requireAuth,usersController.checkAuth);
app.get('/check-admin-auth', adminAuth,usersController.checkAuth);

app.put('/user-update/:id', requireAuth , usersController.userUpdate);
app.put('/user-event-register/:id', requireAuth ,usersController.updateRegisteredEvents);
app.get('/user-registered-events/:id', requireAuth ,usersController.fetchRegisteredEvents);
app.get('/user-organized-events/:id', requireAuth ,usersController.fetchUserOrganziedEvents);
app.get('/user-profile/:id', requireAuth ,usersController.fetchLoggedUser);

// get all events
app.get('/events', fetchEvent );
// create a new event
app.post('/events' ,requireAuth,createEvent);
// get the specific event
app.get('/events/:id', fetchEventById );
// update event
app.put('/events/:id', requireAuth,updateEvent);
// delete specific note
app.delete('/events/:id', requireAuth, deleteEvent);

app.put('/events/eventStatus/:id', adminAuth, updateEventStatus);

app.listen(process.env.PORT, ()=> {
    console.log("App is running at port 2300!!")
});