import React, {useState, useEffect} from "react";
import queryString from "query-string";
import io from "socket.io-client";

import InfoBar from "../infoBar/infoBar.jsx";
import Input from "../input/input.jsx";
import Messages from "../messages/messages.jsx";
import "./chat.css";

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const EndPoint = "localhost:5000";

    useEffect(()=> {
        // const data = queryString.parse(location.search);
        // console.log(location.search);
        // console.log(data);
        const {name, room} = queryString.parse(location.search);
        console.log(name, room);
        socket = io(EndPoint);
        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, (err) => {
            if(err) alert(err);
        });

        // return () => {
        //     socket.emit('disconnect');

        //     socket.off();
        // }

    }, [EndPoint, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages=> [...messages, message]);
        })

    });

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
        socket.emit('sendmessage', message, () => setMessage(''));
        }
        console.log(message, messages);
    };


    return(
        <div className="outerContainer">
            <div className='container'>
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />   
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
};

export default Chat;