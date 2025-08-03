  import { useEffect, useRef, useState } from "react";
  import Controls from "../Controls/Controls";
  import ProgressBar from "../ProgressBar/ProgressBar";

  const Player = ({
    currentSongIndex,
    setCurrentSongIndex,
    songs,
    isPlaying,
    setIsPlaying,
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
  }) => {
    const audioRef = useRef(null);
    const [objectUrl, setObjectUrl] = useState(null);

    const currentSong = songs[currentSongIndex];

    //Sync play/pause toggle
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      if (isPlaying) {
        audio.play().catch((err) => console.error("Play error:", err));
      } else {
        audio.pause();
      }
    }, [isPlaying]);

    //Set source based on File or URL whenever song changes
    useEffect(() => {
    if (!audioRef.current || songs.length === 0) return;

    const audio = audioRef.current;
    const song = songs[currentSongIndex];

    //Revoke old object URL
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }

    if (typeof song.url === "string") {
      audio.src = song.url;
    } else {
      const newUrl = URL.createObjectURL(song.url);
      audio.src = newUrl;
      setObjectUrl(newUrl);
    }

    //Auto play
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.error("Auto-play error:", err));
  }, [currentSongIndex, songs]); // <-- add songs as dependency here


    //Handle when song ends
    const handleEnded = () => {
      if (isRepeat) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else if (isShuffle) {
        let nextIndex = Math.floor(Math.random() * songs.length);
        while (nextIndex === currentSongIndex && songs.length > 1) {
          nextIndex = Math.floor(Math.random() * songs.length);
        }
        setCurrentSongIndex(nextIndex);
      } else {
        setCurrentSongIndex((prevIndex) =>
          prevIndex === songs.length - 1 ? 0 : prevIndex + 1
        );
      }
    };

    if (!currentSong) return <div>Loading...</div>;

    return (
      <div>
        <h3>{currentSong.title}</h3>

        {/*Don't use src prop. It conflicts with manual audioRef.src assignment */}
        <audio
          ref={audioRef}
          onEnded={handleEnded}
          preload="auto"
        />

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

        <ProgressBar
          audioRef={audioRef}
          isPlaying={isPlaying}
          key={currentSongIndex} 
        />
      </div>
    );
  };

  export default Player;
