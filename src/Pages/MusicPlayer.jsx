import { useState, useRef, useEffect } from "react";
import Player from "../Components/Player/Player";
import Controls from "../Components/Controls/Controls";
import Playlist from "../Components/Playlist/Playlist";
import VolumeSlider from "../Components/VolumeSlider/VolumeSlider";
import ProgressBar from "../Components/ProgressBar/ProgressBar";
import music from "./MusicPlayer.module.css";

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const audioRef = useRef(null);

  //Song Add Function (Playlist se call hoga)
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newSongs = files.map((file, index) => ({
      id: Date.now() + index,
      title: file.name,
      artist: "Unknown",
      src: URL.createObjectURL(file),
    }));

    setSongs((prevSongs) => {
      const updatedSongs = [...prevSongs, ...newSongs];
      if (prevSongs.length === 0) {
        setCurrentSongIndex(0);
        setIsPlaying(true);
      }
      return updatedSongs;
    });
  };

  //Update audio on song/index change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || songs.length === 0) return;

    audio.pause();
    audio.src = songs[currentSongIndex]?.src || "";
    audio.load();

    audio.onloadeddata = () => {
      if (isPlaying) {
        audio.play().catch((err) => console.error("Auto-play error:", err));
      }
    };
  }, [currentSongIndex, songs]);

  //Play/Pause logic
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.error("Play error:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  //Auto next song logic with repeat & shuffle
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else if (isShuffle) {
        const randomIndex = Math.floor(Math.random() * songs.length);
        setCurrentSongIndex(randomIndex);
      } else {
        setCurrentSongIndex((prevIndex) =>
          prevIndex + 1 < songs.length ? prevIndex + 1 : 0
        );
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isRepeat, isShuffle, songs]);

  return (
    <div className={music.musicplayerContainer}>
      <h1>Music Player</h1>

      <audio ref={audioRef} />

      {songs.length > 0 && (
        <>
          <Player
            currentSong={songs[currentSongIndex]}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            isRepeat={isRepeat}
            setCurrentSongIndex={setCurrentSongIndex}
            songs={songs}
            isShuffle={isShuffle}
          />

          <ProgressBar audioRef={audioRef} />

          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            audioRef={audioRef}
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            totalSongs={songs.length}
            isShuffle={isShuffle}
            setIsShuffle={setIsShuffle}
            isRepeat={isRepeat}
            setIsRepeat={setIsRepeat}
          />

          <VolumeSlider audioRef={audioRef} />
        </>
      )}

      <Playlist
        songs={songs}
        setSongs={setSongs}
        setCurrentSongIndex={setCurrentSongIndex}
        setIsPlaying={setIsPlaying}
        handleFileSelect={handleFileSelect} 
      />
    </div>
  );
};

export default MusicPlayer;
