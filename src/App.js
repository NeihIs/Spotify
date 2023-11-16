import React, {
  useEffect,
} from "react";
import Layout from "./components/Layout";

import { useSelector, useDispatch } from "react-redux";
import { login } from "./store/reducers/authReducer";

function App() {

  const userLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    let now = new Date();

    if (
      localStorage.getItem("accessTokenExpiry") &&
      now.getTime() > localStorage.getItem("accessTokenExpiry")
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenExpiry");
    } else if (localStorage.getItem("accessToken")) {
      dispatch(login());

    }
  }, [userLoggedIn, dispatch]);

  return <Layout />;
}

export default App;
