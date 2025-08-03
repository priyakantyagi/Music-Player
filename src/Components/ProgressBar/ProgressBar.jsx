import { useEffect, useRef, useState } from "react";
import prog from "./Progress.module.css";

const ProgressBar = ({ audioRef }) => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoverTime, setHoverTime] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(0);

  const progressBarRef = useRef();

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const updateProgress = () => {
      const audio = audioRef.current;
      if (audio?.duration && !isNaN(audio.duration)) {
        const percent = (audio.currentTime / audio.duration) * 100;
        setProgress(percent);
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      }
    };

    const interval = setInterval(updateProgress, 500);
    return () => clearInterval(interval);
  }, [audioRef]);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio?.duration && !isNaN(audio.duration)) {
      const newTime = (e.target.value / 100) * audio.duration;
      audio.currentTime = newTime;
      setProgress(e.target.value);
      setCurrentTime(newTime);
    }
  };

  const handleMouseMove = (e) => {
    const bar = progressBarRef.current;
    const rect = bar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = offsetX / rect.width;
    const time = percent * duration;

    setHoverTime(time);
    setHoverPosition(offsetX);
  };

  const handleMouseLeave = () => {
    setHoverTime(null);
  };

  return (
    <div className={prog.progressBar}>
      <div className={prog.timeContainer}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div
        className={prog.rangeWrapper}
        ref={progressBarRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className={prog.rangeInput}
        />
        {hoverTime !== null && (
          <div
            className={prog.hoverTooltip}
            style={{ left: `${hoverPosition}px` }}
          >
            {formatTime(hoverTime)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
