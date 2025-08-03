import { useState } from "react";
import volume from "./VolumeSlide.module.css";

const VolumeSlider = ({ audioRef }) => {
  const [volumeValue, setVolumeValue] = useState(1);

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value);
    setVolumeValue(value);
    audioRef.current.volume = value;

    const percentage = value * 100;
    e.target.style.background = `linear-gradient(to right, #00aaff ${percentage}%, #333 ${percentage}%)`;
  };

  return (
    <div className={`${volume.volumeSlider}`}>
      <label>🔊 Volume</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue="1"
        onChange={handleVolumeChange}
        style={{
          background: `linear-gradient(to right, #00aaff 100%, #333 0%)`,
        }}
      />
    </div>
  );
};

export default VolumeSlider;
