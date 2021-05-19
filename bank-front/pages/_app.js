import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import ContextProvider from "../context/index";

import "../styles/globals.css";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("loguedUser");
    const getToken = jwt_decode(token);
    console.log("getToken", getToken);
    setUsername(getToken.username);
  }, []);

  return (
    <ContextProvider.Provider value={username}>
      <Component {...pageProps} />;
    </ContextProvider.Provider>
  );
}

export default MyApp;
