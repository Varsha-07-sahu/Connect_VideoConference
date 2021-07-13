import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { Button } from '@material-ui/core';

const SocketContext = createContext();

let socket;
const hostURL = 'http://localhost:5000';
// const socket = io('http://localhost:5000');

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
    const [room, setRoom] = useState([]);
    const[chats, setChats] = useState([]);

    const joinRoom = () => {
        if (socket && callId) {
            socket.emit("joinRoom", callId);
        }
    }
    useEffect(() => {
        console.log("context hosting in useeffect")
    }, []);

    useEffect(() => {
        console.log("Room update", room)
    }, [room]);

    useEffect(() => {
        if (!config.audio && !config.video) {
            console.log("useeffect without ref", myVideo.current)
            return;
        }
        navigator.mediaDevices.getUserMedia(config)
            .then((currentStream) => {
                setStream(currentStream);
                if (myVideo.current)
                    myVideo.current.srcObject = currentStream;
                console.log("update ref src stream")
                // myVideo.current.muted = true;
            });

    }, [config]);

    const connectToServer = (name, createRoom = false) => {
        console.log("connect to server")
        if (socket) {
            socket.disconnect();
        }
        socket = io(hostURL, {
            query: "name=" + name + (createRoom ? "&createRoom=true" : ""),
        })
        socket.on('connect', () => {
            console.log("connection to server established this is the socket id", socket.id)
            setMe(socket.id);
        })
        // socket.on('me', (id) => { console.log("update me id", id); setMe(id); });
    }
    if (socket) {
        socket.off("newUserJoined");
        socket.off("calluser");
        socket.off("callaccepted");
        socket.off("receiveMessage");
        socket.on("newUserJoined", (joinee)=>{
            console.log("new user joined", joinee);
            callUser(joinee.id, joinee.name)
        })
        socket.on('calluser', ({ from, name: callerName, signal }) => {
            console.log("CallUser function", from, callerName);
            // setCall({ isReceivedCall: true, from, name: callerName, signal })
            answerCall(from, callerName, signal);
        });
        socket.on('callaccepted', (data) => {
            console.log("callAccepted by", data.name);
            setRoom(prevRoom => {
                let user = prevRoom.find(r => r.id === data.id);
                let room = prevRoom.filter(r => r.id !== data.id);
                if (user) {
                    user.name = data.name;
                    user.peer.signal(data.signal);
                    room.push(user);
                }
                return room;
            });
        });
        socket.on("receiveMessage" , data => {
            // console.log("received message", data);
            setChats(prevChats => [...prevChats, {...data, time: new Date(), }])
        })
    }
    const sendMessage = message => {
        let roomId = callId || me;
        socket.emit("sendMessage", {roomId, message});
        setChats(prevChats => [...prevChats, {from: me, name, message, time: new Date(), }])
    }
    const answerCall = (id, name, signal) => {
        setCallAccepted(true);
        console.log("answer call request")
        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answercall', { signal: data, to: id });
        });

        peer.on('stream', (currentStream) => {
            console.log("received stream")
            if (userVideo.current) {
                userVideo.current.srcObject = currentStream;
                userVideo.current.muted = true;
            }

            setRoom(prevRoom => {
                let user = prevRoom.find(r => r.id === id);
                let room = prevRoom.filter(r => r.id !== id);
                if (user) {
                    user.stream = currentStream;
                    room.push(user);
                }
                return room;
            })
        });
        peer.on('connect', () => {
            console.log("connection established")
        });
        peer.signal(signal);
        connectionRef.current = peer;
        const user = {
            peer,
            stream: null,
            id,
            name
        }
        setRoom(prevRoom => [...prevRoom, user]);
    }
    useEffect(() => {
        console.log("my stream updated", stream)
        // stream = stream;
    }, [stream])
    const callUser = (id, name) => {
        console.log("call User, stream ready ? ", stream);
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('calluser', { userToCall: id, signalData: data });
        });

        peer.on('stream', (currentStream) => {
            console.log("received stream");
            if (userVideo.current)
                userVideo.current.srcObject = currentStream;
            setRoom(prevRoom => {
                let user = prevRoom.find(r => r.id === id);
                let room = prevRoom.filter(r => r.id !== id);
                if (user) {
                    user.stream = stream;
                    room.push(user);
                }
                return room;
            })
        });
        peer.on('connect', () => {
            console.log("connection established")
        });
        connectionRef.current = peer;
        const user = {
            id, name, peer, stream: null
        }
        console.log("call and update room")
        setRoom(prevRoom => [...prevRoom, user]);
    }
    console.log("stream after each render", stream)
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

    // const chats = [
    //     {
    //         "name": "Varsha",
    //         "time": new Date(),
    //         "message": "Hello amigos!",
    //     },
    //     {
    //         "name": "Ruchika",
    //         "time": new Date(),
    //         "message": "Hi, What's up?",
    //     },
    //     {
    //         "name": "Varsha",
    //         "time": new Date(),
    //         "message": "All good :)",
    //     },
    //     {
    //         "name": "Himanshu",
    //         "time": new Date(),
    //         "message": "Did you finish the assignment",
    //     },
    //     {
    //         "name": "Varsha",
    //         "time": new Date(),
    //         "message": "No, not yet.",
    //     },
    //     {
    //         "name": "Varsha",
    //         "time": new Date(),
    //         "message": "Hello amigos!",
    //     },
    //     {
    //         "name": "Ruchika",
    //         "time": new Date(),
    //         "message": "Hi, What's up?",
    //     },
    //     {
    //         "name": "Varsha",
    //         "time": new Date(),
    //         "message": "All good :)",
    //     },
    //     {
    //         "name": "Himanshu",
    //         "time": new Date(),
    //         "message": "Did you finish the assignment",
    //     }]


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
            // callUser,
            leaveCall,
            // answerCall,
            connectToServer,
            room,
            joinRoom,
            chats,
            sendMessage
        }}>
            {children}
        </SocketContext.Provider>
    );
}

export { ContextProvider, SocketContext };