import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../UI/Icon";
import styles from "./NavbarNavigation.module.css";

const NavbarNavigation = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.buttons}>
      <div onClick={() => navigate(-1)}>
        <Icon name="arrow-left" color="#FFFFFF" width={22} height={22} />
      </div>
      <div onClick={() => navigate(1)}>
        <Icon name="arrow-right" color="#FFFFFF" width={22} height={22} />
      </div>
    </div>
  );
};

export default NavbarNavigation;
