import React from "react";
import { useLocation } from "react-router-dom";
import SearchBox from "./SearchBox";

const NavbarContent = () => {
  const location = useLocation().pathname;
  const showSearchBox = location.startsWith("/search");
  return (
    <div>
      {showSearchBox && <SearchBox />}
    </div>
  );
};

export default NavbarContent;
