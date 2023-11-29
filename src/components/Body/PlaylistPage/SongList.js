import React, {
} from "react";
import { Link } from "react-router-dom";
import { formatDate, millisToMinutesAndSeconds } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { changeTrack } from "../../../store/reducers/playerReducer";

import Icon from "../../UI/Icon";
import styles from "./SongList.module.css";

const SongList = (props) => {
  const trackSrc = useSelector((state) => state.player.trackSrc);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const dispatch = useDispatch();

  return (
    <div className={styles.table}>
      <div className={styles["table-header"]} >
        <div>#</div>
        <div>Title</div>
        {props.page !== "album" ? <div>Album</div> : null}
        {props.page !== "album" ? (
          props.page === "artist" ? (
            <div>Date Released</div>
          ) : (
            <div>Date Added</div>
          )
        ) : null}
        <div>
          <Icon name="duration" height={16} width={16} color="#b3b3b3" />
        </div>
      </div>
      <div className={styles.playlist}>
        {props.songs
          ? props.songs.map((song, index) => {
            let track =
              props.page === "artist" || props.page === "album"
                ? song
                : song.track;
            return (
              <div className={styles.item} key={index}>
                <div className={styles.index}>
                  {track.preview_url ? (
                    <React.Fragment>
                      {track.preview_url === trackSrc ? (
                        isPlaying ? (
                          <img
                            src="/playing.gif"
                            width="15"
                            height="15"
                            alt="Track is playing"
                            className={styles["index-number"]}
                          />
                        ) : (
                          <Icon name="track-paused" width={16} height={16} />
                        )
                      ) : (
                        <div className={styles["index-number"]}>
                          {index + 1}
                        </div>
                      )}
                      <div
                        className={styles["index-icon"]}
                        onClick={
                          () =>
                            dispatch(
                              changeTrack({ track: track.preview_url })
                            )
                        }
                      >
                        <Icon
                          name="player-play"
                          width={12}
                          height={12}
                          color="#fff"
                        />
                      </div>
                    </React.Fragment>
                  ) : (
                    // Nếu bản nhạc không có "preview_url" thì hiển thị biểu tượng không có sẵn
                    <div title="Preview track is unavailable">🚫</div>
                  )}
                </div>
                <div className={styles.meta}>
                  <img
                    loading="lazy"
                    src={
                      track.album ? track.album.images[0].url : "/blank.jpg"
                    }
                    alt="Song"
                  />
                  <div className={styles["song-artist-column"]}>
                    <div className={styles["song-name"]}>{track.name}</div>
                    <div className={styles["artist-links"]}>
                      {track.artists
                        ? track.artists.map((artist, i) => (
                          <React.Fragment key={i}>
                            <Link
                              className={styles["song-link"]}
                              to={`/artist/${artist.id}`}
                            >
                              {artist.name}
                            </Link>
                            {track.artists.length - 2 < i ? null : ", "}
                          </React.Fragment>
                        ))
                        : null}
                    </div>
                  </div>
                </div>
                {track.album ? (
                  <div className={styles.album}>
                    <Link to={`/album/${track.album.id}`}>
                      {track.album.name}
                    </Link>
                  </div>
                ) : null}
                {props.page !== "album" && (
                  <div className={styles.date}>
                    {formatDate(track.album.release_date)}
                  </div>
                )}
                <div className={styles.duration}>
                  <span>{millisToMinutesAndSeconds(track.duration_ms)}</span>
                </div>
              </div>
            );
          })
          : null}
      </div>
    </div>
  );
};

export default SongList;
