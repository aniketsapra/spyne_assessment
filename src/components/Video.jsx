import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

const Video = () => {
  const [ytVideo, setYtVideo] = useState('');
  const [ytURL, setYtURL] = useState('https://www.youtube.com/watch?v=LXb3EKWsInQ');
  const [ytError, setYtError] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [caption, setCaption] = useState('');
  const [captions, setCaptions] = useState([]);
  const [currentCaption, setCurrentCaption] = useState('');
  const playerRef = useRef(null);

  const handleChange = (e) => {
    setYtVideo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/;
    if (youtubeRegex.test(ytVideo)) {
      setYtURL(ytVideo);
      setYtError('');
    } else {
      setYtError('Invalid URL');
    }
  };

  const handleCaptionSubmit = (e) => {
    e.preventDefault();
    if (!timestamp.trim() || !caption.trim()) {
      return;
    }
    const [minutes, seconds] = timestamp.split(':').map(Number);
    const timeInSeconds = minutes * 60 + seconds;
    setCaptions([...captions, { time: timeInSeconds, text: caption.trim() }]);
    setTimestamp('');
    setCaption('');
  };

  const handleTimestampChange = (e) => {
    setTimestamp(e.target.value);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleProgress = (state) => {
    const currentTime = Math.floor(state.playedSeconds);
    const currentCaption = captions.find(caption => caption.time === currentTime);
    if (currentCaption) {
      setCurrentCaption(currentCaption.text);
    } else {
      setCurrentCaption('');
    }
  };

  const playerConfig = {
    disableCaptions: true,
  };

  return (
    <div className='wrapper'>
      <p className='title'>Spyne Frontend Assignment</p>
      <form className='form-group form' onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type='text'
          className='form-control'
          placeholder='Enter URL'
          value={ytVideo}
          onChange={handleChange}
          required
        />
        <button type='submit' className='btn btn-success btn-md'>
          Upload
        </button>
      </form>
      {ytError && <div className='error-msg'>{ytError}</div>}
      <br />
      
      <br />
      <div className='youtube-box' style={{ position: 'relative' }}>
        <ReactPlayer
          ref={playerRef}
          key={ytURL}
          url={ytURL}
          className='video'
          controls
          config={playerConfig}
          onProgress={handleProgress}
          width='100%'
          height='100%'
        />
        {currentCaption && (
          <div className='caption' style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#fff', padding: '5px 10px', borderRadius: '5px' }}>
            {currentCaption}
          </div>
        )}
      </div>

      <form className='form-group form2' onSubmit={handleCaptionSubmit} style={{ marginTop: '20px' }}>
        
        <input
          type='text'
          className='form-control'
          placeholder='Enter Timestamp (e.g., 1:23)'
          value={timestamp}
          onChange={handleTimestampChange}
          required
        />
        <input
          type='text'
          className='form-control'
          placeholder='Enter Caption'
          value={caption}
          onChange={handleCaptionChange}
          required
        />
        <button type='submit' className='btn btn-primary'>
          Add Caption
        </button>
      </form>
    </div>
  );
}

export default Video;
