import react from 'react';
import { socketContext } from './socketContext';
import { useContext } from 'react';


const Notifications = () => {
    const { answercall, call, callAccepted } = useContext(socketContext);

    return (
        <>
            {call.isReceivedCall && !callAccepted && (
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <h1>{call.name} is calling:</h1>
                    <button type='button' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={answercall}>
                        Answer
                    </button>
                </div>
            )}
        </>
    )
}

export default Notifications; 