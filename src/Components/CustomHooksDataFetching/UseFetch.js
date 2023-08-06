import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useFetch = (url) => {
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState(null);

  let intervalId;
  useEffect(() => {
    const fetchData = () => {
      if (auth.isLoggedIn) {
        const getApi = axios
          .get(url)
          .then((response) => {
            // console.log("response", response.data);
            setData(response.data);
          })
          .catch((error) => {
            console.log("Error", error);
          });
      }
    };
    // Get Api call at  every 2 seconds using setInterval
    intervalId = setInterval(fetchData, 1000);
    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [url, auth.isLoggedIn]);
  return [data];
};
export default useFetch;
