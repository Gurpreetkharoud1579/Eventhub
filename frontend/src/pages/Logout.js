import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import authStore from "../store/authStore"

function Logout() {
// using zustand store
const store = authStore();
const navigate = useNavigate();
useEffect(() => {
      // login check
      store.logout();
      navigate("/login");
}, [])

  return (
    <>
    </>
  );
}

export default Logout;