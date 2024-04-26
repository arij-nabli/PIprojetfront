import React, { useState, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { socketContext } from "./socketContext";

const Options = ({ children }) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(socketContext);
    const [idToCall, setIdToCall] = useState('');

    return (
        <div className="mx-auto p-8  rounded-lg">
            <div className= "rounded px-8 pt-6 pb-8 mb-4">
                <form className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <h2 className="block text-white text-sm font-semibold mb-2">Account Info</h2>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mb-3"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                        />
                        <CopyToClipboard text={me}>
                            <button
                                type="button"
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            >
                                Copy Your ID
                            </button>
                        </CopyToClipboard>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <h2 className="block text-white text-sm font-semibold mb-2">Make a Call</h2>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline mb-3"
                            type="text"
                            value={idToCall}
                            onChange={(e) => setIdToCall(e.target.value)}
                            placeholder="Enter ID to Call"
                        />
                        {callAccepted && !callEnded ? (
                            <button
                                onClick={leaveCall}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            >
                                Hang Up
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => callUser(idToCall)}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            >
                                Call
                            </button>
                        )}
                    </div>
                </form>
                {children}
            </div>
        </div>
    );
}

export default Options;
