import { FaPlay, FaPause, FaForward, FaBackward, FaRandom, FaRedo } from "react-icons/fa";
import control from "./Controls.module.css"

const Controls = ({
  isPlaying,
  setIsPlaying,
  audioRef,
  currentSongIndex,
  setCurrentSongIndex,
  totalSongs,
  isShuffle,
  setIsShuffle,
  isRepeat,
  setIsRepeat,
}) => {
  // Play / Pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Previous Song
  const playPrev = () => {
  if (audioRef.current.currentTime > 2) {
    // If song has played more than 2 seconds, just restart it
    audioRef.current.currentTime = 0;
  } else {
    // Otherwise, go to previous song in playlist
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? totalSongs - 1 : prevIndex - 1
    );
    setIsPlaying(true);
  }
};


  // Next Song
  const playNext = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === totalSongs - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(true);
  };

  return (
    <div className={`${control.controls}`}>
      <button onClick={() => setIsShuffle(!isShuffle)} title="Shuffle">
        <FaRandom color={isShuffle ? "green" : "gray"} />
      </button>

      <button onClick={playPrev} title="Previous">
        <FaBackward />
      </button>

      <button onClick={togglePlayPause} title="Play/Pause">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <button onClick={playNext} title="Next">
        <FaForward />
      </button>

      <button onClick={() => setIsRepeat(!isRepeat)} title="Repeat">
        <FaRedo color={isRepeat ? "green" : "gray"} />
      </button>
    </div>
  );
};

export default Controls;
