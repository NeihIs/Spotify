import React from "react"; // , { useContext }
import { useParams } from "react-router-dom";
import SearchNavigation from "./SearchNavigation";
import CardsGrid from "./CardsGrid";
import TracksList from "./TracksList";
import SearchAll from "./SearchAll";
import { useSelector } from "react-redux";

const SearchPage = () => {
  // const appCtx = useContext(AppContext);
  const isSearching = useSelector((state) => state.search.isSearching);

  const { searchType } = useParams();
  return (
    <React.Fragment>
      {isSearching && (
        <div className="padding-0-32">
          <SearchNavigation />
          {searchType === undefined && <SearchAll />}
          {searchType === "tracks" && <TracksList />}
          {searchType !== "tracks" && searchType !== undefined && <CardsGrid />}
        </div>
      )}
      {!isSearching && <CardsGrid genres />}
    </React.Fragment>
  );
};

export default SearchPage;
