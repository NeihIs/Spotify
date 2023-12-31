const CLIENT_ID = "ec6a0789ca36491083f1f513bf238981";
const REDIRECT_URI = "http://localhost:3000/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const API_ENDPOINT = "https://api.spotify.com/v1";

let spotifyAccessToken;

const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "app-remote-control",
  "streaming",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
  "user-follow-modify",
  "user-follow-read",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "user-library-modify",
  "user-library-read",
  "user-read-private",
  "user-read-email",
];

export const LOGIN_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(
  "%20"
)}&response_type=token`;

const generateEndPoint = (type, param) => {
  switch (type) {
    case "CURRENT_USER":
      return `${API_ENDPOINT}/me/`;
    case "CURRENT_USER_PLAYLISTS":
      return `${API_ENDPOINT}/me/playlists`;
    case "CURRENT_USER_SAVED_TRACKS":
      return `${API_ENDPOINT}/me/tracks`;
    case "CURRENT_USER_SAVED_SHOWS":
      return `${API_ENDPOINT}/me/shows`;
    case "CURRENT_USER_SAVED_ALBUMS":
      return `${API_ENDPOINT}/me/albums`;
    case "CURRENT_USER_TOP_ARTISTS":
      return `${API_ENDPOINT}/me/top/artists`;
    case "CURRENT_USER_TOP_TRACKS":
      return `${API_ENDPOINT}/me/top/tracks?time_range=long_term&limit=30`;
    case "CURRENT_USER_FOLLOWED_ARTISTS":
      return `${API_ENDPOINT}/me/following?type=artist`;
    case "PLAYLIST_BY_ID":
      return `${API_ENDPOINT}/playlists/${param}`;
    case "PLAYLIST_ITEMS_BY_ID":
      return `${API_ENDPOINT}/playlists/${param}/tracks`;
    case "ARTIST_BY_ID":
      return `${API_ENDPOINT}/artists/${param}/`;
    case "ARTIST_TOP_TRACKS_BY_ID":
      return `${API_ENDPOINT}/artists/${param}/top-tracks?market=TR`;
    case "ALBUM_BY_ID":
      return `${API_ENDPOINT}/albums/${param}`;
    case "SEVERAL_BROWSE_CATEGORIES":
      return `${API_ENDPOINT}/browse/categories?country=TR&locale=tr_TR&limit=${param}`;
    case "FEATURED_PLAYLISTS":
      return `${API_ENDPOINT}/browse/featured-playlists?country=TR&locale=tr_TR&limit=${param}`;
    case "CREATE_PLAYLIST":
      return `${API_ENDPOINT}/users/${param}/playlists`;

    default:
      throw new Error(
        ">>> Endpoint_type for SpotifyAPI isn't matching. Pass an available endpoint_type. <<<"
      );
  }
};

//API call
const callAPI = async (url, method, body) => {
  let token = localStorage.getItem("accessToken");
  let headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    let response = await fetch(url,
      {
        headers: headers,
        method,
        body: body ? JSON.stringify(body) : undefined,
      }
    );
    if (response.status === 201 || response.status === 200) {
      let jsonResponse = await response.json();
      console.log("response result:", jsonResponse);
      return jsonResponse;
    } else {
      throw new Error(`Error  call api`);
    }
  } catch (err) {
    console.error({ err });
  }
}

const Spotify = {

  getNow() {
    let now = new Date();
    return now.getTime();
  },
  getAccessToken() {
    //trích xuất giá trị của tham số access_token từ hash URL bằng cách sử dụng biểu thức chính quy và gán nó cho accessToken.
    let accessToken = window.location.hash.match(/access_token=([^&]*)/);
    //trích xuất giá trị của expires_in từ hash URL và gán nó cho expiresIn.
    let expiresIn = window.location.hash.match(/expires_in=([^&]*)/);
    if (accessToken && expiresIn) {
      // trích xuất giá trị mã thông báo truy cập thực tế từ mảng accessToken và gán nó cho spotifyAccessToken
      spotifyAccessToken = accessToken[1];
      // lưu trữ spotifyAccessToken trong bộ nhớ cục bộ của trình duyệt bằng localStorage.setItem()
      localStorage.setItem("accessToken", spotifyAccessToken);
      //chuyển đổi giá trị expiresIn, là một chuỗi, thành một số và nhân nó với 1000 để chuyển đổi từ giây sang mili giây
      let expiryTime = Number(expiresIn[1]) * 1000;
      // lưu trữ thời gian hết hạn được tính bằng mili giây trong bộ nhớ cục bộ bằng localStorage.setItem()
      localStorage.setItem("accessTokenExpiry", this.getNow() + expiryTime);
      // cập nhật hash URL để loại bỏ các tham số mã thông báo truy cập và thời gian hết hạn
      window.history.pushState("Access Token", " ", "/");
      return spotifyAccessToken;
    } else {
      window.location.assign(LOGIN_URL);
      return "";
    }
  },
  async search(query, type, limit, offset) {
    const results = await callAPI(
      `${API_ENDPOINT}/search?q=${query}&type=${type}&market=TR${limit ? "&limit=" + limit : ""}${offset ? "&offset=" + offset : ""}`,
      "GET");
    return results;
  },

  async getFromSpotify(type, param) {
    if (!localStorage.getItem("accessToken")) {
      return null;
    }
    const url = generateEndPoint(type, param);
    const method = "GET";
    try {
      const response = await callAPI(url, method);
      return response;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  async createPlaylist(name) {
    const userId = "31wn3gfmnua3b4ubfse6jytjifvi";
    const body = {
      name
    }
    const result = await callAPI(
      `${API_ENDPOINT}/users/${userId}/playlists`,
      "POST",
      body
    )
    return result;
  }


};


export default Spotify;
