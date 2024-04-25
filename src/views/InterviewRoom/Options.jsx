import react from 'react';
import { useState,useContext,useEffect } from 'react';
import { socketContext } from "./socketContext";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { io } from "socket.io-client";
import Peer from "simple-peer";
const socket = io("http://localhost:5000");



const Options = ({children}) => {

    const {me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(socketContext);
    const [idToCall, setIdToCall] = useState('');
    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <form>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <h2 className="block text-gray-700 text-sm font-bold mb-2">Account Info</h2>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                            <CopyToClipboard text={me} className="mt-3">
                                <button type='button' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                                    Copy Your ID
                                </button>
                            </CopyToClipboard>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <h2 className="block text-gray-700 text-sm font-bold mb-2">Make a call</h2>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} placeholder="ID to call" />
                            {callAccepted && !callEnded ? (
                                <button onClick={leaveCall} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-3">
                                    Hang Up
                                </button>
                            ) : (
                                <button type='button' onClick={() => callUser(idToCall)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-3">
                                    Call
                                </button>
                            )}
                        </div>
                    </div>
                </form>
                {children}
            </div>
        </div>
    )
}

export default Options; 