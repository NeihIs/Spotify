import React from "react";
import { useLocation } from "react-router-dom";
import LibraryTabs from "./LibraryTabs";
import SearchBox from "./SearchBox";
import NowPlaying from "./NowPlaying";

const NavbarContent = () => {
  const location = useLocation().pathname;
  const showSearchBox = location.startsWith("/search");
  const showTabs =
    location.startsWith("/collection/") && location !== "/collection/tracks";
  const showPlayButton =
    location.startsWith("/playlist") ||
    location === "/collection/tracks" ||
    location.startsWith("/artist") ||
    location.startsWith("/album");

  return (
    <div>
      {showSearchBox && <SearchBox />}
      {showTabs && <LibraryTabs />}
      {showPlayButton && <NowPlaying />}
    </div>
  );
};

export default NavbarContent;
