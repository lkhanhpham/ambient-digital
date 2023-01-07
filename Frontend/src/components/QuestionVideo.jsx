import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants.ts";
const QuestionVideo = (props) => {
  const [video, setVideo] = useState([]);
  //gets the image from api
  const getVideo = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/video/` + props.video + "/"
    );
    const data = await response.json();
    if (response.ok) {
      setVideo(data);
    } else {
      console.log("Failed Network request");
    }
  };
  useEffect(() => {
    getVideo();
  }, []);

  const startPlaying = (event) => {
    var player = document.getElementById(video.id);
    console.log(player);
    event.preventDefault();
    player.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: "playVideo" }),
      "https://www.youtube.com"
    );
  };
  const pausePlaying = (event) => {
    var player = document.getElementById(video.id);
    event.preventDefault();
    player.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: "pauseVideo" }),
      "https://www.youtube.com"
    );
  };
  const resetPlaying = (event) => {
    var player = document.getElementById(video.id);
    event.preventDefault();
    player.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: "stopVideo" }),
      "https://www.youtube.com"
    );
    startPlaying(event);
  };

  return (
    <>
      {props.video && (
        <div
          className="embed-responsive embed-responsive-16by9 col-xs-12 col-sm-12 col-md-12"
          style={
            video.sound_only
              ? {
                  position: "relative",
                  width: "100%",
                  height: "100px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
              : {
                  height: "100%",
                  width: "100%",
                  paddingBottom: "20px",
                  paddingTop: "20px",
                }
          }
        >
          <iframe
            className="embed-responsive-item"
            id={video.id}
            src={
              "https://youtube.com/embed/" + video.embed_id + "?enablejsapi=1"
            }
            allow="autoplay"
            style={
              video.sound_only
                ? {
                    display: "block",
                    height: "300vh",
                    position: "absolute",
                    bottom: "60%",
                  }
                : {
                    display: "block",
                    width: "100%",
                    height: "70vh",
                  }
            }
            title="YT Video"
            allowFullScreen
          ></iframe>

          {video.sound_only ? (
            <div
              className="text-center"
              style={{
                paddingTop: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                className="btn btn-secondary me-2"
                id="play-button"
                onClick={startPlaying}
              >
                Start
              </button>
              <button
                className="btn btn-secondary me-2"
                id="pause-button"
                onClick={pausePlaying}
              >
                Pause
              </button>
              <button
                className="btn btn-secondary me-2"
                id="stop-button"
                onClick={resetPlaying}
              >
                Restart
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};
export default QuestionVideo;
