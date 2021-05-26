import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import ContextProvider from "../context/index";

import "../styles/globals.css";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  const [id, setId] = useState();

  useEffect(() => {
    const token = localStorage.getItem("loguedUser");
    const getToken = jwt_decode(token);
    setId(getToken.id);
  }, []);

  return (
    <ContextProvider.Provider value={id}>
      <Component {...pageProps} />
    </ContextProvider.Provider>
  );
}

export default MyApp;
