import React, {
  useEffect,

} from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/reducers/authReducer";

const CallbackPage = () => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      window.location.replace("/");
    } else {
      dispatch(login());
    }
  }, [dispatch, isUserLoggedIn]);
  return <div></div>;
};

export default CallbackPage;
