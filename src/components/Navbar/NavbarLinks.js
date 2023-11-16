import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import Spotify from "../../spotify/api";
import Icon from "../UI/Icon";
import styles from "./NavbarLinks.module.css";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../store/reducers/authReducer";

const NavbarLinks = () => {
  const userLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const dispatch = useDispatch();

  const [user, setUser] = useState();

  const getCurrentUser = useCallback(async () => {
    let currentUser = await Spotify.getFromSpotify("CURRENT_USER");
    setUser(currentUser);
  }, []);

  useEffect(() => {
    userLoggedIn && getCurrentUser();
  }, [userLoggedIn, getCurrentUser]);

  return (
    <div>
      {!userLoggedIn && (
        <div className={styles.links}>
          <div>Sign up</div>
          <div onClick={() => dispatch(login())}>Log in</div>
        </div>
      )}
      {userLoggedIn && (
        <div className={styles.buttons}>
          <div >Upgrade</div>
          <div tabIndex={0}>
            <img
              loading="lazy"
              src={
                user
                  ? user.images[0]?.url
                  : "https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021"
              }
              alt="Profile"
            />
            <span>{user ? user.display_name : null}</span>
            <Icon name="navbar-drop-down" color="#fff" width={16} height={16} />
            <div className={styles.dropdown}>
              <div >
                <span>Account</span>
                <span role="img" aria-label="External Link">
                  🔗
                </span>
              </div>
              <div >Profile</div>
              <div >
                <span>Upgrade to Premium</span>
                <span role="img" aria-label="External Link">
                  🔗
                </span>
              </div>
              <div >
                <span>Support</span>
                <span role="img" aria-label="External Link">
                  🔗
                </span>
              </div>
              <div >
                <span>Download</span>
                <span role="img" aria-label="External Link">
                  🔗
                </span>
              </div>
              <div >Settings</div>
              <div onClick={() => dispatch(logout())} className="pointer">
                Log out
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarLinks;
