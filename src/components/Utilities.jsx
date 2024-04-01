// import Img from "../assets/profile_img.webp";
// import { MdWork, MdSchool } from "react-icons/md";

import { useEffect, useState, useRef } from "react";
let currentSongIndex = -1;
const Utilities = () => {
  const [note, setNote] = useState("");
  const [quote, setQuote] = useState(
    "Press the below button to get the quote of the day!"
  );
  const [song, setSong] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const audioPlayer = new Audio();
  const [playing, setPlaying] = useState(false);
  const [playingText, setPlayingText] = useState("None playing");
  const changeNote = (e) => {
    setNote(e.target.value);
    console.log(note);
  };
  const getQuote = async () => {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    const responseQuote = `"${data.content}" - ${data.author}`;
    setQuote(responseQuote);
  };
  const downloadNotes = () => {
    if (note.length > 10) {
      const blob = new Blob([note], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my_notes.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else {
      alert("Note should be at least 10 characters long.");
    }
  };
  const fetchPlaylist = async () => {
    const clientId = "b4ac466278f542e28f8deb3c3030c703";
    const clientSecret = "ecd8d7bfea1d4da596b427f1b24e5b89";
    const basicAuth = btoa(`${clientId}:${clientSecret}`);
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    const data = await response.json();
    const accessToken = data.access_token;
    const playlistResponse = await fetch(
      "https://api.spotify.com/v1/playlists/6ZgP8m2OJnDiGC0xGt8y5g/tracks",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const playlistData = await playlistResponse.json();
    let playlist = playlistData.items
      .map((item) => ({ url: item.track.preview_url, name: item.track.name }))
      .filter((item) => item.url);
    console.log(playlist);
    setPlaylist(playlist);
  };
  const playSong = () => {
    if (audioPlayer.paused) {
      setPlaying(true);
      audioPlayer.play();
    } else {
      setPlaying(false);
      audioPlayer.pause();
    }
  };
  function playSelectedSong() {
    audioPlayer.src = playlist[currentSongIndex].url;
    console.log('audio',audioPlayer)
    audioPlayer.play();
  }

  function updateCurrentSong() {
    setPlayingText(playlist[currentSongIndex].name);
  }
  const prevSong = () => {
    if (playlist.length === 0) return;
    currentSongIndex =
      (currentSongIndex - 1 + playlist.length) % playlist.length;
    updateCurrentSong();
    playSelectedSong();
  };
  const playRandomSong = () => {
    if (playlist.length === 0) return;
    currentSongIndex = Math.floor(Math.random() * playlist.length);
    updateCurrentSong();
    playSelectedSong();
  };
  useEffect(() => {
    fetchPlaylist();
  }, []);
  return (
    <div>
      <section id="projects" className="utils-section">
        <p className="section__text__p1">Play with my</p>
        <h1 className="title">Utilities</h1>
        <div className="main">
          <ul className="cards">
            <li className="cards_item item-util">
              <div className="util_card">
                <div className="utils_content">
                  <h2 className="card_title">Download your notes</h2>
                  <textarea
                    value={note}
                    onChange={changeNote}
                    className="card_text"
                    rows={5}
                    cols={40}
                  />
                  <button className="btn card_btn" onClick={downloadNotes}>
                    Download notes
                  </button>
                </div>
              </div>
            </li>
            <li className="cards_item item-util">
              <div className="util_card">
                <div className="utils_content quote">
                  <h2 className="card_title">Quote for the day</h2>
                  <h2 className="card_text">{quote}</h2>
                  <br />
                  <button className="btn card_btn" onClick={getQuote}>
                    Quote&nbsp;&nbsp;&gt;&gt;
                  </button>
                </div>
              </div>
            </li>
            <li className="cards_item item-util">
              <div className="util_card">
                <div className="utils_content music-card">
                  <div className="utility" id="music-player">
                    <h2>Music Player</h2>
                    <div id="music-controls">
                      <button id="prev-song-btn" className="buttonmusic">
                        <i className="fas fa-backward"></i>
                      </button>
                      <button id="play-song-btn" className="buttonmusic" onClick={playSong}>
                        {!playing ? (
                          <i className="fas fa-play"></i>
                        ) : (
                          <i className="fas fa-pause"></i>
                        )}
                      </button>
                      <button id="next-song-btn" className="buttonmusic">
                        <i className="fas fa-forward"></i>
                      </button>
                      <button
                        id="play-random-song-btn"
                        className="buttonmusic"
                        onClick={playRandomSong}
                      >
                        <i className="fas fa-random"></i>
                      </button>
                    </div>
                    <p id="current-song">Current Song: {playingText}</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Utilities;
