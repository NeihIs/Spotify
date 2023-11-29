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
  //startsWith() để kiểm tra xem pathname của location có bắt đầu bằng một chuỗi nhất định hay không
  const isPlaylistPage = location.startsWith("/playlist");
  const isAlbumPage = location.startsWith("/album");

  let navbarBackgroundColor = isLikedSongsPage
    ? "80, 56, 160" // màu tím cho trang bài hát thích
    : isPlaylistPage || isAlbumPage
      ? ` ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)}
      ` // màu nền thanh điều hướng của bất kỳ trang danh sách phát nào khác
      : "7, 7, 7"; // thanh điều hướng của các trang khác BackgroundColor có màu hơi đen

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
