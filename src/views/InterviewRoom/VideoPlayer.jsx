import React, { useState, useContext, useEffect } from "react";
import { socketContext } from "./socketContext";
import { io } from "socket.io-client";

const VideoPlayer = () => {
    const socket = io("https://esprit-compass-backend.vercel.app");
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const {
        myVideo,
        userVideo,
        stream,
        name,
    } = useContext(socketContext);

    const handleCameraToggle = () => {
        navigator.mediaDevices.getUserMedia({ video: !cameraOn, audio: true }).then((currentStream) => {
            setCameraOn(!cameraOn);
            stream.getVideoTracks()[0].enabled = !cameraOn;
        })
    };

    const handleMicToggle = () => {
        setMicOn(prevMicOn => !prevMicOn);
        if (userVideo.current && userVideo.current.srcObject) {
            const stream = userVideo.current.srcObject;
            const tracks = stream.getAudioTracks();
            if (tracks.length > 0) {
                tracks[0].enabled = !tracks[0].enabled;
            }
        }
    };

    useEffect(() => {
        socket.on("callaccepted", (_, peerStream) => {
            if (userVideo.current && peerStream) {
                userVideo.current.srcObject = peerStream;
            }
        });

        return () => {
            socket.off("callaccepted");
        };
    }, []);

    return (
        <div className="w-full h-screen overflow-hidden">
            <video
                className=" min-w-full min-h-full object-cover"
                playsInline
                muted
                ref={userVideo}
                autoPlay
            />
            {stream && (
                <div
                    className="bottom-4 right-4 m-4 p-4 rounded"
                    onMouseEnter={() => setShowControls(true)}
                    onMouseLeave={() => setShowControls(false)}
                >
                    <div className=" p-4 absolute z-50 top-0 left-0 ">
                        <video
                            className="rounded"
                            title={name}
                            playsInline
                            muted
                            width={350}
                            height={350}
                            ref={myVideo}
                            autoPlay    
                        />
                        
                        {showControls && (
                            <div className="bottom-0 left-0 space-x-2 opacity-0 transition-opacity duration-300 group-hover:opacity-50">
                                <button onClick={handleMicToggle} className="p-2 bg-gray-700 text-white rounded">
                                    {micOn ? (
                                        <i class="fa-solid fa-microphone text-white"></i>
                                    ) : (
                                        <i class="fa-solid fa-microphone-slash text-white"></i>
                                    )}
                                </button>
                                <button onClick={handleCameraToggle} className="p-2 bg-gray-700 text-white rounded">
                                    {cameraOn ? (
                                        <i class="fa-solid fa-video text-white"></i>
                                    ) : (
                                        <i class="fa-solid fa-video-slash text-white"></i>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default VideoPlayer;