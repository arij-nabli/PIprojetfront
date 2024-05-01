import React from "react";
import VideoPlayer from "./VideoPlayer";
import Options from "./Options";
import Notifications from "./Notifications";
import { ContextProvider } from "./socketContext";

const InterviewRoom = () => {
  return (
    <div className="flex flex-col  overscroll-none">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-full bg-gray-100">
          <VideoPlayer />
        </div>
        <div className="md:w-1/4 bg-red-800 text-white">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Meeting Options</h2>
            <p className="text-md align-middle font-semibold mb-4">This meeting is end-to-end encrypted</p>

            <Options>
              <Notifications />
            </Options>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;
