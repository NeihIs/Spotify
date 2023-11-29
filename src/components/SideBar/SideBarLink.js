import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../UI/Icon";
import styles from "./SideBarLink.module.css";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/reducers/authReducer";

const SideBarLink = (props) => {
  const userLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const dispatch = useDispatch();

  const location = useLocation().pathname;
  // Change Icon Element
  let icon, IconElement;
  if (props.name === "Create Playlist") {
    IconElement = () => {
      return (
        <div className={styles["create-playlist-icon"]}>
          <Icon
            name="sidebar-create-playlist"
            color="#000"
            width={12}
            height={12}
          />
        </div>
      );
    };
  } else if (props.name === "Liked Songs") {
    IconElement = () => {
      return (
        <div className={styles["liked-songs-icon"]}>
          <Icon
            name="sidebar-liked-songs"
            color="#fff"
            width={24}
            height={12}
          />
        </div>
      );
    };
  } else {
    // nếu vị trí bằng props.to, hãy hiển thị kiểu biểu tượng home
    icon =
      location === props.to
        ? "sidebar-" + props.icon + "-active"
        : "sidebar-" + props.icon;
    IconElement = () => {
      return <Icon name={icon} color="#FFF" width={24} height={24} />;
    };
  }

  // clicks 'not now' on popover, focus '#empty' and hide popover
  const resetFocus = () => {
    document.getElementById("empty").focus();
  };

  //liên kết nhấp chuột của người dùng xác thực đi tới liên kết / nhấp chuột vào 'thư viện hoặc bài hát đã thích' thay đổi href thành #
  const to =
    !userLoggedIn &&
      (props.name === "Your Library" || props.name === "Liked Songs")
      ? "#"
      : props.to;

  return (
    <Link
      to={to}
      className={`popover-wrapper ${styles.link} ${props.className}`}
    >
      <IconElement />
      <span className="popover-title">{props.name}</span>
      {!userLoggedIn && props.popoverContentTitle && (
        <div className="popover-content">
          <div className="popover-content-title">
            {props.popoverContentTitle}
          </div>
          <div className="popover-content-text">{props.popoverContentText}</div>
          <div className="popover-content-actions">
            <div onClick={resetFocus}>Not now</div>
            <div onClick={() => dispatch(login())}>Log in</div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default SideBarLink;
