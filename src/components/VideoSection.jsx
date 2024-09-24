import React, { useEffect, useRef } from 'react';

const VideoSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error attempting to play video:", error);
      });
    }
  }, []);

  return (
    <div className="relative h-screen">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-cards-being-thrown-on-a-green-table-4927-large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white text-center">
          Welcome to Elemental Masters
        </h1>
      </div>
    </div>
  );
};

export default VideoSection;
