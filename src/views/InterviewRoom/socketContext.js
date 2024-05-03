import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  children,
} from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const socketContext = createContext();

const socket = io("https://esprit-compass-backend.vercel.app");

const ContextProvider = ({ children }) => {
    const myVideo = useRef(); // Make sure myVideo ref is initialized correctly
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      })
      .catch((error) => {
        console.error("Error accessing user media:", error);
        // Handle error, perhaps by showing a message to the user
      });
    socket.on("me", (id) => {
      setMe(id);
      console.log("me", id);
    });
    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, [call]);

  const answercall = () => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
      
    });
    peer.on("stream", (currentStream) => {
        userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    socket.on("callaccepted", (signal) => {
      if (peer) {
          console.log(peer,signal)
        setCallAccepted(true);
        peer.signal(signal);
      } else {
        console.error("Peer is not defined");
      }
    });
    connectionRef.current = peer;
    return peer
  };

  const leavecall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };
  return (
    <socketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leavecall,
        answercall,
      }}
    >
      {children}
    </socketContext.Provider>
  );
};

export { ContextProvider, socketContext };
