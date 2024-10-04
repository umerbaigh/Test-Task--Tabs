import React, { useContext, useRef, useState } from "react";
import { VideoContext } from "../context/video-context";

const VideoUploadButton: React.FC = () => {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const {
    duration,
    endTime,
    startTime,
    videoSrc,
    setDuration,
    setEndTime,
    setStartTime,
    setVideoSrc,
  } = useContext(VideoContext);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "video/mp4") {
        const url = URL.createObjectURL(file);
        setVideoSrc(url);
      } else {
        alert("Please upload an MP4 video file.");
      }
    }
  };

  const handleVideoMetadataLoaded = (
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    const videoElement = event.currentTarget;
    setDuration(videoElement.duration);
    setEndTime(videoElement.duration);
  };

  const trimVideo = () => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.currentTime = startTime;
      videoPlayerRef.current.play();

      setTimeout(() => {
        if (videoPlayerRef.current) {
          videoPlayerRef.current.pause();
        }
      }, (endTime - startTime) * 1000);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 pb-48">
      <label className="relative cursor-pointer bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-2 px-6 rounded-full hover:bg-gradient-to-l hover:scale-105 hover:shadow-xl transition-all duration-500 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-teal-400">
        <p className="cursor-pointer">
          {videoSrc ? "Click to change video" : "Click to upload video"}
        </p>
        <input
          type="file"
          accept="video/mp4"
          onChange={handleVideoUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </label>

      {videoSrc ? (
        <div className="w-full md:px-20 container h-[600px] z-50">
          <video
            controls
            src={videoSrc}
            className="object-cover w-full h-full rounded-lg shadow-lg"
            onLoadedMetadata={handleVideoMetadataLoaded}
            ref={videoPlayerRef}
          >
            Your browser does not support the video tag.
          </video>

          <div className="flex flex-col items-center my-4 space-y-6">
            <div className="flex flex-col w-full md:w-3/4">
              <label className="flex flex-col mb-2">
                <span className="font-semibold text-secondary">
                  Start Time: {startTime.toFixed(2)} seconds
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration}
                  step={0.1}
                  value={startTime}
                  onChange={(e) =>
                    setStartTime(Math.min(Number(e.target.value), endTime))
                  }
                  className="range-slider mt-2 appearance-none h-2 bg-gray-200 rounded-lg"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 ${(
                      (startTime / duration) *
                      100
                    ).toFixed(2)}%, #d1d5db ${(
                      (startTime / duration) *
                      100
                    ).toFixed(2)}%)`,
                  }}
                />
              </label>
              <label className="flex flex-col mb-2">
                <span className="font-semibold text-secondary">
                  End Time: {endTime.toFixed(2)} seconds
                </span>
                <input
                  type="range"
                  min={startTime}
                  max={duration}
                  step={0.1}
                  value={endTime}
                  onChange={(e) =>
                    setEndTime(Math.max(Number(e.target.value), startTime))
                  }
                  className="range-slider mt-2 appearance-none h-2 bg-gray-200 rounded-lg"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 ${(
                      (endTime / duration) *
                      100
                    ).toFixed(2)}%, #d1d5db ${(
                      (endTime / duration) *
                      100
                    ).toFixed(2)}%)`,
                  }}
                />
              </label>
            </div>
            <button
              onClick={trimVideo}
              className="my-3 bg-primary text-secondary py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Trim Video
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full md:px-20 container h-[600px] bg-primary/5 rounded-lg z-50 flex items-center justify-center"></div>
      )}
    </div>
  );
};

export default VideoUploadButton;
