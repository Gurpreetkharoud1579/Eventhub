import axios from 'axios';
import { create } from 'zustand';

const authStore = create((set) => ({
    // states
    loginForm: {
        email: '',
        password: ''
    },
    signupForm: {
        email: '',
        password: '',
        userType: 'user',
    },
    userUpdateForm: {
        firstName: '',
        lastName: '',
        address: '',
        contactNumber:'',
        city:'',
        province:'',
        zipCode:''
    },
    loggedIn: null,
    userType: null,
    userId: null,
    loggedInUserInfo: null,
    userOrganizedEvents: null,
    registeredEvents: null,
    // functions
    updateLoginForm: (e) => {
        // get value and name from event(onChange)
        const { name, value } = e.target;
        // set loginForm values in the state
        set((state) => {
            return {
                loginForm: {
                    ...state.loginForm,
                    [name]: value,
                }
            }
        })
    },
    login: async () => {
        try {
            const { loginForm } = authStore.getState();

            if (!loginForm.email || !loginForm.password) {
                return -1;
            }
            const response = await axios.post('http://localhost:2300/login', loginForm);
            if (response.status === 200) {
                set({
                    loginForm: {
                        email: '',
                        password: '',
                    },
                    loggedIn: true,
                    userType: response.data.userType,
                    userId: response.data._id,
                    loggedInUserInfo: response.data
                });
                return 1;
            } else {
                return 0;
            }
        } catch (error) {
            return 0;
        }
    },
    // check if session have authorization
    checkAuth: async () => {
        try {
            await axios.get('http://localhost:2300/check-auth');
            // now set the loggedIn state to true
            set({ loggedIn: true });
        } catch (error) {
            set({ loggedIn: false });
        }
    },
    // check if session have authorization
    checkAdminAuth: async () => {
        try {
            await axios.get('http://localhost:2300/check-admin-auth');
            set({
                loggedIn: true,
                userType: 'admin'
            });

        } catch (error) {
            set({ loggedIn: false, userType: '' });
        }
    },
    logout: async () => {
        try {
            await axios.get('http://localhost:2300/logout');
            // now set the loggedIn state to false
            set({
                loggedIn: false,
                loginForm: {
                    email: '',
                    password: '',

                },
                userType: null,
                userId: null,
                userOrganizedEvents: null,
                registeredEvents: null,
            });
        } catch (error) {
        }
    },
    updateSignupForm: (e) => {
        // get value and name from event(onChange)
        const { name, value } = e.target;
        // set loginForm values in the state
        set((state) => {
            return {
                signupForm: {
                    ...state.signupForm,
                    [name]: value,
                }
            }
        })
    },
    signup: async (userType) => { 
        var { signupForm } = authStore.getState();
        set({
            signupForm: {
                ...signupForm,
                userType: userType,
            }
        });
        var { signupForm }  = authStore.getState();
        try {
            const response = await axios.post('http://localhost:2300/signup', signupForm);
            if (response.status === 200) {
                // clear the state
                set({
                    signupForm: {
                        email: '',
                        password: '',
                        userType: '',
                    }
                });
                return 1;
            } else {
                return 0;
            }
        } catch (error) {
            return 0;
        }
    },
    userEventRegister: async (eventId) => {
        const { userId } = authStore.getState();
        try {
            const response = await axios.put(`http://localhost:2300/user-event-register/${userId}`, { eventId });
            if (response.status === 200) {
                return 1;
            }
        } catch (error) {
            if (error.message.includes('409')) {
                return 0
            } else {
                return -1;
            }
        }
    },
    userUpdate: async () => {
        const { userId, userUpdateForm } = authStore.getState();
        try {
            
            const response = await axios.put(`http://localhost:2300/user-update/${userId}`, userUpdateForm);
            if (response.status === 200) {
                set({
                    loggedInUserInfo: response.data.user
                });
                return 200;
            } else {
                return 0;
            }
        } catch (error) {
            return 0;
        }
    },
    fetchRegisteredEvents: async () => {
        const { userId } = authStore.getState();

        try {
            const response = await axios.get(`http://localhost:2300/user-registered-events/${userId}`);
            if (response.status === 200) {
                set({
                    registeredEvents: response.data.events
                });
                return 0;
            } else {
                return 0;
            }
        } catch (error) {
            return 0;
        }
    },
    updateUserUpdateForm: (e) => {
        // get value and name from event(onChange)
        const { name, value } = e.target;
        // set userUpdateForm values in the state
        set((state) => {
            return {
                userUpdateForm: {
                    ...state.userUpdateForm,
                    [name]: value,
                }
            }
        })
    },
    fetchUserOrganizedEvents: async ()=>{
        const { userId } = authStore.getState();
        console.log("logged in user is", userId);
        try {
            const response = await axios.get(`http://localhost:2300/user-organized-events/${userId}`);
            if (response.status === 200) {
                set({
                    userOrganizedEvents: response.data.events
                });
                return 200;
            } else {
                return 0;
            }
        } catch (error) {
            return 0;
        }
    }

}))

export default authStore;