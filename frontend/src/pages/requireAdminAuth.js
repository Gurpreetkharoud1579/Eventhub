import { useEffect } from "react";
import { Navigate } from 'react-router-dom';
import authStore from "../store/authStore";

export default function RequireAdminAuth(props) {
    const store = authStore();
    useEffect(() => {
        if (store.loggedIn === null)
            store.checkAdminAuth();
    }, [])
    if (store.loggedIn === null)
        return <div>Loading</div>
        if (store.loggedIn === false || store.userType != 'admin' )
        return <Navigate to="/login" />
    return (
        <div>{props.children}</div>
    )
}
