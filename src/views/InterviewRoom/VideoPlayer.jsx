import React, { useState,useContext,useEffect } from "react";
import { socketContext } from "./socketContext";
import { io } from "socket.io-client";

const VideoPlayer = () => {
    const socket = io("http://localhost:5000");
    const [videoLoaded, setVideoLoaded] = useState(false);
    
  const {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    calluser,
    leavecall,
    answercall
  } = useContext(socketContext);
  
    useEffect(() => {
        socket.on("callaccepted", (signal, peerStream) => {
            if (userVideo.current && peerStream) {
                userVideo.current.srcObject = peerStream;
            }
        });

        // Clean up event listener
        return () => {
            socket.off("callaccepted");
        };
    }, []);
  return (
      <div className="flex flex-row">
          {stream && (
              <div>
                  <h5 variant="h5" >{name || 'Name'}</h5>
                  <div className="border border-black">
                      <video playsInline muted ref={myVideo} autoPlay />

                  </div>
              </div>
          )}
          {callAccepted && !callEnded && (
              <div>
                
                  <h5 variant="h5">{call.name || 'Name'}</h5>
                  <video playsInline ref={userVideo} autoPlay/>
              </div>
          )}
      </div>
  )
}
export default VideoPlayer;