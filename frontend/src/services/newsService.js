import { useState, useEffect } from "react";
import axios from "axios";
require("dotenv").config();

const useFetch = (method, url, params) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const fetchData = async (method, url, params) => {
    // console.log(
    //   "process.env.API_URL",
    //   process.env.REACT_APP_API_URL,
    //   process.env.REACT_APP_NEWS_API_KEY
    // );
    // url = `${process.env.REACT_APP_API_URL}${url}`;
    url = `http://localhost:3000/api/v1${url}`;
    const token = `Bearer ${localStorage.getItem("authToken")}`;
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const abortController = new AbortController();
    setIsLoading(true);
    setData([]);
    await axios({
      method,
      url,
      signal: abortController.signal,
      // data,
      params,
      config,
    })
      .then((res) => {
        setIsLoading(false);
        setData(res.data.data);
        setCount(res.data.count);
        setSummary(res.data.summary);
        setError(null);
        setIsSuccess(true);
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 401")
          localStorage.removeItem("authToken");
        if (err.name !== "AbortError") {
          // auto catches network / connection error
          setIsLoading(false);
          setError(err.message);
          setIsSuccess(false);
        }
        if (err.name === "AbortError") return () => abortController.abort();
      });
  };

  useEffect(() => {
    fetchData(method, url, params);
  }, [url, params]);

  return [{ data, isLoading, count, error, summary, isSuccess }, fetchData];
};

export default useFetch;

export const getCategoriesCollection = () => [
  { id: "entertainment", title: "Entertainment" },
  { id: "business", title: "Business" },
  { id: "health", title: "Health" },
  { id: "science", title: "Science" },
  { id: "sports", title: "Sports" },
  { id: "technology", title: "Technology" },
];

export const getSortByOptions = () => [
  { id: "popularity", title: "Popularity" },
  { id: "relevancy", title: "Relevancy" },
];
