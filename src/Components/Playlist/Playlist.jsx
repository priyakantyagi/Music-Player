import React, { useRef } from "react";
import styles from "./Playlist.module.css";

const Playlist = ({
  songs,
  setSongs,
  setCurrentSongIndex,
  setIsPlaying,
  handleFileSelect, 
}) => {
  const fileInputRef = useRef();

  const handleSongClick = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className={styles.playlistContainer}>
      <h2>Playlist</h2>

      <button onClick={() => fileInputRef.current.click()} className={styles.addButton}>
        Add Songs
      </button>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="audio/*"
        multiple
        onChange={handleFileSelect}
      />

      <ul className={styles.songList}>
        {songs.map((song, index) => (
          <li key={song.id} onClick={() => handleSongClick(index)}>
            🎵 {song.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
