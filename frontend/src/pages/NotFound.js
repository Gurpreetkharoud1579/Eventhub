import { NavLink } from "react-router-dom";

const NotFound = () =>{
    return(
        <>
            <h1>Page Not Found ! 404 . </h1>
            <p>Go to homepage. 
            <NavLink to="/" className="text-blue-700 underline">HomePage</NavLink>
            </p>
        </>
    )
}

export default NotFound;