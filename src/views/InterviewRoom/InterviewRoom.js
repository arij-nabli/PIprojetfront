import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";

const InterviewRoom = () => {
  const videoRef = useRef(null);
  const peerRef = useRef(null);
  let peer = null;
  let socket = null;
  let mediaStream = null;
  peer = new Peer({ initiator: true, stream: mediaStream });
  

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          mediaStream = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }

          const socket = io("http://localhost:5000");
          socket.on("connect", () => {
            console.log("connected to server");
          });
          socket.emit("message",() => {
           console.log("hello world!");
          })
        })
        .catch((err) => {
          console.log("Something went wrong!", err);
        });
    }

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
      if (peer) {
        peer.destroy();
      }
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Video Interview Room
      </h1>
      <div className="flex rounded overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-1/2 rounded-lg shadow-lg"
        />
        <video
          ref={peerRef}
          autoPlay
          playsInline
          className="w-1/2 rounded-lg shadow-lg"
        />
      </div>
      <p className="mt-8 text-gray-700">
        Other components and features for the interview room
      </p>
    </div>
  );
};

export default InterviewRoom;
