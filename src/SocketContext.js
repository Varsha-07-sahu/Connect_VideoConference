import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { Button } from '@material-ui/core';

const SocketContext = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('placeholder text');
    const [call, setCall] = useState(null);
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
    const [showJoin, setShowJoin] = useState(true);
    // const confi = {}
    // const [video, setVideo] = useState(false);
    const [config, setConfig] = useState({});  //for video and audio
    const [callId, setCallId] = useState('');
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();


    useEffect(() => {
        console.log("context hosting in useeffect")
        socket.on('me', (id) => { console.log("update me id", id); setMe(id); });
        socket.on('calluser', ({ from, name: callerName, signal }) => {
            console.log("CallUser function");
            setCall({ isReceivedCall: true, from, name: callerName, signal })
        });
    }, []);

    useEffect(() => {
        if (!myVideo.current) {
            console.log("useeffect without ref")
            return;
        }
        navigator.mediaDevices.getUserMedia(config)
            .then((currentStream) => {
                setStream(currentStream);
                myVideo.current.srcObject = currentStream;
            });

    }, [config]);

    const room = [
        {
            "name": "You",
            "id": "1",
            "stream": { myVideo },
        }
    ]

    const answerCall = () => {
        setCallAccepted(true);
        console.log("answer call request")
        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answercall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });
        peer.on('connect', () => {
            console.log("connection established")
        });
        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id) => {
        console.log("call User, stream ready ? ", stream);
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('calluser', { userToCall: id, signalData: data, from: me, name });
        });

        peer.on('stream', (currentStream) => {
            console.log("received stream");
            userVideo.current.srcObject = currentStream;

        });

        socket.on('callaccepted', (signal) => {
            console.log("callAccepted");
            setCallAccepted(true);

            peer.signal(signal);
        });
        peer.on('connect', () => {
            console.log("connection established")
        });
        connectionRef.current = peer;
    }

    const leaveCall = () => {
        console.log("leave call");

        setCallEnded(true);
        if (connectionRef.current)
            connectionRef.current.destroy();
        // peer.destroy([err]);
        // window.location.reload();
        // peer.on('close', () => {
        //     console.log("connention close");
        // });

    }

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            room,
            setName,
            callEnded,
            me,
            showJoin,
            setShowJoin,
            config,
            setConfig,
            callId,
            setCallId,
            callUser,
            leaveCall,
            answerCall,
        }}>
            {children}
        </SocketContext.Provider>
    );
}

export { ContextProvider, SocketContext };