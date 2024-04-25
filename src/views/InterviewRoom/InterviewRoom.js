import VideoPlayer from "./VideoPlayer";
import Options from "./Options";
import Notifications from "./Notifications";
import { ContextProvider } from "./socketContext";

const InterviewRoom = () => {


  
  return (
    <div className="">
      <ContextProvider>
        <VideoPlayer />
        <Options>
          <Notifications />
        </Options>
      </ContextProvider>
    </div>
  );
};

export default InterviewRoom;
