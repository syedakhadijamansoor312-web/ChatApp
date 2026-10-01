
import { useEffect, useState } from "react";
import ChatRoom from "./components/ChatRoom";
import JoinGroup from "./components/JoinGroup";
import './index.css';
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5050";

let socket;

function App() {
  const [joined, setJoined] = useState(false);

  // User Form Fields
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket = io(SOCKET_URL);

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLeave = () => {
    setUsername("");
    setRoom("");
    setJoined(false);
  };

  const handleJoin = ( username, room ) => {
    setUsername(username);
    setRoom(room);
    if (socket) {
      socket.emit("join", room);
    }
    setJoined(true);
  };

  return (
    <>
      {!joined ? (
        <JoinGroup onJoin={handleJoin} />
      ) : (
        <ChatRoom
          username={username}
          room={room}
          socket={socket}
          onLeave={handleLeave}
        />
      )}
    </>
  );
}

export default App;

