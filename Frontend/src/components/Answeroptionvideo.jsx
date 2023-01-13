import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants.ts";
const Answeroptionvideo = (props) => {
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
    if (props.video > 0) {
      getVideo();
    }
  }, [props.video]);

  const startPlaying = (event) => {
    var player = document.getElementById(video.id);
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
    <div style={{ maxWidth: "25%", minWidth: "25%" }}>
      {props.video && (
        <div>
          <div
            className="embed-responsive embed-responsive-16by9 col-xs-12 col-sm-12 col-md-12"
            style={
              video.sound_only
                ? {
                    position: "relative",
                    width: "100%",
                    height: "25px",
                    overflow: "hidden",
                    paddingBottom: "20px",
                    paddingTop: "20px",
                    paddingRight: "5px",
                    paddingLeft: "5px",
                  }
                : {
                    height: "100%",
                    width: "100%",
                    paddingBottom: "20px",
                    paddingRight: "5px",
                    paddingLeft: "5px",
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
                      paddingLeft: "7.5%",
                      paddingRight: "7.5%",
                      bottom: "5%",
                      left: "-15px",
                    }
                  : {
                      display: "block",
                      width: "100%",
                      height: "20vh",
                      top: "0px",
                    }
              }
              title="YT Video"
              allowFullScreen
            ></iframe>
          </div>
          {video.sound_only ? (
            <div
              style={{
                paddingLeft: "2.5%",
                paddingRight: "7.5%",
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
    </div>
  );
};
export default Answeroptionvideo;
