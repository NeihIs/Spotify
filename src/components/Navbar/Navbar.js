import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NavbarNavigation from "./NavbarNavigation";
import NavbarContent from "./NavbarContent";
import NavbarLinks from "./NavbarLinks";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navbarElement = useRef(null);

  const location = useLocation().pathname;
  const isLikedSongsPage = location === "/collection/tracks";
  const isPlaylistPage = location.startsWith("/playlist");
  const isAlbumPage = location.startsWith("/album");

  let navbarBackgroundColor = isLikedSongsPage
    ? "80, 56, 160" // purple for liked songs page
    : isPlaylistPage || isAlbumPage
      ? ` ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)}
      ` // any other playlist page's navbar background color
      : "7, 7, 7"; // other pages' navbarBackgroundColor is blackish

  useEffect(() => {
    document.body.style.setProperty(
      "--navbar-background-color",
      navbarBackgroundColor
    );
  }, [location, navbarBackgroundColor]);

  return (
    <div className={styles.navbar} ref={navbarElement} id="navbar-root">
      <NavbarNavigation />
      <NavbarContent />
      <NavbarLinks />
    </div>
  );
};

export default Navbar;
